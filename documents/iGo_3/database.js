const SCREENS =
{
	"off":                          {id: "off"},

	"main_menu":                    {id: "main_menu"},

	"apps":                         {id: "apps"},

	"location":                     {id: "location"},

	"options":                      {id: "options"},

	"iGuide_main":                  {id: "iGuide_main"},

	"iWay_main":                    {id: "iWay_main"},

	"iWay_path_info_main":          {id: "iWay_path_info_main"},

	"iWay_path_steps":               {id: "iWay_path_steps"},

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
			location_name: "Lisboa",
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

const MAP_PLACES =
{
	"DAMAIA": 3,
	"BURACA": 6,
	"ALGES": 20,
	"TORRE DE BELEM": 21,
	"BELEM": 23,
	"PADRAO DOS DESCOBRIMENTOS": 24,
	"ALCANTARA MAR": 26,
	"ALCANTARA TERRA": 27,
	"SHOPPING AMOREIRAS": 31,
	"CAMPOLIDE": 34,
	"PARQUE EDUARDO VII": 38,
	"INSTITUTO GULBENKIAN": 40,
	"SANTOS": 50,
	"ROSSIO": 56,
	"SANTA APOLONIA": 58,
	"SALDANHA": 61,
	"ENTRECAMPOS": 64,
	"ROMA AREEIRO": 65,
	"CHELAS": 69,
	"SETE RIOS": 71,
	"BENFICA": 78,
	"AMADORA": 80,
	"SANTA CRUZ DAMAIA": 81,
	"REBOLEIRA": 82
};

const MAP_POINTS =
[
	{x:200, y:30, adj:[0], accessible: true}, // 0
	{x:175, y:75, adj:[1, 88], accessible: true}, // 1
	{x:172, y:90, adj:[1, 2], accessible: true}, // 2
	{x:170, y:132, adj:[3, 90, 91], accessible: true}, // 3 Damaia (estação)
	{x:197, y:148, adj:[2, 3, 4], accessible: true}, // 4
	{x:25, y:175, adj:[5], accessible: true}, // 5
	{x:212, y:175, adj:[4, 6], accessible: true}, // 6 Buraca
	{x:60, y:185, adj:[5, 7], accessible: true}, // 7
	{x:220, y:198, adj:[6, 8, 9, 87], accessible: true}, // 8
	{x:135, y:205, adj:[7, 8], accessible: true}, // 9
	{x:220, y:215, adj:[9, 10], accessible: true}, // 10
	{x:175, y:315, adj:[10, 11, 12], accessible: true}, // 11
	{x:145, y:360, adj:[11, 13], accessible: true}, // 12
	{x:185, y:365, adj:[12, 14], accessible: true}, // 13
	{x:168, y:388, adj:[13, 14, 15], accessible: true}, // 14
	{x:183, y:418, adj:[15, 16, 39], accessible: true}, // 15
	{x:183, y:428, adj:[16, 17, 44], accessible: true}, // 16
	{x:145, y:490, adj:[17, 18], accessible: true}, // 17
	{x:115, y:597, adj:[18, 19], accessible: true}, // 18
	{x:38, y:647, adj:[19, 20, 21], accessible: true}, // 19
	{x:18, y:647, adj:[20, 22], accessible: true}, // 20 Algés (estação)
	{x:115, y:700, adj:[21, 24], accessible: true}, // 21 Torre de Belém
	{x:135, y:695, adj:[22, 23], accessible: false}, // 22
	{x:277, y:671, adj:[23, 25, 26], accessible: true}, // 23 Belém (estação)
	{x:215, y:680, adj:[24, 25], accessible: true}, // 24 Padrão dos Descobrimentos
	{x:380, y:650, adj:[26, 27], accessible: false}, // 25
	{x:471, y:603, adj:[27, 28, 52], accessible: true}, // 26 Alcântara Mar (estação)
	{x:479, y:548, adj:[29, 33, 55], accessible: true}, // 27 Alcântara Terra (estação)
	{x:495, y:515, adj:[29, 30], accessible: true}, // 28
	{x:519, y:491, adj:[30, 31], accessible: true}, // 29
	{x:510, y:420, adj:[31, 32], accessible: true}, // 30
	{x:555, y:405, adj:[32, 36], accessible: true}, // 31 Shopping Amoreiras
	{x:459, y:491, adj:[33, 34], accessible: false}, // 32
	{x:469, y:381, adj:[34, 35], accessible: false}, // 33
	{x:523, y:285, adj:[35, 43, 80, 81], accessible: true}, // 34 Campolide (estação)
	{x:585, y:366, adj:[36, 37, 40], accessible: true}, // 35
	{x:495, y:395, adj:[37, 38], accessible: true}, // 36
	{x:350, y:355, adj:[38, 51], accessible: true}, // 37
	{x:630, y:355, adj:[40, 41], accessible: true}, // 38 Parque Eduardo VII
	{x:585, y:328, adj:[41, 42, 43], accessible: true}, // 39
	{x:637, y:263, adj:[42], accessible: true}, // 40 Instituto Gulbenkian
	{x:200, y:457, adj:[44, 45], accessible: true}, // 41
	{x:235, y:492, adj:[45, 46], accessible: true}, // 42
	{x:251, y:485, adj:[46, 47], accessible: true}, // 43
	{x:248, y:473, adj:[47, 48], accessible: true}, // 44
	{x:287, y:387, adj:[48, 49], accessible: true}, // 45
	{x:307, y:380, adj:[49, 50], accessible: true}, // 46
	{x:307, y:365, adj:[39, 51], accessible: true}, // 47
	{x:495, y:590, adj:[52, 53], accessible: false}, // 48
	{x:567, y:588, adj:[53, 54], accessible: false}, // 49
	{x:624, y:560, adj:[54, 56], accessible: true}, // 50 Santos (estação)
	{x:462, y:592, adj:[28, 55], accessible: true}, // 51
	{x:714, y:563, adj:[56, 57], accessible: true}, // 52 Cais do Sodré (estação)
	{x:736, y:553, adj:[57, 58], accessible: true}, // 53
	{x:793, y:534, adj:[58, 59], accessible: true}, // 54
	{x:779, y:480, adj:[59, 60], accessible: true}, // 55
	{x:781, y:465, adj:[60, 61, 63], accessible: true}, // 56 Rossio (estação)
	{x:830, y:534, adj:[61, 62], accessible: false}, // 57
	{x:894, y:478, adj:[62], accessible: true}, // 58 Santa Apolónia (estação)
	{x:765, y:485, adj:[63, 64], accessible: false}, // 59
	{x:666, y:359, adj:[64, 65], accessible: false}, // 60
	{x:715, y:270, adj:[65, 66, 68], accessible: true}, // 61 Saldanha (estação)
	{x:663, y:359, adj:[66, 67], accessible: true}, // 62
	{x:691, y:167, adj:[68, 69], accessible: false}, // 63
	{x:680, y:155, adj:[69, 70, 75], accessible: true}, // 64 Entrecampos (estação)
	{x:785, y:142, adj:[70, 71], accessible: true}, // 65 Roma Areeiro (estação)
	{x:822, y:132, adj:[71, 72], accessible: true}, // 66
	{x:824, y:109, adj:[72, 73], accessible: true}, // 67
	{x:868, y:129, adj:[73, 74], accessible: true}, // 68
	{x:935, y:108, adj:[74], accessible: true}, // 69 Chelas
	{x:620, y:193, adj:[75, 76], accessible: false}, // 70
	{x:530, y:200, adj:[76, 77, 82, 83], accessible: true}, // 71 Sete Rios (estação)
	{x:518, y:235, adj:[77, 78], accessible: true}, // 72
	{x:518, y:235, adj:[78, 79], accessible: true}, // 73
	{x:498, y:238, adj:[79, 80], accessible: true}, // 74
	{x:505, y:232, adj:[81, 82, 84], accessible: false}, // 75
	{x:487, y:215, adj:[83, 84, 85], accessible: false}, // 76
	{x:372, y:155, adj:[85, 86], accessible: false}, // 77
	{x:256, y:159, adj:[86, 87, 90], accessible: true}, // 78 Benfica (estação)
	{x:180, y:62, adj:[0, 88, 89], accessible: true}, // 79
	{x:38, y:13, adj:[89, 94], accessible: true}, // 80 Amadora
	{x:152, y:135, adj:[91, 92], acessible: true}, // 81 Santa Cruz Damaia (estação)
	{x:66, y:86, adj:[92, 93], acessible: true}, // 82 Reboleira (estação)
	{x:40, y:50, adj:[93, 94], acessible: true}, // 83
]

const STATIONS =
{
	3: "Damaia",
	20: "Algés",
	23: "Belém",
	26: "Alcântara Mar",
	27: "Alcântara Terra",
	34: "Campolide",
	50: "Santos",
	52: "Cais do Sodré",
	56: "Rossio",
	58: "Santa Apolónia",
	61: "Saldanha",
	64: "Entrecampos",
	65: "Roma Areeiro",
	71: "Sete Rios",
	78: "Benfica",
	81: "Santa Cruz Damaia",
	82: "Reboleira"
}

const MAP_EDGES =
[
	{src: 0, dst: 79, type:"walk"},     // 0
	{src: 1, dst: 2, type:"walk"},      // 1
	{src: 2, dst: 4, type:"walk"},      // 2
	{src: 3, dst: 4, type:"walk"},      // 3
	{src: 4, dst: 6, type:"walk"},      // 4
	{src: 5, dst: 7, type:"walk"},      // 5
	{src: 6, dst: 8, type:"walk"},      // 6
	{src: 7, dst: 9, type:"walk"},      // 7
	{src: 8, dst: 9, type:"walk"},      // 8
	{src: 8, dst: 10, type:"walk"},     // 9
	{src: 10, dst: 11, type:"walk"},    // 10
	{src: 11, dst: 12, type:"walk"},    // 11
	{src: 11, dst: 13, type:"walk"},    // 12
	{src: 12, dst: 14, type:"walk"},    // 13
	{src: 13, dst: 14, type:"walk"},    // 14
	{src: 14, dst: 15, type:"walk"},    // 15
	{src: 15, dst: 16, type:"walk"},    // 16
	{src: 16, dst: 17, type:"walk"},    // 17
	{src: 17, dst: 18, type:"walk"},    // 18
	{src: 18, dst: 19, type:"walk"},    // 19
	{src: 19, dst: 20, type:"walk"},    // 20
	{src: 19, dst: 21, type:"walk"},    // 21
	{src: 20, dst: 22, type:"train"},   // 22
	{src: 22, dst: 23, type:"train"},   // 23
	{src: 21, dst: 24, type:"walk"},    // 24
	{src: 23, dst: 24, type:"walk"},    // 25
	{src: 23, dst: 25, type:"train"},   // 26
	{src: 25, dst: 26, type:"train"},   // 27
	{src: 26, dst: 51, type:"walk"},    // 28
	{src: 27, dst: 28, type:"walk"},    // 29
	{src: 28, dst: 29, type:"walk"},    // 30
	{src: 29, dst: 30, type:"walk"},    // 31
	{src: 30, dst: 31, type:"walk"},    // 32
	{src: 27, dst: 32, type:"train"},   // 33
	{src: 32, dst: 33, type:"train"},   // 34
	{src: 33, dst: 34, type:"train"},   // 35
	{src: 31, dst: 35, type:"walk"},    // 36
	{src: 35, dst: 36, type:"walk"},    // 37
	{src: 36, dst: 37, type:"walk"},    // 38
	{src: 15, dst: 47, type:"walk"},    // 39
	{src: 35, dst: 38, type:"walk"},    // 40
	{src: 38, dst: 39, type:"walk"},    // 41
	{src: 39, dst: 40, type:"walk"},    // 42
	{src: 34, dst: 39, type:"walk"},    // 43
	{src: 16, dst: 41, type:"walk"},    // 44
	{src: 41, dst: 42, type:"walk"},    // 45
	{src: 42, dst: 43, type:"walk"},    // 46
	{src: 43, dst: 44, type:"walk"},    // 47
	{src: 44, dst: 45, type:"walk"},    // 48
	{src: 45, dst: 46, type:"walk"},    // 49
	{src: 46, dst: 47, type:"walk"},    // 50
	{src: 37, dst: 47, type:"walk"},    // 51
	{src: 26, dst: 48, type:"train"},   // 52
	{src: 48, dst: 49, type:"train"},   // 53
	{src: 49, dst: 50, type:"train"},   // 54
	{src: 51, dst: 27, type:"walk"},    // 55
	{src: 50, dst: 52, type:"train"},   // 56
	{src: 52, dst: 53, type:"walk"},    // 57
	{src: 53, dst: 54, type:"walk"},    // 58
	{src: 54, dst: 55, type:"walk"},    // 59
	{src: 55, dst: 56, type:"walk"},    // 60
	{src: 56, dst: 57, type:"train"},   // 61
	{src: 57, dst: 58, type:"train"},   // 62
	{src: 56, dst: 59, type:"train"},   // 63
	{src: 59, dst: 60, type:"train"},   // 64
	{src: 60, dst: 61, type:"train"},   // 65
	{src: 61, dst: 62, type:"walk"},    // 66
	{src: 38, dst: 62, type:"walk"},    // 67
	{src: 61, dst: 63, type:"train"},   // 68
	{src: 63, dst: 64, type:"train"},   // 69
	{src: 64, dst: 65, type:"train"},   // 70
	{src: 65, dst: 66, type:"walk"},    // 71
	{src: 66, dst: 67, type:"walk"},    // 72
	{src: 67, dst: 68, type:"walk"},    // 73
	{src: 68, dst: 69, type:"walk"},    // 74
	{src: 64, dst: 70, type:"train"},   // 75
	{src: 70, dst: 71, type:"train"},   // 76
	{src: 71, dst: 72, type:"walk"},    // 77
	{src: 72, dst: 73, type:"walk"},    // 78
	{src: 73, dst: 74, type:"walk"},    // 79
	{src: 34, dst: 74, type:"walk"},    // 80
	{src: 34, dst: 75, type:"train"},   // 81
	{src: 71, dst: 75, type:"train"},   // 82
	{src: 71, dst: 76, type:"train"},   // 83
	{src: 75, dst: 76, type:"train"},   // 84
	{src: 76, dst: 77, type:"train"},   // 85
	{src: 77, dst: 78, type:"train"},   // 86
	{src: 8, dst: 78, type:"walk"},     // 87
	{src: 1, dst: 79, type:"walk"},     // 88
	{src: 79, dst: 80, type:"walk"},    // 89
	{src: 3, dst: 78, type:"train"},    // 90
	{src: 3, dst: 81, type:"walk"},     // 91
	{src: 81, dst: 82, type:"train"},   // 92
	{src: 82, dst: 83, type:"walk"},    // 93
	{src: 80, dst: 83, type:"walk"},    // 94
];
