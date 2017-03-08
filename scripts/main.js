function Game(){
	this.bodies = [];
}

Game.prototype = {
  preload: function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.load.image('background', 'assets/background.png');
    game.load.image('player', 'assets/player.png');
    game.load.image('californian', 'assets/monster.png');
  },

  create: function(){
    game.add.sprite(0, 0, 'background');
    player = game.add.sprite(32, game.world.height - 150, 'player');
    player.health = 10;
    game.physics.arcade.enable(player);
    player.enableBody = true;
    player.body.collideWorldBounds = true;
    enemies = game.add.group();
    invisAttack = game.add.sprite(player.x, player.y);
    invisAttack.scale.x = player.width+10;
    invisAttack.scale.y = player.height+10;
    invisAttack.enableBody = true;
    game.physics.arcade.enable(invisAttack);
    cursors = game.input.keyboard.createCursorKeys();
    attackButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


    createMonsters();


   },
  update: function(){
    // game.physics.arcade.collide(enemy, player);
//    game.physics.arcade.collide(enemies, player, collisionDetection, null, this);
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
		enemies.forEach(function(enemy){
			game.physics.arcade.collide(enemy, player, collisionDetection, null, this);
			enemy.body.velocity.x = 0;
			enemy.body.velocity.y = 0;
			game.physics.arcade.moveToObject(enemy, player, 30);
		})
        game.physics.arcade.moveToObject(invisAttack, player, 1000)
//    enemy.body.velocity.x = 0.1;
//    enemy.body.velocity.y = 0.1;
    //  Attacking?
    if (attackButton.isDown)
    {
      if (player.facing === "left") {
        invisAttack.x = player.x-16;
        invisAttack.scale.x = 20;
        invisAttack.scale.y = player.height;
      } else if (player.facing === "right") {
        invisAttack.x = player.x+16;
        invisAttack.scale.x = 20;
        invisAttack.scale.y = player.height;
      } else if (player.facing === "up") {
        invisAttack.y = player.y-23;
        invisAttack.scale.x = player.width;
        invisAttack.scale.y = 20;
      } else if (player.facing === "down") {
        invisAttack.y = player.y+23;
        invisAttack.scale.x = player.width;
        invisAttack.scale.y = 20;
      }
      enemies.forEach(function(enemy){
        game.physics.arcade.collide(enemy, invisAttack, damageEnemy, null, this);
      });
    }
    if(cursors.left.isDown){
      player.body.velocity.x = -100;
      player.facing = "left";
    } else if(cursors.right.isDown){
      player.body.velocity.x = 100;
      player.facing = "right";
    } else{
      player.animations.stop();
      player.frame = 4;
    }
    
    if(cursors.up.isDown){
      player.body.velocity.y = -100;
      player.facing = "up";
    } else if(cursors.down.isDown){
      player.body.velocity.y = 100;
      player.facing = "down";
    } else{
      player.animations.stop();
      player.frame = 4;
    }
  }
};

function Start(){}

Start.prototype = {
  loadScripts: function(){
    game.load.script('style', 'scripts/style.js');
    game.load.script('monsters', 'scripts/monsters.js');
    game.load.script('menus', 'scripts/menus.js');
    game.load.script('gui', 'scripts/gui.js');
  },
  
  addMenuOption: function(text, callback){
    var txt = game.add.text(30, (this.optionCount*80) + 200, text, style.navitem.default);
    txt.inputEnabled = true;
    txt.events.onInputUp.add(callback);
    txt.events.onInputOut.add(function(target){
      target.setStyle(style.navitem.default);
    });
    txt.events.onInputOver.add(function(target){
      target.setStyle(style.navitem.hover);
    });
    this.optionCount++;
  },
  
  init: function(){
    this.titleText = game.make.text(game.world.centerX, 100, "Game Title", {
      font: "bold 60pt Arial",
      fill: "white",
      align: "center"
    });
    this.titleText.setShadow(3, 3, 'rgba(0, 0, 0, 0.5)', 5);
    this.titleText.anchor.set(0.5);
    this.optionCount = 1;
  },
  
  preload: function(){
    this.loadScripts();
  },
  
  addGameStates: function(){
    game.state.add('Game', Game);
    game.state.add('Options', Options);
    game.state.add('Credits', Credits);
    game.state.add('Pause', Pause);
  },
  
  create: function(){
    this.addGameStates();
    game.stage.disableVisibilityChange = true;
    
    // game.add.sprite(0, 0, 'menu-bg');
    game.add.existing(this.titleText);
    
    this.addMenuOption('Start', function(){
      game.state.start('Game');
    });
    this.addMenuOption('Options', function(){
      game.state.start('Options');
    });
    this.addMenuOption('Credits', function(){
      game.state.start('Credits');
    });
  }
};


$(function(){
  window.game = new Phaser.Game(800, 600, Phaser.AUTO, 'drawArea');
   
  game.state.add('Start', Start);
  game.state.start('Start');
});