EnemyCalifornian = function(index,game,x,y) {
    
    this.californian = game.add.sprite(x,y,'californian');
    this.californian.anchor.setTo(0.5,0.5);
    this.californian.name = index.toString();
    game.physics.enable(this.californian,Phaser.Physics.ARCADE);
    this.californian.immovable = false;
    this.californianTween = game.add.tween(this.californian).to({
        x: this.californian.x + 300
    },2000,'Linear',true,0,100,true);
    
    this.californian.body.collideWorldBounds = true;
    
    
}