function Options(){}

Options.prototype = {
  addMenuOption: function(text, callback){
    var txt = game.add.text(30, (this.optionCount*80) + 200, text, style.navitem.default);
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
    this.addMenuOption('<- Back', function(e){
      game.state.start('Start');
    });
  }
};