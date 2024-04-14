export function loadCalendarHTML() {
	var seasons = ["Spring", "Summer", "Fall", "Winter"];
	var seasonNo = { Spring: 0, Summer: 1, Fall: 2, Winter: 3 };

	for (var mth = 0; mth < 4; mth++) {
		var month = seasons[mth];

		var $calendar = $("<div/>").addClass("calendar");

		for (var wk = 0; wk < 4; wk++) {
			var $row = $("<div/>").addClass("row");

			for (var dy = 0; dy < 7; dy++) {
				var day = 1 + dy + wk * 7;
				var date = month + day;
				var $day = $("<div/>").addClass("col day").attr("id", date);

				$day.append($("<p/>").addClass("date").text(day));
				$day.append(
					$("<div/>")
						.addClass("events")
						.append($("<p/>").addClass("label").text("Events"))
				);

				var cropColPlanting = () =>
					$("<div/>")
						.addClass("col planting")
						.append(
							$("<p/>").addClass("crop_label").text("Planting")
						);
				var cropColGrowing = () =>
					$("<div/>")
						.addClass("col growing")
						.append(
							$("<p/>").addClass("crop_label").text("Growing")
						);
				var cropColHarvesting = () =>
					$("<div/>")
						.addClass("col harvesting")
						.append(
							$("<p/>").addClass("crop_label").text("Harvesting")
						);

				$day.append(
					$("<div/>")
						.addClass("crops")
						.append($("<p/>").addClass("label").text("Crops"))
						.append(
							$("<div/>")
								.addClass("single")
								.append(
									$("<p/>")
										.addClass("sub_label")
										.text("Single")
								)
								.append(
									$("<div/>")
										.addClass("row")
										.append(cropColPlanting())
										.append(cropColGrowing())
										.append(cropColHarvesting())
								)
						)
						.append(
							$("<div/>")
								.addClass("regrow")
								.append(
									$("<p/>")
										.addClass("sub_label")
										.text("Regrow")
								)
								.append(
									$("<div/>")
										.addClass("row")
										.append(cropColPlanting())
										.append(cropColGrowing())
										.append(cropColHarvesting())
								)
						)
				);

				$row.append($day);
			}
			$calendar.append($row);
		}

		$("#calendar").append($("<h2/>").text(month)).append($calendar);
	}
}
