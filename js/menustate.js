var titlescreen;
var video;
var menuState = {
    create:function () {
        game.stage.backgroundColor = "#000";
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
             game.add.text(30, game.height-60, '-Μας επιτίθενται εξωγήινοι!! \n -Κλείσε θα σε πάρω μετά!', {fill : 'white',font : '24px Roboto'});
             music.stop(0);
             titlescreen.destroy();
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
