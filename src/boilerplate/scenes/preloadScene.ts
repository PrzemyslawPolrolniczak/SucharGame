export class PreloadScene extends Phaser.Scene {
    constructor() {
        super({
            key: "PreloadScene"
        });
    }

    create(): void {
        this.add.text(16, 16, 'Press any button to start the game', { fontSize: '32px', fill: '#FFF' });
        this.input.keyboard.on('keydown', () => this.scene.start('MainScene'))
    }
}