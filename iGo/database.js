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

  "iGuide_info":  {id: "iGuide_info", parent_id: "iGuide_main"},

  "iGuide_events": {id: "iGuide_events", parent_id: "iGuide_main"},

  "iGuide_shops": {id: "iGuide_shops", parent_id: "iGuide_main"},

  "iGuide_event_info": {id: "iGuide_event_info", parent_id: "iGuide_events"},

  "payment_methods": {id: "payment_methods", parent_id: "iGuide_event_info"},

  "add_payment": {id: "add_payment", parent_id: "payment_methods"},

  "payment_complete": { id: "payment_complete" }
}

const DEFAULT_LOCATION = "Lisboa";

const EVENTS= {
  "Ver estrelas no Parque":{
    name: "Ver estrelas no Parque",
    info: "Ver estrelas no park é uma expriencia magica. Mas ver estrelas com os outros ainda mais é.",
    price: "5€"
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
        info: "O Parque Eduardo VII de Inglaterra é o maior parque do centro de Lisboa, sendo comummente conhecido apenas por Parque Eduardo VII.",
        type: "park",
        position: {x: 50, y: 60},
        events: ["Ver estrelas no Parque", "Convivio da Igreja", "Feira do livro."]

      },

      "Shopping Amoreiras":
      {
        name: "Shopping Amoreiras",
        info: "Inaugurado a 27 de Setembro de 1985 e inserido num complexo de escritórios e habitações, com uma arquitectura ousada para a época.",
        type: "shop",
        position: {x: 150, y: 160},
        events: ["EMPTY"],
        shops: ["FNAC", "WORTEN", "BERTRAND"]
      },

    	"Instituto Gulbenkian":
      {
        name: "Instituto Gulbenkian",
        info: "O Instituto Gulbenkian de Ciência (IGC) MHSE é um centro internacional dedicado à investigação biológica e biomédica e à formação pós-graduada, localizado em Oeiras, Portugal.",
        type: "museum",
        position: {x: 40, y: 400}
      },

    	"Padrão dos Descobrimentos":
      {
        name: "Padrão dos Descobrimentos",
        info: "Em posição destacada na margem direita do rio Tejo, o monumento original, em materiais perecíveis, foi erguido em 1940 por ocasião da Exposição do Mundo Português para homenagear as figuras históricas envolvidas nos Descobrimentos portugueses.",
        type: "monument",
        position: {x: 600, y: 420}
      },

    	"Torre de Belém":
      {
        name: "Torre de Belém",
        info: "Um dos ex libris da cidade, o monumento é um ícone da arquitetura do reinado de D. Manuel I, numa síntese entre a torre de menagem de tradição medieval e o baluarte moderno, onde se dispunham peças de artilharia.",
        type: "monument",
        position: {x: 590, y: 100}
      },

      "Local com um nome muito comprido, que ocupa várias linhas no ecrã do iGo":
      {
        name: "Local com um nome muito comprido, que ocupa várias linhas no ecrã do iGo",
        info: "Local com uma descrição muito comprida, que ocupa várias linhas no ecrã do iGo",
        type: "museum",
        position: {x: 870, y: 700}
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
        info: "Apesar do termo também ser usado para se referir à torre do relógio onde o sino está localizado, a estrutura é oficialmente conhecida como a Elizabeth Tower, rebatizada para comemorar o Jubileu de Diamante da Rainha Isabel II do Reino Unido.",
        type: "monument",
        position: {x: 500, y: 160}
      },

      "Palácio de Buckingham":
      {
        name: "Palácio de Buckingham",
        info: "O Palácio de Buckingham é a residência oficial e principal local de trabalho do Monarca do Reino Unido em Londres. Localizado na Cidade de Westminster, o palácio é frequentemente o centro de ocasiões de estado e hospitalidade real.",
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
        info: "Possui 324 metros de altura e fica cerca de 15 centímetros mais alta no verão, devido à dilatação térmica do ferro. Foi a estrutura mais alta do mundo desde a sua conclusão até 1930, quando perdeu o posto para o Chrysler Building, em Nova Iorque, Estados Unidos.",
        type: "monument",
        position: {x: 60, y: 500}
      },

      "Arco do Triunfo":
      {
        name: "Arco do Triunfo",
        info: "O Arco do Triunfo (francês: Arc de Triomphe) é um monumento localizado na cidade de Paris, construído em comemoração às vitórias militares do Napoleão Bonaparte, o qual ordenou a sua construção em 1806. Inaugurado em 1836, a monumental obra detém, gravados, os nomes de 128 batalhas e 558 generais.",
        type: "monument",
        position: {x: 150, y: 260}
      },

      "Louvre":
      {
        name: "Louvre",
        info: "O Museu do Louvre (em francês: Musée du Louvre), é o maior museu de arte do mundo e um monumento histórico em Paris, França. Um marco central da cidade, está localizado na margem direita do rio Sena, no 1.º arrondissement. Aproximadamente 38.000 objetos, da pré-história ao século XXI, são exibidos em uma área de 72.735 metros quadrados.",
        type: "museum",
        position: {x: 350, y: 460}
      }
    },
    temperature: 15
  }
}

const PLACE_TYPE_IMG =
{
  "monument": "img/monument.svg",
  "museum": "img/museum.png",
  "shop": "img/shop.png",
  "park": "img/park.png"
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
