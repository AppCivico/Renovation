require('dotenv').config();

const { MessengerBot } = require('bottender');
const { withTyping } = require('bottender');
const { FileSessionStore } = require('bottender');
const { MessengerHandler } = require('bottender');
const { createServer } = require('bottender/restify');

const apiai = require('apiai-promise');

// const postbacks = require('./postback');
const mailer = require('./mailer');
const flow = require('./flow');
const attach = require('./attach');

// console.log(`Crontab MailTimer is running? => ${mailer.MailTimer.running}`);

const timeLimit = 1000 * 60 * 60 * 4; // 4 hours
const messageWaiting = eval(process.env.TIME_WAIT); // eslint-disable-line no-eval

const app = apiai(process.env.DIALOGFLOW_TOKEN);
const menuOptions = [
	{
		type: 'postback',
		title: flow.mainMenu.menuOptions[0],
		payload: flow.mainMenu.menuPostback[0],
	},
	{
		type: 'postback',
		title: flow.mainMenu.menuOptions[1],
		payload: flow.mainMenu.menuPostback[1],
	},
	{
		type: 'postback',
		title: flow.mainMenu.menuOptions[2],
		payload: flow.mainMenu.menuPostback[2],
	},
];

// userDoubt -> context.state.userDoubt -> stores user doubt for before sending it
// userMail -> context.state.userMail -> stores user mail for before sending it

const config = require('./bottender.config.js').messenger;

const bot = new MessengerBot({
	accessToken: config.accessToken,
	appSecret: config.appSecret,
	verifyToken: config.verifyToken,
	sessionStore: new FileSessionStore(),
});

if (messageWaiting) {
	bot.use(withTyping({ delay: messageWaiting }));
}

