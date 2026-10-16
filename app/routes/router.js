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
 
// Criação do transporter
const transporter = nodemailer.createTransport({
service: 'gmail',
auth: {

user: process.env.EMAIL_USER, // seu e-mail Gmail

pass: process.env.EMAIL_PASS // senha de app (não a senha da conta)
},

tls: {

secure: false,
ignoreTLS: true,
rejectUnauthorized: false, // ignorar certificado digital APENAS EM DESENVOLVIMENTO
}

});
 
const mailOptions = {
  from: "igorhmac@gmail.com",
  to: "igorhmac@gmail.com",
  subject: "assunto",
  text: "mensaagem em formato de texto",
  html: "<h1>mensagem em formato HTML</h1>"
};
 
transporter.sendMail (mailOptions, (error, info) => {
if (error) {

// em caso de erro informações serão exibidas no console
console.log(error);

} else {

// as informações a respeito do envio realizado serão exibidas no console
console.log(info);
 
// sucesso ao enviar o e-mail
console.log("email enviado"); 
}
 
});
 
module.exports = router;

