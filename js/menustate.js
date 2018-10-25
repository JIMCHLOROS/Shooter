var titlescreen;
var menuState = {
    create:function () {
        titlescreen = game.add.sprite(game.world.centerX,game.world.centerY,'titlescreen');
        titlescreen.anchor.setTo(0.5,0.5);
        titlescreen.width = 1200;titlescreen.height = 800;
    },
    update:function () {
        game.state.start('playstate');
    }
};
