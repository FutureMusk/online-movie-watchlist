const mongoose = require("mongoose");
const { Readable } = require("stream");
const imageThumbnail = require("image-thumbnail");
const multer = require("multer");
const ObjectID = require("mongodb").ObjectID;
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,

  limits: { fieldSize: 10 * 1024 * 1024 },
});

const MovieModel = require("../models/movieModel.js");

exports.movieGet = async (req, res) => {
  try {
    const movieData = await MovieModel.find();
    res.render("../views/index.ejs", { movieData, title: "All Movies" });
  } catch (err) {
    console.log(err);
  }
};

exports.moviePost = async (req, res) => {
  upload.single("image")(req, res, async (err) => {
    console.log("here");
    try {
      if (err) {
        //Handle errors
      }
      let data = { ...req.body };
      let bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "photos",
      });

      const thumbnail = await imageThumbnail(req.file.buffer, {
        withMetaData: true,
        percentage: 100,
      });
      const readablePhotoStream = new Readable();
      readablePhotoStream.push(thumbnail);
      readablePhotoStream.push(null);
      let uploadStream = bucket.openUploadStream(data.movieName);

      readablePhotoStream.pipe(uploadStream);
      uploadStream.on("error", () => {
        console.log("upload failed!");
      });
      uploadStream.on("finish", () => {
        console.log("upload success");
      });
      data.image = "/images/" + uploadStream.id;
      await MovieModel.create(data);
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  });
};

exports.movieGetPoster = async (req, res) => {
  const db = mongoose.connection.db;
  try {
    var photoID = new ObjectID(req.params.id);
  } catch (err) {
    return res.status(400).json({
      message:
        "Invalid PhotoID in URL parameter. Must be a single String of 12 bytes or a string of 24 hex characters",
    });
  }
  let bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: "photos",
  });
  let downloadStream = bucket.openDownloadStream(photoID);
  downloadStream.on("data", (chunk) => {
    res.write(chunk);
  });
  downloadStream.on("error", () => {
    res.sendStatus(404);
  });

  downloadStream.on("end", () => {
    res.end();
  });
};

exports.searchMovie = async (req, res) => {
  try {
    const result = await MovieModel.find({
      $text: { $search: req.body.search },
    });
    res.render("result", { result, title: "Results" });
  } catch (err) {
    console.log(err);
  }
};
