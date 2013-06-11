enchant();

weaponlevel = 1;
increment = 1;
bulletlevel = 10;
enemybulletlevel = 5;
playershootingRate = 30; //smaller is faster
enemyshootingRate = 50;
moveSpeed = 7;
max =0;
enemymax = 10;
center = 20;
hand_y = 40;
var hs = 0;
GameStopped = false;

window.onload = function() {

    game = new Game(320, 320);
	

	
	scoreLabel = new Label('Score: ');
	highscoreLabel = new Label('High Score: ');
	highscoreLabel.text = 'High Score: ' + hs;
	highscoreLabel.x = 220;
	highscoreLabel.y=5;
	highscoreLabel.color = "red";
	scoreLabel.addEventListener('enterframe', function(){
    this.text = "Score:"+ game.score;
	});
	scoreLabel.x = 5;
	scoreLabel.y = 5;
	scoreLabel.color = "red";
	//game.rootScene.addChild(scoreLabel);
    game.fps = 25;
    game.preload('chara1.png','bg.png','bullet.gif','toasty2.gif','shooter.gif','heart.gif','ui.gif','toastybullets.gif', 'toaster-pop.wav', 'titlebg.png', 'prologue.png','gameover.png', 'Pause.png');
	game.score = 0;
	game.touched = false;
	game.keybind(32, 'a');

	
game.onload = function(){
	
    title = new TitleScreen();

	game.pushScene(title);
  
	}
   game.start();
}

var TitleScreen = Class.create(Scene, {
	initialize: function () {
		Scene.apply(this);

		titleBG = new Sprite(320,320);
		titleBG.image = game.assets['titlebg.png'];

		this.addChild(titleBG);

		titleBG.addEventListener('touchstart', function() {
			var storyScene = new StoryScreen();
   		game.replaceScene(storyScene);
			game.popScene(this.scene);
      });
	}
});

var StoryScreen = Class.create(Scene, {
	initialize: function () {
		Scene.apply(this);

		story = new Sprite(320,320);
		story.image = game.assets['prologue.png'];
		story.frame = 0;

		story.addEventListener('touchstart', function() {
			if (story.frame >= 8) {
				game.rootScene.removeChild(story);
				var gameScene = new GameScreen();
   			game.replaceScene(gameScene);
				game.popScene(this.scene);
			}
			else {
				story.frame++;
				}
      });

		game.rootScene.addChild(story);
		
	}
});

var GameScreen = Class.create(Scene, {
	initialize: function () {
		Scene.apply(this);
		bg = new Sprite(320,320);
		bg.image = game.assets['bg.png'];
		
		/*pause = new pause();*/
		toasty = new toasty();
		enemies = new Array();


		game.rootScene.addEventListener('enterframe',function() {
			
			if(max < enemymax) {
				max++;
				if(rand(4) == 0 )
				{
				var enemy = new EnemyL0();
				enemy.key = game.frame;
				enemies[game.frame] = enemy;
				}
				else if(rand(4) == 1 )
				{
				var enemy = new EnemyL1();
				enemy.key = game.frame;
				enemies[game.frame] = enemy;
				}
				else if(rand(4) == 2 )
				{
				var enemy = new EnemyL2();
				enemy.key = game.frame;
				enemies[game.frame] = enemy;
				}
				else if(rand(4) == 3 )
				{
				var enemy = new EnemyL3();
				enemy.key = game.frame;
				enemies[game.frame] = enemy;
				}
			}
			
			
		});

	game.rootScene.addChild(bg);
	game.rootScene.addChild(toasty);
	game.rootScene.addChild(scoreLabel);
	game.rootScene.addChild(highscoreLabel);
	game.rootScene.addChild(pause);


	}
});


