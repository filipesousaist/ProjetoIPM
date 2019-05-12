const SCREENS =
{
	"off":                          {id: "off"},

	"main_menu":                    {id: "main_menu"},

	"apps":                         {id: "apps"},

	"location":                     {id: "location"},

	"options":                      {id: "options"},

	"iGuide_main":                  {id: "iGuide_main"},

	"iWay_main":                    {id: "iWay_main"},

	"iGroup_main":                  {id: "iGroup_main"},

	"iGroup_create":								{id: "iGroup_create"},

	"iGroup_groups":								{id: "iGroup_groups"},

	"iGroup_group_main":            {id: "iGroup_group_main"},

	"iGroup_group_addMember":       {id: "iGroup_group_addMember"},

	"iGroup_group_addEvent":        {id: "iGroup_group_addEvent"},

	"iGroup_group_main_memberList": {id: "iGroup_group_main_memberList"},

	"iGroup_group_member_info": 		{id: "iGroup_group_member_info"},

	"iGroup_group_main_eventsList": {id: "iGroup_group_main_eventsList"},

	"iGroup_group_event_info": 			{id: "iGroup_group_event_info"},

	"iGroup_group_inbox":           {id: "iGroup_group_inbox"},

	"iGuide_info":                  {id: "iGuide_info"},

  "iGuide_event_info":            {id: "iGuide_event_info"},

	"payment_methods":              {id: "payment_methods"},

	"add_payment":                  {id: "add_payment"},

	"payment_complete":             {id: "payment_complete"},
}

const POPUPS =
{
	"error_window": {id: "error_window"},
	"keyboard": {id: "keyboard"}
}

const FORMS_NEXT_ID =
{
	"paypal_email": "paypal_pw",
	"paypal_pw": null,

	"card_number": "card_date",
	"card_date": "card_cvv",
	"card_cvv": null,

	"iWay_starting_point": "iWay_destination",
	"iWay_destination": null,

	"iGroup_name_value": "iGroup_location_value",
	"iGroup_location_value": "iGroup_year_value",
	"iGroup_year_value": "iGroup_month_value",
	"iGroup_month_value": "iGroup_day_value",
	"iGroup_day_value": null,

	"iGroup_member_name_value": null,

	"iGroup_event_name_value": "iGroup_event_year_value",
	"iGroup_event_year_value": "iGroup_event_month_value",
	"iGroup_event_month_value": "iGroup_event_day_value",
	"iGroup_event_day_value": null
}

