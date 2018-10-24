var bootstate = {
    preload:function() {
        this.load.image('titlescreen','assets/ironman_titlescreen.png');
        this.load.image('preloaderBar', 'assets/bar.png');
    },
    create:function(){
        this.stage.backgroundColor = '#5c94fc';
        this.state.start('loadstate');
    },
};