const handler = new MessengerHandler()
	.onEvent(async (context) => {
		if (!context.event.isDelivery && !context.event.isEcho && !context.event.isRead) {
		// check if enough time has passed so we can send a welcome back message
		// now - lastActivity >= timeLimit
			if ((context.event.rawEvent.timestamp - context.session.lastActivity) >= timeLimit) {
				if (context.session.user.first_name) { // check if first_name to avoid an 'undefined' value
					await context.sendText(`Olá, ${context.session.user.first_name}! ${flow.greetings.comeBack}`);
				} else {
					await context.sendText(`Olá! ${flow.greetings.comeBack}`);
				}
				await context.setState({ dialog: 'mainMenu' });
			} else if (context.event.isPostback) {
				const { payload } = context.event.postback;
				await context.setState({ dialog: payload });
				if (payload === 'cancel') {
					await context.sendText(flow.doubt.afterMessage);
					await context.setState({ dialog: 'mainMenu' });
				} else {
					await context.setState({ dialog: payload });
				}
			} else if (context.event.isQuickReply) {
				const { payload } = context.event.quickReply;
				if (payload === 'cancel') {
					await context.sendText(flow.doubt.afterMessage);
					await context.setState({ dialog: 'mainMenu' });
				} else {
					await context.setState({ dialog: payload });
				}
			} else if (context.event.isText) {
				if (context.state.dialog === 'listeningDoubt') {
					await context.setState({ userDoubt: context.event.message.text });
					await context.setState({ dialog: 'email' });
				}
				if (context.state.dialog === 'listeningEmail') {
					await context.setState({ userMail: context.event.message.text });
					await context.setState({ dialog: 'send' });
				}
				if (context.state.dialog !== 'doubt' && context.state.dialog !== 'email' && context.state.dialog !== 'send') {
					await context.typingOn();
					// removing emojis from message
					await context.setState({
						userDoubt: await context.event.message.text.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, ''),
					});
					if (context.state.userDoubt) { // check if string isn't empty after removing emojis
						if (context.event.message.text === process.env.RESTART) {
							await context.resetState();
							await context.setState({ dialog: 'greetings' });
						} else if (context.state.userDoubt.length <= 250) {
							await context.setState({ userText: context.event.message.text });
							const response = await app.textRequest(context.state.userDoubt, {
								sessionId: context.session.user.id,
							});
							// console.log(response.result.metadata.intentName);
							await context.setState({ dialog: response.result.metadata.intentName });
						} else { // string has more than 250 chars
							await context.sendButtonTemplate(flow.charLimit.firstMessage, [
								{
									type: 'postback',
									title: flow.charLimit.menuOptions[0],
									payload: flow.charLimit.menuPostback[0],
								},
								{
									type: 'postback',
									title: flow.charLimit.menuOptions[1],
									payload: flow.charLimit.menuPostback[1],
								},
							]);
						}
						await context.setState({ dialog: '' });
					} else {
						await context.sendImage(flow.submenu.likeImage);
						await context.setState({ dialog: '' });
					}
				}
			} else if (context.event.hasAttachment || context.event.isLikeSticker ||
			context.event.isFile || context.event.isVideo || context.event.isAudio ||
			context.event.isImage || context.event.isFallback) {
			// const attachment = context.event.message.attachments[0];
			// const stickerNum = attachment.payload.sticker_id;
			// if (stickerNum !== undefined) {
			// 	if (stickerNum === 369239343222814) {
			// 		console.log('Got a big thumbs up image');
			// 	} else if (stickerNum === 369239263222822) {
			// 		console.log('Got a regular thumbs up image');
			// 	} else {
			// 		console.log('Got unidentified sticker id: %s', stickerNum);
			// 	}
			// }
				await context.sendImage(flow.submenu.likeImage);
				await context.setState({ dialog: 'mainMenu' });
			}

			switch (context.state.dialog) {
			case 'greetings':
			// await context.sendImage(flow.greetings.greetImage);
				await context.sendText(flow.greetings.firstMessage);
				await context.sendText(flow.greetings.secondMessage);
				await context.sendButtonTemplate(flow.submenu.menuMsg, [
					{
						type: 'postback',
						title: flow.submenu.menuOptions[0],
						payload: flow.submenu.menuPostback[0],
					},
					{
						type: 'postback',
						title: flow.submenu.menuOptions[1],
						payload: flow.submenu.menuPostback[1],
					},
					{
						type: 'postback',
						title: flow.submenu.menuOptions[2],
						payload: flow.submenu.menuPostback[2],
					},
				]);
				break;
			case 'ask':
				await context.sendText(flow.ask.firstMessage);
				await context.sendText(flow.ask.secondMessage);
				break;
			case 'mainMenu':
				await context.sendButtonTemplate(flow.mainMenu.menuMsg, menuOptions);
				break;
			case 'about':
				await context.sendButtonTemplate(flow.about.firstMessage, [
					{
						type: 'postback',
						title: flow.about.menuOptions[0],
						payload: flow.about.menuPostback[0],
					},
					{
						type: 'postback',
						title: flow.about.menuOptions[1],
						payload: flow.about.menuPostback[1],
					},

				]);
				break;
			case 'aboutMore':
				await context.sendText(flow.about.secondMessage);
				await context.sendButtonTemplate(flow.about.thirdMessage, [
					{
						type: 'postback',
						title: flow.about.menuOptions[2],
						payload: flow.about.menuPostback[2],
					},
				]);
				break;
			case 'scholarship':
				await context.sendText(flow.scholarship.firstMessage);
				await context.sendText(flow.scholarship.secondMessage);
				await attach.send(context, flow.scholarship);

				await context.sendButtonTemplate(flow.scholarship.menuMsg, [
					{
						type: 'postback',
						title: flow.scholarship.menuOptions[0],
						payload: flow.scholarship.menuPostback[0],
					},
					{
						type: 'postback',
						title: flow.scholarship.menuOptions[1],
						payload: flow.scholarship.menuPostback[1],
					},
				]);
				break;
			case 'scholarshipMore':
			// await context.sendText(flow.scholarship.thirdMessage);
			// falls through
			case 'release':
				await context.sendText(flow.scholarship.fourthMessage);
				await context.sendText(flow.scholarship.extraMessage);
				await context.sendButtonTemplate(flow.scholarship.endMessage, menuOptions);
				break;
			case 'scholarshipEnd':
				await context.sendText(flow.scholarship.extraMessage);
				await context.sendButtonTemplate(flow.scholarship.endMessage, menuOptions);
				break;
			case 'join':
				await context.sendText(flow.join.firstMessage);
				await context.sendText(flow.join.secondMessage);
				await context.sendText(flow.join.thirdMessage);
				await context.sendText(flow.join.fourthMessage);
				await attach.sendCarouselShare(context, flow.join);
				await context.sendButtonTemplate(flow.join.menuMsg, [
					{
						type: 'postback',
						title: flow.join.menuOptions[0],
						payload: flow.join.menuPostback[0],
					},
				]);
				break;
			case 'course':
				await context.sendText(flow.course.firstMessage);
				await context.sendText(flow.course.secondMessage);
				await context.sendText(flow.course.excuseMe);
				await context.sendButtonTemplate(flow.course.menuMsg, [
					{
						type: 'postback',
						title: flow.course.menuOptions[0],
						payload: flow.course.menuPostback[0],
					},
					{
						type: 'postback',
						title: flow.course.menuOptions[1],
						payload: flow.course.menuPostback[1],
					},
				]);
				break;
			case 'courseMore':
				await context.sendText(flow.course.thirdMessage);
			// falls through
			case 'difference':
				await context.sendText(flow.course.fourthMessage);
				await context.sendText(flow.course.fifthMessage);
				await context.sendButtonTemplate(flow.course.endMessage, menuOptions);
				break;
			case 'courseEnd':
				await context.sendButtonTemplate(flow.course.endMessage, menuOptions);
				break;
			case 'subscription':
				await context.sendText(flow.subscription.firstMessage);
				await attach.sendWithLink(context, flow.subscription);
				await context.sendButtonTemplate(flow.subscription.endMessage, menuOptions);
				break;
			case 'position':
				await context.sendText(flow.position.firstMessage);
				await context.sendText(flow.position.secondMessage);
				await context.sendText(flow.position.site);
				await attach.sendMenu(context, flow.position);
				break;
			case 'huck':
				await context.sendText(flow.huck.firstMessage);
				await attach.sendMenu(context, flow.financing);
				break;
			case 'payment':
				await context.sendText(flow.payment.firstMessage);
				await context.sendText(flow.payment.secondMessage);
			// falls through
			case 'campaign':
				await context.sendText(flow.payment.thirdMessage);
				await context.sendButtonTemplate(flow.payment.menuMsg, [
					{
						type: 'postback',
						title: flow.payment.menuOptions[0],
						payload: flow.payment.menuPostback[0],
					},
					{
						type: 'postback',
						title: flow.payment.menuOptions[1],
						payload: flow.payment.menuPostback[1],
					},
				]);
				break;
			case 'paymentMore':
				await context.sendText(flow.payment.fourthMessage);
				// falls through
			case 'compensation':
				await context.sendButtonTemplate(flow.payment.fifthMessage, [
					{
						type: 'postback',
						title: flow.payment.menuOptions[2],
						payload: flow.payment.menuPostback[2],
					},
					{
						type: 'postback',
						title: flow.payment.menuOptions[1],
						payload: flow.payment.menuPostback[1],
					},
				]);
				break;
			case 'opinion':
				await context.sendButtonTemplate(flow.opinion.firstMessage, menuOptions);
				break;
			case 'paymentEnd':
				await context.sendButtonTemplate(flow.course.endMessage, menuOptions);
				break;
			case 'rules':
				await context.sendText(flow.payment.rulePresentation);
				await context.sendText(flow.payment.firstRule);
				await context.sendText(flow.payment.secondRule);
				await context.sendText(flow.payment.thirdRule);
				await context.sendText(flow.payment.fourthRule);
				await context.sendButtonTemplate(flow.course.endMessage, menuOptions);
				break;
			case 'interview':
				await context.sendText(flow.interview.firstMessage);
				await context.sendButtonTemplate(flow.interview.secondMessage, [
					{
						type: 'postback',
						title: flow.interview.menuOptions[0],
						payload: flow.interview.menuPostback[0],
					},
					{
						type: 'postback',
						title: flow.interview.menuOptions[1],
						payload: flow.interview.menuPostback[1],
					},
				]);
				break;
			case 'interviewMore':
				await context.sendText(flow.interview.thirdMessage);
				// falls through
			case 'board': // banca seletora
				await context.sendText(flow.interview.fourthMessage);
				await context.sendButtonTemplate(flow.submenu.menuMsg, [
					{
						type: 'postback',
						title: flow.submenu.menuOptions[0],
						payload: flow.submenu.menuPostback[0],
					},
					{
						type: 'postback',
						title: flow.submenu.menuOptions[1],
						payload: flow.submenu.menuPostback[1],
					},
					{
						type: 'postback',
						title: flow.submenu.menuOptions[2],
						payload: flow.submenu.menuPostback[2],
					},
				]);
				break;
			case 'financing':
				await context.sendText(flow.financing.firstMessage);
				await context.sendText(flow.financing.secondMessage);
				await context.sendText(flow.financing.thirdMessage);
				await attach.sendMenu(context, flow.financing);
				break;
			case 'contact':
				await context.sendText(flow.contact.firstMessage + flow.contact.siteURL);
				await context.sendButtonTemplate(flow.contact.secondMessage, menuOptions);
				break;
			case 'error':
				await context.typingOff();
				await context.sendText(flow.error.firstMessage);
				await context.sendText(flow.error.secondMessage);
				await context.sendText(flow.error.thirdMessage);
				// await context.sendButtonTemplate(flow.error.menuMsg, menuOptions );
				await context.sendButtonTemplate(flow.error.askContact, [
					{
						type: 'postback',
						title: flow.error.menuOptions[0],
						payload: flow.error.menuPostback[0],
					},
					{
						type: 'postback',
						title: flow.error.menuOptions[1],
						payload: flow.error.menuPostback[1],
					},
				]);
				break;
			case 'doubt':
				await context.sendText(flow.doubt.firstMessage);
				await context.sendButtonTemplate(flow.doubt.secondMessage, [
					{
						type: 'postback',
						title: flow.doubt.menuOptions[0],
						payload: flow.doubt.menuPostback[0],
					},
				]);
				await context.setState({ dialog: 'listeningDoubt' });
				break;
			case 'email':
				await context.sendText(flow.email.firstMessage);
				await context.sendButtonTemplate(flow.email.secondMessage, [
					{
						type: 'postback',
						title: flow.email.menuOptions[0],
						payload: flow.email.menuPostback[0],
					},
				]);
				await context.setState({ dialog: 'listeningEmail' });
				break;
			case 'send':
			// console.log('email', context.state.userMail);
			// console.log('doubt', context.state.userDoubt);
				mailer.sendError(
					`${context.session.user.first_name} ${context.session.user.last_name}`,
					context.state.userDoubt, context.state.userMail // eslint-disable-line comma-dangle
				);
				await context.setState({ userDoubt: '' });
				await context.setState({ userMail: '' });
				await context.sendText(flow.email.endMessage);
				await context.sendButtonTemplate(flow.mainMenu.menuMsg, menuOptions);
				await context.setState({ dialog: 'mainMenu' });
				break;
			case 'BlackList':
				await context.sendButtonTemplate(flow.blackList.firstMessage, menuOptions);
				break;
			}
		}
	})
	.onError(async (context, err) => {
		const date = new Date();
		console.log('\n');
		console.log(`Parece que aconteceu um erro as ${date.toLocaleTimeString('pt-BR')} de ${date.getDate()}/${date.getMonth() + 1} =>`);
		console.log(err);
		console.log(`Usuário => ${context.session.user.first_name} ${context.session.user.last_name}\n\n`);

		await context.typingOff();
		await context.sendText(flow.error.firstMessage);
		await context.sendText(flow.error.secondMessage);
		await context.sendText(flow.error.thirdMessage);
		// await context.sendButtonTemplate(flow.error.menuMsg, menuOptions );
		await context.sendButtonTemplate(flow.error.askContact, [
			{
				type: 'postback',
				title: flow.error.menuOptions[0],
				payload: flow.error.menuPostback[0],
			},
			{
				type: 'postback',
				title: flow.error.menuOptions[1],
				payload: flow.error.menuPostback[1],
			},
		]);
	});

bot.onEvent(handler);

const server = createServer(bot);

server.listen(process.env.API_PORT, () => {
	console.log(`Server is running on ${process.env.API_PORT} port...`);
	console.log(`App: ${process.env.APP} & Page: ${process.env.PAGE}`);
});