const DEFAULT =
{
	"auto_save": true,
	"iGroup_groups": [],
	"people":
	{
		"Ambrósio Santos":
		{
			name: "Ambrósio Santos",
			id: "Ambrósio_Santos",
			location_name: "Paris",
			position: {x: 300, y: 300},
			image : "apps/iGroup/img/Ambrosio.jpg"
		},

		"Marc Jelkic":
		{
			name: "Marc Jelkic",
			id: "Marc_Jelkic",
			location_name: "Paris",
			position: {x: 900, y:700},
			image : "apps/iGroup/img/MarcJelkic.jpg"
		},

		"Afonso Vasconcelos":
		{
			name: "Afonso Vasconcelos",
			id: "Afonso_Vasconcelos",
			location_name: "Lisboa",
			position: {x: 200, y: 200},
			image : "apps/iGroup/img/AfonsoVasconcelos.jpg"
		},

		"Pedro Moreira":
		{
			name: "Pedro Moreira",
			id: "Pedro_Moreira",
			location_name: "Lisboa",
			position: {x: 50, y: 400},
			image : "apps/iGroup/img/ist190768.jpg"
		},

		"Rodrigo Rosa":
		{
			name: "Rodrigo Rosa",
			id: "Rodrigo_Rosa",
			location_name: "Lisboa",
			position: {x: 200, y: 200},
			image :"apps/iGroup/img/RodrigoRosa.jpg"
		},

		"Filipe Sousa":
		{
			name: "Filipe Sousa",
			id: "Filipe_Sousa",
			location_name: "Lisboa",
			position: {x: 800, y: 50},
			image : "apps/iGroup/img/ist190714.jpg"
		},

		"Miguel Mota":
		{
			name: "Miguel Mota",
			id: "Miguel_Mota",
			location_name: "Lisboa",
			position: {x: 650, y: 600},
			image : "apps/iGroup/img/ist190964.jpg"
		},

		"Pedro Leitão":
		{
			name: "Pedro Leitão",
			id: "Pedro_Leitão",
			location_name: "Paris",
			position: {x: 500, y: 500},
			image : "apps/iGroup/img/PedroLeitão.jpg"
		},

		"Tomás Gomes":
		{
			name: "Tomás Gomes",
			id: "Tomás_Gomes",
			location_name: "Londres",
			position: {x: 100, y: 400}
		},

		"André Silva":
		{
			name: "André Silva",
			id: "André_Silva",
			location_name: "Londres",
			position: {x: 150, y: 100}
		},

		"Marta Xavier":
		{
			name: "Marta Xavier",
			id: "Marta_Xavier",
			location_name: "Londres",
			position: {x: 650, y: 300}
		},

		"Carlos Ricardo":
		{
			name: "Carlos Ricardo",
			id: "Carlos_Ricardo",
			location_name: "Londres",
			position: {x: 850, y: 700}
		},

		"João Lopes":
		{
			name: "João Lopes",
			id: "João_Lopes",
			location_name: "Lisboa",
			position: {x: 300, y: 500}
		},

		"Guilherme Carlota":
		{
			name: "Guilherme Carlota",
			id: "Guilherme_Carlota",
			location_name: "Lisboa",
			position: {x: 500, y: 450}
		},

		"Diogo Lobato":
		{
			name: "Diogo Lobato",
			id: "Diogo_Lobato",
			location_name: "Lisboa",
			position: {x: 50, y: 650}
		}
	},
	"current_person_name": "Ambrósio Santos"
}

const EVENTS =
{
	"Ver estrelas no parque":
	{
		name: "Ver estrelas no parque",
		time: "Terça, 6 Jul 2016 às 19:00",
		loc: "Parque Eduardo VII",
		description: "Ver estrelas no parque é uma expriencia mágica. Mas ver estrelas com os outros ainda mais é.",
		price: "€5.75",
		wallpaper: "apps/iGuide/img/events_bg/estrelas.jpg",
		image: "apps/iGuide/img/events_img/estrelas.jpg"
	},
	"Convívio da igreja":
	{
		name: "Convívio da igreja",
		time: "Quarta, 7 Jul 2016 às 15:00",
		loc: "Parque Eduardo VII",
		description: "Venha partilhar as suas ideias com outros membros da igreja Católica",
		price: "Grátis",
		wallpaper: "apps/iGuide/img/events_bg/convivio.jpg",
		image: "apps/iGuide/img/events_img/convivio.jpg"
	},
	"Feira do livro":
	{
		name: "Feira do livro",
		time: "Sexta, 9 Jul 2016 às 9:00",
		loc: "Parque Eduardo VII",
		description: "Feira anual com uma grande variedade de livros para descobrir",
		price: "Grátis",
		wallpaper: "apps/iGuide/img/events_bg/livros.jpg",
		image: "apps/iGuide/img/events_img/livros.jpg"
	}
}

