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

  for (let i = 0; i < MAP_POINTS.length; i ++)
  {
    let point = MAP_POINTS[i];
    drawPoint(point.x, point.y);
  }
}

function drawPoint(x, y)
{
  let coords = map_to_canvas_coords({x: x, y: y});
  document.getElementById("map_canvas").getContext("2d").fillRect(coords.x, coords.y, 2, 2);
}

function drawLine(startX, startY, endX, endY)
{
  let start_coords = map_to_canvas_coords(startX, startY);
  let end_coords = map_to_canvas_coords(endX, endY);

  let context = document.getElementById("map_canvas").getContext("2d");
  context.moveTo(start_coords.x, start_coords.y);
  context.lineTo(end_coords.x, end_coords.y);
  context.stroke();
}

function drawGrid()
{
  for (let x = 10; x < POS_MAX.x / 10; x += 10)
    drawLine(x, 0, x, POS_MAX.y);
  for (let y = 10; y < POS_MAX.y / 10; y += 10)
    drawLine(0, y, POS_MAX.x, y);
}

function map_to_canvas_coords(map_coords)
{
  let canvas = document.getElementById("map_canvas");

  let newX = map_coords.x * canvas.width / POS_MAX.x;
  let newY = map_coords.y * canvas.height / POS_MAX.y;

  return {x: newX, y: newY};
}
