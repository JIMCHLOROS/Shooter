Game.Preloader = function(game){
};
var titlescreen;
var choice = false;
var mutechoice = false;
Game.Preloader.prototype = {
    preload:function(game){

        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;


        titlescreen = game.add.sprite(game.world.centerX,game.world.centerY,'ironman_titlescreen');
        titlescreen.anchor.setTo(0.5,0.5);

        this.preloadBar = this.add.sprite(this.world.centerX,this.world.centerY + 85,'preloaderBar');
        this.preloadBar.anchor.setTo(0.5,0.5);
        this.load.setPreloadSprite(this.preloadBar);

        this.time.advancedTiming = true;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        this.stage.backgroundColor = '#5c94fc';


    },
    update:function(){

        this.state.start('MainMenu')
    },
};
