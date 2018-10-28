var titlescreen;
var video;
var text;
var menuState = {
    create:function () {
        //game.renderer.renderSession.roundPixels = true;
        //Phaser.Canvas.setImageRenderingCrisp(game.canvas);
        text = game.add.bitmapText(game.height-30, 20,'spacefont','-Μας επιτίθενται εξωγήινοι!! \n -Μισό...ντύνομαι και έρχομαι!',28);
        text.visable = false;
        video = game.add.video('trailer');
        video.onComplete.add(function (){
          video.stop(0);
          this.state.start('playstate');
        },this);
         video.onPlay.add(function(){
           this.createButton(game,"skip_button",game.width-60,game.height-50,70,70,
            function(){
              video.stop(0);
              this.state.start('playstate');
              });
             music.stop(0);
             titlescreen.destroy();
             text.visable = true;
             game.stage.backgroundColor = "#000";
          },this);
        
        titlescreen = game.add.sprite(game.world.centerX,game.world.centerY,'titlescreen');
        titlescreen.anchor.setTo(0.5,0.5);
        titlescreen.width = 1200;titlescreen.height = 800;
        this.createButton(game,"button",game.world.centerX+180,game.world.centerY + 30,160,155,
            function(){
                video.play(false);
                video.addToWorld();
                //this.state.start('playstate');
         });
    },
    update:function () {
    },
    createButton:function (game,string,x,y,w,h,callback) {
        var button1 = game.add.button(x,y,string,callback,this,0,0,1);
        button1.anchor.setTo(0.5,0.5);
        button1.width = w;
        button1.height = h;

    }
};
