/* eslint-env jquery */

/* Variables */
const cats = [ 
	{
		name: 'simba',
	},
	{
		name: 'nala',
	},
	{
		name: 'luna',
	},
	{
		name: 'daisy',
	},
	{
		name: 'bell',
	}
];

/* Run on DOM ready 
*/
$(function () {
	/* Create list of cat names
	 */
	(function() {
		for (let cat of cats) {
			$('.cat-selection ul').append(`<li>${cat.name}</li>`);
		}
	})();
	
	/* Create cat HTML
	 */
	(function() {
		for (let cat of cats) {
			cat.html = `<figure class="cat-img hide">
			<p class="cat-name">${cat.name}</p>
			<img src="/images/${cat.name}.jpg" alt="a cat" id="${cat.name}">
			<figcaption><p>0</p></figcaption>
			</figure>`;
		}

		for (let cat of cats) {
			$('.cats').append(cat.html);
		}
	})();

	/* Increment cat's associated counter on click
	 */
	$('.cat-img').on('click', (e) => {
		let currentCounter = parseInt($(e.currentTarget).find('figcaption').text());
		$(e.currentTarget).find('figcaption').text(++currentCounter); 
	});

	$('.cat-selection li').on('click', (e) => {
		let id = `#${$(e.currentTarget).text()}`;
		console.log($(id));
		$(id).parent().toggleClass('hide');
	});
});