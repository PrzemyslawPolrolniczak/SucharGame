export class PreloadScene extends Phaser.Scene {
    constructor() {
        super({
            key: "PreloadScene"
        });
    }

    preload(): void {
        this.load.image("archive", "./src/boilerplate/assets/archive.png");
        this.load.image("toomuch", "./src/boilerplate/assets/toomuch.png");
        this.load.image("suchar", "./src/boilerplate/assets/suchar.png");
        this.load.audio("bgmusic", "./src/boilerplate/music/bgmusic.mp3");
    }

    create(): void {
        this.add.text(16, 16, 'Press any button to start the game', { fontSize: '32px', fill: '#FFF' });
        this.input.keyboard.on('keydown', () => this.scene.start('MainScene'))
    }
}