var toasty = Class.create(Sprite,{

	initialize: function() {
		Sprite.call(this,16,16);
		this.image = game.assets["toasty2.gif"];
		this.x = 140;
		this.y = 240;
		this.width = 31;
		this.height = 62;
		this.frame = 0;

		game.rootScene.addEventListener('touchstart', function(e){
			if((e.localX <= toasty.x + 30 && e.localX >= toasty.x -30) &&
				(e.localY <= toasty.y + 70 && e.localY >= toasty.y - 30)){
				
				game.touched = true;
				toasty.x = e.localX - center;
				if(e.localY >= (game.height/2)){
					toasty.y = e.localY - center/2 - hand_y;
				}else{
					toasty.y = game.height/2;
				}
			}
			else{
				game.touched = false;
			}
		});

		game.rootScene.addEventListener('touchmove', function(e){
			if(game.touched){
				toasty.x = e.localX - center;
				if(e.localY >= (game.height/2) + 60){
					toasty.y = e.localY - center/2 - hand_y;
				}else{
					toasty.y = game.height/2;
				}
			}
		});
		game.rootScene.addEventListener('touchend', function (e) {
			if(game.touched) {
				toasty.x = e.x - center;
				game.touched = false;
			}
        });

		
		this.addEventListener('enterframe', function(){
			/* Shoots on mouse_click or space bar pressed */
		if((game.touched || game.input.a) && game.frame % playershootingRate == 0){
			var s = new shootbreadbullet(this.x, this.y - 15);
			game.assets['toaster-pop.wav'].play();
		}
		for(var i in enemies) {
			if(enemies[i].intersect(this)){
							over = new Sprite(320, 320);
					over.image = game.assets['gameover.png'];
		
					hs = game.score;
					game.rootScene.addChild(over);
               game.end();
			}
		}	
			
			
		});
	},
	
	onenterframe: function() {
			if(game.input.left && !game.input.right){
				newplacement = this.x - moveSpeed;
				if(newplacement >= 0){
					this.x = newplacement;
				}else{
					this.x = 0;
				}
			}
			else if(game.input.right && !game.input.left){
				newplacement = this.x + moveSpeed;
				if(newplacement <= game.width - this.width){
					this.x = newplacement;
				}else{
					this.x = game.width - this.width;
				}
			}
			
			if(game.input.up && !game.input.down){
				newplacement = this.y - moveSpeed;
				if(newplacement >= (game.height/2)){
					this.y = newplacement;
				}else{
					this.y = game.height/2;
				}
			}
			else if(game.input.down && !game.input.up){
				newplacement = this.y + moveSpeed;
				if(newplacement <= game.height - this.height){
					this.y = newplacement;
				}else{
					this.y = game.height - this.height;
				}
			}
		
	}
});

/*var pause = Class.create(Sprite,{

	initialize: function() {
		Sprite.call(this,16,16);
		this.image = game.assets["Pause.png"];
		this.x = 140;
		this.y = 0;
		this.width = 36;
		this.height = 36;
		this.frame = 0;
		
		game.rootScene.addEventListener('touchstart', function(e){
			if(e.localX <= pause.x + 36 && e.localX >= pause.x - 36 &&
				e.localY <= pause.y + 36 && e.localY >= pause.y - 36){
				if(GameStopped == false){
					Time.timeScale = 0;
					GameStopped == true;
				}
				else{
				Time.timeScale = 1;
				GameStopped == false;
				}
			}
		});
	}
});
*/

EnemyL0 = Class.create(Sprite, {

	initialize: function() {
		Sprite.call(this, 26, 22);
		this.image = game.assets["shooter.gif"];
		this.x = rand(270) + 30;
		this.y = 0;
		this.frame = 0;
		
		this.addEventListener('enterframe',function(){
			this.move();
			if(this.y > 300 || this.x > 310 ||this.x < 10) {
                this.remove();
            } else if(this.age % enemyshootingRate == 0) {
                var s = new shootrocket(this.x, this.y+15);
            }
		});
		
		game.rootScene.addChild(this);
		
	},
	move: function() {
		this.y +=1;	
	},
	remove: function(){
		game.rootScene.removeChild(this);
		delete enemies[this.key];
	}
});

