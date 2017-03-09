function Game() {
}
Game.prototype = {
	walkDown: function () {
		player.loadTexture('player', 0);
		player.animations.stop();
		player.animations.play('walkDown', 8, true);
	},
	walkUp: function () {
		player.loadTexture('player2', 0);
		player.animations.stop();
		player.animations.play('walkUp', 8, true);
	},
	walkLeft: function () {
		player.loadTexture('player4', 1);
		player.animations.stop();
		player.animations.play('walkLeft', 8, true);
	},
	walkRight: function () {
		player.loadTexture('player3', 0);
		player.animations.stop();
		player.animations.play('walkRight', 8, true);
	},

	//--------------------------------------------------------------------
	attackDown: function() {
		//var newPosition = player.x - 16
		invisAttack.scale.x = 1.3;
		invisAttack.scale.y = 1.5;
		game.physics.arcade.moveToXY(invisAttack, player.x, player.y+50, 300);

		player.body.setSize(64, 56, 16, 0)
		player.loadTexture('playerAttackDown', 0);
		//player.x = newPosition;
		player.animations.stop();
		var down = player.animations.play('attackDown', 8, false);
		down.onComplete.add(function () {
			//player.x = newPosition + 16;
			player.loadTexture('player',0);
			player.body.setSize(32, 46, 0, 0)
		});
		game.input.enabled = false;
    setTimeout(function() {game.input.enabled = true;}, 500);
	},

	//-------------------------------------------------------------------------
	attackUp: function() {
		//var newPosition = player.x - 16
		invisAttack.scale.x = 1.3;
		invisAttack.scale.y = 1.5;
		game.physics.arcade.moveToXY(invisAttack, player.x, player.y-50, 300);
		player.body.setSize(64, 56, 16, 0)
		player.loadTexture('playerAttackUp', 0);
		//player.x = newPosition;
		player.animations.stop();
		var down = player.animations.play('attackUp', 8, false);
		down.onComplete.add(function () {
			//player.x = newPosition + 16;
			player.loadTexture('player2',0);
			player.body.setSize(32, 46, 0, 0)
		});
		game.input.enabled = false;
    setTimeout(function() {game.input.enabled = true;}, 500);
	},

	//-------------------------------------------------------------------------
	attackRight: function() {
		//var newPosition = player.x - 16
		invisAttack.scale.x = 1.5;
		invisAttack.scale.y = 1.3;
		game.physics.arcade.moveToXY(invisAttack, player.x+30, player.y, 300);
		player.body.setSize(64, 56, 0, 0)
		player.loadTexture('playerAttackRight', 0);
		//player.x = newPosition;
		player.animations.stop();
		var down = player.animations.play('attackRight', 8, false);
		down.onComplete.add(function () {
			//player.x = newPosition + 16;
			player.loadTexture('player3',0);
			player.body.setSize(32, 46, 0, 0)
		});
		game.input.enabled = false;
    setTimeout(function() {game.input.enabled = true;}, 500);
	},

	// -------------------------------------------------------------------------
	attackLeft: function() {
		//var newPosition = player.x - 16
		invisAttack.scale.x = 1.5;
		invisAttack.scale.y = 1.3;
		game.physics.arcade.moveToXY(invisAttack, player.x-30, player.y, 300);
		player.body.setSize(64, 56, 0, 0)
		player.loadTexture('playerAttackLeft', 0);
		//player.x = newPosition;
		player.animations.stop();
		var down = player.animations.play('attackLeft', 8, false);
		down.onComplete.add(function () {
			//player.x = newPosition + 16;
			player.loadTexture('player4', 0);
			player.body.setSize(32, 46, 0, 0)
		});
		game.input.enabled = false;
    setTimeout(function() {game.input.enabled = true;}, 500);
	},

	//--------------------------------------------------------------------------



	preload: function () {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.load.tilemap('map', 'assets/collision_test.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('ground_1x1', 'assets/ground_1x1.png');
		game.load.image('walls_1x2', 'assets/walls_1x2.png');
		game.load.image('tiles2', 'assets/tiles2.png');
    game.load.image('pdxcarpet', 'assets/pdxcarpet.png');
		game.load.image('beer', 'assets/beer.png');
		game.load.spritesheet('player', 'animations/player/PlayerWalkDown.png', 32, 46);
		game.load.spritesheet('player2', 'animations/player/PlayerWalkUp.png', 32, 46);
		game.load.spritesheet('player3', 'animations/player/PlayerWalkRight.png', 32, 48);
		game.load.spritesheet('player4', 'animations/player/PlayerWalkLeft.png', 32, 48);
		game.load.spritesheet('playerAttackDown', 'animations/player/PlayerAttackDown.png', 64, 56);
		game.load.spritesheet('playerAttackUp', 'animations/player/PlayerAttackUp.png', 64, 48);
		game.load.spritesheet('playerAttackRight', 'animations/player/PlayerAttackRight.png', 64, 48);
		game.load.spritesheet('playerAttackLeft', 'animations/player/PlayerAttackLeft.png', 64, 48);
		game.load.image('californian', 'assets/monster.png');
		game.load.image('sword', 'assets/sword.png');
		game.load.image('guiBackground', 'assets/GUI.png');
		game.load.audio('music', 'assets/music/backgroundMusic.mp3');
	},
	create: function () {
		// Enable physics
		game.physics.startSystem(Phaser.Physics.ARCADE);

    //initiate map
    map = game.add.tilemap('map');
		map.addTilesetImage('ground_1x1');
		map.addTilesetImage('walls_1x2');
		map.addTilesetImage('tiles2');
		map.addTilesetImage('pdxcarpet');
		pdxcarpet = map.createLayer('Tile Layer 4');
		map.addTilesetImage('ground_1x1');
		map.addTilesetImage('walls_1x2');
		map.addTilesetImage('tiles2');
		map.addTilesetImage('pdxcarpet');
		pdxcarpet = map.createLayer('Tile Layer 4');
		layer = map.createLayer('Tile Layer 1');
		enemyBounds = map.createLayer('Enemy');
		enemyBounds.resizeWorld();
		pdxcarpet.resizeWorld();
		layer.resizeWorld();

		// Create player
		player = game.add.sprite(17, 120, 'player');
		player.health = 10;

		player.anchor.setTo(0.5,0.5);

		game.physics.arcade.enable(player);
		player.enableBody = true;
		player.body.collideWorldBounds = true;
		player.animations.add('walkRight', [0, 1, 2, 3]);
		player.animations.add('walkDown', [0, 1, 2, 3]);
		player.animations.add('walkUp', [0, 1, 2, 3]);
		player.animations.add('walkLeft', [0, 1, 2, 3]);
		player.frame = 0;

		// Create invisible sprite for Attacking
		invisAttack = game.add.sprite(player.x, player.y);
		invisAttack.anchor.setTo(0.5,0.5);
		invisAttack.scale.x = .1;
		invisAttack.scale.y = .1;
		invisAttack.enableBody = true;
		game.physics.arcade.enable(invisAttack);

		// Create map
		map.setCollisionBetween(1, 100, true, 'Tile Layer 1');
		map.setCollisionBetween(1, 100, false, 'Tile Layer 4');
    map.setCollisionBetween(1, 100, true,'Enemy');
    enemyBounds.alpha = 0;
		game.physics.arcade.enable(player);
		game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN);
		game.physics.arcade.setBoundsToWorld(true, true, true, true, false);

		player.enableBody = true;
		player.animations.add('walkRight', [0, 1, 2, 3]);
		player.animations.add('walkDown', [0, 1, 2, 3]);
		player.animations.add('walkUp', [0, 1, 2, 3]);
		player.animations.add('walkLeft', [1, 2, 3, 0]);
		player.animations.add('attackRight', [0, 1, 2, 3]);
		player.animations.add('attackDown', [0, 1, 2, 3]);
		player.animations.add('attackUp', [0, 1, 2, 3]);
		player.animations.add('attackLeft', [0, 1, 2, 3]);

		enemies = game.add.group();


    map.setCollisionBetween(1, 100, true,'Enemy');
    enemyBounds.alpha = 0;
		game.camera.follow(player);
		game.physics.arcade.setBoundsToWorld(true, true, true, true, false);

		// Create enemies
		enemies = game.add.group();
		createMonsters();
		beers = game.add.group();
		createBeer();


		cursors = game.input.keyboard.createCursorKeys();
		attackButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		// Create GUI
		gui = new Gui();
		gui.create();

		//Start music
		music = game.add.audio('music');
		music.loopFull(0.8);
	},
	update: function () {
		game.physics.arcade.moveToObject(invisAttack, player, 100);

		if(player.health <= 0){
			game.state.start('GameOver');
		}

		player.body.velocity.x = 0;
		player.body.velocity.y = 0;
		game.physics.arcade.collide(player, layer)
		game.physics.arcade.collide(enemies, enemyBounds)
    game.physics.arcade.collide(enemies, layer)

		beers.forEach(function(beer) {
			game.physics.arcade.collide(beer, player, getBeer, null, this);
			
		});

		enemies.forEach(function (enemy) {
			if (game.physics.arcade.distanceBetween(enemy, player) < 30) {
				console.log("ay we close");
				game.physics.arcade.moveToXY(enemy, player.x+20, player.y, 300);
			}
			game.physics.arcade.collide(enemy, player, collisionDetection, null, this);
			enemy.body.velocity.x = 0;
			enemy.body.velocity.y = 0;
			game.physics.arcade.moveToObject(enemy, player, 30);

		})

		//  Attacking?

		attackButton.onDown.addOnce(attackFunction, this);
		function attackFunction() {
			if (player.facing === "left") {
				  this.attackLeft();

      } else if (player.facing === "right") {
        	this.attackRight();

      } else if (player.facing === "up") {
        	this.attackUp();

      } else if (player.facing === "down") {
        	this.attackDown();

      }
      enemies.forEach(function(enemy){
        game.physics.arcade.collide(enemy, invisAttack, damageEnemy, null, this);
      });
    }
		if (cursors.left.isDown && cursors.right.isDown === false && cursors.up.isDown === false && cursors.down.isDown === false) {
			cursors.left.onDown.addOnce(this.walkLeft, this);
			player.body.velocity.x = -100;
			player.facing = "left";
		}
		else if (cursors.right.isDown && cursors.left.isDown === false && cursors.up.isDown === false && cursors.down.isDown === false) {
			cursors.right.onDown.addOnce(this.walkRight, this);
			player.body.velocity.x = 100;
			player.facing = "right";
		}
		else if (cursors.up.isDown && cursors.down.isDown === false && cursors.right.isDown === false && cursors.left.isDown === false) {
			cursors.up.onDown.addOnce(this.walkUp, this);
			player.body.velocity.y = -100;
			player.facing = "up";
		}
		else if (cursors.down.isDown && cursors.up.isDown === false && cursors.right.isDown === false && cursors.left.isDown === false) {
			cursors.down.onDown.addOnce(this.walkDown, this);
			player.body.velocity.y = 100;
			player.facing = "down";

		}
		else if (cursors.up.isDown === false && cursors.down.isDown === false && cursors.left.isDown === false && cursors.right.isDown === false && attackButton.isDown === false) {
		 	player.animations.stop();
		 	player.frame = 0;
		 }
				// Update GUI
			gui.update();
		}
	};


