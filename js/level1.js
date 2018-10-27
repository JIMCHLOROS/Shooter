var player;
var starfield;
var cursors;
var bank;
var shipTrail;
var shipTrail2;
var bullets;
var fireButton;
var bulletTimer = 0;
var ACCLERATION = 600;
var DRAG = 400;
var MAXSPEED = 400;
var fire;
var enemy;
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
			//  The hero!
			player = game.add.sprite(100, game.height / 2, 'iron_man');
			player.anchor.setTo(0.5, 0.5);
			player.width = 100;
			player.height = 50;
			game.physics.enable(player, Phaser.Physics.ARCADE);
			player.body.maxVelocity.setTo(MAXSPEED, MAXSPEED);
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
                        //enemy.setAll('angle', 180);
                        enemy.setAll('outOfBoundsKill', true);
                        enemy.setAll('checkWorldBounds', true);
                        launchEnemy();
			
			
		},
		update:function() {
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
		},
		render:function() {
		}
    };
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
		   var MIN_ENEMY_SPACING = 300;
		   var MAX_ENEMY_SPACING = 3000;
		   var ENEMY_SPEED = 100;
		   
		   var enemylot = enemy.getFirstExists(false);
		   if (enemylot) {
		   enemylot.reset(game.width+50, game.rnd.integerInRange(0, game.height-50));
		   enemylot.body.velocity.x = -ENEMY_SPEED;
		   enemylot.body.velocity.y = game.rnd.integerInRange(-3, 3);
		   enemylot.body.drag.x = -10;
		   }
		   //  Update function for each enemy ship to update rotation etc
                   enemylot.update = function(){
                   enemylot.angle = 180 - game.math.radToDeg(Math.atan2(enemylot.body.velocity.x, enemylot.body.velocity.y));
                   }
                   //  Send another enemy soon
                   game.time.events.add(game.rnd.integerInRange(MIN_ENEMY_SPACING, MAX_ENEMY_SPACING), launchEnemy);
          }
