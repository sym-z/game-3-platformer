class LevelOne extends Phaser.Scene
{
    constructor()
    {
        super("LevelOne");
    }
    init()
    {
        this.ACCELERATION = 4000;
        this.MAX_SPEED = 350;
        this.DRAG = 3000;
        this.JUMP_VELOCITY = -700;
        this.physics.world.gravity.y = 2000;
    }
    create()
    {
        //this.map = this.add.tilemap("rough-draft", 16,16,159,39);
        //this.physics.world.setBounds(0,0,2560,640,true,true,true,true);
        this.map = this.make.tilemap({ key: 'rough-draft' });
        this.tileset = this.map.addTilesetImage("1bit-tileset", "tilemap_tiles")
        this.background = this.map.createLayer("Background", this.tileset, 0, 0);
        this.ground = this.map.createLayer("Ground", this.tileset, 0, 0);
        this.player = this.map.createLayer("Player", this.tileset, 0, 0);
        this.items = this.map.createLayer("Items", this.tileset, 0, 0);

        this.background.setScale(2.0);
        this.ground.setScale(2.0);
        this.player.setScale(2.0);
        this.items.setScale(2.0);

        this.ground.setCollisionByProperty(
            {
                collides: true
            }
        );
        // Move the camera down
        //this.cameras.main.scrollY += 400;

        this.player = this.physics.add.sprite(120, 850, 'idle1');
        this.player.setScale(2.0);
        //this.player.setCollideWorldBounds(true);

        this.physics.add.collider(this.player, this.ground);

        this.player.anims.play('idle');
        
        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();
    }
    update()
    {
        this.cameras.main.scrollY = this.player.y - 400;
        this.cameras.main.scrollX = this.player.x - 400;

        if(Math.abs(this.player.body.velocity.x) > this.MAX_SPEED)
            {
                if(this.player.body.velocity.x > 0)
                {
                    this.player.body.velocity.x = this.MAX_SPEED;
                }
                else
                {
                    this.player.body.velocity.x = -this.MAX_SPEED;
                }
            }
        if (cursors.left.isDown)
        {
            this.player.body.setAccelerationX(-this.ACCELERATION); 
            this.player.setFlip(true, false);
            this.player.anims.play('walk', true);

        } else if(cursors.right.isDown) {
            // TODO: have the player accelerate to the right

            this.player.body.setAccelerationX(this.ACCELERATION); 
            this.player.resetFlip();
            this.player.anims.play('walk', true);

        } else {
            // TODO: set acceleration to 0 and have DRAG take over
            this.player.body.setAccelerationX(0); 
            this.player.body.setDragX(this.DRAG); 
            this.player.anims.play('idle', true);
        }

        // player jump
        // note that we need body.blocked rather than body.touching b/c the former applies to tilemap tiles and the latter to the "ground"
        if(!this.player.body.blocked.down) {
            this.player.anims.play('jump', true);
        }
        if(this.player.body.blocked.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.player.body.setVelocityY(this.JUMP_VELOCITY);
            // TODO: set a Y velocity to have the player "jump" upwards (negative Y direction)

        }





    }
}