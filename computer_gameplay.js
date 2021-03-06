var pl,cp;
var pscore=0,cscore=0,x,y;
var cnt=0;
var game_end=true;
board = [[0,0,0],[0,0,0],[0,0,0]];

//all set to zero
window.onload = function () {
pl = document.getElementById("pscore");
cp = document.getElementById("cscore");
board = [[0,0,0],[0,0,0],[0,0,0]];
pscore = 0;
cscore = 0;
update();	
clearAll();
}

function clearAll() {
//clear canvas
	for(var i =0;i<9;i++)
	{
		var canvas = document.getElementById("c"+i);
		var context = canvas.getContext('2d');
		context.clearRect(0,0,canvas.width,canvas.height);	

	}
//clear board
	for(var i=0;i<3;i++)
		for(var j=0;j<3;j++)
		board[i][j]=0;	
//newly set
cnt=0;
game_end=true;
}

function restart() {
	
	if(confirm("Restart game? This will preserve the old score"))	
	{
		clearAll();
	}
}

function reset(v) {

		if(confirm("Reset game? You will lose all history"))	
		{
			clearAll();
			pscore = cscore = 0;			
			update();
		}	
}



function update() {
	pl.innerHTML = pscore;
	cp.innerHTML = cscore;
}

function checkwin(val) {
	if(board[0][0]==board[0][1]&&board[0][0]==board[0][2]&&board[0][0]>0)
		return won(board[0][0],val);
	else if(board[1][0]==board[1][1]&&board[1][0]==board[1][2]&&board[1][0]>0)
		return won(board[1][0],val);
	else if(board[2][0]==board[2][1]&&board[2][0]==board[2][2]&&board[2][0]>0)
		return won(board[2][0],val);
	else if(board[0][0]==board[1][0]&&board[0][0]==board[2][0]&&board[0][0]>0)
		return won(board[0][0],val);
	else if(board[0][1]==board[1][1]&&board[0][1]==board[2][1]&&board[0][1]>0)
		return won(board[0][1],val);
	else if(board[0][2]==board[1][2]&&board[0][2]==board[2][2]&&board[0][2]>0)
		return won(board[0][2],val);
	else if(board[0][0]==board[1][1]&&board[0][0]==board[2][2]&&board[0][0]>0)
		return won(board[0][0],val);
	else if(board[0][2]==board[1][1]&&board[0][2]==board[2][0]&&board[0][2]>0)
		return won(board[0][2],val);
	else if(cnt>=9)
		return draw(val);
	else 
		return false;		
}

function draw(val) {
	if(val == false)
		return 0;
	confirm("The game is a draw!");
	clearAll();
}

function won(a,val) {
	if(val==false)
	 return a;	
	if(a==1)
	{
		confirm("Player wins!");
		pscore++;	
	}
	else 
	{
		confirm("Computer wins!");
		cscore++;
	}	
	update();
	clearAll();
}

function canvasClicked(i) {
		
	x = parseInt(i/3);
	y = i%3;
	if(board[x][y]==0)
	{
		$("#invalid_warning").hide();
		if(game_end)
		{
			cnt=0;
			game_end = false;
		}	
		cnt++;
		player1(i);

		if(game_end==false&&cnt<9)		
		{
			cnt++;
			computer();
		}
	}
	else 
		$("#invalid_warning").show(500);		
}

function player1(i) {

	board[x][y]=1;
	var canvas = document.getElementById("c"+i);
	var context = canvas.getContext('2d');
	
	var img = document.getElementById("x");
	context.drawImage(img,0,0,50,50);
	checkwin(board,true);	
}

function computer() {
	
//confirm("Computer "+cnt);
	flag = 0;
	// 1. Make a winning move
	if(try_win())
		flag=1;
	
	// 2. Stop player from winning
	else if(stop_player())
		flag=1;
		
	// 3. Occupy center
	else if(get_center())
		flag=1;
		  
	// 4. Occupy corner
	else if(get_corner())
		flag=1;

	// 5. Get side
	else if(get_side())
		flag=1;	

	if(flag==1)
	{
	board[x][y]=2;
	i = x*3 + y;
	var canvas = document.getElementById("c"+i);
	var context = canvas.getContext('2d');
	var img = document.getElementById("o");
	context.drawImage(img,0,0,50,50);
	context.rect(0,0,canvas.width,canvas.height);	
	}
	
	checkwin(true);	
}

function copy_board(board,copy){
	for(var i=0;i<3;i++)
	for(var j=0;j<3;j++)
	copy[i][j] = board[i][j];
	
	return copy;
}

function try_win() {
//	confirm("Trying to win");

	for(var i=0;i<9;i++)
	{
		x = parseInt(i/3);
		y = i%3;
		
		if(board[x][y]==0)
		{
			board[x][y] = 2;
			var ret_value = checkwin(false);

			
			if(ret_value==2)
				{
//					confirm("True for \nx: "+x+" y: "+y);
					return true;
				}
			else 
				board[x][y]=0;		
		}
	}
//	confirm("return false");
	return false;
}

function stop_player(){
//	confirm("Stopping Player");

	for(var i=0;i<9;i++)
	{
		x = parseInt(i/3);
		y = i%3;

		if(board[x][y]==0)
		{
			board[x][y] = 1;
			var ret_value = checkwin(false);
			if(ret_value==1)
			{
//				confirm("True for \nx: "+x+" y: "+y);				
				return true;
			}
			else 
				board[x][y]=0;
		}
	}
//	confirm("return false");
	return false;
}

function get_corner(){
	
//	confirm("Getting corner");
	if(board[0][0]==1&&board[2][2]==0)
	{
		x = y = 2;
		 return true;
	}
	else if(board[0][2]==1&&board[2][0]==0)
	{
		x = 2; y=0;
		 return true;
	}
	else if(board[2][0]==1&&board[0][2]==0)
	{
		x = 0; y = 2;	
		 return true;
	}
	else if(board[2][2]==1&&board[0][0]==0)
	{
		x = 0; y = 0;	
		 return true;
	}
	
	else 
	{
		if(board[0][0]==0)
	{
		x = y = 0;
		 return true;
	}
	else if(board[0][2]==0)
	{
		x = 0; y=2;
		 return true;
	}
	else if(board[2][0]==0)
	{
		x = 2; y = 0;	
		 return true;
	}
	else if(board[2][2]==0)
	{
		x = 2; y = 2;	
		 return true;
	}
	
	}
//	confirm("return false");
	return false;
}

function get_center() {

//	confirm("Getting center");
	if(board[1][1]==0)
	{
		x = y = 1;
		return true;	
	}
//	confirm("return false");
	return false;
	
}

function get_side() {
//	confirm("Getting side");
	
	for(var i=1;i<8;i+=2)
	{
		x = parseInt(i/3);
		y = i%3;	
		if(board[x][y]==0)
		return true;	
	}	
//	confirm("return false");
	return false;
}