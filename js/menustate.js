var titlescreen;
var menuState = {
    create:function () {

        game.renderer.renderSession.roundPixels = true;
        Phaser.Canvas.setImageRenderingCrisp(game.canvas);
        titlescreen = game.add.sprite(game.world.centerX,game.world.centerY,'titlescreen');
        titlescreen.anchor.setTo(0.5,0.5);
    },
    upadate:function () {
        game.state.start('level1');
    }
};
