//
// index.js
//

import { loadSettingsHTML } from "./resources/js/loadSettings.js";
import { loadCalendarHTML } from "./resources/js/loadCalendar.js";

$(function () {
	//
	var seasons = ["Spring", "Summer", "Fall", "Winter"];

	//

	var refreshView = () => {};

	//
	/////////////////////////////////////
	//

	//
	// Load the settings
	loadSettingsHTML(refreshView);

	//
	/////////////////////////////////////
	//

	//
	// Create the html calendar
	loadCalendarHTML();

	//
	// Load

	// test

	// $("#test").append(
	// 	$("<span/>")
	// 		.addClass("sprite")
	// 		.css("background-position-x", 4 * 16 + "px")
	// 		.css("background-position-y", 4 * 16 + "px")
	// 		.attr("aria-alt", "")
	// );

	// Load birthdays/events

	// $.getJSON("data/calendar.json", function (data) {
	// 	// do stuff with data.
	// 	console.log(data);

	// 	Object.entries(data).forEach(([key, value]) => {
	// 		value.forEach((val) => {
	// 			$("#" + key + " .events").append($("<p/>").text(val.event));
	// 		});
	// 	});
	// });

	// Load crops

	$.getJSON("data/crops.json", function (data) {
		// do stuff with data.
		// console.log("crops.json: ", data);

		//
		// v2
		var calendarCrops = seasons.reduce(
			(calendarCrops, season) => ({
				...calendarCrops,
				[season]: [...Array(28).keys()].reduce(
					(o, i) => ({
						...o,
						[i + 1]: {
							regrow: {
								planting: [],
								growing: [],
								harvesting: [],
							},
							single: {
								planting: [],
								growing: [],
								harvesting: [],
							},
						},
					}),
					{}
				),
			}),
			{}
		);
		// console.log("calendarCrops: ", calendarCrops);

		// process each crop
		data.forEach((crop) => {
			crop.seasons.forEach((season) => {
				var kind = crop.regrowTime ? "regrow" : "single";

				// plant on day 1
				var day = 1;
				calendarCrops[season][day][kind].planting.push(crop);

				// grow
				for (day = 2; day < crop.growTime; day++) {
					calendarCrops[season][day][kind].growing.push(crop);
				}

				// harvest
				if (day > 28) {
					season =
						seasonNo[season] === 3
							? season[0]
							: season[seasonNo[season] + 1];
					day = 1;
				}
				calendarCrops[season][day][kind].harvesting.push(crop);
			});
		});

		// crop sprite display
		var getCropSprite = (crop, spriteType = 1) => {
			var imgSrc = spriteType === 0 ? crop.seedSprite : crop.cropSprite;
			return $("<span/>")
				.addClass("sprite")
				.css("background-position-x", imgSrc[0] * 16 + "px")
				.css("background-position-y", imgSrc[1] * 16 + "px")
				.attr("aria-alt", crop.crop);
		};

		// place on calendar
		Object.entries(calendarCrops).forEach(([season, seasonCalendar]) => {
			Object.entries(seasonCalendar).forEach(([day, dayKinds]) => {
				Object.entries(dayKinds).forEach(([kind, dayCrops]) => {
					["planting", "growing", "harvesting"].forEach(
						(stage, i) => {
							if (dayCrops[stage].length > 0) {
								dayCrops[stage].forEach((crop) => {
									$(
										`#${season}${day} .${kind} .${stage}`
									).append(getCropSprite(crop, i));
								});
							}
						}
					);
				});
			});
		});

		//
		// v1
		// data.forEach((crop) => {
		// 	crop.seasons.forEach((season) => {
		// 		var kindClass = "." + (crop.regrowTime ? "regrow" : "single");

		// 		var getCrop = (spriteType = 1) => {
		// 			var imgSrc =
		// 				spriteType === 0 ? crop.seedSprite : crop.cropSprite;
		// 			return $("<span/>")
		// 				.addClass("sprite")
		// 				.css("background-position-x", imgSrc[0] * 16 + "px")
		// 				.css("background-position-y", imgSrc[1] * 16 + "px")
		// 				.attr("aria-alt", crop.crop);
		// 		};

		// 		// plant on day 1
		// 		$(`#${season}1 ${kindClass} .planting`).append(getCrop(0));
		// 		// grow
		// 		for (var i = 2; i < crop.growTime; i++) {
		// 			$(`#${season}${i} ${kindClass} .growing`).append(
		// 				getCrop(1)
		// 			);
		// 		}
		// 		// harvest
		// 		$(
		// 			`#${season}${1 + crop.growTime} ${kindClass} .harvesting`
		// 		).append(getCrop(2));
		// 		$(
		// 			`#${season}${1 + crop.growTime} ${kindClass} .planting`
		// 		).append(getCrop(0));
		// 	});
		// });
	});

	// end on load
});
