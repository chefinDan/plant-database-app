const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const path = require('path');
const { Router, static, json } = require('express');
const controller = require('../utils/createControllerRoutes');

const setup = async ({appOrigin, issuer, audience, basename}) =>{
  const router = Router();
  const apiRouter = Router();
  const staticRouter = Router();

  apiRouter
    .use(morgan("dev"))
    .use(helmet())
    .use(cors({ origin: appOrigin }))
    .use(json());
  
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

  const stripUserData = (req) => {
    req.user = req.user.sub
  }

  apiRouter.use(
    '/plants', 
    checkJwt, 
    stripUserData, 
    controller('plant-controller')
  );

  apiRouter.use(
    '/users', 
    checkJwt, 
    stripUserData, 
    controller('user-controller')
  );
  
  staticRouter.use(static(path.join(__dirname, '../../client/build')))
  router.use('/api', apiRouter);
  router.use('/', staticRouter);


  return router;
}

module.exports = setup;