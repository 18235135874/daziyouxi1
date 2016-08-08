function game(scene){
	this.scene=scene;
	this.letter=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	this.letterArr=[];
	this.num=4;
	this.speed=5;
	this.leve=1;//等级
	this.score=10;//分数
	this.life=0;
	this.getletter(4);
	this.t=null;
	this.flag=false;

}
game.prototype.getletter=function(num){
	var that=this;
	var cw=document.documentElement.clientWidth;
	function chong(let){
		for (var i = 0; i < that.letterArr.length; i++) {
			if(let==that.letterArr[i]){
				return true;
			}
			return false;
		}
	}
	for(var i=0;i<num;i++){
		var img=document.createElement("img");
        var let=this.letter[Math.floor(Math.random()*26)];
        while(chong(let)){
        	return;}// var let=this.letter[Math.floor(Math.random()*26)]};
        img.src="./image/"+let+".jpg";
        img.className=let;
        img.style.cssText="position:absolute;left:"+Math.random()*(cw-150)+50+"px;top:"+Math.floor((Math.random()*-200)-100)+"px";
        this.scene.appendChild(img);
        this.letterArr.push(chong(let));
	}
}
game.prototype.play=function(){
	var that=this;
	flag=true;
	that.t=setInterval(function(){
		if(!flag){
			return;
		}
		var ch=document.documentElement.clientHeight-100;
		var letters=document.getElementsByTagName("img");
		for (var i = 0; i < letters.length; i++) {
			letters[i].style.top=letters[i].offsetTop+that.speed+"px";

			if(letters[i].offsetTop>ch){
				var ln=letters[i].className;//把当前类名保存
				for(var j=0;j<that.letterArr.length;j++){
					if(that.letterArr[j]==ln){
						that.letterArr=that.letterArr.splice(j,1);
					}
				}
				that.scene.removeChild(letters[i]);
				that.getletter(1);
				letters[i]=null;
				that.score--;
				if(that.score==0){
					alert("重新开始");
					clearInterval(that.t);
				}	
			}
		};
		
	},60)
}
game.prototype.key=function(){
	var that=this;
	document.onkeydown=function(e){
		var ev=e||window.event;
		var k=String.fromCharCode(ev.keyCode);//返回值为指定编码的字符串
		var now=that.scene.getElementsByClassName(k);//如果场景中有图片的话，按键盘就移除
		if(now.length>0){
			that.scene.removeChild(now[0]);
			now[0]=null;//移除后再补一个
		that.getletter(1);
		for(var i=0;i<that.letterArr.length;i++){
				if(that.letterArr[i]==k){
					that.letterArr=that.letterArr.splice(i,1);
				}
			}
			that.score++;
			// alert(that.score);
		}

	}
}
game.prototype.tingzhi=function(){
	var that=this;
	clearInterval(that.t);
	flag=false;
}