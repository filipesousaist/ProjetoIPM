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

  "iGuide_info":  {id: "iGuide_info", parent_id: "iGuide_main"}
}

const LOCATIONS =
{
  "Parque Eduardo VII":
  {
    title: "Parque Eduardo VII",
    info: "Parque Eduardo VII é o maior parque na zona de Lisboa",
    type: "park"
  },

  "Shopping Amoreiras":
  {
    title: "Shopping Amoreiras",
    info: "Shopping Amoreiras é um Shopping bue grande",
    type: "shop"
  },

	"Instituto Gulbenkian":
  {
    title: "Instituto Gulbenkian",
    info: "Instituto Gulbenkian é bue fixe",
    type: "museum"
  },

	"Padrão dos Descobrimentos":
  {
    title: "Padrão dos Descobrimentos",
    info: "É bue velho, meu",
    type: "monument"
  },

	"Torre de Belém":
  {
    title: "Torre de Belém",
    info: "É bue velho tmb, meu",
    type: "monument"
  }
}

const LOCATION_TIME_IMG =
{
  "monument": "img/monument.png",
  "museum": "img/museum.png",
  "shop": "img/shop.png",
  "park": "img/park.png"
}
