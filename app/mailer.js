const nodemailer = require('nodemailer');
const Cron = require('cron');

const user = process.env.SENDER_EMAIL;
const pass = process.env.SENDER_PASSWORD;
const sendTo = process.env.EMAIL_TO_RECEIVE;

const mailError = [];

// mailError.push({
// 	name: 'Jordan Victor Scher',
// 	doubt: 'dfgsdfg',
// 	date: '2:58:14 PM'
// 	,
// });
// mailError.push({
// 	name: 'João Silva',
// 	doubt: 'help',
// 	date: '2:48:14 PM',
// });
// mailError.push({
// 	name: 'Jordan Victor Scher',
// 	doubt: '123456',
// 	date: '2:38:14 PM',
// });
// mailError.push({
// 	name: 'Maria Silva',
// 	doubt: 'dsdsdsdsdsdsdsd',
// 	date: '2:28:14 PM',
// });

const transporter = nodemailer.createTransport({
	service: 'Hotmail',
	auth: {
		user,
		pass,
	},
});


// function sendMail(userName = 'erro', userText = 'entre em contato') {
// 	const mailOptions = {
// 		from: user,
// 		to: sendTo,
// 		subject: `Cora: dúvida de ${userName}`,
// 		text: `Não entendemos essa dúvida de ${userName} => ${userText}`,
// 	};

// 	transporter.sendMail(mailOptions, (error, info) => {
// 		if (error) {
// 			console.log(error);
// 		} else {
// 			console.log(`Email sent: ${info.response}`);
// 		}
// 	});
// }

// module.exports.sendMail = sendMail;

// when any user sends their doubt with their e-mail we send one e-mail immediately
function sendError(userName = 'erro', userText = 'entre em contato', userMail = 'imediatamente') {
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

module.exports.sendError = sendError;

// for texts that we don't understand: we add all of them up to send all at once periodically using mailTimer
function addError(obj) { mailError.push(obj); }

module.exports.addError = addError;

function cleanMail() { mailError.length = 0; }

const MailTimer = new Cron.CronJob(
	'00 00 10-22/4 * * 1-6', () => {
		let text = 'Não recebemos nenhuma dúvida nas últimas horas.';

		if (mailError.length > 0 && typeof mailError !== 'undefined') {
			mailError.sort((a, b) => {
				const nameA = a.name.toUpperCase(); // ignore upper and lowercase
				const nameB = b.name.toUpperCase(); // ignore upper and lowercase
				if (nameA < nameB) { return -1;	}
				if (nameA > nameB) { return 1;	}
				return 0; // names must be equal
			});

			text = 'Essas são as últimas dúvidas que recebemos:\n\n';

			let pivotName = mailError[0].name;
			text += `${pivotName} perguntou:\n`;

			mailError.forEach((element) => {
				if (element.name !== pivotName) {
					pivotName = element.name;
					text += `\n${pivotName} perguntou:\n`;
				}
				text += `\t${element.doubt} ás ${element.date}\n`;
			});
			const mailOptions = {
				from: user,
				to: sendTo,
				subject: 'Dúvidas do Chatbot',
				text,
			};

			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					console.log(error);
				} else {
					console.log(`Email sent: ${info.response}`);
				}
			});
			console.log(text);
			cleanMail();
		}
	}, (() => {
		console.log('Crontab \'timer\' stopped.');
	}),
	true, /* Starts the job right now (no need for MailTimer.start()) */
	'America/Sao_Paulo',
	false, // context
	// Below: runOnInit = true useful only for tests
	false // eslint-disable-line comma-dangle
);

module.exports.MailTimer = MailTimer;
