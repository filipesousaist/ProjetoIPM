/************/
/************/
/*** SAVE ***/
/************/
/************/

var auto_save; /* SAVE */
var save_interval;


// Funções principais

function save()
{
  save_var("auto_save", auto_save);
  save_var("iGroup_groups", iGroup_groups);
  save_var("people", people);
  save_var("current_person_name", current_person_name);
}

function load()
{
  auto_save = load_var("auto_save");
  iGroup_groups = load_var("iGroup_groups");
  people = load_var("people");
  current_person_name = load_var("current_person_name");
}

function init_auto_save()
{
  if (auto_save)
    save_interval = setInterval(save, 15000);
  update_auto_save_button();
}

function toggle_auto_save()
{
  auto_save = ! auto_save;

  if (auto_save)
    save_interval = setInterval(save, 15000);
  else
    clearInterval(save_interval);

  update_auto_save_button();
}

function update_auto_save_button()
{
  let button = document.getElementById("auto_save_button");
  if (auto_save)
  {
    button.style.backgroundColor = "green";
    button.innerHTML = "Ligado";
  }
  else
  {
    button.style.backgroundColor = "red";
    button.innerHTML = "Desligado";
  }
}


// Funções auxiliares

function save_var(var_name, value)
{
  localStorage.setItem(var_name, JSON.stringify(value));
}

function load_var(var_name)
{
  let string_value = localStorage.getItem(var_name);

  if (string_value == null)
  {
    save_var(var_name, DEFAULT[var_name]);
    return DEFAULT[var_name];
  }
  return JSON.parse(string_value);
}

function reset_data()
{
  for (let var_name in DEFAULT)
    localStorage.removeItem(var_name);

  reset();
  init();
}
