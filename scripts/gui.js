function Gui(){}

Gui.prototype = {
	addMenuOption: function(text, callback){
    var txt = game.add.text(game.camera.x + 20, game.camera.y + 550, text, style.navitem.default);
    txt.inputEnabled = true;
		txt.fixedToCamera = true;
    txt.events.onInputUp.add(callback);
    txt.events.onInputOut.add(function(target){
      target.setStyle(style.navitem.default);
    });
    txt.events.onInputOver.add(function(target){
      target.setStyle(style.navitem.hover);
    });
    this.optionCount++;
  },
	
	create: function(){
		var guiBckgnd = game.add.sprite(game.camera.x / 2, game.camera.y / 2, 'guiBackground');
		guiBckgnd.fixedToCamera = true;
//		guiBckgnd.anchor.setTo(0.5, 0.5);
		this.addMenuOption('Pause', function(e){
			game.paused = true;
		});
		healthText = game.add.text(game.camera.x + 600, game.camera.y + 550, "Health: " + player.health, style.navitem.default);
		healthText.fixedToCamera = true;
	},
	
	update: function(){
		healthText.setText("Health: " + player.health);
	}
};