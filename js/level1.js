var player;
var starfield;
var cursors;
var bank;
var shipTrail;
var bullets;
var fireButton;
var bulletTimer = 0;
var ACCLERATION = 600;
var DRAG = 400;
var MAXSPEED = 400;
var playState ={

		preload:function() {
			//  We need this because the assets are on github pages
			//  Remove the next 2 lines if running locally
			game.load.baseURL = 'https://jimchloros.github.io/Shooter/';
			game.load.crossOrigin = 'anonymous';
			
		},
		create:function() {
			
			game.scale.pageAlignHorizontally = true;
			
			//  The scrolling starfield background
			starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');
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
			game.physics.enable(player, Phaser.Physics.ARCADE);
			player.body.maxVelocity.setTo(MAXSPEED, MAXSPEED);
			player.body.drag.setTo(DRAG, DRAG);
			//  And some controls to play the game with
			cursors = game.input.keyboard.createCursorKeys();
			fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			//  Add an emitter for the ship's trail
			shipTrail = game.add.emitter(player.x - 20, player.y, 400);
			shipTrail.height = 10;
			shipTrail.makeParticles('bullet');
			shipTrail.setYSpeed(20, -20);
			shipTrail.setXSpeed(-140, -120);
			shipTrail.setRotation(50, -50);
			shipTrail.setAlpha(1, 0.01, 800);
			shipTrail.setScale(0.05, 0.4, 0.05, 0.4, 2000,
					Phaser.Easing.Quintic.Out);
			shipTrail.start(false, 5000, 10);
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
			shipTrail.y = player.y;
			shipTrail.x = player.x - 20;
		},
		render:function() {
		},
		fireBullet:function() {
			//  To avoid them being allowed to fire too fast we set a time limit
			if (game.time.now > bulletTimer) {
				var BULLET_SPEED = 400;
				var BULLET_SPACING = 250;
				//  Grab the first bullet we can from the pool
				var bullet = bullets.getFirstExists(false);
				if (bullet) {
					//  And fire it
					//  Make bullet come out of tip of ship with right angle
					var bulletOffset = 20 * Math.sin(game.math
							.degToRad(player.angle));
					bullet.reset(player.x + bulletOffset, player.y);
					bullet.angle = player.angle;
					game.physics.arcade.velocityFromAngle(bullet.angle,
							BULLET_SPEED, bullet.body.velocity);
					bullet.body.velocity.y += player.body.velocity.y;
					bulletTimer = game.time.now + BULLET_SPACING;
				}
			}
		}
    };
