/************/
/************/
/*** IWAY ***/
/************/
/************/

function displayPath()
{
  change_screen("location");

  let canvas = document.getElementById("map_canvas");
  canvas.style.display = "block";
  let context = canvas.getContext("2d");
  context.imageSmoothingEnabled = false;
  context.moveTo(20, 30);
  context.lineTo(40, 55);
  context.stroke();

  for (let i = 0; i < MAP_POINTS.length; i ++)
  {
    let point = MAP_POINTS[i];
    let coords = map_to_canvas_coords({x: point.x, y: point.y});
    context.fillRect(coords.x, coords.y, 2, 2);
  }
}

function map_to_canvas_coords(map_coords)
{
  let canvas = document.getElementById("map_canvas");
  let canvas_style = window.getComputedStyle(canvas);
  let canvas_width = parseFloat(canvas_style.getPropertyValue("width"));
  let canvas_height = parseFloat(canvas_style.getPropertyValue("height"));

  let newX = map_coords.x * canvas_width / POS_MAX.x;
  let newY = map_coords.y * canvas_height / POS_MAX.y;

  return {x: newX, y: newY};
}
