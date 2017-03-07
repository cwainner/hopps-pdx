$(function(){
   var game = new Phaser.Game(800, 600, Phaser.AUTO, 'drawArea', {preload: preload, create: create, update: update});
   
   function preload(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.load.image('background', 'assets/background.png');
    game.load.image('player', 'assets/player.png');
   }
   function create(){
    game.add.sprite(0, 0, 'background');
    player = game.add.sprite(32, game.world.height - 150, 'player');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    cursors = game.input.keyboard.createCursorKeys();
   }
   function update(){
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
    
    if(cursors.left.isDown){
      player.body.velocity.x = -100;
    } else if(cursors.right.isDown){
      player.body.velocity.x = 100;
    } else{
      player.frame = 4;
    }
    
    if (cursors.up.isDown){
      player.body.velocity.y = -100;
    } else if (cursors.down.isDown){
      player.body.velocity.y = 100;
    } else{
      player.frame = 4;
    }
   }
});