EnemyL1 = Class.create(Sprite, {
	
	initialize: function() {
      Sprite.call(this, 26, 22);
      this.image = game.assets["shooter.gif"];
			this.x = rand(270) + 30;
			this.y = 0;
			this.frame = 1;
			
			
		this.addEventListener('enterframe',function(){
			this.move();
			if(this.y > 300 || this.x > 310 ||this.x < 10) {
                this.remove();
            } else if(this.age % enemyshootingRate == 0) {
                var s = new shootrocket(this.x, this.y+15);
            }
		});
		
		
		game.rootScene.addChild(this);
    },
    move: function() 
	{
		if(rand(100) > 80 ) {
			
				this.y +=1;
		}  else {
			this.x+=increment;
			if(this.x > 280) {					
				increment= increment * (-1);
				this.x = 278;
			}
			if(this.x < 20) {
				increment= increment * (-1);
				this.x = 22;
			}
		}
	},
	remove: function(){
		max--;
		game.rootScene.removeChild(this);
		delete enemies[this.key];
	}
});

EnemyL2 = Class.create(Sprite, {
	
	/* Initialize */
	initialize: function() 
	{
		Sprite.call(this, 26, 22);
		this.image = game.assets["shooter.gif"];
		this.x = rand(270) + 30;
		this.y = 0;
		this.frame = 2;
		
		this.addEventListener('enterframe',function(){
			this.move();
			if(this.y > 300 || this.x > 310 ||this.x < 10) {
                this.remove();
            } else if(this.age % enemyshootingRate == 0) {
                var s = new shootrocket(this.x, this.y+15);
            }
		});
		
		game.rootScene.addChild(this);
	},
	
	/* Enter Frames */
	move: function() 
	{	
		if(rand(100) > 80 ) {
		
		}  else {
			this.y +=1;
			//if it reaches the bottom of the screen remove it
			if(this.y > 280) {
				game.rootScene.removeChild(this);
			}
			//if it reaches the right edge, move it to the center
			if(this.x > 280) {
				this.x == 160;
			}
			//if it reaches the left edge, move it to the center.
			if(this.x <20) {
				this.x = 160
			}
			//at this point its progressed a pixel
			//then to create random left and right movement
			if(rand(100) > 50) {
				//moves right, 
				this.x +=10;
			} 
         else {
				//moves left
				this.x -=10;
			}
		}
	},
	remove: function(){
		max--;
		game.rootScene.removeChild(this);
		delete enemies[this.key];
	}
	
});

EnemyL3 = Class.create(Sprite, {
   




   initialize: function() {
      Sprite.call(this, 26, 22);
      this.image = game.assets["shooter.gif"];
		this.x = rand(270) + 30;
		this.y = 0;
		this.frame = 3;
		this.addEventListener('enterframe',function(){
			this.move();
			if(this.y > 300 || this.x > 310 ||this.x < 10) {
                this.remove();
            } else if(this.age % enemyshootingRate == 0) {
                var s = new shootrocket(this.x, this.y+15);
            }
		});
		
		game.rootScene.addChild(this);
    },
   move: function() {

		if(game.frame%25 == 0) {
			this.y +=30;
		}
	},
		remove: function(){
		max--;
		game.rootScene.removeChild(this);
		delete enemies[this.key];
	}

});


function addToastyBullet(){
	thing = new breadbullet();
    game.rootScene.addChild(thing);
}

function addToastyBullet2(){
	thing = new breadbullet2();
	thing1 = new breadbullet3();
    game.rootScene.addChild(thing1);
	game.rootScene.addChild(thing);
}

