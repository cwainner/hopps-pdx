Main = function(){
  
};

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
  },
  update: function(){
    
    new EnemyCalifornian(0,game,player.x+100,player.y+100);
    
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
}


$(function(){
  window.game = new Phaser.Game(800, 600, Phaser.AUTO, 'drawArea');
   
  game.state.add('Main', Main);
  game.state.start('Main');
   
});