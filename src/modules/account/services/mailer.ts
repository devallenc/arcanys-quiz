import nodemailer from "nodemailer";
import { IAccount } from "../interfaces";

export interface ISendMail {
  (account: IAccount) : Promise<string|boolean>
}

export default class MailerService {

  public async send (account: IAccount) {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "maximilian.quitzon@ethereal.email",
        pass: "ZCt7jbnPqspxTSWAYn",
      },
      logger: true
    });

    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: account.email, // list of receivers
      subject: "Quiz App - Account Validation", // Subject line
      // text_display: "Hello world?", // plain text_display body
      html: `Hi, to successfully sign up. 
      <br><br>
      Please click this <a href="localhost:8081/expose-api/verify/${account.id}/${account.verification_code}">link </a> to verify your account.`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    return nodemailer.getTestMessageUrl(info);
  }
}