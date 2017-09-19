// middleware: checking admin access authority

module.exports = function checkAdminAuthority(req, res, next) {

  // need to chek logic more on access authorization
  if (req.user.userRole === 'ad') {

    req.mepAdminAccess = true;
    next();
  }
  else {
    res.json({errorMessage: 'no authority'});
  }
}
