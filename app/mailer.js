const nodemailer = require('nodemailer');

const user = process.env.SENDER_EMAIL;
const pass = process.env.SENDER_PASSWORD;
const sendTo = process.env.EMAIL_TO_RECEIVE;


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
		subject: `Cora: dúvida de ${userName}`,
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

function sendDoubt(userName = 'erro', userText = 'entre em contato', userMail = 'imediatamente') {
	const mailOptions = {
		from: user,
		to: sendTo,
		subject: `Cora: mensagem de ${userName}`,
		text: `Recebemos uma nova mensagem de ${userName}. ` +
		`\nA mensagem: ${userText}` +
		`\nO email para responder: ${userMail}`,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error);
		} else {
			console.log(`Email sent: ${info.response}`);
		}
	});
}

module.exports.sendDoubt = sendDoubt;
