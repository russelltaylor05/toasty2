enchant();
increment = 1;
EnemyL1 = Class.create(Sprite, {

	

    initialize: function() {
        Sprite.call(this, 32, 32);
        this.image = game.assets["chara1.png"];
		this.x = rand(150) + 30;
		this.y = 0;
		this.frame = 12;

    },

    onenterframe: function() {
		//document.write(increment);
	//	document.write(" ");
		if(rand(100) > 80 )
		{
			this.y +=1;
		} else{
		
			this.x+=increment;
			if(this.y == 280)
			{
				game.rootScene.removeChild(this);
			}
			if(this.x > 280)
			{
				increment= increment * (-1);
				this.x = 278;
			}
			if(this.x < 20)
			{
				increment= increment * (-1);
				this.x = 22;
			}
		}
	}
	
});
EnemyL2 = Class.create(Sprite, {

    initialize: function() {
        Sprite.call(this, 32, 32);
        this.image = game.assets["chara1.png"];
		this.x = rand(150) + 30;
		this.y = 0;
		this.frame = 4;

    },

    onenterframe: function() {
		//decides if the enemy stays in place or move foward.
		if(rand(100) > 80 )
		{
		} else{
			this.y +=1;
			//if it reaches the bottom of the screen remove it
			if(this.y == 280)
			{
				game.rootScene.removeChild(this);
			}
			//if it reaches the right edge, move it to the center
			if(this.x > 280)
			{
				this.x == 160;
			}
			//if it reaches the left edge, move it to the center.
			if(this.x <20)
			{
				this.x = 160
			}
			//at this point its progressed a pixel
			//then to create random left and right movement
			if(rand(100) > 50) 
			{
				//moves right, 
				this.x +=10;
			} else
			{
				//moves left
				this.x -=10;
				
			}
		}
	}
	
});

function addEnemyL2()
{
	thing = new EnemyL2();
	game.rootScene.addChild(thing);
}


function addEnemeyL1()
{
	thing = new EnemyL1();
	game.rootScene.addChild(thing);
}



window.onload = function(){


    game = new Game(320, 320);
    game.fps = 25;
    game.preload('chara1.png','bg.png','bg2.jpg');

    game.onload = function(){
	//background
		bg = new Sprite(320, 320);
        bg.image = game.assets['bg2.jpg'];
        game.rootScene.addChild(bg);
		//adding an enemy
		//enemy = new Enemy();
		//game.rootScene.addChild(enemy);
		//enemy1 = new Enemy();
		//game.rootScene.addChild(enemy1);
		
        bear = new Sprite(32, 32);
        bear.image = game.assets["chara1.png"];
        bear.x = 200;
        bear.y = 200;
        bear.frame = 5;
        game.rootScene.addChild(bear);
		
		thing1 = new EnemyL1();
		game.rootScene.addChild(thing1);
		thing2 = new EnemyL2();
		game.rootScene.addChild(thing2);
		
		
        bear.addEventListener("enterframe", function(){
            this.x += 1;
			
			if(this.x == 280)
			{
				this.x = 20;
			}

            this.frame = this.age % 2 + 6;
        });
		game.addEventListener('enterframe',function(e){
			/*if(rand(100) >99)
			{
				addEnemyL2();
			}
			else if(rand(100) == 1)
				addEnemyL1();
			}*/
		});

        bear.addEventListener("touchstart", function(){
            game.rootScene.removeChild(bear);
        });
    }
    game.start();
}

function rand(num){
    return Math.floor(Math.random() * num);
}
