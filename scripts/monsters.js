var Monster = function(game, monsterType){

	Phaser.Sprite.call(this, game, game.world.randomX, game.world.randomY, monsterType);
	this.canAttack = true;
    this.health = 10;

}

Monster.prototype = Object.create(Phaser.Sprite.prototype);
Monster.prototype.constructor = Monster;


function createMonsters() {
	for(var i = 0; i < 10; i++){
		//enemies.create(360 + Math.random() * 200, 120 + Math.random() * 200, 'californian');
		enemies.add(new Monster(game, 'californian'));
	}
	game.physics.arcade.enable(enemies);
	enemies.enableBody = true;
	enemies.canAttack = true;

}

function collisionDetection(enemy, player) {

	if (enemy.canAttack === true) {

		player.health--;
		enemy.canAttack = false;

		setTimeout(function () { enemy.canAttack = true; }, 2000);

	}
}
function damageEnemy(enemy, player) {
  enemy.health--;
	console.log(enemy.health);
  if (enemy.health < 1) {
		enemy.canAttack = false;
		enemy.anchor.setTo(0.5, 0.5);
		enemy.angle += 15;
		setTimeout(function () { enemy.destroy();}, 1000);

  }
}
