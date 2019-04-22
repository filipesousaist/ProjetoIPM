/************/
/************/
/*** SAVE ***/
/************/
/************/

// Funções principais

function save()
{
  save_var("current_location_name", current_location_name);
  save_var("iGroup_groups", iGroup_groups);
}

function load()
{
  current_location_name = load_var("current_location_name");
  iGroup_groups = load_var("iGroup_groups");
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
}
