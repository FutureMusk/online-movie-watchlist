const sessExist = (req) => {
  if(!req.session.user) return false;
  if(!('key' in req.session.user)) return false;
  if(!('role' in req.session.user)) return false;
  return true;
};

module.exports = sessExist;