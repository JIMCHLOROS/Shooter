var titlescreen;
var menuState = {
    create:function () {

        game.renderer.renderSession.roundPixels = true;
        Phaser.Canvas.setImageRenderingCrisp(game.canvas);
        titlescreen = game.add.sprite(game.world.centerX,game.world.centerY,'ironman_titlescreen');
        titlescreen.anchor.setTo(0.5,0.5);
        music = game.add.audio('music');
        music.play('',0,1,true);

    },
    upadate:function () {
        game.state.start('level1')
    }
};
