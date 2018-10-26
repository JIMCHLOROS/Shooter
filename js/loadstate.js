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

        
	game.load.spritesheet('button', 'assets/button.png',640,622,2);		
        game.load.image('starfield', 'assets/space.png');
     	game.load.image('iron_man', 'assets/iron_man.png');
	game.load.image('bullet', 'assets/bullets/bullet.png');
	game.load.image('enemy', 'assets/enemies/enemy_ship.png');
	game.load.image('enemy1', 'assets/enemies/enemy_ship_1.png');
	game.load.image('enemy2', 'assets/enemies/enemy_ship_2.png');
        game.load.audio('music', 'assets/music/music.mp3');
	game.load.audio('fire', 'assets/music/fire_sound.mp3'); 
    },
    update:function(){
        music = game.add.audio('music');
        //music.play('',0,1,true);
        game.state.start('menustate');
    },
};
