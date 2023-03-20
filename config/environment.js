import fs from "fs";
import rfs from "rotating-file-stream";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logDirectory = path.join(__dirname, "../production_logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: logDirectory,
});



const development = {
  name: "development",
  asset_path: "./assets",
  session_cookies_key: "blahsomething",
  db: "flocker_development",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
     
      user: "singalcn7@gmail.com",
      pass: "ugnauzhixvlzkxdq",
    },
  },
  google_client_id:
    "289979441456-k3mrpdv7fkaf4bvlimuharcnba5m0s3u.apps.googleusercontent.com",
  google_client_secret: "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",
  google_call_back_url: "http://localhost:8000/users/auth/google/callback",
  jwt_secret: "flocker",
  morgan: {
    mode: "dev",
    options: { stream: accessLogStream },
  },
};

const production = {
  name: "production",
  asset_path: process.env.FLOCKER_ASSET_PATH,
  session_cookies_key: process.env.FLOCKER_SESSION_COOKIE_KEY,
  db: "mongodb+srv://codeialtest1234:aman1234@cluster0.jnofoef.mongodb.net/?retryWrites=true&w=majority",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.FLOCKER_GMAIL_USERNAME,
      pass: process.env.FLOCKER_GMAIL_PASSWORD,
    },
  },
  google_client_id: process.env.FLOCKER_GOOGLE_CLIENT_ID,
  google_client_secret: process.env.FLOCKER_GOOGLE_CLIENT_SECRET,
  google_call_back_url: process.env.FLOCKER_GOOGLE_CALLBACK_RURL,
  jwt_secret: process.env.FLOCKER_JWT_SECRET,
  morgan: {
    mode: "combined",
    options: { stream: accessLogStream },
  },
};

export default eval(process.env.FLOCKER_ENVIRONMENT) == undefined
  ? development
  : eval(process.env.FLOCKER_ENVIRONMENT);
