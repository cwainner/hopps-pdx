EnemyCalifornian = function(index,game,x,y) {
    
    this.californian = game.add.sprite(x,y,'californian');
    this.californian.anchor.setTo(0.5,0.5);
    this.californian.name = index.toString();
    game.physics.enable(this.californian, Phaser.Physics.ARCADE);
    this.californian.immovable = false;
    this.californianTween = game.add.tween(this.californian).to({
        x: this.californian.x + 300
    },2000,'Linear',true,0,100,true);
    
    this.californian.body.collideWorldBounds = true;
    this.enableBody = true;
    
      this.maxHealth = 16;
      this.currHealth = 16;
      this.attackDamage = 4;
      this.attackRange = 8;
      this.lootTable = [];
      this.canAttack = true;
}

Main = function(){
  
};

Main.prototype = {
  preload: function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.load.image('background', 'assets/background.png');
    game.load.image('player', 'assets/player.png');

    game.load.image('californian', 'assets/monster.png');
   },
  create: function(){

    game.add.sprite(0, 0, 'background');
    player = game.add.sprite(32, game.world.height - 150, 'player');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    cursors = game.input.keyboard.createCursorKeys();

    enemies = game.add.group();
    enemies.push(new EnemyCalifornian(0,game,player.x+100,player.y+100));
    
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
}


$(function(){
  window.game = new Phaser.Game(800, 600, Phaser.AUTO, 'drawArea');
   
  game.state.add('Main', Main);
  game.state.start('Main');
   
});