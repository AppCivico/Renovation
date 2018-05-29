require('dotenv').config();

const { MessengerBot } = require('bottender');
const { createServer } = require('bottender/restify');

const gsjson = require('google-spreadsheet-to-json');
const privateKey = require('./private_key.json');

let dialog;
function reload() {
	gsjson({
		spreadsheetId: process.env.SPREADKEY,
		credentials: privateKey,
		hash: 'id',
		ignoreCol: 2,
	}).then((result) => {
		console.log(result);
		dialog = result;
	}).catch((err) => {
		console.log(err.message);
		console.log(err.stack);
	});
}

reload();
const config = require('./bottender.config.js').messenger;

const bot = new MessengerBot({
	accessToken: config.accessToken,
	appSecret: config.appSecret,
});

bot.onEvent(async (context) => {
	if (!context.event.isDelivery && !context.event.isEcho) {
		await context.sendText(dialog[1].texto);
		if (context.event.isText && context.event.message.text === 'reload') {
			reload();
		}
	}
});

const server = createServer(bot);

server.listen(process.env.API_PORT, () => {
	console.log(`Server is running on ${process.env.API_PORT} port...`);
	console.log(`App: ${process.env.APP} & Page: ${process.env.PAGE}`);
});
