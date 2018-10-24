var bootState = {
    preload:function() {
        game.load.image('titlescreen','assets/ironman_titlescreen.png');
        game.load.image('Bar', 'assets/Bar.png');
    },
    create:function(){
        game.stage.backgroundColor = '#5c94fc';
        game.state.start('loadstate');
    },
};
