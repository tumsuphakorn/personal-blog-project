import express from "express";
import path from "path"
import bodyParser from "body-parser";
import ejs from "ejs";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import methodOverride from "method-override";
import blogRoute from "./routes/blogRoute.js"

/////////////////////////// START EXPRESS /////////////////////////////

const app = express();

/////////////////////////// USE MIDDLEWARES /////////////////////////////

app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride("_method"));
app.use(morgan("dev"));

/////////////////////////// TEMPLATE ENGINE /////////////////////////////

app.set("view engine", "ejs");

/////////////////////////// ROUTING /////////////////////////////

app.use("/", blogRoute);

/////////////////////////// CONNECT DATABASE /////////////////////////////

mongoose.connect("mongodb+srv://admin-tum:06072538@cluster0.5hzcc.mongodb.net/personal-blog-project?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

/////////////////////////// START SERVER /////////////////////////////

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});