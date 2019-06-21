/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      Digitsensitive
 */

export class MainScene extends Phaser.Scene {
  constructor() {
    super({
      key: "MainScene"
    });
  }

  private cursors;
  private player;
  private velocity: number;
  private collectables;
  private score: number = 0;
  private scoreText;
  private music;
  private obstacle;
  private isDead: boolean = false;
  private number: number = 0;
  private background;

  setRandomCords(screenWidth: number, screenHeight: number): number[] {
    let x = Math.floor(Math.random() * screenWidth);
    let y = Math.floor(Math.random() * screenHeight);

    if (x >= screenWidth - 25) {
      x -= 25;
    } else if (x <= 25) {
      x += 25;
    }

    if (y >= screenHeight - 25) {
      y -= 25;
    } else if (y <= 25) {
      y += 25;
    }

    return [x, y];
  }

  setNewCollectable(): void {
    const cords = this.setRandomCords(800, 600);
    this.collectables = this.physics.add.image(cords[0], cords[1], "archive")
    this.physics.add.overlap(this.player, this.collectables, this.collect, null, this)
  }

  collect(player, collectable): void {
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);
    collectable.disableBody(true, true);
    this.velocity += 10;
    this.setNewCollectable()
  }

  die(player, obstacle) {
    this.endGame();
    this.isDead = true;
  }

  endGame() {
    this.player.setVelocityX(0);
    this.player.setVelocityY(0);
    this.music.stop();
    this.scene.start('GameOverScene', {score: this.score, obstacles: this.number})
  }

  spawnObstacle() {
    console.log(this.number);
    const cords = this.setRandomCords(800, 600);
    this.obstacle = this.physics.add.image(cords[0], -50, "toomuch");
    this.obstacle.setVelocityX( (Math.random() - 0.5) * 100);
    this.obstacle.setVelocityY(100);
    this.physics.add.overlap(this.player, this.obstacle, this.die, null, this)
    this.number++;
  }

  init() {
    this.score = 0;
    this.number = 0;
    this.cursors = this.input.keyboard.createCursorKeys();

  }

  preload(): void {
    this.load.audio("sucharbg", "./src/boilerplate/music/sucharbg.png");
    this.load.image("archive", "./src/boilerplate/assets/archive.png");
    this.load.image("toomuch", "./src/boilerplate/assets/toomuch.png");
    this.load.image("suchar", "./src/boilerplate/assets/suchar.png");
    this.load.audio("bgmusic", "./src/boilerplate/music/bgmusic.mp3");
  }

  create(): void {
    this.background = this.add.tileSprite(0, 0, 800, 600, 'sucharbg');
    this.player = this.physics.add.image(100, 450, 'suchar');
    this.setNewCollectable();
    this.velocity = 150;
    this.music = this.sound.add("bgmusic");
    this.music.play();
    this.scoreText = this.add.text(16, 16, 'SCORE: 0', { fontSize: '32px', fill: '#FFF' });

    this.player.setVelocityX(this.velocity);
    this.player.setVelocityY(-this.velocity);

    setTimeout(() => {
      this.time.addEvent({
        delay: 940,
        callback: () => {
          this.cameras.main.setZoom(1.01);
          this.cameras.main.setZoom(1.02);
          setTimeout(() => {
            this.cameras.main.setZoom(1);
          }, 50)
        },
        loop: true
      })
    }, 1000)
    

    this.time.delayedCall(5500, this.spawnObstacle, [], this);
    this.time.delayedCall(8900, this.spawnObstacle, [], this);
    this.time.delayedCall(13000, this.spawnObstacle, [], this);
    this.time.delayedCall(16500, this.spawnObstacle, [], this);
    this.time.delayedCall(18500, this.spawnObstacle, [], this);
    this.time.delayedCall(19200, this.spawnObstacle, [], this);
    this.time.delayedCall(19500, this.spawnObstacle, [], this);
    this.time.delayedCall(20600, this.spawnObstacle, [], this);
    this.time.delayedCall(22100, this.spawnObstacle, [], this);
    this.time.delayedCall(22700, this.spawnObstacle, [], this);
    this.time.delayedCall(23000, this.spawnObstacle, [], this);
    this.time.delayedCall(24400, this.spawnObstacle, [], this);
    this.time.delayedCall(26000, this.spawnObstacle, [], this);
    this.time.delayedCall(26500, this.spawnObstacle, [], this);
    this.time.delayedCall(26800, this.spawnObstacle, [], this);
  }

  update(): void {
    if (!this.isDead) {
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-this.velocity);
      }
      if (this.cursors.right.isDown) {
        this.player.setVelocityX(this.velocity);
      }
      if (this.cursors.down.isDown) {
        this.player.setVelocityY(this.velocity);
      }
      if (this.cursors.up.isDown) {
        this.player.setVelocityY(-this.velocity);
      }

      const isPlayerTouchingBoundry: boolean = this.player.x <= 15 || this.player.y <= 15 || this.player.x >= 800 - 15 || this.player.y >= 600 - 15;

      if (isPlayerTouchingBoundry) {
        this.endGame();
      }
    }
  }
}
