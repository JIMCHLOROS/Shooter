var titlescreen;
var bootState = {
    preload:function() {
        game.load.image('titlescreen','assets/ironman_titlescreen.jpg');
        game.load.image('Bar', 'assets/Bar.png');
        titlescreen = game.add.sprite(game.world.centerX,game.world.centerY,'titlescreen');
        titlescreen.anchor.setTo(0.5,0.5);
        titlescreen.width = 1200;titlescreen.height = 800;
    },
    create:function(){
        //game.stage.backgroundColor = '#5c94fc';
        game.state.start('loadstate');
    },
};
