function add0 (number)
{
	if (number < 10)
		return "0" + number;
	return number;
}

function distance(x1, y1, x2, y2)
{
	return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}