const LOCATIONS =
{
	"Lisboa":
	{
		places:
		{
			"Parque Eduardo VII":
			{
				name: "Parque Eduardo VII",
				description: "O Parque Eduardo VII de Inglaterra é o maior parque do centro de Lisboa, sendo comummente conhecido apenas por Parque Eduardo VII.",
				bg: "<img class='place_img_bg' src='apps/iGuide/img/place_img/parqueduardo.png'>",
				type: "park",
				position: {x: 625, y: 320},
				gallery: ["<img class='place_img_bg' id='iguide_gallery_img' src='apps/iGuide/img/place_img/pevii_3.jpg'>",
					 "<img class='place_img_bg' id='iguide_gallery_img' src='apps/iGuide/img/place_img/pevii_2.jpg'>",
					 "<img class='place_img_bg' id='iguide_gallery_img' src='apps/iGuide/img/place_img/pevii_1.jpg'>"],
				events: ["Ver estrelas no parque", "Convívio da igreja", "Feira do livro"],
				wallpaper: "apps/iGuide/img/place_bg/pevii_green.png"
			},

			"Shopping Amoreiras":
			{
				name: "Shopping Amoreiras",
				description: "Inaugurado a 27 de Setembro de 1985 e inserido num complexo de escritórios e habitações, com uma arquitectura ousada para a época.",
				bg: "<img class='place_img_bg' src='apps/iGuide/img/place_img/amoreiras.jpg'>",
				type: "shop",
				position: {x: 550, y: 385},
				gallery: ["<img class='place_img_bg' id='iguide_gallery_img' src='apps/iGuide/img/place_img/sa_3.jpg'>",
					 "<img class='place_img_bg' id='iguide_gallery_img' src='apps/iGuide/img/place_img/sa_2.jpg'>",
					 "<img class='place_img_bg' id='iguide_gallery_img' src='apps/iGuide/img/place_img/sa_1.jpg'>"],
				wallpaper: "apps/iGuide/img/place_bg/asc_blue.png"
			},

			"Instituto Gulbenkian":
			{
				name: "Instituto Gulbenkian",
				description: "O Instituto Gulbenkian de Ci&ecirc;ncia (IGC) MHSE é um centro internacional dedicado à investigação biológica e biomédica e à formação pós-graduada, localizado em Oeiras, Portugal.",
				bg: "<img class='place_img_bg' src='apps/iGuide/img/place_img/instituto.jpg'>",
				type: "museum",
				position: {x: 620, y: 230},
			 gallery: ["<img class='place_img_bg' id='iguide_gallery_img' src='apps/iGuide/img/place_img/ig_3.jpg'>",
					 "<img class='place_img_bg' id='iguide_gallery_img' src='apps/iGuide/img/place_img/ig_2.jpg'>",
					 "<img class='place_img_bg' id='iguide_gallery_img' src='apps/iGuide/img/place_img/ig_1.jpg'>"],
				wallpaper: "apps/iGuide/img/place_bg/ig_orange.png"
			},

			"Padrão dos Descobrimentos":
			{
				name: "Padrão dos Descobrimentos",
				description: "Em posição destacada na margem direita do rio Tejo, o monumento original, em materiais perecíveis, foi erguido em 1940 por ocasião da Exposição do Mundo Portugu&ecirc;s para homenagear as figuras históricas envolvidas nos Descobrimentos portugueses.",
				bg: "<img class='place_img_bg' src='apps/iGuide/img/place_img/padrao.jpg'>",
				type: "monument",
				position: {x: 240, y: 670},
				gallery: ["<img class='place_img_bg' id='iguide_gallery_img' src='apps/iGuide/img/place_img/pd_3.jpg'>",
					 "<img class='place_img_bg' id='iguide_gallery_img' src='apps/iGuide/img/place_img/pd_2.jpg'>",
					 "<img class='place_img_bg' id='iguide_gallery_img' src='apps/iGuide/img/place_img/pd_1.jpg'>"],
				wallpaper: "apps/iGuide/img/place_bg/pdd_red.png"
			},

			"Torre de Belém":
			{
				name: "Torre de Belém",
				description: "Um dos ex libris da cidade, o monumento é um ícone da arquitetura do reinado de D. Manuel I, numa síntese entre a torre de menagem de tradição medieval e o baluarte moderno, onde se dispunham peças de artilharia.",
				bg: "<img class='place_img_bg' src='apps/iGuide/img/place_img/torre.jpg'>",
				type: "monument",
				position: {x: 110, y: 670},
				gallery: ["<img class='place_img_bg' id='iguide_gallery_img' src='apps/iGuide/img/place_img/tb_3.jpg'>",
					 "<img class='place_img_bg' id='iguide_gallery_img' src='apps/iGuide/img/place_img/tb_2.jpg'>",
					 "<img class='place_img_bg' id='iguide_gallery_img' src='apps/iGuide/img/place_img/tb_1.jpg'>"],
				wallpaper: "apps/iGuide/img/place_bg/tdb_red.png"
			}
		},
		temperature: 22
	},

	"Londres":
	{
		places:
		{
			"Big Ben":
			{
				name: "Big Ben",
				description: "Apesar do termo também ser usado para se referir à torre do relógio onde o sino está localizado, a estrutura é oficialmente conhecida como a Elizabeth Tower, rebatizada para comemorar o Jubileu de Diamante da Rainha Isabel II do Reino Unido.",
				bg: "<img class='place_img_bg' src='apps/iGuide/img/place_img/bigben.jpg'>",
				type: "monument",
				position: {x: 500, y: 160},
				gallery: ["<img class='place_img_bg' id='iguide_gallery_img' src='apps/iGuide/img/place_img/bb_3.jpg'>",
					 "<img class='place_img_bg' id='iguide_gallery_img' src='apps/iGuide/img/place_img/bb_2.jpg'>",
					 "<img class='place_img_bg' id='iguide_gallery_img' src='apps/iGuide/img/place_img/bb_1.jpg'>"],
				wallpaper: "apps/iGuide/img/place_bg/bb.jpg"
			},

			"Palácio de Buckingham":
			{
				name: "Palácio de Buckingham",
				description: "O Palácio de Buckingham é a resid&ecirc;ncia oficial e principal local de trabalho do Monarca do Reino Unido em Londres. Localizado na Cidade de Westminster, o palácio é frequentemente o centro de ocasiões de estado e hospitalidade real.",
				type: "monument",
				gallery: ["FNAC", "WORTEN", "BERTRAND"],
				position: {x: 950, y: 330}
			}
		},
		temperature: 12
	},

	"Paris":
	{
		places:
		{
			"Torre Eiffel":
			{
				name: "Torre Eiffel",
				description: "Possui 324 metros de altura e fica cerca de 15 centímetros mais alta no verão, devido à dilatação térmica do ferro. Foi a estrutura mais alta do mundo desde a sua conclusão até 1930, quando perdeu o posto para o Chrysler Building, em Nova Iorque, Estados Unidos.",
				type: "monument",
				bg: "<img class='place_img_bg' src='apps/iGuide/img/place_img/eiffel.jpg'>",
				gallery: ["<img class='place_img_bg' id='iguide_gallery_img' src='apps/iGuide/img/place_img/eif_3.jpg'>",
					 "<img class='place_img_bg' id='iguide_gallery_img' src='apps/iGuide/img/place_img/eif_2.jpg'>",
					 "<img class='place_img_bg' id='iguide_gallery_img' src='apps/iGuide/img/place_img/eif_1.jpg'>"],
				position: {x: 60, y: 500},
				wallpaper: "apps/iGuide/img/place_bg/eif_red.png"
			},

			"Arco do Triunfo":
			{
				name: "Arco do Triunfo",
				description: "O Arco do Triunfo (franc&ecirc;s: Arc de Triomphe) é um monumento localizado na cidade de Paris, construído em comemoração às vitórias militares do Napoleão Bonaparte, o qual ordenou a sua construção em 1806. Inaugurado em 1836, a monumental obra detém, gravados, os nomes de 128 batalhas e 558 generais.",
				type: "monument",
				bg: "<img class='place_img_bg' src='apps/iGuide/img/place_img/triunfo.jpg'>",
				gallery: ["<img class='place_img_bg' id='iguide_gallery_img' src='apps/iGuide/img/place_img/arc_3.jpg'>",
					 "<img class='place_img_bg' id='iguide_gallery_img' src='apps/iGuide/img/place_img/arc_2.jpg'>",
					 "<img class='place_img_bg' id='iguide_gallery_img' src='apps/iGuide/img/place_img/arc_1.jpg'>"],
				position: {x: 150, y: 260},
				wallpaper: "apps/iGuide/img/place_bg/arc_red.png"
			},

			"Louvre":
			{
				name: "Louvre",
				description: "O Museu do Louvre (em franc&ecirc;s: Musée du Louvre), é o maior museu de arte do mundo e um monumento histórico em Paris, França. Um marco central da cidade, está localizado na margem direita do rio Sena, no 1.º arrondissement. Aproximadamente 38.000 objetos, da pré-história ao século XXI, são exibidos em uma área de 72.735 metros quadrados.",
				type: "museum",
				bg: "<img class='place_img_bg' src='apps/iGuide/img/place_img/louvre.jpg'>",
				gallery: ["<img class='place_img_bg' id='iguide_gallery_img' src='apps/iGuide/img/place_img/lv_3.jpeg'>",
					 "<img class='place_img_bg' id='iguide_gallery_img' src='apps/iGuide/img/place_img/lv_2.jpg'>",
					 "<img class='place_img_bg' id='iguide_gallery_img' src='apps/iGuide/img/place_img/lv_1.jpg'>"],
				position: {x: 350, y: 460},
				wallpaper: "apps/iGuide/img/place_bg/lv_orange.png"
			}
		},
		temperature: 15
	}
}

