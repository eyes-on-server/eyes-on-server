const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAILER_EMAIL,
    pass: process.env.MAILER_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

async function enviarEmail(email, senha) {
  const info = await transporter.sendMail({
    from: `eyesonserver2@outlook.com`,
    to: [`${email}`],
    subject: "Senha de Acesso Eyes On Server",
    html: `
            <center>
                <h1> Obrigado por escolher a Eyes on Server!</h1>
                <br><br>
                <h3> A sua senha de acesso único para a dashboard é: </h3>
                <br>
                <b>
                    <h2>${senha}</h2>
                </b>
                <br>
            </center>
        `,
  });

  console.log(info);
  return info;
}

module.exports = { enviarEmail };
