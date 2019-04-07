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

  "iGuide_events": {id: "iGuide_events", parent_id: "iGuide_info"},

  "iGuide_event_info": {id: "iGuide_event_info", parent_id: "iGuide_events"},

  "payment_methods": {id: "payment_methods"},

  "add_payment": {id: "add_payment", parent_id: "payment_methods"},
	
  "payment_complete": { id: "payment_complete" }
}

const DEFAULT_LOCATION = "Lisboa";

const EVENTS= {
  "Ver estrelas no Parque":{
    name: "Ver estrelas no Parque",
    info: "Ver estrelas no parque é do caralho",
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
        events: ["Ver estrelas no Parque"]
      },

      "Shopping Amoreiras":
      {
        name: "Shopping Amoreiras",
        info: "Inaugurado a 27 de Setembro de 1985 e inserido num complexo de escritórios e habitações, com uma arquitectura ousada para a época.",
        type: "shop",
        position: {x: 150, y: 160},
        events: ["EMPTY"]
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
        info: "",
        type: "monument",
        position: {x: 500, y: 160}
      },

      "Palácio de Buckingham":
      {
        name: "Palácio de Buckingham",
        info: "",
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
        info: "",
        type: "monument",
        position: {x: 60, y: 500}
      },

      "Arco do Triunfo":
      {
        name: "Arco do Triunfo",
        info: "",
        type: "monument",
        position: {x: 150, y: 260}
      },

      "Louvre":
      {
        name: "Louvre",
        info: "",
        type: "museum",
        position: {x: 350, y: 460}
      }
    },
    temperature: 15
  }
}

const PLACE_TYPE_IMG =
{
  "monument": "img/monument.png",
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
