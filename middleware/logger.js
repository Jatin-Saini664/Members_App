const moment = require('moment');
const logger = (req, res, next) => {
  console.log(
    `${req.protocol}://${req.get('host')}${
      req.originalUrl
    }: ${moment().format()}` // moment is a function and format is a method
  );
  next(); // next is called so you can call next middle ware function
};

module.exports = logger;
