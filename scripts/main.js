Main = function(){
  
};

Main.prototype = {
  preload: function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.load.image('background', 'assets/background.png');
    // game.load.image('player', 'assets/player.png');
    game.load.spritesheet('player', 'animations/player/PlayerWalkDown.png', 32, 46);
    game.load.spritesheet('player2', 'animations/player/PlayerWalkUp.png', 32, 46);
    game.load.spritesheet('player3', 'animations/player/PlayerWalkRight.png', 32, 48);
    game.load.spritesheet('player4', 'animations/player/PlayerWalkLeft.png', 32, 48);
    game.load.image('californian', 'assets/monster.png');
   },
  create: function(){

    game.add.sprite(0, 0, 'background');
    player = game.add.sprite(32, game.world.height - 150, 'player');
    game.physics.arcade.enable(player);
    
    player.body.collideWorldBounds = true;
    cursors = game.input.keyboard.createCursorKeys();
    
    player.animations.add('walkRight', [0,1,2,3]);
    player.animations.add('walkDown', [0,1,2,3]);
    player.animations.add('walkUp', [0,1,2,3]);
    player.animations.add('walkLeft', [0,1,2,3]);
    
    
    new EnemyCalifornian(0,game,player.x+100,player.y+100);
    
 
    
   },
  
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
 
   
  update: function(){

    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
    
    if (cursors.left.isDown && cursors.right.isDown === false && cursors.up.isDown === false && cursors.down.isDown === false) {
      cursors.left.onDown.addOnce(this.walkLeft, this);
      player.body.velocity.x = -100;
      
    } else if (cursors.right.isDown && cursors.left.isDown === false && cursors.up.isDown === false && cursors.down.isDown === false) {
      cursors.right.onDown.addOnce(this.walkRight, this);
      player.body.velocity.x = 100;
      
    }
    
    if (cursors.up.isDown && cursors.down.isDown === false && cursors.right.isDown === false && cursors.left.isDown === false) {
      cursors.up.onDown.addOnce(this.walkUp, this);
      player.body.velocity.y = -100;
      
    } else if (cursors.down.isDown && cursors.up.isDown === false && cursors.right.isDown === false && cursors.left.isDown === false) {
      cursors.down.onDown.addOnce(this.walkDown, this);
      player.body.velocity.y = 100;
       
    } else if (cursors.up.isDown === false && cursors.down.isDown === false && cursors.left.isDown === false && cursors.right.isDown === false) {
      player.animations.stop();
      
      
    }
  }
}


$(function(){
  window.game = new Phaser.Game(800, 600, Phaser.AUTO, 'drawArea');
   
  game.state.add('Main', Main);
  game.state.start('Main');
   
});