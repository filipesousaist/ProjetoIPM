
function apps_menu_update_notifications()
{
	let num_notifications = iGroup_count_new_notifications();

	let notifications_element = document.getElementById("apps_menu_notification_icon");
	if (num_notifications > 0)
	{
		notifications_element.style.display = "block";
		notifications_element.innerHTML = num_notifications;
	}
	else
		notifications_element.style.display = "none";
}

SCREENS["apps"].on_load = apps_menu_update_notifications;
