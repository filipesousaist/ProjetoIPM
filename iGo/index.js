var screenStack;

function init()
{
	screenStack = ["main_menu"];
}

function replaceElement(oldElement, newElement)
{
	document.getElementById(oldElement).style.display = "none";
	document.getElementById(newElement).style.display = "block";
}

function changeScreen(newScreen)
{
	var currentScreen = screenStack[screenStack.length - 1];
	if (newScreen != currentScreen)
	{
		replaceElement(currentScreen, newScreen);
		screenStack.push(newScreen);
	}
}

function back()
{
	if (screenStack.length > 1)
	{
		document.getElementById(screenStack[screenStack.length - 1]).style.display = "none";
		document.getElementById(screenStack[screenStack.length - 2]).style.display = "block";
		screenStack.pop();
	}
		
}

function home()
{
	var currentScreen = screenStack[screenStack.length - 1];
	if (screenStack[screenStack.length - 1] != "main_menu")
	{
		replaceElement(currentScreen, "main_menu");
		screenStack = ["main_menu"];
	}
}