// Module for sending attachments to bot
// context is the context from bot.onEvent
// links is the object from flow.js from the respective dialog

function sendMenu(context, links) {
	context.sendAttachment({
		type: 'template',
		payload: {
			template_type: 'generic',
			elements: [
				{
					title: links.siteTitle,
					image_url: links.imageURL,
					// subtitle: 'dasd',
					default_action: {
						type: 'web_url',
						url: links.siteURL,
						messenger_extensions: 'false',
						webview_height_ratio: 'full',
					// fallback_url: 'www.google.com',
					},
					buttons: [
					// {
					// 	type: 'web_url',
					// 	url: 'www.google.com',
					// 	title: 'Ver site',
					// }, {
						{
							type: 'postback',
							title: 'Entendi',
							payload: 'mainMenu',
						},
					],
				},
			],
		},
	});
}

module.exports.sendMenu = sendMenu;


async function send(context, links) {
	await context.sendAttachment({
		type: 'template',
		payload: {
			template_type: 'generic',
			elements: [
				{
					title: links.siteTitle,
					image_url: links.imageURL,
					default_action: {
						type: 'web_url',
						url: links.siteURL,
						messenger_extensions: 'false',
						webview_height_ratio: 'full',
					},
				},
			],
		},
	});
}

module.exports.send = send;

async function sendCarousel(context, links) {
	await context.sendAttachment({
		type: 'template',
		payload: {
			template_type: 'generic',
			elements: [
				{
					title: links.siteTitle[0],
					image_url: links.imageURL[0],
					// subtitle: 'dasd',
					default_action: {
						type: 'web_url',
						url: links.siteURL[0],
						messenger_extensions: 'false',
						webview_height_ratio: 'full',
						// fallback_url: 'www.google.com',
					},
					// buttons: [
					// 				{
					// 		type: 'postback',
					// 		title: links.button,
					// 		payload: links.postback,
					// 	},
					// ],
				},
				{
					title: links.siteTitle[1],
					image_url: links.imageURL[1],
					// subtitle: 'dasd',
					default_action: {
						type: 'web_url',
						url: links.siteURL[1],
						messenger_extensions: 'false',
						webview_height_ratio: 'full',
						// fallback_url: 'www.google.com',
					},
				},
			],
		},
	});
}

module.exports.sendCarousel = sendCarousel;
