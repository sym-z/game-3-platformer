class Load extends Phaser.Scene {
    constructor() {
        super("Load");
    }

    preload() {
        this.load.setPath("./assets/");

        // Load tilemap information
        this.load.image("tilemap_tiles", "kenney_1-bit-platformer-pack/Tilemap/monochrome_tilemap_packed.png");                         // Packed tilemap
        this.load.tilemapTiledJSON("rough-draft", "rough-draft.tmj");   // Tilemap in JSON
    }
    create()
    {
        this.scene.start("LevelOne")
    }
}