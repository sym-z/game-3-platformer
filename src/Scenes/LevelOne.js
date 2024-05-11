class LevelOne extends Phaser.Scene
{
    constructor()
    {
        super("LevelOne");
    }
    init()
    {

    }
    create()
    {
        //this.map = this.add.tilemap("rough-draft", 16,16,159,39);
        this.map = this.make.tilemap({key: 'rough-draft'});
        this.tileset = this.map.addTilesetImage("1bit-tileset", "tilemap_tiles")
        this.background = this.map.createLayer("Background", this.tileset,0,0);
        this.ground = this.map.createLayer("Ground", this.tileset,0,0);
        this.player = this.map.createLayer("Player", this.tileset,0,0);
        this.items = this.map.createLayer("Items", this.tileset,0,0);

        this.background.setScale(2.0);
        this.ground.setScale(2.0);
        this.player.setScale(2.0);
        this.items.setScale(2.0);

        // Move the camera down
        this.cameras.main.scrollY += 400;

    }
}