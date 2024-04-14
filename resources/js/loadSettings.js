export function loadSettingsHTML(refreshView) {
	var settings = { seasons: ["Spring", "Summer", "Fall", "Winter"] };

	$.get("./resources/html/settings.html", function (data) {
		console.log("settings.html: ", data);
		$("#settings").append(data);
	});

	$("#settings_season_spring").on("click", (e) => {
		refreshView();
	});
}
