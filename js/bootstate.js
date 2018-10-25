var titlescreen;
var bootState = {
    preload:function() {
        game.load.image('titlescreen','assets/ironman_titlescreen.jpg');
        game.load.image('Bar', 'assets/Bar.png');
    },
    create:function(){
        game.stage.backgroundColor = '#000';
        game.state.start('loadstate');
    },
};
