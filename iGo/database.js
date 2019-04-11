const SCREENS =
{
  "error_screen": {id: "error_screen"},

  "off":          {id: "off"},

  "main_menu":    {id: "main_menu",   clock_blink: false,   timeout: null},

  "apps":         {id: "apps",        parent_id: "main_menu"},

  "location":     {id: "location",    parent_id: "main_menu"},

  "options":      {id: "options",     parent_id: "main_menu"},

  "iGuide_main":  {id: "iGuide_main", parent_id: "apps"},

  "iWay_main":    {id: "iWay_main",   parent_id: "apps"},

  "iGroup_main":  {id: "iGroup_main", parent_id: "apps"},

  "iGuide_info":  {id: "iGuide_info", parent_id: "iGuide_main", current_tab: null, in_event: false},

  "payment_methods": {id: "payment_methods", parent_id: "iGuide_info"},

  "add_payment": {id: "add_payment", parent_id: "payment_methods"},

  "payment_complete": {id: "payment_complete"}
}

const DEFAULT_LOCATION = "Lisboa";

const EVENTS =
{
  "Ver estrelas no parque":
  {
    name: "Ver estrelas no parque",
    description: "Ver estrelas no parque é uma expriencia mágica. Mas ver estrelas com os outros ainda mais é.",
    price: 5
  },
  "Convívio da igreja":
  {
    name: "Convívio da igreja",
    description: "Venha partilhar as suas ideias com outros membros da igreja Católica",
    price: 0
  },
  "Feira do livro":
  {
    name: "Feira do livro",
    description: "Feira anual com uma grande variedade de livros para descobrir",
    price: 0
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
        type: "park",
        position: {x: 50, y: 60},
        events: ["Ver estrelas no parque", "Convívio da igreja", "Feira do livro"],
		place_wp: "img/iguide_places_img/pevii.png",
		color_wp: "#33cc00",
		rating: 4
      },

      "Shopping Amoreiras":
      {
        name: "Shopping Amoreiras",
        description: "Inaugurado a 27 de Setembro de 1985 e inserido num complexo de escritórios e habitações, com uma arquitectura ousada para a época.",
        type: "shop",
        position: {x: 150, y: 160},
        shops: ["FNAC", "WORTEN", "BERTRAND"],
		place_wp: "img/iguide_places_img/asc.png",
		color_wp: "#0073e6",
		rating: 3
      },

    	"Instituto Gulbenkian":
      {
        name: "Instituto Gulbenkian",
        description: "O Instituto Gulbenkian de Ciência (IGC) MHSE é um centro internacional dedicado à investigação biológica e biomédica e à formação pós-graduada, localizado em Oeiras, Portugal.",
        type: "museum",
        position: {x: 40, y: 400},
		place_wp: "img/iguide_places_img/ig.png",
		color_wp: "#ff6600",
		rating: 3
      },

    	"Padrão dos Descobrimentos":
      {
        name: "Padrão dos Descobrimentos",
        description: "Em posição destacada na margem direita do rio Tejo, o monumento original, em materiais perecíveis, foi erguido em 1940 por ocasião da Exposição do Mundo Português para homenagear as figuras históricas envolvidas nos Descobrimentos portugueses.",
        type: "monument",
        position: {x: 600, y: 420},
		place_wp: "img/iguide_places_img/pdd.png",
		color_wp: "#ff3333",
		rating: 5		
      },

    	"Torre de Belém":
      {
        name: "Torre de Belém",
        description: "Um dos ex libris da cidade, o monumento é um ícone da arquitetura do reinado de D. Manuel I, numa síntese entre a torre de menagem de tradição medieval e o baluarte moderno, onde se dispunham peças de artilharia.",
        type: "monument",
        position: {x: 590, y: 100},
		place_wp: "img/iguide_places_img/tdb.png",
		color_wp: "#ff3333",
		rating: 5
      },

      "Local com um nome muito comprido, que ocupa várias linhas no ecrã do iGo":
      {
        name: "Local com um nome muito comprido, que ocupa várias linhas no ecrã do iGo",
        description: "Local com uma descrição muito comprida, que ocupa várias linhas no ecrã do iGo",
        type: "museum",
        position: {x: 870, y: 700},
		color_wp: "#FFB6C1",
		rating: 1
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
        type: "monument",
        position: {x: 500, y: 160}
      },

      "Palácio de Buckingham":
      {
        name: "Palácio de Buckingham",
        description: "O Palácio de Buckingham é a residência oficial e principal local de trabalho do Monarca do Reino Unido em Londres. Localizado na Cidade de Westminster, o palácio é frequentemente o centro de ocasiões de estado e hospitalidade real.",
        type: "monument",
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
        position: {x: 60, y: 500}
      },

      "Arco do Triunfo":
      {
        name: "Arco do Triunfo",
        description: "O Arco do Triunfo (francês: Arc de Triomphe) é um monumento localizado na cidade de Paris, construído em comemoração às vitórias militares do Napoleão Bonaparte, o qual ordenou a sua construção em 1806. Inaugurado em 1836, a monumental obra detém, gravados, os nomes de 128 batalhas e 558 generais.",
        type: "monument",
        position: {x: 150, y: 260}
      },

      "Louvre":
      {
        name: "Louvre",
        description: "O Museu do Louvre (em francês: Musée du Louvre), é o maior museu de arte do mundo e um monumento histórico em Paris, França. Um marco central da cidade, está localizado na margem direita do rio Sena, no 1.º arrondissement. Aproximadamente 38.000 objetos, da pré-história ao século XXI, são exibidos em uma área de 72.735 metros quadrados.",
        type: "museum",
        position: {x: 350, y: 460}
      }
    },
    temperature: 15
  }
}

const PLACE_TYPE_DATA =
{
  "monument":
  {
    img: "img/monument.svg",
    tabs: ["iGuide_info_description"]
  },

  "museum":
  {
    img: "img/museum.png",
    tabs: ["iGuide_info_description"]
  },

  "shop":
  {
    img: "img/shop.png",
    tabs: ["iGuide_info_description", "iGuide_info_events", "iGuide_info_shops"]
  },

  "park":
  {
    img: "img/park.png",
    tabs: ["iGuide_info_description", "iGuide_info_events"]
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

  "iGuide_info_shops":
  {
    id: "iGuide_info_shops",
    name: "Lojas"
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
