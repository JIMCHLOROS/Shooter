var enemyBullets;
var player;
var starfield;
var cursors;
var bank;
var shipTrail;
var shipTrail2;
var bullets;
var shields;
var fireButton;
var enemyLaunchTimer;
var enemy2LaunchTimer;
var gameOver;
var bulletTimer = 0;
var ACCLERATION = 600;
var DRAG = 400;
var MAXSPEED = 400;
var fire;
var enemy;
var enemy2;
var score = 0;
var scoreText;
var playState ={
             
		preload:function() {
			//  We need this because the assets are on github pages
			//  Remove the next 2 lines if running locally
			game.load.baseURL = 'https://jimchloros.github.io/Shooter/';
			game.load.crossOrigin = 'anonymous';
		},
		create:function() {
	                fire = game.add.audio('fire');
			fire.allowMultiple = true;
			
			game.scale.pageAlignHorizontally = true;
			
			//  The scrolling starfield background
			starfield = game.add.tileSprite(0, 0, 1200, 800, 'starfield');
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
			});
			//  The hero!
			player = game.add.sprite(100, game.height / 2, 'iron_man');
			player.anchor.setTo(0.5, 0.5);
			player.health = 100;
			player.width = 100;
			player.height = 50;
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
			  addEnemyEmitterTrail(enemy);
			  enemy.damageAmount = 20;
			  enemy.body.setSize(enemy.width, enemy.height);
			  enemy.events.onKilled.add(function(){
			  enemy.trail.kill();
			  });
			});
                        game.time.events.add(1000, launchEnemy);
			
			enemy2 = game.add.group();
                        enemy2.enableBody = true;
                        enemy2.physicsBodyType = Phaser.Physics.ARCADE;
                        enemy2.createMultiple(3, 'enemy1');
                        enemy2.setAll('anchor.x', 0.5);
                        enemy2.setAll('anchor.y', 0.5);
                        enemy2.setAll('scale.x', 0.5);
                        enemy2.setAll('scale.y', 0.5);
                        enemy2.setAll('angle', 180);
                        enemy2.forEach(function(enemy){
                          enemy.damageAmount = 40;
                          enemy.body.setSize(enemy.width, enemy.height);
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
			      explosion.width = 300;
			      explosion.height = 300;
                              explosion.animations.add('explosion');
                        });
			
                        shields = game.add.bitmapText(game.world.width - 250, 10, 'spacefont', '' + player.health , 40);
			shields.render = function () {
                                shields.text = 'Shield ' + Math.max(player.health, 0);
                            };
			shields.render();
			
			gameOver = game.add.bitmapText(game.world.centerX, game.world.centerY, 'spacefont', 'GAME OVER', 110);
			gameOver.x = gameOver.x - gameOver.textWidth / 2;
			gameOver.y = gameOver.y - gameOver.textHeight / 3;
                        gameOver.visible = false;
			
			     //  Score
                            scoreText = game.add.bitmapText(10, 10, 'spacefont', '', 40)
                            scoreText.render = function () {
                               scoreText.text = 'Score ' + score;
                            };
                            scoreText.render();
		},
		update:function() {
			game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);
			game.physics.arcade.overlap(player, enemy2, shipCollide, null, this);
			game.physics.arcade.overlap(enemy2, bullets, hitEnemy, null, this);
			game.physics.arcade.overlap(enemy, bullets, hitEnemy, null, this);
			game.physics.arcade.overlap(player, enemy, shipCollide, null, this);
			//  Scroll the background
			starfield.tilePosition.x -= 2;
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
			//Game Over?
			if (! player.alive && gameOver.visible === false) {
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
           function hitEnemy(enemy, bullet) {
               var explosion = explosions.getFirstExists(false);
               explosion.reset(bullet.body.x + bullet.body.halfWidth, bullet.body.y + bullet.body.halfHeight);
               explosion.body.velocity.y = enemy.body.velocity.y;
               explosion.alpha = 0.7;
               explosion.play('explosion', 30, false, true);
               enemy.kill();
               bullet.kill();
	       score += enemy.damageAmount /2;
               scoreText.render();
           }
           function shipCollide(player, enemy) {
               var explosion = explosions.getFirstExists(false);
               explosion.reset(enemy.body.x + enemy.body.halfWidth, enemy.body.y + enemy.body.halfHeight);
               explosion.body.velocity.y = enemy.body.velocity.y;
               explosion.alpha = 0.7;
               explosion.play('explosion', 30, false, true);
               enemy.kill();
	       player.damage(enemy.damageAmount);
    	       shields.render();
           }
           function fireBullet() {
		   fire.play('',0,1,false);
			//  To avoid them being allowed to fire too fast we set a time limit
			if (game.time.now > bulletTimer) {
				var BULLET_SPEED = 400;
				var BULLET_SPACING = 250;
				//  Grab the first bullet we can from the pool
				var bullet = bullets.getFirstExists(false);
				if (bullet) {
					//  And fire it
					//  Make bullet come out of tip of ship with right angle
					var bulletOffset = 20 * Math.sin(game.math.degToRad(player.angle));
					bullet.reset(player.x + bulletOffset + 55, player.y+4);
					bullet.angle = player.angle;
					game.physics.arcade.velocityFromAngle(bullet.angle,BULLET_SPEED, bullet.body.velocity);
					bullet.body.velocity.y += player.body.velocity.y;
					bulletTimer = game.time.now + BULLET_SPACING;
				}
			}
		}
           function launchEnemy() {
		   var MIN_ENEMY_SPACING = 2000;
		   var MAX_ENEMY_SPACING = 3000;
		   var ENEMY_SPEED = 250;
		   
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
		   enemyLaunchTimer = game.time.events.add(game.rnd.integerInRange(MIN_ENEMY_SPACING, MAX_ENEMY_SPACING), launchEnemy);
          }
          function launchEnemy2() {
              var startingY = game.rnd.integerInRange(100, game.height - 100);
              var horizonalSpeed = -180;
              var spread = 60;
              var frequency = 70;
              var horizonalSpacing = 250;
              var numEnemiesInWave = 3;
              var timeBetweenWaves = 10000;
          
              //  Launch wave
              for (var i =0; i < numEnemiesInWave; i++) {
                  var enemy = enemy2.getFirstExists(false);
                  if (enemy) {
                      enemy.startingY = startingY;
                      enemy.reset(game.width+horizonalSpacing * i, game.height / 2);
                      enemy.body.velocity.x = horizonalSpeed;
			  
                      var bulletSpeed = 400;
                      var firingDelay = 500;
                      enemy.bullets = 2;
                      enemy.lastShot = 0;
          
                      //  Update function for each enemy
                      enemy.update = function(){
                        //  Wave movement
                        this.body.y = this.startingY + Math.sin((this.x) / frequency) * spread;
          
                        //  Squish and rotate ship for illusion of "banking"
                        //bank = Math.cos((this.x + 60) / frequency)
                        //this.scale.y = 0.5 - Math.abs(bank) / 8;
                        this.angle = 0;
                        //  Fire
                        enemyBullet = enemyBullets.getFirstExists(false);
                        if (enemyBullet &&this.alive &&this.bullets &&this.y > game.width / 8 && game.time.now > firingDelay + this.lastShot) {
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
              var explosion = explosions.getFirstExists(false);
              explosion.reset(player.body.x + player.body.halfWidth, player.body.y + player.body.halfHeight);
              explosion.alpha = 0.7;
              explosion.play('explosion', 30, false, true);
              bullet.kill();
          
              player.damage(bullet.damageAmount);
              shields.render()
          }
          function addEnemyEmitterTrail(enemy) {
          var enemyTrail = game.add.emitter(enemy.x+ 70, player.y-19 , 100);
          enemyTrail.width = 10;
          enemyTrail.makeParticles('explosion', [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);
          enemyTrail.setXSpeed(20, -20);
          enemyTrail.setRotation(50,-50);
          enemyTrail.setAlpha(0.4, 0, 800);
          enemyTrail.setScale(0.01, 0.1, 0.01, 0.1, 1000, Phaser.Easing.Quintic.Out);
          enemy.trail = enemyTrail;
          }
          function restart () {
              //  Reset the enemies
              enemy.callAll('kill');
	      enemy2.callAll('kill');
              enemyBullets.callAll('kill');
              game.time.events.remove(enemyLaunchTimer);
              game.time.events.add(1000, launchEnemy);
              game.time.events.remove(enemy2LaunchTimer);
	      game.time.events.add(3000, launchEnemy2);
          
              //  Revive the player
              player.revive();
              player.health = 100;
              shields.render();
              score = 0;
              scoreText.render();
          
              //  Hide the text
              gameOver.visible = false;
          
	  }
