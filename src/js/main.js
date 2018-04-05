/* eslint-env jquery */

$(() =>{

	const model = {

		catList: [],

		currentCat: null,

		getCat: (name) =>  model.catList.filter(obj => obj.name === name),

		setCatName: function(name, newName) {
			let cat = model.getCat(name);
			cat[0].name = newName;
			return cat[0].name;
		},

		setCatURL: (name, url) => {
			let cat = model.getCat(name);
			cat[0].url = url;
		},

		getCatClickCounter: (name) => {
			let cat = model.getCat(name);
			return cat[0].clickCounter;
		},

		incrementClickCounter: (name) => {
			let cat = model.getCat(name);
			cat[0].clickCounter++;
		},

		setClickCounter: (name, clicks) => {
			let cat = model.getCat(name);
			cat[0].clickCounter = clicks;
		},

		getAllCats: () => model.catList,

		getCurrentCat: () => model.currentCat,

		setCurrentCat: (cat) => model.currentCat = cat,		

		init: (...cats) => {
			for (let cat of cats) {
				model.catList.push( {name: cat, 
					clickCounter: 0,
					url: '/images/' + cat + '.jpg'} 
				);
			}
		}
	};


	const octopus = {
		getCat: (cat) => model.getCat(cat),

		setCatName: (name, newName) => model.setCatName(name, newName),

		setCatURL: (name, url) => model.setCatURL(name, url),

		getCatClickCounter: (name) => model.getCatClickCounter(name),

		incrementClickCounter: (name) => model.incrementClickCounter(name),

		setClickCounter: (name, clicks) => model.setClickCounter(name, clicks),

		getAllCats: () => model.getAllCats(),

		getCurrentCat: () => model.getCurrentCat(),

		setCurrentCat: (cat) => model.currentCat = cat,

		clearCurrentCat: () => model.currentCat = null,

		init: () => {
			model.init('simba', 'nala', 'luna', 'daisy', 'bell');
			view.init();
		}
	};

	
	const view = {
		init: () => {
			this.catSelection = $('.cat-selection ul');
			this.catDisplay = $('.cat-display');

			$(this.catSelection).on('click', (e) => {
				let id = `#${$(e.target).text()}`;

				if (octopus.getCurrentCat() === null) {
					$(id).toggleClass('hide');
					octopus.setCurrentCat(id.substr(1));
				} else {
					const current = '#' + octopus.getCurrentCat();
					$(current).toggleClass('hide');
					$(id).toggleClass('hide');
					octopus.setCurrentCat(id.substr(1));
				}
			});

			$('.cat-display').on('click', (e) => {
				let id = `${$(e.target).parent().attr('id')}`;
				
				if (octopus.getCurrentCat()) {
					octopus.incrementClickCounter(id);
				
					$(e.target).parent().find('figcaption p')
						.text(octopus.getCatClickCounter(id));
				}
			});

			view.listRender();
			view.displayRender();
			view.admBtnRender();
			view.admPanelRender();
			
			/* Admin btn functionality 
			 */
			$('#admin-btn').click(() => {
				$('#admin-btn').toggleClass('hide');
				$('#admin-panel').toggleClass('hide');
			});

			/* Admin panel close btn functionality 
			 */
			$('#admin-close').click(() => {
				$('#admin-panel').toggleClass('hide');
				$('#admin-btn').toggleClass('hide');
			});

			/* Admin panel functionality
			 */
			$('#admin-panel').submit((e) => {
				e.preventDefault();

				if (octopus.getCurrentCat()) {
					let cat = octopus.getCurrentCat(),
						newName = $('#admin-name').val(),
						newURL = $('#admin-url').val(),
						newClicks = parseInt($('#admin-clicks').val());


					if (cat) {
					
						if ($('#admin-name').val()) {
							cat = octopus.setCatName(cat, newName);
							octopus.setCurrentCat(cat);
						}

						if ($('#admin-url').val()) {
							octopus.setCatURL(cat, newURL);
						}
						
						if ($('#admin-clicks').val()) {
							octopus.setClickCounter(cat, newClicks);
						}
					} 

					$('#admin-name').val(null),
					$('#admin-url').val(null),
					$('#admin-clicks').val(null);

					$('#admin-panel').toggleClass('hide');

					view.displayRender();
				}
			});
			
		},

		listRender: () => {
			let htmlStr = '';
			octopus.getAllCats().forEach((cat) => {
				htmlStr += '<li>' + cat.name + '</li>';
			});
			$('.cat-selection ul').append( htmlStr );
		},

		displayRender: () => {
			let catHTML = '';
			octopus.getAllCats().forEach((cat) => { 
				catHTML += '<figure class="cat-img hide" id="' + cat.name + '">' +
						'<p class="cat-name">' + cat.name + '</p>' +
						'<img src="' + cat.url + '">' +
						'<figcaption><p>' + cat.clickCounter + '</p></figcaption>' +
						'</figure>';
			});

			$('.cat-display').html( catHTML );

			if (octopus.getCurrentCat() !== null) {
				let cat = '#' + octopus.getCurrentCat();
				
				if ($(cat).hasClass('hide')) {
					$(cat).removeClass('hide');
				}
			}
		},

		admBtnRender: () => {
			let btnHTML = '<section class="admin">' +
						'<button id="admin-btn">Admin</button>' +
						'</section>';
			$('#page-footer').append( btnHTML );
		},

		admPanelRender: () => {
			let panelHTML = '<form class="hide" id="admin-panel">' +
							'<input type="text" placeholder="Name" id="admin-name">' +
							'<input type="text" placeholder="URL" id ="admin-url">' +
							'<input type="text" placeholder="Clicks" id="admin-clicks">' +
							'<input type="submit" value="Submit" id="admin-submit">' +
							'<input type="submit" value="Close" id="admin-close">' +
						'</form>';
			$('.admin-panel').append( panelHTML );
		}
	};

	octopus.init();
});