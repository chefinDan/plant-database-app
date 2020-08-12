const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const path = require('path');
const { Router, static, json } = require('express');
const controller = require('../utils/createControllerRoutes');

const stripUserData = (req, res, next) => {
  req.user = req.user.sub
  next();
}

const setup = async ({appOrigin, issuer, audience, basename}) =>{
  const router = Router();
  const apiRouter = Router();
  const staticRouter = Router();

  apiRouter
    .use(morgan("dev"))
    .use(helmet())
    .use(cors({ origin: appOrigin }))
    .use(json());
  
  const checkAuthHeader = (req, res, next) => {
    if(!req.get('Authorization')){
      res.status(401).send({error: 'No authorization token was found'})
    }
    else{
      next();
    }
  }
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

  apiRouter.all(
    '*',
    checkAuthHeader,
    checkJwt, 
    stripUserData, 
    (req, res, next) => next()
  );

  apiRouter.use(
    '/plants', 
    controller('plant-controller')
  );

  apiRouter.use(
    '/users', 
    controller('user-controller')
  );
  
  staticRouter.use(static(path.join(__dirname, '../../client/build')))
  router.use('/api', apiRouter);
  router.use('/', staticRouter);


  return router;
}

module.exports = setup;