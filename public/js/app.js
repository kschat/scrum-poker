'use strict';

;(function(undefined) {
	var app = {
		container: null,
		cards: null,
		backCard: null,
		overlay: null,
		disableOverlay: null,
		closeButton: null
	};

	app.ready = function(e) {
		this.container = this.getElementsByRole('main');
		this.cards = document.getElementsByClassName('card');
		this.backCard = this.queryDomTree(document.getElementsByClassName('back')[0], 'card');
		this.overlay = document.getElementsByClassName('overlay')[0];
		this.disableOverlay = document.getElementsByClassName('disable-overlay')[0];
		this.closeButton = document.getElementById('closeButton');

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
						app.backCard.innerText = index + 1;
						app.overlay.style.display = 'block';
					}
				};
			})(this, i));
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

	document.addEventListener('DOMContentLoaded', app.ready.bind(app));
})();