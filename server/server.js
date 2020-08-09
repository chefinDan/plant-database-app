require("dotenv").config();
const express = require("express");

const db = require('./db');
const routerSetup = require('./routes');
const app = express();

const port = process.env.API_PORT;

const dbConfig = {
    uri: process.env.DB_PATH,
    name: process.env.DB_NAME
};

const routerConfig = {
    appOrigin: process.env.APP_ORIGIN,
    audience: process.env.AUTH0_AUDIENCE, 
    issuer: process.env.AUTH0_ISSUER 
};

const setup = async (options) => {
    await db(dbConfig);
    const router = await routerSetup(routerConfig);

    app.use('/', router);
    app.listen(port, () => {
        console.log(`server listening on port: ${port}`);
    });
}

module.exports = setup;