const PLACE_TYPE_DATA =
{
	"monument":
	{
		name: "Monumento",
		img: "main/main_menu/apps/location/img/place_icons/monument.png",
		img_white: "main/main_menu/apps/location/img/place_icons/monument_white.png"
	},

	"museum":
	{
		name: "Museu",
		img: "main/main_menu/apps/location/img/place_icons/museum.png",
		img_white: "main/main_menu/apps/location/img/place_icons/museum_white.png"
	},

	"shop":
	{
		name: "Loja",
		img: "main/main_menu/apps/location/img/place_icons/shop.png",
		img_white: "main/main_menu/apps/location/img/place_icons/shop_white.png"
	},

	"park":
	{
		name: "Jardim",
		img: "main/main_menu/apps/location/img/place_icons/park.png",
		img_white: "main/main_menu/apps/location/img/place_icons/park_white.png"
	}
}

const IGUIDE_INFO_TABS =
{
	"iGuide_info_description":
	{
		id: "iGuide_info_description",
		name: "Descrição"
	},

	"iGuide_info_events":
	{
		id: "iGuide_info_events",
		name: "Eventos"
	},

	"iGuide_info_gallery":
	{
		id: "iGuide_info_gallery",
		name: "Galeria"
	}
}


const PAYMENT =
{
	"Paypal":
	{
		title: "Paypal",
		img: "img/paypal.png"
	},

	"CreditCard":
	{
		title: "Cartão de Crédito",
		img_visa: "img/visa.png",
		img_mc: "img/mastercard.png"
	}
}

