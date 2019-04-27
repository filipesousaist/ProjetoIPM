/************/
/************/
/*** USER ***/
/************/
/************/

var people; /* SAVE */
var current_person_name; /* SAVE */

function init_user()
{
  let select_element = document.getElementById("select_user");
  select_element.innerHTML = "";
  for (let person_name in people)
    select_element.innerHTML += "<option value='" + person_name + "'>" + person_name + "</option>";
  select_element.value = current_person_name;
}

function change_user()
{
  current_person_name = document.getElementById("select_user").value;
  save();
  reload();
}
