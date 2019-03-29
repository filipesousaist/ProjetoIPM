var currentScreen;
var parentScreen =
{
	"main_menu": null,
	"apps": "main_menu",
	"location": "main_menu",
	"options": "main_menu"
}

function init()
{
	currentScreen = "main_menu";
	document.getElementById("main_menu").style.display = "block";
}

function replaceElement(oldElement, newElement)
{
	document.getElementById(oldElement).style.display = "none";
	document.getElementById(newElement).style.display = "block";
}

function changeScreen(newScreen)
{
	if (newScreen != currentScreen)
	{
		replaceElement(currentScreen, newScreen);
		currentScreen = newScreen;
	}
}

function back()
{
	var previousScreen = parentScreen[currentScreen];
	if (previousScreen != null)
		changeScreen(previousScreen);
}