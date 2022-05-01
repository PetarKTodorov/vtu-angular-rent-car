;
const express = require('express');

const configurationEnvironments = require("./configuration/configuration");
const initializateDatabase = require("./configuration/database");
const initializateExpress = require("./configuration/express");
const initializateRoutes = require("./configuration/routes");

const currentEnvironment = "development";
const configuration = configurationEnvironments[currentEnvironment];

const application = express();

initializateDatabase(configuration);
initializateExpress(application, configuration);
initializateRoutes(application);

application.listen(configuration.port, () => console.log(`Server start on port:${configuration.port}`));