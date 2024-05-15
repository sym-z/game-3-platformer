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
        game.sound.stopAll();
        this.globals = this.scene.get("Globals");
        console.log(this.globals.score)
        //this.map = this.add.tilemap("rough-draft", 16,16,159,39);
        //this.physics.world.setBounds(0,0,2560,640,true,true,true,true);
        this.map = this.make.tilemap({ key: 'rough-draft' });
        this.tileset = this.map.addTilesetImage("1bit-tileset", "tilemap_tiles")
        this.background = this.map.createLayer("Background", this.tileset, 0, 0);
        this.ground = this.map.createLayer("Ground", this.tileset, 0, 0);
        this.items = this.map.createLayer("Items", this.tileset, 0, 0);

        this.background.setScale(2.0);
        this.ground.setScale(2.0);
        this.items.setScale(2.0);

        this.ground.setCollisionByProperty(
            {
                collides: true
            }
        );
        this.background.setCollisionByProperty(
            {
                hurts: true
            }
        );
        this.items.setCollisionByProperty(
            {
                pickup: true
            }
        );

        // Pickup Coin and Key callbacks
        this.items.forEachTile((tile) => {
            tile.collisionCallback = ()=>{
                if (tile.properties.key)
                    {
                        this.key_pickup(tile)
                    }
                else
                {
                    this.coin_pickup(tile)

                }
            }
        })
        // Hurt callback
        this.background.forEachTile((tile) => {
            tile.collisionCallback = ()=>{
                if (tile.properties.hurts)
                    {
                        this.hurt();
                    }
                else
                {

                }
            }
        })

        this.player = new Player(this, 120,850,'idle1'); 
        this.player.setScale(2.0);

        // Can't do this bc scaling, unless a TA can help out.
        //this.player.setCollideWorldBounds(true);

       
       
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.player, this.items);
        this.physics.add.collider(this.player, this.background);

        this.player.anims.play('idle');
        
        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();
        this.cameras.main.scrollX = this.player.x - 400;

        this.step = this.sound.add('footfall');
    }
    update()
    {
        this.player.isMoving = false;
        // Lookahead Camera, with lerping.
        this.cameras.main.scrollY = this.player.y - 400;
        this.target = this.player.x - 400 + this.player.facing * 100;
        this.dx = this.target - this.cameras.main.scrollX;
        this.cameras.main.scrollX += this.dx * 0.065;

        // Clamp the player's movement speed.
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
        // Move the player.
        if (cursors.left.isDown)
        {
            this.player.body.setAccelerationX(-this.ACCELERATION); 
            this.player.setFlip(true, false);
            this.player.anims.play('walk', true);
            this.player.isMoving = true;
            this.player.facing = -1;

        } else if(cursors.right.isDown) {
            // TODO: have the player accelerate to the right

            this.player.body.setAccelerationX(this.ACCELERATION); 
            this.player.resetFlip();
            this.player.anims.play('walk', true);
            this.player.isMoving = true;
            this.player.facing = 1;

        } else {
            // TODO: set acceleration to 0 and have DRAG take over
            this.player.body.setAccelerationX(0); 
            this.player.body.setDragX(this.DRAG); 
            this.player.anims.play('idle', true);
            this.player.isMoving = false;
        }

        if(this.player.isMoving && !this.step.isPlaying && this.player.body.velocity.y == 0) 
            {
                this.step.play({loop: true});
            }
        else if (!this.player.isMoving && this.step.isPlaying || this.player.body.velocity.y)
            {
                this.step.stop();
            }

        // player jump
        // note that we need body.blocked rather than body.touching b/c the former applies to tilemap tiles and the latter to the "ground"
        if(!this.player.body.blocked.down) {
            this.player.anims.play('jump', true);
        }
        if(this.player.body.blocked.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.player.body.setVelocityY(this.JUMP_VELOCITY);
            this.sound.play("jump");
            // TODO: set a Y velocity to have the player "jump" upwards (negative Y direction)

        }

    }
    // Picking something up makes it invisible and turns its collision off.
    coin_pickup(tile)
    {
        tile.setCollision(false,false,false,false,true);
        tile.setVisible(false)
        this.globals.score += 1;
        this.sound.play("coin");
        console.log("coin pickup, score is: ", this.globals.score);

    }
    key_pickup(tile)
    {
        tile.setCollision(false,false,false,false,true);
        tile.setVisible(false)
        this.sound.play("key");
        console.log("key pickup")
        this.scene.start("Win")
    }
    // Instantly restarts level, I want to do a death anim but idk how yet.
    hurt()
    {
        //game.time.events.add(Phaser.Timer.SECOND*5,this.scene.start("LevelOne") , this);
        //var timer = this.time.delayedCall(50000000000000, this.scene.start("LevelOne"),null, this);  // delay in ms
        this.globals.score = 0;
        this.sound.play("death");
        this.scene.start("GameOver")
    }
}