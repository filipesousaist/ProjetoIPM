/****************/
/****************/
/*** PAYMENTS ***/
/****************/
/****************/

// Pagamentos
var saved_payment_methods = 0;


function add_payment(type)
{
	document.getElementById("empty_pm").style.display = "none";

	switch(type)
	{
	case "paypal":
		let payment_list_element = document.getElementById("payment_list");
		payment_list_element.innerHTML +=
			"<li class='payment_box_p' id=\"" + saved_payment_methods + "\">" +
				"<div class='payment_type'>Paypal</div>" +
				"<div class='hidden_card'>" + document.getElementById("paypal_email").value + "</div>" +
				"<img class='p_info_img' src='main/payments/img/paypal.png' onclick='complete_payment();'>" +
				"<img id='delete_b' src='main/payments/img/delete.png' onclick='delete_pm(\""+ saved_payment_methods +"\");'>" +
			"</li>";
		saved_payment_methods ++;
		break;

	case "card":
		let cardno = document.getElementById("card_number").value;
		let card4dig = cardno[12] + cardno[13] + cardno[14] + cardno[15];
		let payment_list_element_c = document.getElementById("payment_list");
		payment_list_element_c.innerHTML +=
			"<li class='payment_box_c' id='"+ saved_payment_methods +"'>" +
				"<div class='payment_type'>Cartão de Crédito</div>" +
				"<div class='hidden_card'>" + "XXXX-XXXX-XXXX-" + card4dig + "</div>" +
				"<img class='p_info_img' id='payment_card_img' src='main/payments/img/visa.png' onclick='complete_payment();'>" +
				"<img id='delete_b' src='main/payments/img/delete.png' onclick='delete_pm(\""+ saved_payment_methods +"\");'>" +
			"</li>";
		saved_payment_methods ++;
		break;
	}
}

function show_delete_option()
{
	let ul = document.getElementById("payment_list");
	let items = ul.getElementsByTagName("li");
	for (let i = 0; i < items.length; i ++)
	{
		if (items[i].getElementsByTagName("img")[1].style.zIndex == "-1")
		{
			items[i].getElementsByTagName("img")[0].style.zIndex = "-1";
			items[i].getElementsByTagName("img")[1].style.zIndex = "1";
		}
		else
		{
			items[i].getElementsByTagName("img")[1].style.zIndex = "-1";
			items[i].getElementsByTagName("img")[0].style.zIndex = "1";
		}
	}
}

function delete_pm(id)
{
	let elem = document.getElementById(id);
	elem.parentNode.removeChild(elem);
	if (document.querySelectorAll("#payment_list li").length == 0)
		document.getElementById("empty_pm").style.display = "block";
  saved_payment_methods --;
}

function payment_form(id)
{
	if (current_screen.id == "add_payment")
	{
		document.getElementById(id).style.animation = "increase_size 1s";
		document.getElementById(id).style.height = "4.1cm";
		if (id == "add_payment_list_paypal")
			fadein('add_payment_form_paypal', 1.5);
		else
			fadein('add_payment_form_card', 1.5);
	}
}

function fill_paypal()
{
	document.getElementById("paypal_email").value = "exemplo@gmail.com";
	document.getElementById("paypal_pw").value = "123abc";
}

function fill_card()
{
	document.getElementById("card_number").value = "1234 5678 1234 1234";
	document.getElementById("card_date").value = "12/09";
	document.getElementById("card_cvv").value = "123";
}

function complete_payment()
{
	change_screen("payment_complete");
	setTimeout(function()
	{
		document.getElementById("payment_before").style.opacity = "0";
		document.getElementById("payment_after").style.opacity = "1";
	}, 2000);

	setTimeout(function()
	{
		document.getElementById("payment_before").style.opacity = "1";
		document.getElementById("payment_after").style.opacity = "0";
		go_back();
	}, 3000);

	tickets ++;
	document.getElementById("iGuide_event_ticket_count").innerHTML = tickets;
}


/////////////////////
// Funções on_exit //
/////////////////////

SCREENS["add_payment"].on_exit = function()
{
	document.getElementById("add_payment_list_paypal").style.height = "1cm";
	document.getElementById("add_payment_list_paypal").style.animation = "";
	document.getElementById("add_payment_form_paypal").style.opacity = "0";
	document.getElementById("add_payment_form_paypal").style.animation = "";

	document.getElementById("add_payment_list_card").style.height = "1cm";
	document.getElementById("add_payment_list_card").style.animation = "";
	document.getElementById("add_payment_form_card").style.opacity = "0";
	document.getElementById("add_payment_form_card").style.animation = "";

	document.getElementById("add_payment").scrollTop = 0;

	document.getElementById("paypal_email").value = "";
	document.getElementById("paypal_pw").value = "";

	document.getElementById("card_number").value = "";
	document.getElementById("card_date").value = "";
	document.getElementById("card_cvv").value = "";
};
