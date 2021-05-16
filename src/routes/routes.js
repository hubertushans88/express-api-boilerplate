const express = require("express");
const { TestController } = require("../controllers");

const Router = express.Router();

Router.get("/", TestController.index);
Router.post('/cu', TestController.createUser);
Router.get('/gu',TestController.getUser);
Router.post('/eu',TestController.updateName);

module.exports = Router;