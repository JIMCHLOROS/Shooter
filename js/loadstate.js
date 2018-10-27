var music;
var titlescreen;
var loadState = {
    preload:function(){
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;


        titlescreen = game.add.sprite(game.world.centerX,game.world.centerY,'titlescreen');
        titlescreen.anchor.setTo(0.5,0.5);
	titlescreen.width = 1200;titlescreen.height = 800;

        game.preloadBar = this.add.sprite(this.world.centerX+160,this.world.centerY + 85,'Bar');
        game.preloadBar.anchor.setTo(0.5,0.5);
        game.load.setPreloadSprite(game.preloadBar);

        game.time.advancedTiming = true;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        game.stage.backgroundColor = '#5c94fc';

        
	game.load.bitmapFont('spacefont', 'assets/spacefont/spacefont.png', 'assets/spacefont/spacefont.fnt');
	game.load.spritesheet('button', 'assets/button.png',640,622,2);	
	game.load.spritesheet('explosion', 'assets/explode.png',128,128,16);	
        game.load.image('starfield', 'assets/space.png');
     	game.load.image('iron_man', 'assets/iron_man.png');
	game.load.image('bullet', 'assets/bullets/bullet.png');
	game.load.spritesheet('enemy', 'assets/enemies/enemy_ship.png',411,223);
	game.load.spritesheet('enemy1', 'assets/enemies/enemy_ship_1.png',411,223);
	game.load.spritesheet('enemy2', 'assets/enemies/enemy_ship_2.png',1275,450);
	game.load.spritesheet('enemy3', 'assets/enemies/enemy_ship_3.png',1024,473);
        game.load.audio('music', 'assets/music/music.mp3');
	game.load.audio('fire', 'assets/music/fire_sound.mp3'); 
    },
    update:function(){
        music = game.add.audio('music');
        //music.play('',0,1,true);
        game.state.start('menustate');
    },
};
