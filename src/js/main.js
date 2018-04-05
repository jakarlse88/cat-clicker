/* eslint-env jquery */

$(() =>{

	const model = {

		catList: [],

		currentCat: '',

		getCat: (name) =>  model.catList.filter(obj => obj.name === name),

		getCatClickCounter: (name) => {
			let cat = model.getCat(name);
			return cat[0].clickCounter;
		},

		incrementClickCounter: (name) => {
			let cat = model.getCat(name);
			cat[0].clickCounter++;
		},

		getAllCats: () => model.catList,

		getCurrentCat: () => model.currentCat,

		setCurrentCat: (cat) => model.currentCat = cat,		

		init: (...cats) => {
			for (let cat of cats) {
				model.catList.push( {name: cat, clickCounter: 0} );
			}
		}
	};


	const octopus = {
		getCat: (cat) => model.getCat(cat),

		getCatClickCounter: (name) => model.getCatClickCounter(name),

		incrementClickCounter: (name) => model.incrementClickCounter(name),

		getAllCats: () => model.getAllCats(),

		getCurrentCat: () => model.getCurrentCat(),

		setCurrentCat: (cat) => model.currentCat = cat,

		clearCurrentCat: () => model.currentCat = '',

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
					octopus.setCurrentCat(id);
				} else {
					const current = octopus.getCurrentCat();
					$(current).toggleClass('hide');
					$(id).toggleClass('hide');
					octopus.setCurrentCat(id);
				}
			});

			$('.cat-display').on('click', (e) => {
				let id = `${$(e.target).parent().attr('id')}`;

				octopus.incrementClickCounter(id);

				$(e.target).parent().find('figcaption p').text(octopus.getCatClickCounter(id));
				
			});

			view.listRender();
			view.displayRender();
			view.admBtnRender();
			view.admPanelRender();
			
			$('#admin-btn').click(() => {
				$('#admin-btn').toggleClass('hide');
				$('#admin-panel').toggleClass('hide');
			});

			$('#admin-close').click(() => {
				$('#admin-panel').toggleClass('hide');
				$('#admin-btn').toggleClass('hide');
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
						'<img src="/images/' + cat.name + '.jpg">' +
						'<figcaption><p>' + cat.clickCounter + '</p></figcaption>' +
						'</figure>';
			});
			$('.cat-display').append( catHTML );
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