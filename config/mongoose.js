import mongoose from "mongoose";
import env from "./environment.js";
mongoose.connect(`mongodb+srv://codeialtest1234:aman1234@cluster0.jnofoef.mongodb.net/?retryWrites=true&w=majority`);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

db.once("open", function () {
  console.log("Connected to Database :: MongoDB");
});

export default db;
