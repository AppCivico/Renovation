// This class stores text messages, urls and quick_replies

// const emoji = require('node-emoji');

module.exports = {
	greetings: {
		greetImage: 'https://gallery.mailchimp.com/926cb477483bcd8122304bc56/images/4420da53-ea8f-4f7f-b3eb-6eb982603e7a.png',
		firstMessage: 'Olá, sou a Cora. A robô assistente do RenovaBR.',
		secondMessage: 'Estou aqui para responder as perguntas frequentes.',
		thirdMessage: 'Você quer saber mais sobre o RenovaBR ou já quer me perguntar algo?\nPra perguntar basta digitar e me mandar.',
		comeBack: 'Que bom te ver novamente. 😍',
		welcome: 'Olá, sou a Cora. A robô assistente do RenovaBR. Clique em \'Começar\' para falar comigo!',
	},
	submenu: {
		menuMsg: 'Você quer saber mais sobre o RenovaBR ou deseja me perguntar algo? 🙂',
		menuOptions: ['Saber mais', 'Perguntar', 'Ver Opções'],
		menuPostback: ['about', 'ask', 'mainMenu'],
		likeImage: 'https://gallery.mailchimp.com/926cb477483bcd8122304bc56/images/a5e8ffa7-c0c6-412e-82ba-b9e127ca2f91.png',
	},
	ask: {
		firstMessage: 'A qualquer instante você pode digitar a sua dúvida e me mandar. ;)',
		secondMessage: 'O que gostaria de saber?',
	},
	mainMenu: {
		menuMsg: 'Escolha uma opção para saber mais ou digite sua pergunta: 🙂',
		menuOptions: ['Sobre RenovaBR', 'Lideranças', 'Fazer Parte'],
		menuPostback: ['about', 'scholarship', 'join'],
	},
	about: {
		firstMessage: 'O RenovaBR prepara gente comprometida e realizadora para entrar na política. Selecionamos novas lideranças do país inteiro para enfrentar ' +
		'e vencer as velhas práticas. No lugar das campanhas milionárias, pessoas conversando com pessoas. Em vez do vale-tudo pelo poder, ' +
		'propostas sinceras e soluções que se tornem realidade.',
		secondMessage: 'O RenovaBR surgiu em outubro de 2017 da necessidade da sociedade de sair do discurso para ações concretas para melhorar a política brasileira.',
		thirdMessage: ' Queremos fazer com que o brasileiro volte a acreditar e participar da política.',
		menuOptions: ['Conta mais', 'Voltar', 'Entendi'],
		menuPostback: ['aboutMore', 'mainMenu', 'mainMenu'],
	},
	scholarship: {
		firstMessage: 'Temos homens e mulheres de diversos partidos do país inteiro, com diferentes ideias, mas que têm em comum a crença de que política é lugar de ' +
		'honestidade, diálogo e dedicação.',
		secondMessage: 'Gente que conhece de perto nossos problemas e tem disposição e capacidade para enfrentá-los. 👊 Acesse o nosso site ' +
		'www.renovabr.org/bolsistas para conhecer melhor cada liderança. 🙂',
		image: '<aquele link pro site aqui>',
		menuMsg: 'Que tal?',
		menuOptions: ['Conta mais', 'Avançar', 'Entendi'],
		menuPostback: ['scholarshipMore', 'scholarshipEnd', 'mainMenu'],
		// -- more
		// thirdMessage: 'Sabe quantos candidatos o RenovaBR pretende lançar?',
		fourthMessage: 'O objetivo é formar lideranças políticas com conhecimento da realidade brasileira para que eles tomem a decisão de lançarem candidaturas ou não. ' +
		'O RenovaBR não é um partido político. 👍 É uma escola de excelência na capacitação e fomento de novos líderes para fazer a tão desejada renovação política. ' +
		'👊',
		// -- end
		extraMessage: 'Legal, né?',
		endMessage: 'Vamos conversar mais! Você pode me perguntar ou escolher as opções: 😉',
		// -- attachment
		siteURL: 'http://renovabr.org/bolsistas/',
		imageURL: 'http://renovabr.org/wp-content/uploads/2018/04/brasil-tem-jeito.png',
		siteTitle: 'Líderes | RenovaBR',
	},
	course: {
		firstMessage: 'O curso do RenovaBR mescla aulas presenciais e à distância. A carga horária total é de 240 horas. Entre atividades obrigatórias e eletivas.',
		secondMessage: 'Os integrantes do RenovaBR têm disciplinas de liderança, funcionamento do Legislativo, Teoria Geral do Estado, novas experiências políticas, ' +
		'papel do Estado, eficiência do Governo, desafios do Brasil, Direito Eleitoral, cenário eleitoral, marketing político e media training, entre outros.',
		excuseMe: 'Foi mal pelo textão, mas acho que respondi, né? 😀',
		menuMsg: 'Que tal?',
		menuOptions: ['Conta mais', 'Avançar', 'Entendi'],
		menuPostback: ['courseMore', 'courseEnd', 'mainMenu'],
		// -- more
		thirdMessage: 'Sabe o que difere o curso do RenovaBR das formações feitas pelos partidos?',
		fourthMessage: 'A diferença é que no RenovaBR os problemas estão no centro das discussões. Há bolsistas liberais, progressistas, conservadores, socialistas, trabalhistas, ' +
		'enfim, de todos os pensamentos políticos atuais. O foco de todos é encontrar a solução para os principais problemas do país com diálogo e convergência de objetivos.',
		fifthMessage: 'As lideranças não são rotuladas como de “esquerda” ou de “direita”. O RenovaBR é um meio de defender princípios na política. ' +
		'Por isso, o RenovaBR é um projeto inédito no mundo.',
		// -- end
		endMessage: 'Vamos conversar mais! Você pode me perguntar ou escolher as opções. 😉',
	},
	payment: {
		firstMessage: 'Para que as lideranças RenovaBR possam se dedicar exclusivamente ao processo de formação, eles recebem uma bolsa mensal entre R$ 5mil e R$ 12mil, ' +
		'calculada com base no rendimento médio nominal mensal, de acordo com a Pesquisa Nacional de Amostra por Domicílio(PNAD), divulgada IBGE.',
		secondMessage: 'E uma curiosidade: Alguns abriram mão da bolsa e mantêm suas despesas por conta própria. 😱',
		thirdMessage: 'Frisamos que não haverá qualquer tipo de investimento, pelo RenovaBR, em futuras campanhas políticas. 😉',
		menuMsg: 'Tem muita coisa para contar! 😊',
		menuOptions: ['Conta mais', 'Avançar', 'Quais regras?'],
		menuPostback: ['paymentMore', 'paymentEnd', 'rules'],
		// -- more
		fourthMessage: 'Você deve estar se perguntando. O que o RenovaBR espera em contrapartida... simples!',
		fifthMessage: 'As lideranças do RenovaBR têm liberdade de ideologia e posicionamento. A única contrapartida que o RenovaBR exige de seus membros ' +
		'é a assinatura de um compromisso com quatro regras fundamentais.',
		// rules
		rulePresentation: 'As quatros fundamentais regras que nossos membros seguem são:',
		firstRule: 'MANDATO: Trabalhar no cargo até o último dia. O voto é um ato de confiança e deve ser respeitado. Chega de trampolim político.',
		secondRule: 'TRANSPARÊNCIA: Dar satisfação permanente ao eleitor. Divulgar sua rotina de trabalho, posicionamentos e projetos. Prestar contas.',
		thirdRule: 'RESPONSABILIDADE: Abrir mão e combater os privilégios do cargo. Adotar um modelo de gabinete enxuto e usar a verba parlamentar com consciência.',
		fourthRule: 'MUDANÇA: Trabalhar por uma reforma política que priorize o interesse público. Há diversos caminhos possíveis. O fundamental é mudar.',
		// -- end
		endMessage: 'O que mais deseja saber? Pode me perguntar a qualquer hora. 😌',
	},
	// +compensation
	join: {
		firstMessage: 'Fiquei muito feliz! 😍',
		secondMessage: 'Gente que está a fim de fazer parte é muito bom.',
		thirdMessage: 'Torne-se voluntário e não deixe de compartilhar o RenovaBR e as nossas novidades para seus amigos e família. 😊',
		fourthMessage: 'Tem várias formas de fazer parte, olha só',
		menuMsg: 'Que tal?',
		menuOptions: ['Entendi'],
		menuPostback: ['mainMenu'],
		// -- attach
		button: 'Entendi',
		postback: 'mainMenu',
		siteTitle: ['Torne-se vonluntário', 'Compartilhe o Renova'],
		siteSubTitle: ['Faça parte do time', 'Mostre seu apoio!'],
		siteURL: ['http://renovabr.org/participe/', 'http://renovabr.org'],
		imageURL: [
			'http://renovabr.org/wp-content/uploads/2018/01/img-participate.jpg',
			'http://renovabr.org/wp-content/uploads/2018/04/brasil-tem-jeito.png',
		],
		// .....old
		// siteURL: ['http://renovabr.org/doe', 'http://renovabr.org/participe/'],
		// imageURL: [
		// 	'https://www.kickante.com.br/sites/default/files/styles/campaign_pitch_image/public/financiamento-coletivo/pitch/vamos_renovar_a_politica_do_brasil-717728.png?itok=4h6djkP6',
		// 	'http://renovabr.org/wp-content/uploads/2018/01/img-participate.jpg',
		// ],
	},
	subscription: {
		firstMessage: 'As inscrições já foram encerradas, mas acompanhe as nossas redes sociais, ' +
		'logo logo divulgaremos para ficar por dentro de todas as nossas novidades!',
		secondMessage: 'Essa pergunta foi fácil! Me pergunte mais!',
		endMessage: 'Vamos conversar mais! Você pode me perguntar ou escolher as opções. 😉',
	},
	position: {
		firstMessage: 'RenovaBR de esquerda ou de direita?',
		secondMessage: 'O RenovaBR não é um partido político. \nAs lideranças do RenovaBR têm liberdade de ideologia e posicionamento. ' +
		'Temos lideranças de diversos espectros políticos, dá uma olhada aqui para conhecê-los melhor:',
		site: 'http://renovabr.org/bolsistas/',
		endMessage: 'Vamos conversar mais! Você pode me perguntar ou escolher as opções. 😉',
		// -- attachment
		siteURL: 'http://renovabr.org/bolsistas/',
		imageURL: 'http://renovabr.org/wp-content/uploads/2018/04/brasil-tem-jeito.png',
		siteTitle: 'Líderes | RenovaBR',
	},
	interview: {
		firstMessage: 'Mais de 4 mil pessoas de todos os estados se inscreveram! 😱',
		secondMessage: 'Todos passaram por etapas de teste online, vídeos de apresentação pessoal, entrevistas e banca avaliadora com especialistas em gestão pública e política. ',
		menuOptions: ['Conta mais', 'Avançar'],
		menuPostback: ['interviewMore', 'interviewEnd'],
		// -- more
		thirdMessage: 'Queria te contar sobre a banca seletora.',
		fourthMessage: 'Depois dos testes da fase online, os pré-selecionados passaram por entrevistas individuais com membros do nosso time. ' +
		'Após essa fase, participaram da banca, conduzida por especialistas de diversas áreas e repertórios. 😉', // used on +board
		excuseMe: 'Foi mal pelo textão, mas acho que respondi, né? 😀',
		// -- end
		endMessage: 'Você pode me perguntar algo digitando uma palavra-chave ou escolher as opções. 😉',
	},
	// +board
	financing: {
		firstMessage: 'O RenovaBR se mantém através das doações de pessoas físicas interessadas em apoiar um programa de renovação política feito com qualidade.',
		secondMessage: 'Os doadores não têm nenhum contato com as lideranças do RenovaBR.',
		thirdMessage: 'Todos podem participar por meio do nosso site:',
		endMessage: 'Vamos conversar mais! Você pode me perguntar ou escolher as opções. 😉',
		// -- attachment
		siteURL: 'http://renovabr.org/participe/',
		imageURL: 'http://renovabr.org/wp-content/uploads/2018/01/img-participate.jpg',
		siteTitle: 'Vamos renovar a política do Brasil',
	},
	contact: {
		firstMessage: 'Todo cidadão pode entrar em contato conosco pelo nosso portal:\n',
		siteURL: 'http://renovabr.org/central-de-transparencia/',
		secondMessage: 'Siga-nos nas redes sociais:' +
		'\nTwitter: https://twitter.com/renova_br' +
		'\nInstagram: https://www.instagram.com/renovabr/' +
		'\nFacebook: https://www.facebook.com/BrasilRenova/',
	},
	error: {
		firstMessage: 'Eu não entendi, me desculpa? 😔',
		secondMessage: 'Digite palavras como "sobre" para saber mais sobre o RenovaBR ou "lideranças" para saber sobre os selecionados, por exemplo.',
		thirdMessage: 'Eu sou só a robô assistente do RenovaBR, a linguagem natural pode ser difícil de entender... 😕',
		menuMsg: 'Você pode digitar novamente ou escolher as opções do menu',
		askContact: 'Se quiser, posso te ajudar a entrar em contato com a equipe do RenovaBR para tirar suas dúvidas! Que tal?',
		menuOptions: ['Vamos lá!', 'Agora não'],
		menuPostback: ['doubt', 'cancel'],
	},
	doubt: {
		firstMessage: 'Legal! Agradecemos seu interesse. 🙂',
		secondMessage: 'Precisarei da sua dúvida e do seu e-mail. Você poderá cancelar com o botão abaixo. \nPor favor, digite sua dúvida:',
		menuOptions: ['Cancelar'],
		menuPostback: ['cancel'],
		afterMessage: 'Tudo bem. 😉',
	},
	email: {
		firstMessage: '👍',
		secondMessage: '\nAgora, por favor, digite seu e-mail:',
		menuOptions: ['Cancelar'],
		menuPostback: ['cancel'],
		endMessage: 'Obrigada! A equipe do RenovaBR responderá sua dúvida por e-mail, assim que possível.',
	},
	blackList: {
		firstMessage: 'Infelizmente, não entendo este tipo de manifestação. Que tal me fazer uma pergunta ou escolher uma das opções abaixo? ',
	},

};
