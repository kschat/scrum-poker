'use strict';

;(function(undefined) {
	var app = {
		container: null,
		cards: null,
		backCard: null,
		overlay: null,
		disableOverlay: null,
		closeButton: null,
		settingButtons: null,
		aboutPage: null,

		standardValues: ['0', '1/2', '1', '2', '3', '5', '8', '13', '20', '40', '100', '&#8734;'],
		tShirtValues: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '&#8734;'],
		fibonacciValues: ['0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '144']
	};

	app.ready = function(e) {
		this.container = this.getElementsByRole('main');
		this.cards = document.getElementsByClassName('card');
		this.backCard = this.queryDomTree(document.getElementsByClassName('back')[0], 'card');
		this.overlay = document.getElementsByClassName('overlay')[0];
		this.disableOverlay = document.getElementsByClassName('disable-overlay')[0];
		this.closeButton = document.getElementById('closeButton');
		this.settingButtons = this.getSettingButtons(document.getElementById('settingsNav'));
		this.aboutPage = document.getElementById('aboutPanel');

		//remove the back card
		this.cards = Array.prototype.slice.call(this.cards, 0, this.cards.length-1);

		this.overlay.addEventListener('click', (function(app) {
			return function(e) {
				app.container.className = '';
				app.overlay.style.display = 'none';
			};
		})(this));

		this.disableOverlay.addEventListener('click', (function(app) {
			return function(e) {
				app.closeButton.click();
			};
		})(this));

		for(var i=0; i<this.cards.length; i++) {
			this.cards[i].addEventListener('click', (function(app, index) {
				return function(e) {
					e.preventDefault();
					if(app.container.className === 'flip') {
						app.container.className = '';
						app.overlay.style.display = 'none';
					}
					else {
						app.container.className = 'flip';
						app.backCard.innerText = this.innerText;
						app.overlay.style.display = 'block';
					}
				};
			})(this, i));
		}

		for(var i=0; i<this.settingButtons.length; i++) {
			this.settingButtons[i].addEventListener('click', (function(app, index) {
				return function(e) {
					switch(this.innerText) {
						case '5 Standard':
							app.aboutPage.style.display = 'none';
							app.setCardValues(app.cards, app.standardValues);
							break;
						case 'M T-Shirt':
							app.aboutPage.style.display = 'none';
							app.setCardValues(app.cards, app.tShirtValues);
							break;
						case 'F Fibonacci':
							app.aboutPage.style.display = 'none';
							app.setCardValues(app.cards, app.fibonacciValues);
							break;
						case 'About':
							app.aboutPage.style.display = 'block';
							break;
					}
				};
			})(this, i));
		}

		switch(window.location.hash) {
			case '#/about':
				app.aboutPage.style.display = 'block';
				break;
			case '#/standard':
				app.aboutPage.style.display = 'none';
				app.setCardValues(app.cards, app.standardValues);
				break;
			case '#/tshirt':
				app.aboutPage.style.display = 'none';
				app.setCardValues(app.cards, app.tShirtValues);
				break;

			case '#/fibonacci':
				app.aboutPage.style.display = 'none';
				app.setCardValues(app.cards, app.fibonacciValues);
				break;
		}
	};

	app.getElementsByRole = function(role) {
		var matchingElements = [],
			allElements = document.getElementsByTagName('*');

		for(var i=0; i<allElements.length; i++) {
			
			if(allElements[i].getAttribute('role') === role) {
				matchingElements.push(allElements[i]);
			}
		}

		return matchingElements.length > 1 ? matchingElements : matchingElements[0];
	};

	app.queryDomTree = function query(node, className) {
		var children = node.children;

		for(var i=0; i<children.length; i++) {
			if(children[i].className === className) {
				return children[i];
			}
			else {
				return query(children[i], className);
			}
		}
	};

	app.getSettingButtons = function(node) {
		var buttons = node.children,
			matchingButtons = [];

		for(var i=0; i<buttons.length; i++) {
			if(buttons[i].className === '') {
				matchingButtons.push(buttons[i].children[0]);
			}
		}

		return matchingButtons;
	};

	app.setCardValues = function(cards, values) {
		for(var i=0; i<cards.length; i++) {
			cards[i].style.display = typeof values[i] === 'undefined' ? 'none' : 'block';
			cards[i].innerHTML = values[i];
		}
	};

	document.addEventListener('DOMContentLoaded', app.ready.bind(app));
})();