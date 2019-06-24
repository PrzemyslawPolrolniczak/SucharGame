import { setRandomCords } from '../../utils'; 

export default class Obstacle {
    private obstacle;
    private physics;
    private player;
    private onCollision;

    public static spawned: number = 0;

    constructor(scene, onCollision: Function) {
        this.physics = scene.physics;
        this.player = scene.player;
        this.onCollision = onCollision;
    }

    public spawn(): void {
        const cords = setRandomCords();
        this.obstacle = this.physics.add.image(cords[0], -50, "toomuch");
        this.obstacle.setVelocityX( (Math.random() - 0.5) * 100);
        this.obstacle.setVelocityY(100);
        this.physics.add.overlap(this.player, this.obstacle, this.onCollision, null, this);
        Obstacle.spawned++;
    }

    public destroy(): void {
        this.obstacle.disableBody(true, true);
    }

    public getXCord(): number {
        return this.obstacle.x;
    }

    public getYCord(): number {
        return this.obstacle.y;
    }

    public getSpawnedCount(): number {
        return Obstacle.spawned
    }
}