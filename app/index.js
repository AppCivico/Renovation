require('dotenv').config();

const GoogleSpreadsheets = require('google-spreadsheets');
const google = require('googleapis');

const { MessengerBot } = require('bottender');
const { createServer } = require('bottender/restify');

// const postbacks = require('./postback');
const config = require('./bottender.config.js').messenger;

const bot = new MessengerBot({
	accessToken: config.accessToken,
	appSecret: config.appSecret,
});

// const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
// // Assuming you already obtained an OAuth2 token that has access to the correct scopes somehow...
// oauth2Client.setCredentials({
// 	access_token: ACCESS_TOKEN,
// 	refresh_token: REFRESH_TOKEN,
// });

const texto = 'Deu ruim';

GoogleSpreadsheets({
	key: process.env.SPREADKEY,
	auth: process.env.OATH2CLIENT,
}, (err, spreadsheet) => {
	if (err) {
		console.log(err);
	} else {
		spreadsheet.worksheets[0].cells({
			range: 'R1C1:R1C2',
		}, (err2, cells) => {
			if (err2) {
				console.log(err2);
			}
			console.dir(cells);

		// Cells will contain a 2 dimensional array with all cell data in the
		// range requested.
		});
	}
});

bot.onEvent(async (context) => {
	if (!context.event.isDelivery && !context.event.isEcho) {
		await context.sendText('Hello World');
	}
});

const server = createServer(bot);

server.listen(process.env.API_PORT, () => {
	console.log(`Server is running on ${process.env.API_PORT} port...`);
	console.log(`App: ${process.env.APP} & Page: ${process.env.PAGE}`);
});
