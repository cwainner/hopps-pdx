function Game() {
	this.bodies = [];
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
		player.loadTexture('player4', 0);
		player.animations.stop();
		player.animations.play('walkLeft', 8, true);
	},
	walkRight: function () {
		player.loadTexture('player3', 0);
		player.animations.stop();
		player.animations.play('walkRight', 8, true);
	},
	fireBullet: function() {
		bullet = bullets.getFirstExists(false);
		if (bullet) {
			bullet.reset(player.x, player.y);
			bullet.body.velocity.y = 100;
		}
	},
	preload: function () {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.load.tilemap('map', 'assets/collision_test.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('ground_1x1', 'assets/ground_1x1.png');
		game.load.image('walls_1x2', 'assets/walls_1x2.png');
		game.load.image('tiles2', 'assets/tiles2.png');
        game.load.image('pdxcarpet', 'assets/pdxcarpet.png');
		game.load.spritesheet('player', 'animations/player/PlayerWalkDown.png', 32, 46);
		game.load.spritesheet('player2', 'animations/player/PlayerWalkUp.png', 32, 46);
		game.load.spritesheet('player3', 'animations/player/PlayerWalkRight.png', 32, 48);
		game.load.spritesheet('player4', 'animations/player/PlayerWalkLeft.png', 32, 48);
		game.load.image('californian', 'assets/monster.png');
		game.load.image('sword', 'assets/sword.png');
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
		player = game.add.sprite(32, 200, 'player');
		player.health = 10;
		game.physics.arcade.enable(player);
		player.enableBody = true;
		player.body.collideWorldBounds = true;
		player.animations.add('walkRight', [0, 1, 2, 3]);
		player.animations.add('walkDown', [0, 1, 2, 3]);
		player.animations.add('walkUp', [0, 1, 2, 3]);
		player.animations.add('walkLeft', [0, 1, 2, 3]);
		player.frame = 0;
		
		// Create map
		
		

		map.setCollisionBetween(1, 100, true, 'Tile Layer 1');
		map.setCollisionBetween(1, 100, false, 'Tile Layer 4');
        map.setCollisionBetween(1, 100, true,'Enemy');
        enemyBounds.alpha = 0;
		game.camera.follow(player);
		game.physics.arcade.setBoundsToWorld(true, true, true, true, false);
		
		// Create enemies
		enemies = game.add.group();
		createMonsters();
		
		// Create weapons and combat tracking
		invisAttack = game.add.sprite(player.x, player.y);
		invisAttack.scale.x = player.width + 10;
		invisAttack.scale.y = player.height + 10;
		invisAttack.enableBody = true;
		weapon = game.add.weapon(100, 'sword');
		weapon.bulletSpeed = 100;
		weapon.fireRate = 1000;
		weapon.trackSprite(player, 0, 0, true);
		bullets = game.add.group();
		bullets.enableBody = true;
		bullets.physicsBodyType = Phaser.Physics.ARCADE;
		for (var i = 0; i < 2; i++) {
			var b = bullets.create(0, 0, 'sword');
			b.name = 'bullet' + i;
			b.exists = false;
			b.visible = false;
		}
		weapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
		weapon.bulletKillDistance = 100;
		game.physics.arcade.enable(invisAttack);
		cursors = game.input.keyboard.createCursorKeys();
		attackButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},
	update: function () {
		game.physics.arcade.overlap(bullets, enemies, weaponHit, null, this);
		// game.physics.arcade.collide(enemy, player);
		//    game.physics.arcade.collide(enemies, player, collisionDetection, null, this);
		player.body.velocity.x = 0;
		player.body.velocity.y = 0;
		game.physics.arcade.collide(player, layer)
		game.physics.arcade.collide(enemies, enemyBounds)
        game.physics.arcade.collide(enemies, layer)
        
		enemies.forEach(function (enemy) {
			game.physics.arcade.collide(enemy, player, collisionDetection, null, this);
			enemy.body.velocity.x = 0;
			enemy.body.velocity.y = 0;
			game.physics.arcade.moveToObject(enemy, player, 30);
		})
		//  Attacking?
		if (attackButton.isDown)
    {
      this.fireBullet();
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
		if (cursors.up.isDown && cursors.down.isDown === false && cursors.right.isDown === false && cursors.left.isDown === false) {
			cursors.up.onDown.addOnce(this.walkUp, this);
			player.body.velocity.y = -100;
			player.facing = "up";
		}
		else if (cursors.down.isDown && cursors.up.isDown === false && cursors.right.isDown === false && cursors.left.isDown === false) {
			cursors.down.onDown.addOnce(this.walkDown, this);
			player.body.velocity.y = 100;
			player.facing = "down";
		}
		else if (cursors.up.isDown === false && cursors.down.isDown === false && cursors.left.isDown === false && cursors.right.isDown === false) {
			player.animations.stop();
			player.frame = 4;
		}
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
		this.titleText = game.make.text(game.world.centerX, 100, "Hopps-PDX", {
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
		game.state.add('Options', Options);
		game.state.add('Credits', Credits);
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
		this.addMenuOption('Options', function () {
			game.state.start('Options');
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
