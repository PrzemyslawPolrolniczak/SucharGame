import Obstacle from './components/obstacle';
import Collectable from './components/collectable';

export class MainScene extends Phaser.Scene { 
  private score: number = 0;
  private velocity: number = 150;
  private scoreText;

  constructor() {
    super({
      key: "MainScene"
    });
  }

  private cursors;
  private player;
  private music;
  private background;
  private obstacles = [];
  private collectable: Collectable;

  addObstacle(): void {
    this.obstacles.push( {obstacle: new Obstacle(this, () => this.endGame()), isSpawned: false} );
  }

  private endGame(): void {
    this.player.setVelocityX(0);
    this.player.setVelocityY(0);
    this.music.stop();
    this.scene.start('GameOverScene', {score: this.score, obstacles: Obstacle.spawned})
  }

  private collect(): void {
    this.velocity += 10;
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);
    this.velocity += 10;
  }

  init() {
    this.score = 0;
    Obstacle.spawned = 0;
    this.velocity = 150;
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create(): void {
    this.player = this.physics.add.image(100, 450, 'suchar');
    this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#FFF' });
    this.collectable = new Collectable(this, () => this.collect());
    this.collectable.setNewCollectable();
    this.music = this.sound.add("bgmusic");
    this.music.play();

    this.player.setVelocityX(this.velocity);
    this.player.setVelocityY(-this.velocity);

    setTimeout(() => {
      this.time.addEvent({
        delay: 940,
        callback: () => {
          this.cameras.main.setZoom(1.01);
          setTimeout(() => {
            this.cameras.main.setZoom(1);
          }, 50)
        },
        loop: true
      })
    }, 1000)

    const spawnTimeStamps = [
      5500,
      8900,
      13000,
      16500,
      18500,
      18850,
      19200,
      20600,
      22100,
      22700,
      23000,
      24400,
      26000,
      26500,
      26800,
      28400,
      30000,
      30300,
      31900,
      32200,
      32500,
      33000,
      33300,
      33600,
      34100,
      34400,
      34700,
      35200,
      35500,
      35800,
      36300,
      36600,
      36900,
      37400,
      37700,
      38000,
      38500,
      38800,
      39100,
      39600,
      39900,
      40200,
      40700,
      41000,
      41300,
      41800,
      42100,
      42400,
      42900,
      43200,
      43500,
      44000,
      44300,
      44600
    ]

    spawnTimeStamps.map(time => {
      this.time.delayedCall(time, this.addObstacle, [], this);
    })
  }

  update(): void {
    const { left, right, down, up } = this.cursors;

    if (left.isDown) {
      this.player.setVelocityX(-this.velocity);
    }
    if (right.isDown) {
      this.player.setVelocityX(this.velocity);
    }
    if (down.isDown) {
      this.player.setVelocityY(this.velocity);
    }
    if (up.isDown) {
      this.player.setVelocityY(-this.velocity);
    }

    this.obstacles && this.obstacles.map(item => {
      if (item.isSpawned && (item.obstacle.getXCord() <= -25 || item.obstacle.getXCord() >= 825 || item.obstacle.getYCord() >= 625)) {
        item.obstacle.destroy();
        const itemIndex = this.obstacles.indexOf(item);
        this.obstacles.splice(itemIndex);
      } else if (!item.isSpawned) {
        item.obstacle.spawn();
        item.isSpawned = true;
      }
    })

    const isPlayerTouchingBoundry: boolean = this.player.x <= 15 || this.player.y <= 15 || this.player.x >= 800 - 15 || this.player.y >= 600 - 15;

    if (isPlayerTouchingBoundry) {
      this.endGame();
    }
  }
}
