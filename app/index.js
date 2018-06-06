require('dotenv').config();

const { MessengerBot } = require('bottender');
const { createServer } = require('bottender/restify');

const flow = require('./flow');

const apiai = require('apiai-promise');

const app = apiai(process.env.DIALOGFLOW_TOKEN);


// const postbacks = require('./postback');

// const gsjson = require('google-spreadsheet-to-json');
// const privateKey = require('./private_key.json');
// let dialog; dialog[1].texto
// function reload() {
// 	gsjson({
// 		spreadsheetId: process.env.SPREADKEY,
// 		credentials: privateKey,
// 		hash: 'id',
// 		ignoreCol: 2,
// 	}).then((result) => {
// 		console.log(result);
// 		dialog = result;
// 	}).catch((err) => {
// 		console.log(err.message);
// 		console.log(err.stack);
// 	});
// }

// if (context.event.isText && context.event.message.text === 'reload') {
// 	reload();
// }


// reload();


const menuOptions = [
	{
		content_type: 'text',
		title: flow.mainMenu.menuOptions[0],
		payload: flow.mainMenu.menuPostback[0],
	},
	{
		content_type: 'text',
		title: flow.mainMenu.menuOptions[1],
		payload: flow.mainMenu.menuPostback[1],
	},
	{
		content_type: 'text',
		title: flow.mainMenu.menuOptions[2],
		payload: flow.mainMenu.menuPostback[2],
	},
];

const config = require('./bottender.config.js').messenger;

const bot = new MessengerBot({
	accessToken: config.accessToken,
	appSecret: config.appSecret,
});

bot.onEvent(async (context) => {
	if (!context.event.isDelivery && !context.event.isEcho) {
		if (context.event.isPostback) {
			const { payload } = context.event.postback;
			console.log(payload);
			await context.setState({ dialog: payload });
		} else if (context.event.isQuickReply) {
			console.log(context.event.quickReply);
			const { payload } = context.event.quickReply;
			await context.setState({ dialog: payload });
		} else if (context.event.isText) {
			await context.typingOn();
			const response = await app.textRequest(context.event.message.text, {
				sessionId: Math.random(),
			});
			await context.typingOff();

			await context.sendText(` Você digitou ${context.event.message.text}!\nIntent: ${response.result.metadata.intentName}`);
			console.log(response.result.metadata.intentName);

			// request.on('error', (error) => {
			// 	console.log(error);
			// });

			await context.setState({ dialog: response.result.metadata.intentName });
		}

		switch (context.state.dialog) {
		case 'greetings':
			// await context.sendImage(flow.greetings.greetImage);
			await context.sendText(flow.greetings.firstMessage);
			await context.sendText(flow.greetings.secondMessage);
			await context.sendText(flow.greetings.thirdMessage, { quick_replies: menuOptions });
			break;
		case 'mainMenu':
			await context.sendText(flow.mainMenu.menuMsg, { quick_replies: menuOptions });
			// await context.setState({ dialog: 'prompt' });
			break;
		case 'about':
			await context.sendText(flow.about.firstMessage, {
				quick_replies: [
					{
						content_type: 'text',
						title: flow.about.menuOptions[0],
						payload: flow.about.menuPostback[0],
					},
					{
						content_type: 'text',
						title: flow.about.menuOptions[1],
						payload: flow.about.menuPostback[1],
					},

				],
			});
			break;
		case 'aboutMore':
			await context.sendText(flow.about.secondMessage);
			await context.sendText(flow.about.thirdMessage, {
				quick_replies: [
					{
						content_type: 'text',
						title: flow.about.menuOptions[2],
						payload: flow.about.menuPostback[2],
					},
				],
			});
			break;
		case 'scholarship':
			await context.sendText(flow.scholarship.firstMessage);
			await context.sendText(flow.scholarship.secondMessage);
			await context.sendText(flow.scholarship.image);
			await context.sendText(flow.scholarship.menuMsg, {
				quick_replies: [
					{
						content_type: 'text',
						title: flow.scholarship.menuOptions[0],
						payload: flow.scholarship.menuPostback[0],
					},
					{
						content_type: 'text',
						title: flow.scholarship.menuOptions[1],
						payload: flow.scholarship.menuPostback[1],
					},

				],
			});
			break;
		case 'scholarshipMore':
			await context.sendText(flow.scholarship.thirdMessage);
			await context.sendText(flow.scholarship.fourthMessage);
			await context.sendText(flow.scholarship.extraMessage);
			await context.sendText(flow.scholarship.endMessage, { quick_replies: menuOptions });
			break;
		case 'scholarshipEnd':
			await context.sendText(flow.scholarship.extraMessage);
			await context.sendText(flow.scholarship.endMessage, { quick_replies: menuOptions });
			break;
		case 'join':
			await context.sendText(flow.join.firstMessage);
			await context.sendText(flow.join.secondMessage);
			await context.sendText(flow.join.menuMsg, {
				quick_replies: [
					{
						content_type: 'text',
						title: flow.join.menuOptions[0],
						payload: flow.join.menuPostback[0],
					},
					{
						content_type: 'text',
						title: flow.join.menuOptions[1],
						payload: flow.join.menuPostback[1],
					},
					{
						content_type: 'text',
						title: flow.join.menuOptions[2],
						payload: flow.join.menuPostback[2],
					},

				],
			});
			break;
		}
	}
});

const server = createServer(bot);

server.listen(process.env.API_PORT, () => {
	console.log(`Server is running on ${process.env.API_PORT} port...`);
	console.log(`App: ${process.env.APP} & Page: ${process.env.PAGE}`);
});
