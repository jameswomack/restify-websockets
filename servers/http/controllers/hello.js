function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

function HelloController(){}

HelloController.prototype.respond = respond;

module.exports = HelloController;
