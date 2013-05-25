enchant();


Enemy = Class.create(Sprite, {

    initialize: function() {
        Sprite.call(this, 32, 32);
        this.image = game.assets["chara1.png"];
		this.x = rand(320);
		this.y = 0;
		this.frame = 4;

    },

    onenterframe: function() {

		this.y +=1;
		
		if(this.y == 280)
		{
			game.rootScene.removeChild(this);
		}
	
	}
});






window.onload = function(){


    game = new Game(320, 320);
    game.fps = 15;
    game.preload('chara1.png','bg.png','bg2.jpg');

    game.onload = function(){
	//background
		bg = new Sprite(320, 320);
        bg.image = game.assets['bg2.jpg'];
        game.rootScene.addChild(bg);
		//adding an enemy
		enemy = new Enemy();
		game.rootScene.addChild(enemy);
		
        bear = new Sprite(32, 32);
        bear.image = game.assets["chara1.png"];
        bear.x = 200;
        bear.y = 200;
        bear.frame = 5;
        game.rootScene.addChild(bear);
		
		
        bear.addEventListener("enterframe", function(){
            this.x += 1;
			
			if(this.x == 280)
			{
				this.x = 20;
			}

            this.frame = this.age % 2 + 6;
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
