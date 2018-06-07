const nodemailer = require('nodemailer');

const user = process.env.SENDER_EMAIL;
const pass = process.env.SENDER_PASSWORD;
const sendTo = ['jordan@eokoe.com'];


const transporter = nodemailer.createTransport({
	service: 'Hotmail',
	auth: {
		user,
		pass,
	},
});
function sendMail(userName = 'erro', userText = 'entre em contato') {
	const mailOptions = {
		from: user,
		to: sendTo,
		subject: `Cora: mensagem de ${userName}`,
		text: `Não entendemos essa dúvida de ${userName} => ${userText}`,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error);
		} else {
			console.log(`Email sent: ${info.response}`);
		}
	});
}

module.exports.sendMail = sendMail;
