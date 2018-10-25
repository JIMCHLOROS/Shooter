var titlescreen;
var menuState = {
    create:function () {
        titlescreen = game.add.sprite(game.world.centerX,game.world.centerY,'titlescreen');
        titlescreen.anchor.setTo(0.5,0.5);
        titlescreen.width = 1200;titlescreen.height = 800;
        this.createButton(game,"PLAY",game.world.centerX+160,game.world.centerY + 85,100,100,
            function(){
                this.state.start('playstate');
         });
    },
    update:function () {
    },
    createButton:function (game,string,x,y,w,h,callback) {
        var button1 = game.add.button(x,y,'button',callback,this,0,1,0);
        button1.anchor.setTo(0.5,0.5);
        button1.weight = w;
        button1.height = h;
         //put a text in button
        var txt = game.add.text(button1.x,button1.y, string,{font:"40px",fill:"#fff",aling:"center"});
        txt.anchor.setTo(0.5,0.5);

    },
};
