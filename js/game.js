var game = new Phaser.Game(1200, 800, Phaser.AUTO, 'phaser-demo');
       game.state.add('bootstate',bootstate);
       game.state.add('loadstate',loadstate);
       game.state.add('menustate',menustate);
       game.state.add('level1',level1);
		   game.state.start('bootstate');
