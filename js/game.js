var game = new Phaser.Game(1200, 800, Phaser.AUTO, 'gameDiv');
       game.state.add('bootstate', bootState);
       game.state.add('loadstate', loadState);
       game.state.add('menustate', menuState);
       game.state.add('level1', playState);
       game.state.start('bootstate');
