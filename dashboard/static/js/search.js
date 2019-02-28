$(document).ready(function () {
	const separators = '., ';
	const words = ['pending', 'starting', 'running', 'error', 'done', 'chrome', 'firefox'];

	var timer = 1;

	$('#search').keydown(function (e) {
		if (e.keyCode == 9) { // tab was pressed
			e.preventDefault();
			if ($(this).val().slice(-1) !== ' ') {
				$(this).val($(this).val() + ' ');
			}
			var element = $(this).get(0);
			element.setSelectionRange(element.selectionEnd + 1, element.selectionEnd + 1);
		}
	});

	$('#search').keyup(function (e) {
		if ($(this).length === 0 || !(e.keyCode >= 48 && e.keyCode <= 90)) {
			return;
		}

		timer = 2;

		// get the characters between the cursor & 
		// the beginning of the word
		var getWord = function (text, cursor, direction) {
			var index = cursor;
			while (index > 0) {
				index--;
				if (separators.indexOf(text[index]) > -1) {
					index++;
					break;
				}
			}
			return text.substr(index, cursor - index);
		};

		// run the result through a list to get a suggestion
		var findMatch = function (word) {
			if (word.length === 0) {
				return 0;
			}

			var matches = [];
			var suggestion = null;
			words.forEach(function (w) {
				if (w.startsWith(word)) {
					suggestion = w;
					return;
				}
			});

			if (typeof suggestion == null) {
				return false;
			}

			return suggestion;
		}; 

		// we need to select the second part of the typed word
		var cursor = $(this).get(0).selectionStart;
		if (cursor > 0) {
			var word = getWord($(this).val(), cursor);
			if (suggestion = findMatch(word)) { // TODO: only change the text between the cursor and the next separator
				suggestion = suggestion.slice(word.length, suggestion.length);
				$(this).val($(this).val().substr(0, cursor));
				$(this).val($(this).val() + suggestion);
				$(this).get(0).setSelectionRange(cursor, $(this).val().length);
			}
		}
	});

	window.setInterval(function() {
		if (timer > 0) {
			timer--;
			if (timer <= 0) {
				var query = $('#search').val().trim().split(' ');
				$.ajax({
					url: '/search',
					data: {query: query}
				}).done(function (response) {
					$('#jobs').empty();
					response.forEach(function (job) {
						var html =
						'<div class="container rounded job">' +
							'<div class="row row-job">' +
								'<div class="col-sm-3 gray my-auto">' + job.tag + '</div>' +
								'<div class="col-sm-3 gray my-auto">' + job.driver + '/' + job.site + '</div>' +
								'<div class="col-sm-3 gray my-auto">' + job.status + '</div>' +
								'<div class="col-sm-3 gray my-auto">' + job.updated_at + '</div>' +
							'</div>' +
						'</div>';
						$('#jobs').append(html);
					});
				});
				//timer = 3;
			}
		}
	}, 1000);
});

