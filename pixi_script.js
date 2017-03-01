const BAR_WIDTH = 40;
const BAR_HEIGHT = 30;
const BAR_SPEED = 2;
const KEY = ['a','s','d','f','h','j','k','l'];
const KEY_CODE = [65, 83, 68, 70, 72, 74, 75, 76];

var app = new PIXI.Application(320, 400, {backgroundColor : 0x1099bb});
document.body.appendChild(app.view);
var elapsed = 0;
var time = 0;
var point = 0;

var textContainer = new PIXI.Container();
var keyboardContainer = new PIXI.Container();
var barContainer = new PIXI.Container();
app.stage.addChild(textContainer);
app.stage.addChild(keyboardContainer);
app.stage.addChild(barContainer);

var timeText = new PIXI.Text(time);
timeText.x = 30;
timeText.y = 30;
textContainer.addChild(timeText);

var pointText = new PIXI.Text(point);
pointText.x = 260;
pointText.y = 30;
textContainer.addChild(pointText);

var sound = new Howl({
	src: ['Talesweaver-Reminiscence.mp3']
});

var sheet = [];
for(var i in data){
	sheet.push({k : i, v : data[i]});
}
console.log(sheet);

app.ticker.add(function(delta){
	elapsed+=delta;
	time = (elapsed/60).toFixed(2);
	timeText.text = time;
	pointText.text = point;
});

function Keyboard(w){
	var keyboard = new PIXI.Graphics();
	keyboard.beginFill(0x00FFFF);
	keyboard.lineStyle(2, 0x009999);
	keyboard.drawRect((w-1)*BAR_WIDTH, 320, BAR_WIDTH, BAR_HEIGHT);

	app.ticker.add(function(delta){
		// keyboard.y += BAR_SPEED;
	});
	return keyboard;
}

function Keyboard_effect(w){
	var keyboard_effect = new PIXI.Graphics();
	keyboard_effect.beginFill(0x000000);
	keyboard_effect.drawRect((w-1)*BAR_WIDTH, 320, BAR_WIDTH, BAR_HEIGHT);
	var life = 30;
	app.ticker.add(function(delta){
		life-=1;
		keyboard_effect.alpha *= 0.9;
	});
	app.ticker.add(function(delta){
		if(keyboard_effect.transform){
			if(life < 0) {
				keyboard_effect.destroy();
			}
		}
	});
	return keyboard_effect;
}

function Bar(v){
	var bar = new PIXI.Graphics();
	bar.beginFill(0x00FF00);
	bar.position.x = (v-1)*BAR_WIDTH;
	bar.position.y = 0;
	bar.drawRect(0, 0, BAR_WIDTH, BAR_HEIGHT);
	app.ticker.add(function(delta){
		if(bar.transform){
			if(bar.y > 400){
				bar.destroy();
			} else {
				bar.y += BAR_SPEED;
			}
		}
	});
	return bar;
}

function BarFactory(){
	var next = sheet.splice(0, 1)[0];
	var bars = [];
	app.ticker.add(function(delta){
		if(next && parseFloat(next.k) < parseFloat(time)){
			console.log(time, " : ", next.k, next.v);
			if(typeof next.v === 'string'){
				sound.play();
			}else if(typeof next.v === 'object'){
				next.v.forEach(function(v){
					var bar =new Bar(v);
					bars.push(bar)
					barContainer.addChild(bar);
				})
			}
			next = sheet.splice(0, 1)[0];
		}
	});
}

function keyboardDef(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
      event.preventDefault();
    }
  };

  //The `upHandler`
  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}

KEY_CODE.forEach(function(key_code, i){
	var K = keyboardDef(key_code);
	K.press = function(){
		keyboardContainer.addChild(new Keyboard_effect(i+1));
		// console.log("barContainer.children.length:", barContainer.children.length);
		// console.log("key x", i*BAR_WIDTH);
		for(var bar in barContainer.children){
			if(barContainer.children[bar] instanceof PIXI.Graphics){
				var target_bar = barContainer.children[bar];
				// console.log("target_bar.x", target_bar.x);
				// console.log("target_bar.y", target_bar.y);
				if(target_bar.x === i * BAR_WIDTH){
					if(target_bar.y >= 320 && target_bar.y <= 320+BAR_HEIGHT
						|| target_bar.y+BAR_HEIGHT >= 320 && target_bar.y+BAR_WIDTH <= 320+BAR_HEIGHT){
						target_bar.destroy();
						point+=1;
					}
				}
			}
		}
	}
});


for (var i = 1; i < 9; i++) {
	keyboardContainer.addChild(new Keyboard(i));
}
new BarFactory();