enchant();

increment = 1;

EnemyL0 = Class.create(Sprite, {
	initialize: function() {
		Sprite.call(this, 26, 22);
		this.image = game.assets["shooter.gif"];
		this.x = rand(150) + 30;
		this.y = 0;
		this.frame = 0;
	},
  onenterframe: function() {
		if(this.y > 280) {
			game.rootScene.removeChild(this);
		}
		this.y +=1;	
	}	
});

EnemyL1 = Class.create(Sprite, {
	initialize: function() {
      Sprite.call(this, 26, 22);
      this.image = game.assets["shooter.gif"];
			this.x = rand(150) + 30;
			this.y = 0;
			this.frame = 1;
    },
    onenterframe: function() {
			if(rand(100) > 80 ) {
				this.y +=1;
			}  else {
				this.x+=increment;
				if(this.y > 280) {
					game.rootScene.removeChild(this);
				}
				if(this.x > 280) {
					increment= increment * (-1);
					this.x = 278;
				}
				if(this.x < 20) {
					increment= increment * (-1);
					this.x = 22;
				}
			}
		}
});

EnemyL2 = Class.create(Sprite, {
   initialize: function() {
      Sprite.call(this, 26, 22);
      this.image = game.assets["shooter.gif"];
		this.x = rand(150) + 30;
		this.y = 0;
		this.frame = 2;
    },
    onenterframe: function() {
		//decides if the enemy stays in place or move foward.
		if(rand(100) > 80 ) {
		} 
      else {
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
	}
});

EnemyL3 = Class.create(Sprite, {
    initialize: function() {
      Sprite.call(this, 26, 22);
      this.image = game.assets["shooter.gif"];
		this.x = rand(150) + 30;
		this.y = 0;
		this.frame = 3;
    },
    onenterframe: function() {
      //document.write(increment);
      //	document.write(" ");
		if(this.y > 280) {
				game.rootScene.removeChild(this);
		}
		if(game.frame%25 == 0) {
			this.y +=30;
		}
	}
	
});

function addEnemyL3() {
	thing = new EnemyL3();
	game.rootScene.addChild(thing);
}

function addEnemyL2() {
	thing = new EnemyL2();
	game.rootScene.addChild(thing);
}


function addEnemeyL1() {
	thing = new EnemyL1();
	game.rootScene.addChild(thing);
}

function addEnemyL0() {
	thing = new EnemyL0();
	game.rootScene.addChild(thing);
}

window.onload = function() {
    game = new Game(320, 320);
    game.fps = 25;
    game.preload('chara1.png','bg.png','bullet.gif','toasty.gif','shooter.gif','heart.gif','ui.gif');

		game.onload = function(){

		//background
		bg = new Sprite(320, 320);
		bg.image = game.assets['bg.png'];

		ui = new Sprite(320, 30);
		ui.image = game.assets['ui.gif'];
      
		//adding an enemy
		//enemy = new Enemy();
		//game.rootScene.addChild(enemy);
		//enemy1 = new Enemy();
		//game.rootScene.addChild(enemy1);
	
		bear = new Sprite(23, 19);
		bear.image = game.assets["heart.gif"];
		bear.x = 200;
		bear.y = 200;
		bear.frame = 5;

		toasty = new Sprite(31, 31);
		toasty.image = game.assets["toasty.gif"];
		toasty.frame = 0;
		toasty.x = 0;
		toasty.y = 240;
		toasty.width = 31;
		toasty.height = 31;

		moveSpeed = 7;

		thing1 = new EnemyL0();
		thing2 = new EnemyL1();
		thing3 = new EnemyL2();
		thing4 = new EnemyL3();
		
		
		bear.addEventListener("enterframe", function() {
			this.x += 1;
			if(this.x == 280) {
				this.x = 20;
			}
			this.frame = this.age % 2 + 6;
		});

		game.addEventListener('enterframe',function(e) {
			/*if(rand(100) >99)
			{
				addEnemyL2();
			}
			else if(rand(100) == 1)
				addEnemyL1();
			}*/
		});

		game.rootScene.addEventListener('touchstart', function(e){
			toasty.x = e.localX
			if(e.localY >= (game.height/2)){
				toasty.y = e.localY;
			}else{
				toasty.y = game.height/2;
			}
		});

		game.rootScene.addEventListener('touchmove', function(e){
			toasty.x = e.localX
			if(e.localY >= (game.height/2)){
				toasty.y = e.localY;
			}else{
				toasty.y = game.height/2;
			}
		});

      toasty.onenterframe = function() {
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

      game.score = 0;

      game.rootScene.addEventListener('enterframe',function(){
         if(game.frame % 6 == 0) {
            addBullet();
         }
         if(game.rootScene.age > game.fps * 20) {
             game.end(game.score, game.score + " END");
         }
     });
      
      game.rootScene.addChild(bg);
      game.rootScene.addChild(bear);
      game.rootScene.addChild(toasty);
      game.rootScene.addChild(thing1);
      game.rootScene.addChild(thing2);
      game.rootScene.addChild(thing3);
      game.rootScene.addChild(thing4);
      game.rootScene.addChild(ui);

   }
   game.start();
}

function addBullet(pos){
    var bullet = new Sprite(14, 23);    
    bullet.x = rand(320);               
    bullet.y = 0;
    bullet.image = game.assets['bullet.gif'];

    bullet.frame = 0;

    bullet.addEventListener('enterframe', function(e) {
        if(this.intersect(toasty)){       
            game.rootScene.removeChild(this);
            game.score ++; 
        }else{
            this.y += 3
        }
    });
    game.rootScene.addChild(bullet);
}

function rand(num) {
    return Math.floor(Math.random() * num);
}


