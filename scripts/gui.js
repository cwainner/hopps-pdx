function Gui(){}

Gui.prototype = {
	addMenuOption: function(text, callback){
    var txt = game.add.text(30, game.world.height - 30, text, style.navitem.default);
    txt.inputEnabled = true;
    txt.events.onInputUp.add(callback);
    txt.events.onInputOut.add(function(target){
      target.setStyle(style.navitem.default);
    });
    txt.events.onInputOver.add(function(target){
      target.setStyle(style.navitem.hover);
    });
    this.optionCount++;
  },
	
	preload: function(){
		
	},
	
	create: function(){
		this.addMenuOption('Pause', function(e){
			game.paused = true;
		});
	},
	
	update: function(){
		
	}
};