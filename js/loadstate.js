var titlescreen;
var loadState = {
    preload:function(){
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;


        titlescreen = game.add.sprite(game.world.centerX,game.world.centerY,'ironman_titlescreen');
        titlescreen.anchor.setTo(0.5,0.5);

        game.preloadBar = this.add.sprite(this.world.centerX,this.world.centerY + 85,'Bar');
        game.preloadBar.anchor.setTo(0.5,0.5);
        game.load.setPreloadSprite(game.preloadBar);

        game.time.advancedTiming = true;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        game.stage.backgroundColor = '#5c94fc';


    },
    update:function(){

        game.state.start('menustate')
    },
};
