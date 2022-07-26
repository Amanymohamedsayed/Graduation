import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import connection from "./util/connection.js";
import Responses from "./util/response.js";
import nodemailer from "nodemailer";
import SetupModels from "./models/setupmodels.js";
import path from 'path';
import {fileURLToPath} from 'url';
import Cors from 'cors'
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

import { Strategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import APIRouter from "./routes/APIRouter.js"

dotenv.config();
process.env.ACCESS_TOKEN_SECRET

const app = express();
app.use(Cors())

const JwtStrategy = Strategy;
try {
	  connection.authenticate();
	 connection.sync();
	console.log("Connection has been established successfully.");
} catch (error) {
	console.error("Unable to connect to the database:", error);
}
//app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views/html'));
app.use(express.static(__dirname + '/views/javascript'));

app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(morgan("dev"));

app.use("/" , APIRouter)
app.use("/assets", express.static("assets"));

app.listen(process.env.PORT || 8080, () => {
	console.log(`Server is running on port ${process.env.PORT || 8080}`);
});