var rocket = Class.create(Sprite,{
	initialize: function(x,y) {
		Sprite.call(this, 14, 23);
		this.image = game.assets['bullet.gif'];
		this.x = x;
		this.y = y;
		this.frame = 0;
		
		this.addEventListener('enterframe',function(){
	
			this.y += enemybulletlevel;
			
			if(this.y>300)
			{
				this.remove();
			}
			
		});
		game.rootScene.addChild(this);		
	},
	remove: function() {
		game.rootScene.removeChild(this);
		delete this;
	}	
});

var shootrocket =  Class.create(rocket, {
	    initialize: function (x, y) {
		
        rocket.call(this, x, y);
        this.addEventListener('enterframe', function () {
	
            if(toasty.intersect(this)/*toasty.within(this, 15)*/) {
					over = new Sprite(320, 320);
					over.image = game.assets['gameover.png'];
		
					hs = game.score;
					game.rootScene.addChild(over);



               game.end();
            }
			
        });
    }
});
   


breadbullet3 = Class.create(Sprite, {
	initialize: function() {
		Sprite.call(this, 14, 14);
		this.image = game.assets['toastybullets.gif'];
		this.x = toasty.x+15;
		this.y = toasty.y -15;
		this.frame = 0;
	},
	 onenterframe: function() {
	  if(this.age %4 === 0)
		{
			if(this.frame == 2)
			{
				this.frame = 0;
			} else {
				this.frame++;
			}
		}
		if(this.y < 10 || this.x <10 || this.x > 290 )  {
			game.rootScene.removeChild(this);
		}
	//	if(this.intersect(EnemyL0)||this.intersect(EnemyL1)||this.intersect(EnemyL2)
	//	||this.intersect(EnemyL3)){    
    //        game.rootScene.removeChild(this);
      //      game.score ++; 
    //    }else{
            this.y -= 2;
			this.x += 1;
     //   }
	}	
});
breadbullet2 = Class.create(Sprite, {
	initialize: function() {
		Sprite.call(this, 14, 14);
		this.image = game.assets['toastybullets.gif'];
		this.x = toasty.x;
		this.y = toasty.y -15;
		this.frame = 0;
	},
	 onenterframe: function() {
	  if(this.age %4 === 0)
		{
			if(this.frame == 2)
			{
				this.frame = 0;
			} else {
				this.frame++;
			}
		}
		if(this.y < 10 || this.x <10 || this.x > 290 )  {
			game.rootScene.removeChild(this);
		}
	//	if(this.intersect(EnemyL0)||this.intersect(EnemyL1)||this.intersect(EnemyL2)
	//	||this.intersect(EnemyL3)){     
     //       game.rootScene.removeChild(this);
    //       game.score ++; 
     //   }else{
            this.y -= 2;
			this.x -= 1;
      //  }
	}	
});

var breadbullet = Class.create(Sprite, {
	initialize: function(x,y) {
		Sprite.call(this, 14, 14);
		this.image = game.assets['toastybullets.gif'];
		this.x = x;
		this.y = y;
		this.frame = 0;
		
		this.addEventListener('enterframe',function(){
			if(this.age % 4 === 0)
			{
				if(this.frame == 2)
				{
					this.frame = 0;
				} else {
					this.frame++;
					this.frame++;
				}
			}
			this.y -= bulletlevel;		
			if(this.y <10) 
			{
				this.remove();
			}			
		});
		game.rootScene.addChild(this);		
	},
	remove: function() {
		game.rootScene.removeChild(this);
		delete this;
	}	
});

var shootbreadbullet = Class.create(breadbullet, {
	initialize: function(x,y){
		breadbullet.call(this, x + 5, y);
		this.addEventListener('enterframe',function(){
			for(var i in enemies) {
				if(enemies[i].intersect(this)){
					this.remove();
					enemies[i].remove();
					game.score+=100;
					max--;
					
					if(game.score>0 && game.score%500 == 0)
					{
						enemymax+=2;
					}
				}
			}
		});
	}
});

function rand(num) {
    return Math.floor(Math.random() * num);
}


