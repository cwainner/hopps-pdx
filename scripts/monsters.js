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

function createBeer() {
	for(var j = 0; j < 4; j++) {
		beer = game.add.sprite(game.world.randomX, game.world.randomY, 'beer');
		beers.add(beer);
		game.physics.arcade.enable(beers);
		beers.enableBody = true;
	}
}

function collisionDetection(enemy, player) {

	if (enemy.canAttack === true) {

		player.health--;
		enemy.canAttack = false;

		setTimeout(function () { enemy.canAttack = true; }, 2000);

	}
}
function damageEnemy(enemy, player) {
  enemy.health -= 1;
	console.log(enemy.health);
  if (enemy.health < 1) {
		enemy.canAttack = false;
		enemy.anchor.setTo(0.5, 0.5);
		enemy.angle += 15;
		setTimeout(function () { enemy.destroy();}, 1000);

  }
}

function getBeer(beer, player) {
	player.scale.setTo(2,2);
	player.health += 5;
	setTimeout(function () { player.scale.setTo(1,1);}, 333);
	beer.destroy();
}
