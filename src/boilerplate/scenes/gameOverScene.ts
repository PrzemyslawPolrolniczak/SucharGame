export class GameOverScene extends Phaser.Scene {
    private score;
    private obstacles;
    constructor() {
        super({
            key: "GameOverScene"
        });
    }

    init(data) {
        this.score = data.score
        this.obstacles = data.obstacles
    }

    preload(): void {
        
    }

    create(): void {
        this.add.text(16, 16, 'Game over', { fontSize: '32px', fill: '#FFF' });
        this.add.text(16, 52, `Your score was: ${this.score}`, { fontSize: '32px', fill: '#FFF' });
        this.add.text(16, 88, `There was ${this.obstacles} obstacles spawned`, { fontSize: '32px', fill: '#FFF' });
        this.input.on('pointerdown', () => this.scene.start('PreloadScene'))
    }
}