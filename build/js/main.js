/* eslint-env jquery */

/* Variables */
let counter = 0;

const cats = [ 
		{
			name: 'simba',
			counter: 0
		},
		{
			name: 'nala',
			counter: 0
		} 
	],
	catHTML = [];

/* Run on DOM ready 
*/
$(function () {
	/* Create cat, name, click count HTML
	*/
	(function() {
		for (let cat of cats) {
			catHTML.push(`<figure class="cat-img">
			<p class="cat-name">${cat.name}</p>
			<img src="/images/${cat.name}.jpg" alt="a cat" id="${cat.name}">
			<figcaption><p>0</p></figcaption>
			</figure>`);
		}

		for (let element of catHTML) {
			$('.cats').append(element);
		}
	})();

	$('.cat-img').on('click', (e) => {
		let currentCounter = parseInt($(e.currentTarget).find('figcaption').text());
		$(e.currentTarget).find('figcaption').text(++currentCounter); 
	});
});