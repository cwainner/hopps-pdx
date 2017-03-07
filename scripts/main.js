function Main(){}

Main.prototype = {
  preload: function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.load.image('background', 'assets/background.png');
    game.load.image('player', 'assets/player.png');
  },

  create: function(){
    game.load.image('californian', 'assets/monster.png');
    game.add.sprite(0, 0, 'background');
    player = game.add.sprite(32, game.world.height - 150, 'player');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    cursors = game.input.keyboard.createCursorKeys();

    enemies = game.add.group();
    enemies.push(new EnemyCalifornian(0,game,player.x+100,player.y+100));
    
    new EnemyCalifornian(0,game,player.x+100,player.y+100);

   },
  update: function(){
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
    
    if(cursors.left.isDown){
      player.body.velocity.x = -100;
    } else if(cursors.right.isDown){
      player.body.velocity.x = 100;
    } else{
      player.animations.stop();
      player.frame = 4;
    }
    
    if(cursors.up.isDown){
      player.body.velocity.y = -100;
    } else if(cursors.down.isDown){
      player.body.velocity.y = 100;
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
  
  create: function(){
    game.stage.disableVisibilityChange = true;
    
    // game.add.sprite(0, 0, 'menu-bg');
    game.add.existing(this.titleText);
    
    this.addMenuOption('Start', function(){
      game.state.start('Main');
    });
    this.addMenuOption('Options', function(){
      // game.state.start('Main');
    });
    this.addMenuOption('Credits', function(){
      // game.state.start('Main');
    });
  }
};


$(function(){
  window.game = new Phaser.Game(800, 600, Phaser.AUTO, 'drawArea');
   
  game.state.add('Start', Start);
  game.state.add('Main', Main);
  game.state.start('Start');
});