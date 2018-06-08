require('dotenv').config();

const { MessengerBot } = require('bottender');
const { createServer } = require('bottender/restify');

const apiai = require('apiai-promise');

// const postbacks = require('./postback');
const mailer = require('./mailer');
const flow = require('./flow');
const attach = require('./attach');

const app = apiai(process.env.DIALOGFLOW_TOKEN);

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

let userDoubt = '';
let userMail = '';

const config = require('./bottender.config.js').messenger;

const bot = new MessengerBot({
	accessToken: config.accessToken,
	appSecret: config.appSecret,
});

bot.onEvent(async (context) => {
	if (!context.event.isDelivery && !context.event.isEcho && !context.event.isRead) {
		if (context.event.isPostback) {
			const { payload } = context.event.postback;
			console.log(payload);
			await context.setState({ dialog: payload });
		} else if (context.event.isQuickReply) {
			console.log(context.event.quickReply);
			const { payload } = context.event.quickReply;
			await context.setState({ dialog: payload });
		} else if (context.event.isText) {
			if (context.state.dialog === 'listeningDoubt') {
				userDoubt = context.event.message.text;
				await context.setState({ dialog: 'email' });
			}
			if (context.state.dialog === 'listeningEmail') {
				userMail = context.event.message.text;
				await context.setState({ dialog: 'send' });
			}
			if (context.state.dialog !== 'doubt' && context.state.dialog !== 'email' && context.state.dialog !== 'send') {
				await context.typingOn();
				const response = await app.textRequest(context.event.message.text, {
					sessionId: context.session.user.id,
				});
				// await context.sendText(` Você digitou ${context.event.message.text}` +
				// `!\nIntent: ${response.result.metadata.intentName}`);
				// console.log(response.result.metadata.intentName);

				await context.setState({ dialog: response.result.metadata.intentName });
			}
		}


		switch (context.state.dialog) {
		case 'greetings':
			await context.sendImage(flow.greetings.greetImage);
			await context.sendText(flow.greetings.firstMessage);
			await context.sendText(flow.greetings.secondMessage);
			await context.sendText(flow.greetings.thirdMessage, { quick_replies: menuOptions });
			break;
		case 'mainMenu':
			await context.sendText(flow.mainMenu.menuMsg, { quick_replies: menuOptions });
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
			await attach.send(context, flow.scholarship);

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
			await attach.sendCarousel(context, flow.join);
			await context.sendText(flow.join.menuMsg, {
				quick_replies: [
					{
						content_type: 'text',
						title: flow.join.menuOptions[0],
						payload: flow.join.menuPostback[0],
					},
				],
			});
			break;
		case 'course':
			await context.sendText(flow.course.firstMessage);
			await context.sendText(flow.course.secondMessage);
			await context.sendText(flow.course.excuseMe);
			await context.sendText(flow.course.menuMsg, {
				quick_replies: [
					{
						content_type: 'text',
						title: flow.course.menuOptions[0],
						payload: flow.course.menuPostback[0],
					},
					{
						content_type: 'text',
						title: flow.course.menuOptions[1],
						payload: flow.course.menuPostback[1],
					},

				],
			});
			break;
		case 'courseMore':
			await context.sendText(flow.course.thirdMessage);
			await context.sendText(flow.course.fourthMessage);
			await context.sendText(flow.course.fifthMessage);
			await context.sendText(flow.course.endMessage, { quick_replies: menuOptions });
			break;
		case 'courseEnd':
			await context.sendText(flow.course.endMessage, { quick_replies: menuOptions });
			break;
		case 'subscription':
			await context.sendText(flow.subscription.firstMessage);
			await context.sendText(flow.subscription.secondMessage);
			await context.sendText(flow.subscription.endMessage, { quick_replies: menuOptions });
			break;
		case 'position':
			await context.sendText(flow.position.firstMessage);
			await context.sendText(flow.position.secondMessage);
			await attach.sendMenu(context, flow.position);
			break;
		case 'payment':
			await context.sendText(flow.payment.firstMessage);
			await context.sendText(flow.payment.secondMessage);
			await context.sendText(flow.payment.thirdMessage);
			await context.sendText(flow.payment.menuMsg, {
				quick_replies: [
					{
						content_type: 'text',
						title: flow.payment.menuOptions[0],
						payload: flow.payment.menuPostback[0],
					},
					{
						content_type: 'text',
						title: flow.payment.menuOptions[1],
						payload: flow.payment.menuPostback[1],
					},

				],
			});
			break;
		case 'paymentMore':
			await context.sendText(flow.payment.fourthMessage);
			await context.sendText(flow.payment.fifthMessage, {
				quick_replies: [
					{
						content_type: 'text',
						title: flow.payment.menuOptions[2],
						payload: flow.payment.menuPostback[2],
					},
					{
						content_type: 'text',
						title: flow.payment.menuOptions[1],
						payload: flow.payment.menuPostback[1],
					},

				],
			});
			break;
		case 'paymentEnd':
			await context.sendText(flow.course.endMessage, { quick_replies: menuOptions });
			break;
		case 'paymentRules':
			await context.sendText(flow.payment.firstRule);
			await context.sendText(flow.payment.secondRule);
			await context.sendText(flow.payment.thirdRule);
			await context.sendText(flow.payment.fourthRule);
			await context.sendText(flow.course.endMessage, { quick_replies: menuOptions });
			break;
		case 'interview':
			await context.sendText(flow.interview.firstMessage);
			await context.sendText(flow.interview.secondMessage);
			await context.sendText(flow.interview.thirdMessage, {
				quick_replies: [
					{
						content_type: 'text',
						title: flow.interview.menuOptions[0],
						payload: flow.interview.menuPostback[0],
					},
					{
						content_type: 'text',
						title: flow.interview.menuOptions[1],
						payload: flow.interview.menuPostback[1],
					},

				],
			});
			break;
		case 'interviewMore':
			await context.sendText(flow.interview.fourthMessage);
			await context.sendText(flow.interview.fifthMessage);
			await context.sendText(flow.interview.menuMsg);
			await context.sendText(flow.interview.endMessage, { quick_replies: menuOptions });
			break;
		case 'interviewEnd':
			await context.sendText(flow.course.endMessage, { quick_replies: menuOptions });
			break;
		case 'financing':
			await context.sendText(flow.financing.firstMessage);
			await context.sendText(flow.financing.secondMessage);
			await context.sendText(flow.financing.thirdMessage);
			await attach.sendMenu(context, flow.financing);
			break;
		case 'error':
			// mailer.sendMail(
			// 	`${context.session.user.first_name} ${context.session.user.last_name}`,
			// 	context.event.message.text // eslint-disable-line comma-dangle
			// );
			await context.typingOff();
			await context.sendText(flow.error.firstMessage);
			await context.sendText(flow.error.secondMessage);
			await context.sendText(flow.error.thirdMessage);
			// await context.sendText(flow.error.menuMsg, { quick_replies: menuOptions });
			await context.sendText(flow.error.askContact, {
				quick_replies: [
					{
						content_type: 'text',
						title: flow.error.menuOptions[0],
						payload: flow.error.menuPostback[0],
					},
					{
						content_type: 'text',
						title: flow.error.menuOptions[1],
						payload: flow.error.menuPostback[1],
					},
				],
			});
			break;
		case 'doubt':
			await context.sendText(flow.doubt.firstMessage);
			await context.sendText(flow.doubt.secondMessage, {
				quick_replies: [
					{
						content_type: 'text',
						title: flow.doubt.menuOptions[0],
						payload: flow.doubt.menuPostback[0],
					},
				],
			});
			await context.setState({ dialog: 'listeningDoubt' });
			break;
		case 'email':
			await context.sendText(flow.email.firstMessage);
			await context.sendText(flow.email.secondMessage, {
				quick_replies: [
					{
						content_type: 'text',
						title: flow.email.menuOptions[0],
						payload: flow.email.menuPostback[0],
					},
				],
			});
			await context.setState({ dialog: 'listeningEmail' });
			break;
		case 'send':
			console.log('email', userMail);
			console.log('doubt', userDoubt);
			mailer.sendDoubt(
				`${context.session.user.first_name} ${context.session.user.last_name}`,
				userDoubt, userMail // eslint-disable-line comma-dangle
			);
			userDoubt = '';
			userMail = '';
			await context.sendText(flow.email.endMessage);
			await context.sendText(flow.mainMenu.menuMsg, { quick_replies: menuOptions });

			break;
		}
	}
});

const server = createServer(bot);

server.listen(process.env.API_PORT, () => {
	console.log(`Server is running on ${process.env.API_PORT} port...`);
	console.log(`App: ${process.env.APP} & Page: ${process.env.PAGE}`);
});
