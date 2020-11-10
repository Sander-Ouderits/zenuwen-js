import Phaser from 'phaser';
import { Card } from '../card';
import { TrekStapel, TrekStapel2 } from '../stapels';
import { style } from '../style';

export default class Game extends Phaser.Scene {
	constructor () {
		super('game'); // id of Scene
	}

	preload () {
		// this.load.setBaseURL('http://labs.phaser.io'); // Files are now hosted locally
		this.load.image('cardback', 'assets/PNG/Cards/cardBack_green3.png');
		this.load.atlasXML('playingCards', 'assets/Spritesheets/playingCards.png', 'assets/Spritesheets/playingCards.xml');
	}

	create () {
		const self = this;

		this.stapel1 = new TrekStapel(this, 300, 100, 150, 220);
		this.stapel2 = new TrekStapel(this, 500, 100, 150, 220);
		this.stapel3 = new TrekStapel(this, 700, 100, 150, 220);
		this.stapel11 = new TrekStapel2(this, 300, 500, 150, 220);
		this.stapel12 = new TrekStapel2(this, 500, 500, 150, 220);
		this.stapel13 = new TrekStapel2(this, 700, 500, 150, 220);

		/*
		 * Deal cards button
		 */

		this.dealCards = () => {
			for (let i = 0; i < 10; i++) {
				this.stapel1.addCard(
					new Card(this, 0, 0, i + 1, 'C'),
				);
				this.stapel11.addCard(
					new Card(this, 0, 0, i + 1, 'C'),
				);
				this.stapel2.addCard(
					new Card(this, 0, 0, i + 1, 'C'),
				);
				this.stapel12.addCard(
					new Card(this, 0, 0, i + 1, 'C'),
				);
				this.stapel3.addCard(
					new Card(this, 0, 0, i + 1, 'C'),
				);
				this.stapel13.addCard(
					new Card(this, 0, 0, i + 1, 'C'),
				);
			}
			for (let i = 0; i < 10; i++) {
				this.stapel2.addCard(
					new Card(this, 0, 0, i + 1, 'C'),
				);
				this.stapel12.addCard(
					new Card(this, 0, 0, i + 1, 'C'),
				);
				this.stapel3.addCard(
					new Card(this, 0, 0, i + 1, 'C'),
				);
				this.stapel13.addCard(
					new Card(this, 0, 0, i + 1, 'C'),
				);
			}
			for (let i = 0; i < 10; i++) {
				this.stapel3.addCard(
					new Card(this, 0, 0, i + 1, 'C'),
				);
				this.stapel13.addCard(
					new Card(this, 0, 0, i + 1, 'C'),
				);
			}
		};

		this.dealText = this.add.text(75, 350, ['Add 5 cards']).setFontSize(20).setColor(style.colors.textColor).setInteractive();
		this.dealText.setFontFamily('sans-serif');

		this.dealText.on('pointerdown', function () {
			self.dealCards();
		});

		this.dealText.on('pointerover', function () {
			self.dealText.setColor(style.colors.textHover);
		});

		this.dealText.on('pointerout', function () {
			self.dealText.setColor(style.colors.textColor);
		});

		/*
		 * Stop button
		 */

		this.stopText = this.add.text(1000, 350, ['Stop']).setFontSize(20).setColor(style.colors.textColor).setInteractive();
		this.stopText.setFontFamily('sans-serif');

		this.stopText.on('pointerdown', function () {
			this.scene.start('gameEnd');
		}, this);

		this.stopText.on('pointerover', function () {
			self.stopText.setColor(style.colors.textHover);
		});

		this.stopText.on('pointerout', function () {
			self.stopText.setColor(style.colors.textColor);
		});

		/*
		 * Pause button
		 */

		this.pauseText = this.add.text(1000, 370, ['Pause']).setFontSize(20).setColor(style.colors.textColor).setInteractive();
		this.pauseText.setFontFamily('sans-serif');

		this.pauseText.on('pointerdown', function () {
			this.scene.switch('pauseMenu');
		}, this);

		this.pauseText.on('pointerover', function () {
			self.pauseText.setColor(style.colors.textHover);
		});

		this.pauseText.on('pointerout', function () {
			self.pauseText.setColor(style.colors.textColor);
		});
	}
}
