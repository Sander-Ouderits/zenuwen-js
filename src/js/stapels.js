import Phaser from 'phaser';
import { style } from './style';

const colorStapelBorderIdle = style.colors.primary.color32;
const colorStapelBorderHover = style.colors.secondary.color32;

export class abstractStapel extends Phaser.GameObjects.Zone {
	/* constructor() {
        if (this.constructor === abstractStapel) {
            throw new TypeError('Abstract class "abstractStapel" cannot be instantiated directly.');
        }

    } */
	constructor (scene, x, y, width, height) {
		super(scene, x, y, width, height);
		scene.add.existing(this);

		this.cards = [];
	}

	getSize () {
		// number of cards
		return this.cards.length;
	}

	addCard (card) {
		this.cards.push(card);
		card.setStapel(this);
	}

	popCard () {
		const card = this.cards.pop();
		card.setStapel(null);
		return card;
	}

	containsCard (card) {
		// If stapel contains Card
		return (this.cards.includes(card));
	}

	dragEnter (card) {
		console.error("This stapel shouldn't receive a dragenter event!");
	}

	dragLeave (card) {
		console.error("This stapel shouldn't receive a drageleave event!");
	}
}

export class TrekStapel extends abstractStapel {
	constructor (scene, x, y, width, height) {
		super(scene, x, y, width, height);

		// Make this a dropzone with default shape without a callback
		// This makes it resizable
		this.setInteractive(undefined, undefined, true);

		this.setOrigin(0.5, 0.0);
	}

	addCard (card) {
		if (this.getSize() !== 0) {
			this.cards[this.getSize() - 1].disableInteractive().close();
			// this.setPosition(this.x, this.y);
			this.setSize(this.width, this.height - 1, true);
			// this.setDisplaySize(this.width, this.height + 20); // Zones aren't rendered
		} else {
			// this.setPosition(this.x, this.y);
			this.setSize(this.width, this.height, true);
			// this.setDisplaySize(this.width, this.height); // Zones aren't rendered
		}

		// this.border.setPosition(this.x, this.y);
		card.disableInteractive().close();
		super.addCard(card);

		card.x = (this.x);
		card.y = (this.y + card.height / 2 + this.getSize() * -1 - 5);
	}

	popCard () {
		if (this.getSize() >= 2) {
			this.cards[this.getSize() - 2].setInteractive().open();
			// this.setPosition(this.x, this.y);
			this.setSize(this.width, this.height - 1, true);
			// this.setDisplaySize(this.width, this.height - 20); // Zones aren't rendered
		} else {
			// this.setPosition(this.x, this.y);
			this.setSize(this.width, this.height, true);
			// this.setDisplaySize(this.width, this.height); // Zones aren't rendered
		}

		// this.border.setPosition(this.x, this.y);
		return super.popCard();
	}
}
export class TrekStapel2 extends abstractStapel {
	constructor (scene, x, y, width, height) {
		super(scene, x, y, width, height);

		// Make this a dropzone with default shape without a callback
		// This makes it resizable
		this.setInteractive(undefined, undefined, true);
		this.text = scene.add.text(x, y, '5', { font: '45px Arial', fill: '#ffffff' });
		this.text.setOrigin(0.5, 0.5);
		scene.children.bringToTop(this.text);
		this.setOrigin(0.5, 0.0);
	}

	addCard (card) {
		if (this.getSize() !== 0) {
			this.cards[this.getSize() - 1].disableInteractive().close();
			// this.setPosition(this.x, this.y);
			this.setSize(this.width, this.height, true);
			// this.setDisplaySize(this.width, this.height + 20); // Zones aren't rendered
		} else {
			// this.setPosition(this.x, this.y);
			this.setSize(this.width, this.height, true);
			// this.setDisplaySize(this.width, this.height); // Zones aren't rendered
		}

		// this.border.setPosition(this.x, this.y);
		card.disableInteractive().close();
		super.addCard(card);
		this.scene.children.bringToTop(this.text);
		this.text.setText(this.getSize());
		card.x = (this.x);
		card.y = (this.y);
	}

	popCard () {
		if (this.getSize() >= 2) {
			this.cards[this.getSize() - 2].setInteractive().open();
			// this.setPosition(this.x, this.y);
			this.setSize(this.width, this.height - 0, true);
			// this.setDisplaySize(this.width, this.height - 20); // Zones aren't rendered
		} else {
			// this.setPosition(this.x, this.y);
			this.setSize(this.width, this.height, true);
			// this.setDisplaySize(this.width, this.height); // Zones aren't rendered
		}

		// this.border.setPosition(this.x, this.y);
		return super.popCard();
	}
}

function resizeRect (rect, w, h) {
	// This will properly resize a rectangle without scaling the stroke

	// Resize the rectangle and its geometry
	rect.geom.setSize(w, h);
	rect.setSize(w, h);

	// update internal data
	rect.updateDisplayOrigin().updateData();
}
