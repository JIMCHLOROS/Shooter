var gift2;
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
			 //  Blue enemy's bullets
			enemyBullets = game.add.group();
			enemyBullets.enableBody = true;
			enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
			enemyBullets.createMultiple(30, 'enemy_bullet');
			enemyBullets.setAll('alpha', 0.9);
			enemyBullets.setAll('anchor.x', 0.5);
			enemyBullets.setAll('anchor.y', 0.5);
			enemyBullets.setAll('outOfBoundsKill', true);
			enemyBullets.setAll('checkWorldBounds', true);
			enemyBullets.forEach(function(enemy){
		        enemy.width = 50;
			enemy.height = 50;
			enemy.body.setSize(50, 50);
			});
			//  The hero!
			player = game.add.sprite(100, game.height / 2, 'iron_man');
			player.anchor.setTo(0.5, 0.5);
			player.health = 100;
			player.width = 100;
			player.height = 50;
			player.weaponLevel = 2;//NEW
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
			
			add_gift()
			
			
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
				addBossTrail_f(boss);
				boss.damageAmount = 30;
                        });
			
			 //  The enemies!
                        enemy = game.add.group();
                        enemy.enableBody = true;
                        enemy.physicsBodyType = Phaser.Physics.ARCADE;
                        enemy.createMultiple(5, 'enemy');
                        enemy.setAll('anchor.x', 0.5);
                        enemy.setAll('anchor.y', 0.5);
                        enemy.setAll('scale.x', 0.5);
                        enemy.setAll('scale.y', 0.5);
			enemy.forEach(function(enemy){
			  addEnemyEmitterTrail_f(enemy);
			  enemy.damageAmount = 20;
			  enemy.body.setSize(enemy.width, enemy.height);
			  enemy.events.onKilled.add(function(){
			  enemy.trail.kill();
			  });
			});
                        game.time.events.add(1000, launchEnemy_f);
			
			enemy2 = game.add.group();
                        enemy2.enableBody = true;
                        enemy2.physicsBodyType = Phaser.Physics.ARCADE;
                        enemy2.createMultiple(3, 'enemy1');
                        enemy2.setAll('anchor.x', 0.5);
                        enemy2.setAll('anchor.y', 0.5);
                        enemy2.setAll('scale.x', 0.5);
                        enemy2.setAll('scale.y', 0.5);
                        enemy2.setAll('angle', 180);
                        enemy2.forEach(function(enemy2){
                          enemy2.damageAmount = 40;
                          enemy2.body.setSize(enemy2.width, enemy2.height);
                        });
			game.time.events.add(3000, launchEnemy2);
			
			    //  An explosion pool
                        explosions = game.add.group();
                        explosions.enableBody = true;
                        explosions.physicsBodyType = Phaser.Physics.ARCADE;
                        explosions.createMultiple(30, 'explosion');
                        explosions.setAll('anchor.x', 0.5);
                        explosions.setAll('anchor.y', 0.5);
                        explosions.forEach( function(explosion) {
			      explosion.width = 100;
			      explosion.height = 100;
                              explosion.animations.add('explosion');
                        });
			real_explosions = game.add.group();
                        real_explosions.enableBody = true;
                        real_explosions.physicsBodyType = Phaser.Physics.ARCADE;
                        real_explosions.createMultiple(30, 'real_explosions');
                        real_explosions.setAll('anchor.x', 0.5);
                        real_explosions.setAll('anchor.y', 0.5);
                        real_explosions.forEach( function(explosion) {
			      explosion.width = 300;
			      explosion.height = 300;
                              explosion.animations.add('explosion');
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
			game.physics.arcade.overlap(enemyBullets, bullets, bulletdestroy, null, this);
			game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);
			game.physics.arcade.overlap(player, enemy2, shipCollide, null, this);
			game.physics.arcade.overlap(enemy2, bullets, hitEnemy, null, this);
			game.physics.arcade.overlap(enemy, bullets, hitEnemy, null, this);
			game.physics.arcade.overlap(player, enemy, shipCollide, null, this);
			
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
			              restart_f();
			            }
			        }
			    }
			
			if (score > 1800) {
				gift2.visible = true;
				gift2.enableBody = true;
				game.physics.arcade.overlap(player,gift2,upgrade2, null, this);
			}
		},
		render:function() {
		}

    };

         function upgrade2(player,gift){//add sound
		  gift.visible = false;
		  gift.enableBody = false;
		  player.weaponLevel = 3;
		 boss_alive = true;
		  enemySpacing = 99999999;
		  timeBetweenWaves = 9999999;
		  launch_boss_final();
	   }
         function add_gift() {
			gift2 = game.add.group();
			gift2.create(150,600,'gift');
			gift2.enableBody = false;
		        gift2.visible = false;
			game.physics.enable(gift2, Phaser.Physics.ARCADE);
	 }
       function addGameOverTitle(){
		   game_over_title = game.add.sprite(game.world.centerX,game.world.centerY,'game_over_screen');
		   game_over_title.anchor.setTo(0.5,0.5);
		   game_over_title.width = 1700;game_over_title.height = 900;//1600,900
		   game_over_title.visible = false;
	   }
           function bulletdestroy(be,b){
	   explode_snd.play('',0,1,false);
	   var explosion = explosions.getFirstExists(false);
           explosion.reset(be.body.x + be.body.halfWidth, be.body.y + be.body.halfHeight);
           explosion.body.velocity.y = be.body.velocity.y;
           explosion.alpha = 0.7;
           explosion.play('explosion', 30, false, true);
	   be.kill();
           b.kill();
	   }
       function hitEnemy(enemy, bullet) {
               explode_snd.play('',0,1,false);
               var explosion = real_explosions.getFirstExists(false);
               explosion.reset(bullet.body.x + bullet.body.halfWidth, bullet.body.y + bullet.body.halfHeight);
               explosion.body.velocity.y = enemy.body.velocity.y;
               explosion.alpha = 0.7;
               explosion.play('explosion', 30, false, true);
               enemy.kill();
               bullet.kill();
	       score += enemy.damageAmount /2;
               scoreText.render();
	       //  Pacing
               //  Enemies come quicker as score increases
                enemySpacing *= 0.9;
               //  Blue enemies come in after a score of 100
                   if (!enemy2Launched && score > 100) {
                     enemy2Launched = true;
                     launchEnemy2();
                     //  Slow green enemies down now that there are other enemies
                     enemySpacing *= 2;
                   }
           }
	   function hitBoss(enemy, bullet) {
               explode_snd.play('',0,1,false);
	       explode_snd.play('',0,1,false);
               var explosion = explosions.getFirstExists(false);
               explosion.reset(enemy.body.x + enemy.body.halfWidth, enemy.body.y + enemy.body.halfHeight);
               explosion.body.velocity.y = enemy.body.velocity.y;
               explosion.alpha = 0.7;
               explosion.play('explosion', 30, false, true);
               enemy.damage(30);
               var explosion2 = real_explosions.getFirstExists(false);
               explosion2.reset(bullet.body.x + bullet.body.halfWidth, bullet.body.y + bullet.body.halfHeight);
               explosion2.body.velocity.y = enemy.body.velocity.y;
               explosion2.alpha = 0.7;
               explosion2.play('explosion', 30, false, true);	   
	       console.log("&d",enemy.health);
               bullet.kill();
	       score += enemy.damageAmount /2;
               scoreText.render();
           }
           function shipCollide(player, enemy) {
               explode_snd.play('',0,1,false);
               var explosion = real_explosions.getFirstExists(false);
               explosion.reset(enemy.body.x + enemy.body.halfWidth, enemy.body.y + enemy.body.halfHeight);
               explosion.body.velocity.y = enemy.body.velocity.y;
               explosion.alpha = 0.7;
               explosion.play('explosion', 30, false, true);
               enemy.kill();
	       player.damage(enemy.damageAmount);
    	       shields.render();
           }
          function BossCollide(player, enemy) {
               explode_snd.play('',0,1,false);
               var explosion = explosions.getFirstExists(false);
               explosion.reset(enemy.body.x + enemy.body.halfWidth, enemy.body.y + enemy.body.halfHeight);
               explosion.body.velocity.y = enemy.body.velocity.y;
               explosion.alpha = 0.7;
               explosion.play('explosion', 30, false, true);
	       player.damage(enemy.damageAmount);
    	       shields.render();
           }
             function launch_boss_final(){
              var startingY = game.world.CenterY-50;
		  var enemyboss = boss.getFirstExists(false);
                  if (enemyboss) {
                      enemyboss.startingY = startingY;
                      enemyboss.reset(1350, 400);
                      var bulletSpeed = 500;
                      var firingDelay = 400;
                      enemyboss.bullets = 1;
                      enemyboss.lastShot = 0;
                      enemyboss.health = 600;
		      enemyboss.width = 260;
		      enemyboss.height = 100;
	              enemyboss.events.onKilled.add(function(){
			      if(player.alive){
				      console.log("ok");
				      next_level_title = game.add.bitmapText(game.world.centerX, game.world.centerY, 'spacefont', "YOU SAVE US ALL!!", 110);
 				      next_level_title.x = next_level_title.x - next_level_title.textWidth / 2;
				      next_level_title.y = next_level_title.y - next_level_title.textHeight / 3;
				      next_level_title.visible = true;
				      boss_alive=false;
				      game.time.events.add(5000, function () {game.paused = true;});
			      }
			});
                      //  Update function for boss
                      enemyboss.update = function(){
			      game.physics.arcade.overlap(player, boss, BossCollide, null, this);
			      game.physics.arcade.overlap(boss, bullets, hitBoss, null, this);
                        //  Fire
                        enemyBullet = enemyBullets.getFirstExists(false);
                        if (enemyBullet &&this.alive &&this.bullets &&this.y > game.width / 8 && game.time.now > firingDelay + this.lastShot) {
                         enemy_fire.play('',0,0.6,false);
			 this.lastShot = game.time.now;
                         enemyBullet.reset(this.x, this.y + this.height / 2);
                         enemyBullet.damageAmount = this.damageAmount;
                         var angle = game.physics.arcade.moveToObject(enemyBullet, player, bulletSpeed);
                         enemyBullet.angle = game.math.radToDeg(angle);
			}
                      };
                  }
	   }
          function fireBullet() {
		   
			switch (player.weaponLevel) {
			case 1:
			//  To avoid them being allowed to fire too fast we set a time limit
			if (game.time.now > bulletTimer) {
				var BULLET_SPEED = 400;
				var BULLET_SPACING = 500;
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
				var BULLET_SPACING = 500;
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
				var BULLET_SPACING = 500;
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
           function launchEnemy_f() {
		   //var MIN_ENEMY_SPACING = 2000;
		   //var MAX_ENEMY_SPACING = 3000;
		   var ENEMY_SPEED = 400;//250
		   
		   var enemylot = enemy.getFirstExists(false);
		   if (enemylot) {
		   enemylot.reset(game.width+50, game.rnd.integerInRange(0, game.height-50));
		   enemylot.body.velocity.x = -ENEMY_SPEED;
		   enemylot.body.velocity.y = game.rnd.integerInRange(-60, 60);
		   enemylot.body.drag.x = -10;
		  
		     
	             enemylot.trail.start(false, 800, 1);
		 //  Update function for each enemy ship to update rotation etc
                     enemylot.update = function(){
                       enemylot.angle = 270 - game.math.radToDeg(Math.atan2(enemylot.body.velocity.x, enemylot.body.velocity.y));
			     
		       enemylot.trail.x = enemylot.x+70;
                       enemylot.trail.y = enemylot.y-19;
			     
			 if (enemylot.x < -200) {
			  enemylot.kill();
			 }  
                     }
	           }
                   //  Send another enemy soon
		  // enemyLaunchTimer = game.time.events.add(game.rnd.integerInRange(MIN_ENEMY_SPACING, MAX_ENEMY_SPACING), launchEnemy);
                   enemyLaunchTimer = game.time.events.add(game.rnd.integerInRange(enemySpacing, enemySpacing + 1000), launchEnemy_f);
	  }
          function launchEnemy2() {
              var startingY = game.rnd.integerInRange(100, game.height - 100);
              var horizonalSpeed = -180;
              var spread = 60;
              var frequency = 70;
              var horizonalSpacing = 250;
              var numEnemiesInWave = 3;
          
              //  Launch wave
              for (var i =0; i < numEnemiesInWave; i++) {
		      
                  var enemytwo = enemy2.getFirstExists(false);
                  if (enemytwo) {
                      enemytwo.startingY = startingY;
                      enemytwo.reset(game.width+horizonalSpacing * i, game.height / 2);
                      enemytwo.body.velocity.x = horizonalSpeed;
			  
                      var bulletSpeed = 400;
                      var firingDelay = 600;
                      enemytwo.bullets = 5;
                      enemytwo.lastShot = 0;
                      //  Update function for each enemy
                      enemytwo.update = function(){
                        //  Wave movement
                        this.body.y = this.startingY + Math.sin((this.x) / frequency) * spread;
          
                        //  Squish and rotate ship for illusion of "banking"
                        //bank = Math.cos((this.x + 60) / frequency)
                        //this.scale.y = 0.5 - Math.abs(bank) / 8;
                        this.angle = 0;
                        //  Fire
                        enemyBullet = enemyBullets.getFirstExists(false);
                        if (enemyBullet &&this.alive &&this.bullets &&this.y > game.width / 8 && game.time.now > firingDelay + this.lastShot) {
                         enemy_fire.play('',0,0.6,false);
			 this.lastShot = game.time.now;
                         this.bullets--;
                         enemyBullet.reset(this.x, this.y + this.height / 2);
                         enemyBullet.damageAmount = this.damageAmount;
                         var angle = game.physics.arcade.moveToObject(enemyBullet, player, bulletSpeed);
                         enemyBullet.angle = game.math.radToDeg(angle);
                        }
                        //  Kill enemies once they go off screen
                        if (this.x < -200) {
                          this.kill();
                        }
                      };
                  }
              }
          
              //  Send another wave soon
              enemy2LaunchTimer = game.time.events.add(timeBetweenWaves, launchEnemy2);
          }
         function enemyHitsPlayer (player, bullet) {
              explode_snd.play('',0,1,false);
              var explosion = real_explosions.getFirstExists(false);
              explosion.reset(player.body.x + player.body.halfWidth, player.body.y + player.body.halfHeight);
              explosion.alpha = 0.7;
              explosion.play('explosion', 30, false, true);
              bullet.kill();
              player.damage(bullet.damageAmount);
              shields.render()
          }
          function addEnemyEmitterTrail_f(enemy) {
          var enemyTrail = game.add.emitter(enemy.x+ 70, enemy.y-19 , 100);
          enemyTrail.width = 10;
          enemyTrail.makeParticles('bullet');
          enemyTrail.setXSpeed(20, -20);
          enemyTrail.setAlpha(0.4, 0, 800);
          enemyTrail.setScale(0.05, 0.4, 0.05, 0.4, 2000,Phaser.Easing.Quintic.Out);
          enemy.trail = enemyTrail;
          }
          function addBossTrail_f(boss){
	                var boss_shipTrail = game.add.emitter(boss.x + 250, boss.y+50, 1);
		        boss_shipTrail.width = 10; 
			boss_shipTrail.makeParticles('bullet');
                        boss_shipTrail.setXSpeed(20, -20);
                        boss_shipTrail.setAlpha(0.4, 0, 800);
                        boss_shipTrail.setScale(0.05, 0.4, 0.05, 0.4, 2000,Phaser.Easing.Quintic.Out);
		        boss.trail = boss_shipTrail;
	  }
          function restart_f () {
	      boss_alive = false;
	      add_gift();
	      game_over_title.visible = false;
              //  Reset the enemies
              enemy.callAll('kill');
	      enemy2.callAll('kill');
		  
		  nextlevel = false;
              boss.callAll('kill');
              enemyBullets.callAll('kill');
              game.time.events.remove(enemyLaunchTimer);
              game.time.events.add(1500, launchEnemy);
              game.time.events.remove(enemy2LaunchTimer);
              //  Revive the player
              player.revive();
	      player.weaponLevel = 2;
              player.health = 100;
              shields.render();
              score = 0;
              scoreText.render();
          
              //  Hide the text
              gameOver.visible = false;
		  //  Reset pacing
              enemySpacing = 1000;
              enemy2Launched = false;
	  }
