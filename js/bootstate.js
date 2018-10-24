var bootState = {
    preload:function() {
        game.load.image('titlescreen','assets/ironman_titlescreen.jpg');
        var titlescreen = game.add.sprite(game.world.centerX,game.world.centerY,'ironman_titlescreen');
        titlescreen.anchor.setTo(0.5,0.5);
        game.load.image('Bar', 'assets/Bar.png');
    },
    create:function(){
        game.stage.backgroundColor = '#5c94fc';
        game.state.start('loadstate');
    },
};
