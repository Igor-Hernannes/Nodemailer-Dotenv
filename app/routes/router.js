var express = require("express");
var router = express.Router();
const { body, validationResult } = require("express-validator");
const nodemailer = require('nodemailer');
 
 
router.get("/", function (req, res) {
  res.render("pages/index", { "erros": null, "valores": {"nome":"","email":"","telefone":"", "assunto":"", "mensagem":""} ,"retorno":null });
});
 
router.post(
  "/index",
  body("nome").isLength({ min: 3, max: 30 })
      .withMessage("Nome deve ter de 3 a 30 caracteres!"),
  body("email").isEmail(),
  body("telefone").isLength({ min: 11, max: 11 }),
  body("assunto").isLength({ min: 3, max: 100 }),
  body("mensagem").isLength({ min: 3, max: 10000 }),
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.render("pages/index", { "erros": errors, "valores":req.body,"retorno":null});
    }
 
      return res.render("pages/index", { "erros": null, "valores":req.body,"retorno":req.body});
  }
);
 
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "igorhmac@gmail.com",
    pass: "rrpx igfb zdtf kfil"
  }
});
 
const mailOptions = {
  from: "",
  to: "",
  subject: "",
  text: "",
  html: ""
};
 
transporter.sendMail
 
module.exports = router;