var keyboardMap={
	192:0,
	49:1,
	50:2,
	51:3,
	52:4,
	53:5,
	54:6,
	55:7,
	56:8,
	57:9,
	48:10,
	173:11,
	61:12,
	8:13,
	9:14,
	81:15,
	87:16,
	69:17,
	82:18,
	84:19,
	89:20,
	85:21,
	73:22,
	79:23,
	80:24,
	219:25,
	221:26,
	220:27,
	20:28,
	65:29,
	83:30,
	68:31,
	70:32,
	71:33,
	72:34,
	74:35,
	75:36,
	76:37,
	59:38,
	222:39,
	13:40,
	16:41,
	90:42,
	88:43,
	67:44,
	86:45,
	66:46,
	78:47,
	77:48,
	188:49,
	190:50,
	191:51,
	16:52,
	17:54,
	18:55,
	91:56, //苹果cmd键码？改为应用程序键93？
	32:57,
	18:58,
	17:59,
	37:60,
	38:61,
	40:62,
	39:63
}

var keyboardKeys={
	0:["&sim;","`"],
	1:["!","1"],
	2:["@","2"],
	3:["#","3"],
	4:["$","4"],
	5:["%","5"],
	6:["^","6"],
	7:["&","7"],
	8:["*","8"],
	9:["(","9"],
	10:[")","0"],
	11:["_","-"],
	12:["+","="],
	13:["Backspace","&larr;"],
	14:["&nbsp; Tab"],	//
	15:["Q"],
	16:["W"],
	17:["E"],
	18:["R"],
	19:["T"],
	20:["Y"],
	21:["U"],
	22:["I"],
	23:["O"],
	24:["P"],
	25:["{","["],
	26:["}","]"],
	27:["|","\\"],
	28:["&nbsp; Caps Lock","&nbsp; &bull;"],
	29:["A"],
	30:["S"],
	31:["D"],
	32:["F"],
	33:["G"],
	34:["H"],
	35:["J"],
	36:["K"],
	37:["L"],
	38:[":",";"],
	39:["\"","'"],
	40:["Enter &nbsp;","&crarr; &nbsp;"],
	41:["&nbsp; Shift"],
	42:["Z"],
	43:["X"],
	44:["C"],
	45:["V"],
	46:["B"],
	47:["N"],
	48:["M"],
	49:["<",","],
	50:[">","."],
	51:["?","/"],
	52:["Shift &nbsp;"],
	53:["Fn"],
	54:["Ctrl"],
	55:["Alt"],
	56:["cmd"],
	58:["Alt"],
	59:["Ctrl"],
	60:["&#9664;"],
	61:["&#9650;"],
	62:["&#9660;"],
	63:["&#9658;"]
}


$(document).ready(function(){
	//onload keyboard
	$("li").each(function(i){	
  		if(keyboardKeys[i]){
  			if(keyboardKeys[i].length > 1){
  				var string = "";
  				for(var j=0; j<keyboardKeys[i].length; j++){
  					string += keyboardKeys[i][j]+"<br>";
  				}
  				$(".text", this).html(string);
  			}
  			else{
  				$(".text", this).html(keyboardKeys[i][0]);
  			}
  		}	
  	});

	//onload input
	print();

});


$(".select").click(function (){
	$(this).toggleClass("on");
  	$("body").toggleClass("dark");
});

document.addEventListener("keydown",function(e){
	if(e.shiftKey && e.keyCode == 16){
        if(e.location == 1){
        	//left
        	keyDownAni(41,e);
        }
        else if(e.location == 2){
        	//right
        	keyDownAni(52,e);
        }
    }else if (e.ctrlKey && e.keyCode ==17) {
    	if(e.location == 1){
    		//left
    		keyDownAni(54,e);
    	}
    	else if(e.location == 2){
    		//right
    		keyDownAni(59,e);
    	}
    }
    else if(e.altKey && e.keyCode == 18){
    	if(e.location == 1){
        	//left
        	keyDownAni(55,e);
      	}
        else if(e.location == 2){
        	//right
        	keyDownAni(58,e);
        }
    }
    else{
        keyDownAni(keyboardMap[e.keyCode],e);
    }

    function keyDownAni(eq,e){
	$("li").eq(eq).addClass("activeKey");
	$("li").eq(eq).children(".finger").animate(
		{opacity:"1"},50,function(){
			$(this).animate(
				{opacity:"0"},
				200,
				function(){
					$("li").eq(eq).removeClass("activeKey");
				});
		});
	}

});


function print(){
	var newString = "hello Ji Xinyu!";

	for(var i=0; i<newString.length; i++){
		var newChar = newString[i];
		var node = document.createElement("span");
		var textnode = document.createTextNode(newChar);
		node.appendChild(textnode);
		$(".textInput").append(node);
	}

	var j = 0;	//作用仅为第一个字母添加效果
	$("span").eq(j).addClass("currentItem");

	document.addEventListener("keypress",function(e){
		if(String.fromCharCode(e.charCode) == $("span").eq(j).html()){	
			$("span").eq(j).removeClass("currentItem");
			$("span").eq(j).addClass("textInput_right");
			j += 1;
			$("span").eq(j).addClass("currentItem");
		}
		else{
			$("span").eq(j).addClass("textInput_error");
		}

		if(j == newString.length){
			$(".textInput").empty();
			j = 0;	//闭包，注意自由变量的环境。j在当前函数下未被销毁，引用留存下来的值5（除第一次外，与外层函数中的j不是一个，因为环境不同），需要初始化。
			print();
		}
	});


}
