var finalState ={
             
		preload:function() {
		},
		create:function() {
			
			starfield = game.add.tileSprite(0, 0, 1700, 900, 'starfield2');
			//  Our bullet group
			bullets = game.add.group();
			bullets.enableBody = true;
			bullets.physicsBodyType = Phaser.Physics.ARCADE;
			bullets.createMultiple(30, 'bullet');
			bullets.setAll('anchor.x', 0.5);
			bullets.setAll('anchor.y', 1);
			bullets.setAll('outOfBoundsKill', true);
			bullets.setAll('checkWorldBounds', true);
			
			//  The hero!
			player = game.add.sprite(100, game.height / 2, 'iron_man');
			player.anchor.setTo(0.5, 0.5);
			player.health = 100;
			player.width = 100;
			player.height = 50;
			player.weaponLevel = 1;//NEW
			player.events.onKilled.add(function(){
			    shipTrail.kill();
			    shipTrail2.kill();
			});
			player.events.onRevived.add(function(){
		            shipTrail.start(false, 1, 5);
			    shipTrail2.start(false, 1, 5);
		        });
			game.physics.enable(player, Phaser.Physics.ARCADE);
			player.body.maxVelocity.setTo(MAXSPEED, MAXSPEED);
			//player.body.setSize(player.width , player.height * 3 / 4);
			player.body.drag.setTo(DRAG, DRAG);
			//  And some controls to play the game with
			cursors = game.input.keyboard.createCursorKeys();
			fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			//  Add an emitter for the ship's trail
			shipTrail = game.add.emitter(player.x - 20, player.y, 1);
			shipTrail.makeParticles('bullet');
                        shipTrail.setAlpha(1, 0, 3000);
			shipTrail.setRotation(0, 0);
                        shipTrail.setScale(0.8, 0, 0.8, 0, 2000,Phaser.Easing.Quintic.Out);
                        shipTrail.start(false, 1, 5);
			
			shipTrail2 = game.add.emitter(player.x - 20, player.y, 1);
			shipTrail2.makeParticles('bullet');
                        shipTrail2.setAlpha(1, 0, 3000);
			shipTrail2.setRotation(0, 0);
                        shipTrail2.setScale(0.8, 0, 0.8, 0, 2000,Phaser.Easing.Quintic.Out);
                        shipTrail2.start(false, 1, 5);
			///######### boss
			boss = game.add.group();
			boss.createMultiple(1, 'enemy2');
			boss.setAll('anchor.x', 0.5);
			boss.setAll('anchor.y', 0.5);
			boss.setAll('angle', 180);
			boss.forEach(function(boss){
				boss.enableBody = true;
				game.physics.enable(boss, Phaser.Physics.ARCADE);
				addBossTrail(boss);
				boss.damageAmount = 30;
                        });
			
			life_icon = game.add.sprite(game.world.width - 100,30,'life_icon');
			life_icon.anchor.setTo(0.5,0.5);
			life_icon.width = 40;life_icon.height = 40;
			
                        shields = game.add.bitmapText(game.world.width - 80, 10, 'spacefont', '' + player.health , 40);
			shields.render = function () {
                                shields.text = Math.max(player.health, 0);
                            };
			shields.render();
			
			addGameOverTitle();
			
			gameOver = game.add.bitmapText(game.world.centerX, game.world.centerY, 'spacefont', 'GAME OVER', 110);
			gameOver.x = gameOver.x - gameOver.textWidth / 2;
			gameOver.y = gameOver.y - gameOver.textHeight / 3;
                        gameOver.visible = false;
			
			     //  Score
			score_icon = game.add.sprite(30,30,'score_icon');
			score_icon.anchor.setTo(0.5,0.5);
			score_icon.width = 40;score_icon.height = 40;
			
                            scoreText = game.add.bitmapText(60, 10, 'spacefont', '', 40)
                            scoreText.render = function () {
                               scoreText.text = score;
                            };
                            scoreText.render();
			
		},
		update:function() {
			starfield.tilePosition.x -= 5;
			//  Reset the player, then check for movement keys
			player.body.acceleration.y = 0;
			player.body.acceleration.x = 0;
			if (cursors.up.isDown) {
				player.body.acceleration.y = -ACCLERATION;
			} else if (cursors.down.isDown) {
				player.body.acceleration.y = ACCLERATION;
			} else if (cursors.left.isDown) {
				player.body.acceleration.x = -ACCLERATION;
			} else if (cursors.right.isDown) {
				player.body.acceleration.x = ACCLERATION;
			}
			//  Fire bullet
			if (player.alive && fireButton.isDown) {
				fireBullet();
			}
			//  Stop at screen edges
			if (player.x > game.width - 30) {
				player.x = game.width - 30;
				player.body.acceleration.x = 0;
			}
			if (player.x < 30) {
				player.x = 30;
				player.body.acceleration.x = 0;
			}
			if (player.y > game.height - 15) {
				player.y = game.height - 15;
				player.body.acceleration.y = 0;
			}
			if (player.y < 15) {
				player.y = 15;
				player.body.acceleration.y = 0;
			}
			//  Fire bullet
			if (player.alive && fireButton.isDown) {
				fireBullet();
			}
			//  Keep the shipTrail lined up with the ship
			shipTrail.y = player.y + 6;//+13
			shipTrail.x = player.x - 65;//45
			
			shipTrail2.y = player.y + 16;//+13
			shipTrail2.x = player.x - 75;//45
			//Game Over
			if (! player.alive && gameOver.visible === false) {
			        game.time.events.add(2000, function () {if(!player.alive){game_over_title.visible = true;}});
                                gameOver.visible = true;
				gameOver.alpha = 0;
			        var fadeInGameOver = game.add.tween(gameOver);
			        fadeInGameOver.to({alpha: 1}, 1000, Phaser.Easing.Quintic.Out);
			        fadeInGameOver.onComplete.add(setResetHandlers);
			        fadeInGameOver.start();
			        function setResetHandlers() {
			            //  The "click to restart" handler
			            tapRestart = game.input.onTap.addOnce(_restart,this);
			            spaceRestart = fireButton.onDown.addOnce(_restart,this);
			            function _restart() {
			              tapRestart.detach();
			              spaceRestart.detach();
			              restart();
			            }
			        }
			    }
		},
		render:function() {
		}

    };

          function fireBullet() {
		   
			switch (player.weaponLevel) {
			case 1:
			//  To avoid them being allowed to fire too fast we set a time limit
			if (game.time.now > bulletTimer) {
				var BULLET_SPEED = 400;
				var BULLET_SPACING = 300;
				//  Grab the first bullet we can from the pool
				var bullet = bullets.getFirstExists(false);
				if (bullet) {
					//  And fire it
					//  Make bullet come out of tip of ship with right angle
					fire.play('',0,0.8,false);
					var bulletOffset = 20 * Math.sin(game.math.degToRad(player.angle));
					bullet.reset(player.x + bulletOffset + 55, player.y+4);
					bullet.angle = player.angle;
					game.physics.arcade.velocityFromAngle(bullet.angle,BULLET_SPEED, bullet.body.velocity);
					bullet.body.velocity.y += player.body.velocity.y;
					bulletTimer = game.time.now + BULLET_SPACING;
				}
			}break;
			case 2:
				if (game.time.now > bulletTimer) {
				var BULLET_SPEED = 400;
				var BULLET_SPACING = 300;
				fire.play('',0,0.8,false);	
				for (var i = 0; i < 2; i++) {
				var bullet = bullets.getFirstExists(false);
				if (bullet) {
				//  Make bullet come out of tip of ship with right angle
				var bulletOffset = 20 * Math.sin(game.math.degToRad(player.angle));
				bullet.reset(player.x + bulletOffset + 55, player.y+4);
				//  "Spread" angle of 1st and 3rd bullets
				var spreadAngle;
				if (i === 0) spreadAngle = -10;
				if (i === 1) spreadAngle = 10;
				bullet.angle = player.angle + spreadAngle;
				game.physics.arcade.velocityFromAngle(bullet.angle,BULLET_SPEED, bullet.body.velocity);
				bullet.body.velocity.y += player.body.velocity.y;
				}
				bulletTimer = game.time.now + BULLET_SPACING;
				}	
			       }break;
                        case 3:
			if (game.time.now > bulletTimer) {
				var BULLET_SPEED = 400;
				var BULLET_SPACING = 300;
				fire.play('',0,0.8,false);	
				for (var i = 0; i < 3; i++) {
				var bullet = bullets.getFirstExists(false);
				  if (bullet) {
				  //  Make bullet come out of tip of ship with right angle
				  var bulletOffset = 20 * Math.sin(game.math.degToRad(player.angle));
				  bullet.reset(player.x + bulletOffset + 55, player.y+4);
				//  "Spread" angle of 1st and 3rd bullets
				  var spreadAngle;
				  if (i === 0) spreadAngle = -20;
				  if (i === 1) spreadAngle = 0;
				  if (i === 2) spreadAngle = 20;
				  bullet.angle = player.angle + spreadAngle;
				  game.physics.arcade.velocityFromAngle(bullet.angle,BULLET_SPEED, bullet.body.velocity);
				  bullet.body.velocity.y += player.body.velocity.y;
				 }
				bulletTimer = game.time.now + BULLET_SPACING;
				}		
			}break;
		   }
		}
          function restart () {
              //  Revive the player
              player.revive();
	      player.weaponLevel = 1;
              player.health = 100;
              shields.render();
              score = 0;
              scoreText.render();
          
              gameOver.visible = false;
	  }
