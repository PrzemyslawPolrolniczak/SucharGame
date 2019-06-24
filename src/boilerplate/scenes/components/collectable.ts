import { setRandomCords } from '../../utils';

export default class Collectable {
    private collectable;
    private physics;
    private player;
    private onCollect;

    constructor(scene, onCollect: Function) {
        this.physics = scene.physics;
        this.player = scene.player;
        this.onCollect = onCollect;
    }

    collect(player, collectable): void {
        this.onCollect();
        collectable.disableBody(true, true);
        this.setNewCollectable();
    }

    setNewCollectable(): void {
        const cords = setRandomCords();
        this.collectable = this.physics.add.image(cords[0], cords[1], "archive")
        this.physics.add.overlap(this.player, this.collectable, this.collect, null, this)
    }
}