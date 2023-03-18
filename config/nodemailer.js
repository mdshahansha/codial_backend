import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import env from "./environment.js";
let transporter = nodemailer.createTransport(env.smtp);

import { fileURLToPath } from "url"; 
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



let renderTemplate = (data, relativePath) => {
  let mailHTML;
  ejs.renderFile(
    path.join(__dirname, "../views/mailers", relativePath),
    data,
    function (err, template) {
      if (err) {
        console.log("error in rendering template", err);
        return;
      }

      mailHTML = template;
    }
  );

  return mailHTML;
};

export { transporter, renderTemplate };
