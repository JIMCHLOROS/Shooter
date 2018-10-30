var game = new Phaser.Game(1700, 900, Phaser.AUTO, 'gameDiv');//1200,800
       game.state.add('bootstate', bootState);
       game.state.add('loadstate', loadState);
       game.state.add('menustate', menuState);
       game.state.add('playstate', playState);
       game.state.start('bootstate');
