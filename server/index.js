require("dotenv").config();

const interceptAndPrint = (req, res, next) => {
  console.log(req.headers);
  next();
};