const MAP_PERSON_ICONS =
[
	"main/main_menu/apps/location/img/position_purple.png",
	"main/main_menu/apps/location/img/position_brown.png",
	"main/main_menu/apps/location/img/position_red.png",
	"main/main_menu/apps/location/img/position_blue.png",
	"main/main_menu/apps/location/img/position_orange.png",
]

const MAP_POINTS =
[
	{x:200, y:25, adj:[0]},
	{x:175, y:70, adj:[0, 1]},
	{x:167, y:85, adj:[1, 2]},
	{x:120, y:125, adj:[3]},
	{x:192, y:143, adj:[2, 3, 4]},
	{x:20, y:170, adj:[5]},
	{x:207, y:170, adj:[4, 6]},
	{x:55, y:180, adj:[5, 7]},
	{x:215, y:193, adj:[6, 8, 9]},
	{x:130, y:200, adj:[7, 8]},
	{x:215, y:210, adj:[9, 10]},
	{x:170, y:310, adj:[10, 11, 12]},
	{x:140, y:360, adj:[11, 13]},
	{x:180, y:360, adj:[12, 14]},
	{x:163, y:383, adj:[13, 14]}
]

const MAP_EDGES =
[
	{src: 0, dst: 1, type:"walk"},
	{src: 1, dst: 2, type:"walk"},
	{src: 2, dst: 4, type:"walk"},
	{src: 3, dst: 4, type:"walk"},
	{src: 4, dst: 6, type:"walk"},
	{src: 5, dst: 7, type:"walk"},
	{src: 6, dst: 8, type:"walk"},
	{src: 7, dst: 9, type:"walk"},
	{src: 8, dst: 9, type:"walk"},
	{src: 8, dst: 10, type:"walk"},
	{src: 10, dst: 11, type:"walk"},
	{src: 11, dst: 12, type:"walk"},
	{src: 11, dst: 13, type:"walk"},
	{src: 12, dst: 14, type:"walk"},
	{src: 13, dst: 14, type:"walk"}
]
