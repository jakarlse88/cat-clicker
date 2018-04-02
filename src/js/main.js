/* Run on DOM ready 
*/
$(() => {
	let counter = 0,
		catHTML = [];

	/* Create cat, name, click count HTML
	*/
	() => {
		
	};

	$('#cat-img').on('click', () => {
		$('#clicks').text(++counter);
	});
});