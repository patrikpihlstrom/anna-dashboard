$(document).ready(function () {
	$('#search').keydown(function (e) {
		if (e.keyCode == 9) {
			e.preventDefault();
			$(this).get(0).setSelectionRange($(this).val().length, $(this).val().length);
		} else if (e.keyCode == 13) {

		}
	});

	$('#search').keyup(function (e) {
		if ($(this).length === 0) {
			return;
		}
		const separators = '., :';
		const words = ['id:', 'driver:', 'site:', 'status:', 'tag:', 'container:', 'log:', 'token:', 'updated_at:', 'pending', 'starting', 'running', 'error', 'done'];

		// get the characters between the cursor & 
		// the beginning of the word
		var getWord = function (text, cursor) {
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
			words.forEach(function (w) {
				if (w.startsWith(word)) {
					matches.push(w);
				}
			});

			if (matches.length === 0) {
				return false;
			}

			return matches[0];
		}; 

		// we need to select the second part of the typed word
		var cursor = $(this).get(0).selectionStart;
		if (cursor > 0) {
			var word = getWord($(this).val(), cursor);
			if (suggestion = findMatch(word)) {
				console.log(suggestion);
				suggestion = suggestion.replace(word, '');
				$(this).val($(this).val().substr(0, cursor));
				$(this).val($(this).val() + suggestion.replace(word, ''));
				$(this).get(0).setSelectionRange(cursor, $(this).val().length);
			}
		}
	});
});

