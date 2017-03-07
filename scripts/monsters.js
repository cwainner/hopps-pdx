function createMonster() {
    enemy = game.add.sprite(Math.random()*600, Math.random()*600, 'californian')
    game.physics.arcade.enable(enemy);
    enemy.enableBody = true;
    enemy.body.collideWorldBounds = true;
    
    enemy.canAttack = true;
}

function collisionDetection() {
    if (enemy.canAttack === true) {
    player.health--;
    console.log(player.health);
    enemy.canAttack = false;
    setTimeout(function () { 
      console.log("monstattk set to true"); 
      enemy.canAttack = true; }, 2000);
    }
}