var Game = {};
Game.Boot = function(game){};
Game.Boot.prototype = {
    init:function() {
        this.input.maxPointer = 1;
        this.stage.disableVisibilityChange = true;
    },
    preload:function() {
    },
    create:function(){
        this.stage.backgroundColor = '#5c94fc';
        this.state.start('Preloader');
    },

};
