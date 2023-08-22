const NodeMailer = require("nodemailer");

const sendEmail = async (mailOption) => {
    return new Promise(async (resolve, reject) => {
        const transporter = await NodeMailer.createTransport({
            service : "gmail",
            auth : {
                user : "laxmidhar.sahoo.551832@gmail.com",
                pass : "dgnbgsrjdnmvtodo"
            },
        })
        transporter.sendMail(mailOption, (error, info) => {
            if (error) {
                console.log('Error occurred:', error);
                reject({
                    status : false,
                    message : error.message
                })
            } else {
                console.log('Email sent:', info.response);
                resolve({
                    status : true,
                    message : info.response
                })
            }
        });
    })
};

module.exports = sendEmail;