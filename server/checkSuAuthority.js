// middleware: checking su access authority

module.exports = function checkSuAuthority(req, res, next) {

  // need to chek logic more on access authorization
  if (req.user.userRole === 'su' &&
      req.params.userID === req.user.userID) {

    req.mepSuAccess = true;
    next();
  }
  else {
    res.json({errorMessage: 'no authority'});
  }
}
