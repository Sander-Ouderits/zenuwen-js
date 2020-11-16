import { AbstractStapel } from './stapels';
import { style } from './style';
import Phaser from 'phaser';

const colorStapelBorderIdle = style.colors.subtle.color32;
const colorStapelBorderGood = style.colors.hoverGood.color32;
const colorStapelBorderBad = style.colors.hoverBad.color32;

const cardDist = 2;
const cardWidth = 140;
const cardHeight = 190;
const padding = 10;

export class TrekStapel extends AbstractStapel {
	constructor (scene, x, y, width, height) {
		super(scene, x, y, cardWidth + padding * 2, cardHeight + padding * 2);

		scene.add.existing(this);

		// Make this stapel interactive, but not a dropzone
		this.setInteractive(undefined, undefined, false);

		this.cards = [];
		this.border = scene.add.rectangle(this.x, this.y + this.height, this.width, this.height).setFillStyle().setStrokeStyle(5, colorStapelBorderIdle, 1);
		this.border.setVisible(false);

		this.setOrigin(0.5, 1);
		this.border.setOrigin(0.5, 1);
	}

	addCard (card) {
		super.addCard(card);

		// Bring this card to the top
		this.scene.children.bringToTop(card);

		this.updateCards();
	}

	popCard () {
		const card = super.popCard();

		this.updateCards();

		return card;
	}

	dragEnter (cards) {
		this.border.setVisible(true);

		if (this.checkCards(cards)) {
			this.border.setStrokeStyle(5, colorStapelBorderGood, 1);
		} else if (this.cards.includes(cards[0])) {
			this.border.setVisible(false);
		} else {
			this.border.setStrokeStyle(5, colorStapelBorderBad, 1);
		}
	}

	dragLeave (cards) {
		this.border.setVisible(false);
	}

	setSize (width, height, resizeInput = true) {
		// this.border.setPosition(this.x, this.y);
		super.setSize(width, height, resizeInput);
		resizeRect(this.border, width, this.height);
	}

	checkCards (cards) {
		return false;
	}

	removeCard (card) {
		super.removeCard(card);
		this.updateCards();
	}

	updateCards () {
		for (let i = 0; i < this.cards.length; i++) {
			const card = this.cards[i];
			card.disableInteractive();
			card.setPosition(this.x, this.y + card.height / 2 + i * cardDist - padding);
		}
		if (this.cards.length >= 2) {
			const height = cardHeight + cardDist * (this.cards.length - 1) + padding * 2;
			this.setSize(cardWidth + padding * 2, height);
		} else {
			this.setSize(cardWidth + padding * 2, cardHeight + padding * 2);
		}

		if (this.cards.length === 0) {
			this.border.setStrokeStyle(5, colorStapelBorderIdle, 1);
			this.border.setVisible(true);
		} else {
			this.border.setVisible(false);
		}
	}

	shuffle () {
		// Modern Durstenfield shuffle
		for (let i = 0; i < this.cards.length; i++) {
			const j = Phaser.Math.RND.integerInRange(i, this.cards.length - 1);
			const card = this.cards[i];
			this.cards[i] = this.cards[j];
			this.cards[j] = card;
		}

		this.updateCards();
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
