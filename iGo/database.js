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
  
  "payment_methods": {id: "payment_methods"} 
}

const DEFAULT_LOCATION = "Lisboa";

const LOCATIONS =
{
  "Lisboa":
  {
    places:
    {
      "Parque Eduardo VII":
      {
        name: "Parque Eduardo VII",
        info: "Parque Eduardo VII é o maior parque na zona de Lisboa",
        type: "park"
      },

      "Shopping Amoreiras":
      {
        name: "Shopping Amoreiras",
        info: "Shopping Amoreiras é um Shopping bue grande",
        type: "shop"
      },

    	"Instituto Gulbenkian":
      {
        name: "Instituto Gulbenkian",
        info: "Instituto Gulbenkian é bue fixe",
        type: "museum"
      },

    	"Padrão dos Descobrimentos":
      {
        name: "Padrão dos Descobrimentos",
        info: "É bue velho, meu",
        type: "monument"
      },

    	"Torre de Belém":
      {
        name: "Torre de Belém",
        info: "É bue velho tmb, meu",
        type: "monument"
      },

      "Local com um nome muito comprido, que ocupa várias linhas no ecrã do iGo":
      {
        name: "Local com um nome muito comprido, que ocupa várias linhas no ecrã do iGo",
        info: "Local com uma descrição muito comprida, que ocupa várias linhas no ecrã do iGo",
        type: "museum"
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
        type: "monument"
      },

      "Palácio de Buckingham":
      {
        name: "Palácio de Buckingham",
        info: "",
        type: "monument"
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
        type: "monument"
      },

      "Arco do Triunfo":
      {
        name: "Arco do Triunfo",
        info: "",
        type: "monument"
      },

      "Louvre":
      {
        name: "Louvre",
        info: "",
        type: "museum"
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
