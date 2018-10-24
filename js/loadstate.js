var titlescreen;
var loadState = {
    preload:function(){
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;


        titlescreen = game.add.sprite(game.world.centerX,game.world.centerY,'titlescreen');
        titlescreen.anchor.setTo(0.5,0.5);

        game.preloadBar = this.add.sprite(this.world.centerX,this.world.centerY + 85,'Bar');
        game.preloadBar.anchor.setTo(0.5,0.5);
        game.load.setPreloadSprite(game.preloadBar);

        game.time.advancedTiming = true;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        game.stage.backgroundColor = '#5c94fc';

        
			
        game.load.image('starfield', 'assets/starfield.png');
     	game.load.image('iron_man', 'assets/iron_man.png');
	    game.load.image('bullet', 'assets/bullets/bullet.png');
        game.load.audio('music', 'assets/music/iron-man-8-bit-tribute-to-black-sabbath-8-bit-universe.mp3');
    },
    update:function(){

        game.state.start('menustate')
    },
};
