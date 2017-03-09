function GameOver(){}

GameOver.prototype = {
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
	
	init: function(){
		this.gameOverText = game.make.text(game.camera.x, 100, "Game Over", {
			font: "bold 60pt Arial",
			fill: "white",
			align: "center"
		});
		this.gameOverText.setShadow(3, 3, 'rgba(0, 0, 0, 0.5)', 5);
	},
  
  create: function(){
		music.pause();
		this.optionCount = 0;
		game.add.existing(this.gameOverText);
    this.addMenuOption('Main Menu', function(e){
      location.reload();
    });
		this.addMenuOption('Start Over', function(e){
      game.state.start('Game');
    });
  }
};

function GameWin(){}

GameWin.prototype = {
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
	
	init: function(){
		this.gameWinText = game.make.text(game.camera.x, 100, "You Win!", {
			font: "bold 60pt Arial",
			fill: "white",
			align: "center"
		});
		this.gameWinText.setShadow(3, 3, 'rgba(0, 0, 0, 0.5)', 5);
	},
	
	create: function(){
		this.optionCount = 0;
		game.add.existing(this.gameOverText);
    this.addMenuOption('Main Menu', function(e){
      location.reload();
    });
		this.addMenuOption('Start Over', function(e){
      game.state.start('Game');
    });
  }
};

function Credits(){}

Credits.prototype = {
  addCredit: function(task, author){
    var authorStyle = {
      font: '20pt Helvetica',
      fill: 'white',
      align: 'center',
      stroke: 'rgba(0, 0, 0, 0)',
      strokeThickness: 4
    };
    var taskStyle = {
      font: '15pt Helvetica',
      fill: 'white',
      align: 'center',
      stroke: 'rgba(0, 0, 0, 0)',
      strokeThickness: 4
    };
    var authorText = game.add.text(game.world.centerX, 900, author, authorStyle);
    var taskText = game.add.text(game.world.centerX, 950, task, taskStyle);
    authorText.anchor.setTo(0.5);
    authorText.stroke = "rgba(0, 0, 0, 0)";
    authorText.strokeThickness = 4;
    taskText.anchor.setTo(0.5);
    taskText.stroke = "rgba(0, 0, 0, 0)";
    taskText.strokeThickness = 4;
    game.add.tween(authorText).to({y: -300}, 15000, Phaser.Easing.Cubic.Out, true, this.creditCount * 10000);
    game.add.tween(taskText).to({y: -200}, 10000, Phaser.Easing.Cubic.Out, true, this.creditCount * 10000);
    this.creditCount++;
  },
  
  addMenuOption: function(text, callback){
    var txt = game.add.text(10, (this.optionCount*80) + 450, text, style.navitem.default);
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
    this.optionCount = 1;
    this.creditCount = 0;
  },
  
  create: function(){
    this.addCredit('Development', 'Josh Linton, Dallas Slaughter, Clifford Grimmell, and Chris Wainner');
    this.addCredit('Sprites', 'Clifford Grimmell and Chris Wainner');
    this.addCredit('Map', 'Josh Linton');
    this.addCredit('Combat', 'Dallas Slaughter');
    this.addCredit('Menus', 'Chris Wainner');
    this.addCredit('Powered By', 'Phaser');
    this.addMenuOption('<- Back', function(e){
      game.state.start("Start");
    });
  }
};