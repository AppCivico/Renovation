// Class for generating get_started button, welcome message and persistent menu
// Will be executed when imported (only needed once)
// You can import it to index.js like this:
// const postbacks = require('./postback');

const Request = require('request');

const pageToken = process.env.ACCESS_TOKEN;

const flow = require('./flow');

function createGetStarted() {
	Request.post({
		uri: `https://graph.facebook.com/v2.6/me/messenger_profile?access_token=${pageToken}`,
		'content-type': 'application/json',
		form: {
			get_started: {
				payload: 'greetings',
			},
			greeting: [
				{
					locale: 'default',
					text: flow.greetings.welcome,
				},
			],
		},
	}, (error, response, body) => {
		console.log('error:', error);
		console.log('statusCode:', response && response.statusCode);
		console.log('body:', body);
	});
}

function createPersistentMenu() {
	Request.post({
		uri: `https://graph.facebook.com/v2.6/me/messenger_profile?access_token=${pageToken}`,
		'content-type': 'application/json',
		form: {
			persistent_menu: [
				{
					locale: 'default',
					call_to_actions: [
						{
							type: 'postback',
							title: 'Sobre',
							payload: 'about',
						},
						{
							type: 'postback',
							title: 'Bolsistas',
							payload: 'scholarship',
						},
						{
							type: 'postback',
							title: 'Fazer parte',
							payload: 'join',
						},
						// {
						// 	type: 'postback',
						// 	title: 'Voltar ao início',
						// 	payload: 'greetings',
						// },
					],
				},
			],
		},
	}, (error, response, body) => {
		console.log('error:', error);
		console.log('statusCode:', response && response.statusCode);
		console.log('body:', body);
	});
}

createGetStarted();
createPersistentMenu();
