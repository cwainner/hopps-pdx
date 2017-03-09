var Monster = function(game, monsterType){

	Phaser.Sprite.call(this, game, game.world.randomX, game.world.randomY, monsterType);
	this.canAttack = true;
    this.health = 2;

}

Monster.prototype = Object.create(Phaser.Sprite.prototype);
Monster.prototype.constructor = Monster;


function createMonsters() {
   for(var i = 0; i < 10; i++){
//		enemies.create(360 + Math.random() * 200, 120 + Math.random() * 200, 'californian');
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
	var style = { font: "10px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: player.width, align: "center" };
    text = game.add.text(0, 0, enemy.health, style);
    text.anchor.set(0.5);
		text.x = Math.floor(enemy.x);
		text.y = Math.floor(enemy.y + enemy.height / 2);
		game.time.events.add(Phaser.Timer.SECOND * 0.1, killText, this);
		function killText() {
			text.destroy();
		}
	console.log("HIT");
  enemy.health--;
  if (enemy.health < 1) {
    enemy.kill();
  }
}
