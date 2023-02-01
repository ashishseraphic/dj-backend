const nodemailer = require('nodemailer');
// const sgTransport = require('nodemailer-sendgrid-transport');


exports.Sendmail = (to, otp) => {

    let email = process.env.EMAIL;
    let password = process.env.PASSWORD;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: email,
            pass: password
        }
    })
    const mailOption = {
        from: email,
        to: to,
        subject: "Email for OTP Verification",
        html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                    <div style="border-bottom:1px solid #eee">
                        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Your Brand</a>
                    </div>
                    <p style="font-size:1.1em">Hi,</p>
                    <p>Thank you for choosing our Brand. Use the following OTP to complete your Sign Up procedures. OTP is valid for 1 minutes</p>
                    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
                    <p style="font-size:0.9em;">Regards,<br />Rakesh Rana</p>
                    <hr style="border:none;border-top:1px solid #eee" />
                    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                     </div>
                </div>
      </div>`
    }
    transporter.sendMail(mailOption, (error, info) => {
        if (error) {
            console.log("Error", error);
        } else {
            console.log("Email sent" + info.response);
            res.status(201).json({ status: 201, info })
        }
    })


};

exports.SendmailVerify = (to) => {

    let email = process.env.EMAIL;
    let password = process.env.PASSWORD;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: email,
            pass: password
        }
    })
    const mailOption = {
        from: email,
        to: to,
        subject: "Email for OTP Verification",
        html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                    <div style="border-bottom:1px solid #eee">
                        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Your Brand</a>
                    </div>
                    <p style="font-size:1.1em">Hi,</p>
                    <p>Thank you for choosing our Brand. Use the following OTP to complete your Sign Up procedures. OTP is valid for 1 minutes</p>
                    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">Verifiction Successfully</h2>
                    <p style="font-size:0.9em;">Regards,<br />Rakesh Rana</p>
                    <hr style="border:none;border-top:1px solid #eee" />
                    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                     </div>
                </div>
      </div>`
    }
    transporter.sendMail(mailOption, (error, info) => {
        if (error) {
            console.log("Error", error);
        } else {
            console.log("Email sent" + info.response);
            res.status(201).json({ status: 201, info })
        }
    })


};