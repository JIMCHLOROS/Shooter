var titlescreen;
var video;
var menuState = {
    create:function () {
        //game.renderer.renderSession.roundPixels = true;
        //Phaser.Canvas.setImageRenderingCrisp(game.canvas);
        video = game.add.video('trailer');
        video.onComplete.add(function (){
          this.state.start('playstate');
        },this);
        video.onPlay.add(function(){
        this.createButton(game,"",game.width-30,30,40,40,
            function(){
                video.stop(0);
                this.state.start('playstate');
         },this);
        });
        titlescreen = game.add.sprite(game.world.centerX,game.world.centerY,'titlescreen');
        titlescreen.anchor.setTo(0.5,0.5);
        titlescreen.width = 1200;titlescreen.height = 800;
        this.createButton(game,"",game.world.centerX+180,game.world.centerY + 30,160,155,
            function(){
                video.play(true);
                video.addToWorld();
                //this.state.start('playstate');
         });
    },
    update:function () {
    },
    createButton:function (game,string,x,y,w,h,callback) {
        var button1 = game.add.button(x,y,'button',callback,this,0,0,1);
        button1.anchor.setTo(0.5,0.5);
        button1.width = w;
        button1.height = h;
         //put a text in button
        var txt = game.add.text(button1.x,button1.y, string,{font:"40px",fill:"#fff",aling:"center"});
        txt.anchor.setTo(0.5,0.5);

    }
};
