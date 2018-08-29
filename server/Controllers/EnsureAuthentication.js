const EnsureAuthentication = {
  userAuthentication: function (req, res, next) {
    if (req.user && req.user.userRole.toLowerCase() == "user") {
      next();
    } else {
      res.send(401);
    }
  },

  userOrAdminAuthentication: function (req, res, next) {
    if (req.user && req.user.userRole.toLowerCase() == "user" || req.user && req.user.userRole.toLowerCase() == "admin") {
      next();
    } else {
      res.send(401);
    }
  },

  adminAuthentication: function (req, res, next) {
    if (req.user && req.user.userRole.toLowerCase() == "admin") {
      next();
    } else {
      res.send(401);
    }
  }
};
module.exports = EnsureAuthentication;