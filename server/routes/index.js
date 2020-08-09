const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const { Router } = require('express');
const controller = require('../utils/createControllerRoutes');

const setup = async ({appOrigin, issuer, audience}) =>{
  const router = Router();
  const apiRouter = Router();
  
  apiRouter
    .use(morgan("dev"))
    .use(helmet())
    .use(cors({ origin: appOrigin }))
    // .use(express.json());
  
  const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `${issuer}.well-known/jwks.json`,
    }),
    
    audience: audience,
    issuer: issuer,
    algorithms: ["RS256"],
  });

  apiRouter.use('/plants', checkJwt, controller('plant-controller'));
  apiRouter.use('/users', checkJwt, controller('user-controller'));
  
  router.use('/api', apiRouter);

  return router;
}

module.exports = setup;