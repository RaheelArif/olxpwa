function logout(req, res, next) {
  if(req.user) {
    // req.session.destroy(function () {
    //   next();
    // });
    req.logout();
    next();
  }else{
    next();
  }
}

module.exports = logout;