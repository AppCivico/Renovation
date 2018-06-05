// This class stores text messages, urls and quick_replies options_check


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
		secondMessage: 'Gente que conhece de perto nossos problemas e tem disposição e capacidade para enfrentá-los. :facepunch: Acesse o nosso site para conhecer melhor cada liderança.',
		image: '<aquele link pro site aqui>',
		menuOptions: ['Conta mais', 'Voltar', 'Entendi'],
		menuPostback: ['aboutMore', 'mainMenu', 'mainMenu'],
	},

};
