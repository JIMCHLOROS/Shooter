var bootState = {
    preload:function() {
        game.load.image('titlescreen','assets/ironman_titlescreen.png');
        game.load.image('preloaderBar', 'assets/bar.png');
    },
    create:function(){
        game.stage.backgroundColor = '#5c94fc';
        game.state.start('loadstate');
    },
};
