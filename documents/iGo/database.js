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

const DEFAULT =
{
	"auto_save": true,
	"iGroup_groups": [],
	"people":
	{
		"Ambr&oacute;sio Santos":
		{
			name: "Ambr&oacute;sio Santos",
			id: "Ambr&oacute;sio_Santos",
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

		"Pedro Leit&atilde;o":
		{
			name: "Pedro Leit&atilde;o",
			id: "Pedro_Leit&atilde;o",
			location_name: "Paris",
			position: {x: 500, y: 500},
			image : "apps/iGroup/img/PedroLeit&atilde;o.jpg"
		},

		"Tom&aacute;s Gomes":
		{
			name: "Tom&aacute;s Gomes",
			id: "Tom&aacute;s_Gomes",
			location_name: "Londres",
			position: {x: 100, y: 400}
		},

		"Andr&eacute; Silva":
		{
			name: "Andr&eacute; Silva",
			id: "Andr&eacute;_Silva",
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

		"Jo&atilde;o Lopes":
		{
			name: "Jo&atilde;o Lopes",
			id: "Jo&atilde;o_Lopes",
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
	"current_person_name": "Ambr&oacute;sio Santos"
}

const EVENTS =
{
	"Ver estrelas no parque":
	{
		name: "Ver estrelas no parque",
		time: "Ter&ccedil;a, 6 Jul 2016 &agrave;s 19:00",
		loc: "Parque Eduardo VII",
		description: "Ver estrelas no parque &eacute; uma expriencia m&aacute;gica. Mas ver estrelas com os outros ainda mais &eacute;.",
		price: "€5.75",
		wallpaper: "apps/iGuide/img/events_bg/estrelas.jpg",
		image: "apps/iGuide/img/events_img/estrelas.jpg"
	},
	"Conv&iacute;vio da igreja":
	{
		name: "Conv&iacute;vio da igreja",
		time: "Quarta, 7 Jul 2016 &agrave;s 15:00",
		loc: "Parque Eduardo VII",
		description: "Venha partilhar as suas ideias com outros membros da igreja Cat&oacute;lica",
		price: "Gr&aacute;tis",
		wallpaper: "apps/iGuide/img/events_bg/conv&iacute;vio.jpg",
		image: "apps/iGuide/img/events_img/conv&iacute;vio.jpg"
	},
	"Feira do livro":
	{
		name: "Feira do livro",
		time: "Sexta, 9 Jul 2016 &agrave;s 9:00",
		loc: "Parque Eduardo VII",
		description: "Feira anual com uma grande variedade de livros para descobrir",
		price: "Gr&aacute;tis",
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
				description: "O Parque Eduardo VII de Inglaterra &eacute; o maior parque do centro de Lisboa, sendo comummente conhecido apenas por Parque Eduardo VII.",
				bg: "<img class='place_img_bg' src='apps/iGuide/img/place_img/parqueduardo.png'>",
				type: "park",
				position: {x: 600, y: 420},
				gallery: ["<img class='place_img_bg' id='iguide_gallery_img' src='apps/iGuide/img/place_img/pevii_3.jpg'>",
					 "<img class='place_img_bg' id='iguide_gallery_img' src='apps/iGuide/img/place_img/pevii_2.jpg'>",
					 "<img class='place_img_bg' id='iguide_gallery_img' src='apps/iGuide/img/place_img/pevii_1.jpg'>"],
				events: ["Ver estrelas no parque", "Conv&iacute;vio da igreja", "Feira do livro"],
				wallpaper: "apps/iGuide/img/place_bg/pevii_green.png"
			},

			"Shopping Amoreiras":
			{
				name: "Shopping Amoreiras",
				description: "Inaugurado a 27 de Setembro de 1985 e inserido num complexo de escrit&oacute;rios e habita&ccedil;&otilde;es, com uma arquitectura ousada para a &eacute;poca.",
				bg: "<img class='place_img_bg' src='apps/iGuide/img/place_img/amoreiras.jpg'>",
				type: "shop",
				position: {x: 150, y: 160},
				gallery: ["<img class='place_img_bg' id='iguide_gallery_img' src='apps/iGuide/img/place_img/sa_3.jpg'>",
					 "<img class='place_img_bg' id='iguide_gallery_img' src='apps/iGuide/img/place_img/sa_2.jpg'>",
					 "<img class='place_img_bg' id='iguide_gallery_img' src='apps/iGuide/img/place_img/sa_1.jpg'>"],
				wallpaper: "apps/iGuide/img/place_bg/asc_blue.png"
			},

			"Instituto Gulbenkian":
			{
				name: "Instituto Gulbenkian",
				description: "O Instituto Gulbenkian de Ci&ecirc;ncia (IGC) MHSE &eacute; um centro internacional dedicado &agrave; investiga&ccedil;&atilde;o biol&oacute;gica e biom&eacute;dica e &agrave; forma&ccedil;&atilde;o p&oacute;s-graduada, localizado em Oeiras, Portugal.",
				bg: "<img class='place_img_bg' src='apps/iGuide/img/place_img/instituto.jpg'>",
				type: "museum",
				position: {x: 40, y: 400},
			 gallery: ["<img class='place_img_bg' id='iguide_gallery_img' src='apps/iGuide/img/place_img/ig_3.jpg'>",
					 "<img class='place_img_bg' id='iguide_gallery_img' src='apps/iGuide/img/place_img/ig_2.jpg'>",
					 "<img class='place_img_bg' id='iguide_gallery_img' src='apps/iGuide/img/place_img/ig_1.jpg'>"],
				wallpaper: "apps/iGuide/img/place_bg/ig_orange.png"
			},

			"Padr&atilde;o dos Descobrimentos":
			{
				name: "Padr&atilde;o dos Descobrimentos",
				description: "Em posi&ccedil;&atilde;o destacada na margem direita do rio Tejo, o monumento original, em materiais perec&iacute;veis, foi erguido em 1940 por ocasi&atilde;o da Exposi&ccedil;&atilde;o do Mundo Portugu&ecirc;s para homenagear as figuras hist&oacute;ricas envolvidas nos Descobrimentos portugueses.",
				bg: "<img class='place_img_bg' src='apps/iGuide/img/place_img/padrao.jpg'>",
				type: "monument",
				position: {x: 50, y: 60},
				gallery: ["<img class='place_img_bg' id='iguide_gallery_img' src='apps/iGuide/img/place_img/pd_3.jpg'>",
					 "<img class='place_img_bg' id='iguide_gallery_img' src='apps/iGuide/img/place_img/pd_2.jpg'>",
					 "<img class='place_img_bg' id='iguide_gallery_img' src='apps/iGuide/img/place_img/pd_1.jpg'>"],
				wallpaper: "apps/iGuide/img/place_bg/pdd_red.png"
			},

			"Torre de Bel&eacute;m":
			{
				name: "Torre de Bel&eacute;m",
				description: "Um dos ex libris da cidade, o monumento &eacute; um &iacute;cone da arquitetura do reinado de D. Manuel I, numa s&iacute;ntese entre a torre de menagem de tradi&ccedil;&atilde;o medieval e o baluarte moderno, onde se dispunham pe&ccedil;as de artilharia.",
				bg: "<img class='place_img_bg' src='apps/iGuide/img/place_img/torre.jpg'>",
				type: "monument",
				position: {x: 590, y: 100},
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
				description: "Apesar do termo tamb&eacute;m ser usado para se referir &agrave; torre do rel&oacute;gio onde o sino est&aacute; localizado, a estrutura &eacute; oficialmente conhecida como a Elizabeth Tower, rebatizada para comemorar o Jubileu de Diamante da Rainha Isabel II do Reino Unido.",
				bg: "<img class='place_img_bg' src='apps/iGuide/img/place_img/bigben.jpg'>",
				type: "monument",
				position: {x: 500, y: 160},
				gallery: ["<img class='place_img_bg' id='iguide_gallery_img' src='apps/iGuide/img/place_img/bb_3.jpg'>",
					 "<img class='place_img_bg' id='iguide_gallery_img' src='apps/iGuide/img/place_img/bb_2.jpg'>",
					 "<img class='place_img_bg' id='iguide_gallery_img' src='apps/iGuide/img/place_img/bb_1.jpg'>"],
				wallpaper: "apps/iGuide/img/place_bg/bb.jpg"
			},

			"Pal&aacute;cio de Buckingham":
			{
				name: "Pal&aacute;cio de Buckingham",
				description: "O Pal&aacute;cio de Buckingham &eacute; a resid&ecirc;ncia oficial e principal local de trabalho do Monarca do Reino Unido em Londres. Localizado na Cidade de Westminster, o pal&aacute;cio &eacute; frequentemente o centro de ocasi&otilde;es de estado e hospitalidade real.",
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
				description: "Possui 324 metros de altura e fica cerca de 15 cent&iacute;metros mais alta no ver&atilde;o, devido &agrave; dilata&ccedil;&atilde;o t&eacute;rmica do ferro. Foi a estrutura mais alta do mundo desde a sua conclus&atilde;o at&eacute; 1930, quando perdeu o posto para o Chrysler Building, em Nova Iorque, Estados Unidos.",
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
				description: "O Arco do Triunfo (franc&ecirc;s: Arc de Triomphe) &eacute; um monumento localizado na cidade de Paris, constru&iacute;do em comemora&ccedil;&atilde;o &agrave;s vit&oacute;rias militares do Napole&atilde;o Bonaparte, o qual ordenou a sua constru&ccedil;&atilde;o em 1806. Inaugurado em 1836, a monumental obra det&eacute;m, gravados, os nomes de 128 batalhas e 558 generais.",
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
				description: "O Museu do Louvre (em franc&ecirc;s: Mus&eacute;e du Louvre), &eacute; o maior museu de arte do mundo e um monumento hist&oacute;rico em Paris, Fran&ccedil;a. Um marco central da cidade, est&aacute; localizado na margem direita do rio Sena, no 1.º arrondissement. Aproximadamente 38.000 objetos, da pr&eacute;-hist&oacute;ria ao s&eacute;culo XXI, s&atilde;o exibidos em uma &aacute;rea de 72.735 metros quadrados.",
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
		name: "Descri&ccedil;&atilde;o"
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
		title: "Cart&atilde;o de Cr&eacute;dito",
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
