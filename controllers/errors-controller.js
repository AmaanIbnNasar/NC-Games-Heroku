exports.psqlErrors = (err, req, res, next) => {
  const errorCodes = {
    "22P02": { status: 400, msg: `Bad request` },
    23503: { status: 400, msg: "Bad request" },
  };
  if (errorCodes.hasOwnProperty(err.code)) {
    res
      .status(errorCodes[err.code].status)
      .send({ msg: errorCodes[err.code].msg });
  } else {
    next(err);
  }
};

exports.customErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};