// Start game and load main menu
function Start() {}
Start.prototype = {
	//load other js file scripts
	loadScripts: function () {
		game.load.script('style', 'scripts/style.js');
		game.load.script('monsters', 'scripts/monsters.js');
		game.load.script('menus', 'scripts/menus.js');
		game.load.script('gui', 'scripts/gui.js');
	},
	addMenuOption: function (text, callback) {
		var txt = game.add.text(30, (this.optionCount * 80) + 200, text, style.navitem.default);
		txt.inputEnabled = true;
		txt.events.onInputUp.add(callback);
		txt.events.onInputOut.add(function (target) {
			target.setStyle(style.navitem.default);
		});
		txt.events.onInputOver.add(function (target) {
			target.setStyle(style.navitem.hover);
		});
		this.optionCount++;
	},
	init: function () {
		this.titleText = game.make.text(game.world.centerX, 100, "Hopps' Adventure", {
			font: "bold 60pt Arial",
			fill: "white",
			align: "center"
		});
		this.titleText.setShadow(3, 3, 'rgba(0, 0, 0, 0.5)', 5);
		this.titleText.anchor.set(0.5);
		this.optionCount = 1;
	},
	addGameStates: function () {
		game.state.add('Game', Game);
		game.state.add('GameOver', GameOver);
		game.state.add('Credits', Credits);
		game.state.add('GameWin', GameWin);
	},
	preload: function () {
		this.loadScripts();
	},
	create: function () {
		this.addGameStates();
		game.stage.disableVisibilityChange = true;
		// game.add.sprite(0, 0, 'menu-bg');
		game.add.existing(this.titleText);
		this.addMenuOption('Start', function () {
			game.state.start('Game');
		});
		this.addMenuOption('Credits', function () {
			game.state.start('Credits');
		});
	}
};

$(function () {
	window.game = new Phaser.Game(800, 600, Phaser.AUTO, 'drawArea');
	game.state.add('Start', Start);
	game.state.start('Start');
});
