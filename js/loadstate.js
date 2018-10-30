var music;
var titlescreen;
var loadState = {
    preload:function(){
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;


        titlescreen = game.add.sprite(game.world.centerX,game.world.centerY,'titlescreen');
        titlescreen.anchor.setTo(0.5,0.5);
	titlescreen.width = 1700;titlescreen.height = 900;//1200,900

        game.preloadBar = this.add.sprite(this.world.centerX+160,this.world.centerY + 85,'Bar');
        game.preloadBar.anchor.setTo(0.5,0.5);
        game.load.setPreloadSprite(game.preloadBar);

        game.time.advancedTiming = true;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        game.stage.backgroundColor = '#5c94fc';

        game.load.audio('music', 'assets/music/music.mp3');
	game.load.bitmapFont('spacefont', 'assets/spacefont/spacefont.png', 'assets/spacefont/spacefont.xml');
	game.load.spritesheet('skip_button', 'assets/skip_button.png',256,256,2);    
	game.load.spritesheet('button', 'assets/button.png',640,622,2);	
	game.load.spritesheet('real_explosions', 'assets/real_fire.png',630,630,10);	
	game.load.spritesheet('explosion', 'assets/explode.png',128,128,16);	
        game.load.image('starfield', 'assets/space_1600x900.png');
	game.load.image('score_icon', 'assets/score_icon.png');
	game.load.image('life_icon', 'assets/life_icon.png');
	game.load.image('game_over_screen', 'assets/game_over_screen.jpg');
     	game.load.image('iron_man', 'assets/iron_man.png');
	game.load.image('bullet', 'assets/bullets/bullet.png');
	game.load.image('enemy_bullet', 'assets/bullets/real_bullet.png');
	game.load.spritesheet('enemy', 'assets/enemies/enemy_ship.png',411,223);
	game.load.spritesheet('enemy1', 'assets/enemies/enemy_ship_1.png',411,223);
	game.load.spritesheet('enemy2', 'assets/enemies/enemy_ship_2.png',1275,450);
	game.load.spritesheet('enemy3', 'assets/enemies/enemy_ship_3.png',1024,473);
	game.load.audio('fire', 'assets/music/fire_sound.mp3'); 
	game.load.audio('enemy_fire', 'assets/music/enemy_fire.mp3'); 
	game.load.audio('explode_snd', 'assets/music/sound_explosion.mp3');
	game.load.audio('level1_music', 'assets/music/level1_music.mp3');
	game.load.video('trailer', 'assets/video/Iron Man Suit Up.mp4');
    },
    update:function(){
        music = game.add.audio('music');
        music.play('',0,1,true);
        game.state.start('menustate');
    },
};
