// This class stores text messages, urls and quick_replies options_check

const emoji = require('node-emoji');


module.exports = {
	greetings: {
		welcome: 'Olá, sou a Cora. A coruja robô assistente do RenovaBR. Clique em \'Começar\' para falar comigo!',
		greetImage: 'https://friendlystock.com/wp-content/uploads/2018/03/5-dabbing-owl-cartoon-clipart.jpg',
		firstMessage: 'Olá, sou a Cora. A coruja robô assistente do RenovaBR.',
		secondMessage: 'Estou aqui para responder as perguntas frequentes.',
		thirdMessage: 'Você quer saber mais sobre o RenovaBR ou já quer me perguntar algo?\nPra perguntar basta digitar e me mandar.',
	},
	mainMenu: {
		menuMsg: 'Escolha uma opção para saber mais ou digite sua pergunta:',
		menuOptions: ['Sobre RenovaBR', 'Bolsistas', 'Fazer Parte'],
		menuPostback: ['about', 'scholarship', 'join'],

	},
	about: {
		firstMessage: 'O RenovaBR surgiu em outubro de 2017 da necessidade da sociedade de sair do discurso para ações concretas para melhorar a política brasileira.' +
		'Com o lema “Nosso país, nossa política”, o projeto visa contribuir para a formação de brasileiros dispostos ' +
		'a atuar na linha frente da renovação política do Brasil para romper com o modelo atual. ' +
		'O RenovaBR quer fazer com que o brasileiro volte a acreditar e participar da política.',
		secondMessage: 'RenovaBR prepara gente comprometida e realizadora para entrar na política. Selecionamos novas lideranças do país inteiro.' +
		'O RenovaBR está preparando essa nova geração de líderes para enfrentar e vencer as velhas práticas.',
		thirdMessage: 'No lugar das campanhas milionárias, pessoas conversando com pessoas. ' +
		'Em vez do vale-tudo pelo poder, propostas sinceras e soluções que se tornem realidade.',
		menuOptions: ['Conta mais', 'Voltar', 'Entendi'],
		menuPostback: ['aboutMore', 'mainMenu', 'mainMenu'],
	},
	scholarship: {
		firstMessage: 'Temos homens, mulheres, indígenas, de diversos partidos do país inteiro, com diferentes ideias, mas que têm em comum a crença de que política é lugar de honestidade, diálogo e dedicação.',
		secondMessage: `Gente que conhece de perto nossos problemas e tem disposição e capacidade para enfrentá-los. ${emoji.get('facepunch')} Acesse o nosso site para conhecer melhor cada liderança.`,
		image: '<aquele link pro site aqui>',
		menuMsg: 'Que tal?',
		menuOptions: ['Conta mais', 'Avançar', 'Entendi'],
		menuPostback: ['scholarshipMore', 'scholarshipEnd', 'mainMenu'],
		// -- more
		thirdMessage: 'Sabe quantos candidatos o RonovaBR pretende lançar?',
		fourthMessage: 'O objetivo é formar lideranças políticas com conhecimento da realidade brasileira para que eles tomem a decisão de lançarem candidaturas ou não.' +
		`O RenovaBR não é um partido político. ${emoji.get('+1')} É uma escola de excelência na capacitação e fomento de novos líderes para fazer a tão desejada renovação política.` +
		`${emoji.get('facepunch')}`,
		// -- end
		extraMessage: 'Legal, né?',
		endMessage: `Vamos conversar mais! Você pode me perguntar algo digitando uma palavra-chave ou escolher as opções. ${emoji.get('wink')}`,
	},
	join: {
		firstMessage: `Aii, estou até emocionada. ${emoji.get('heart_eyes')}`,
		secondMessage: 'Gente que está a fim de fazer parte é muito bom.',
		menuMsg: 'Tem várias formas de fazer parte, olha só: <ver carousel>',
		menuOptions: ['Doar', 'Voluntariar', 'Agora não'],
		menuPostback: ['mainMenu', 'mainMenu', 'mainMenu'],
	},
};
