var pl,cp;
var pscore=0,cscore=0,x,y;
var cnt=0;
board = [[0,0,0],[0,0,0],[0,0,0]];

//all set to zero
window.onload = function () {
pl = document.getElementById("pscore");
cp = document.getElementById("cscore");
board = [[0,0,0],[0,0,0],[0,0,0]];
pscore = 0;
cscore = 0;
update();	
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
//clear moves
	cnt=0;
}

function restart() {
	
	if(confirm("Restart game? This will preserve the old score"))	
		clearAll();
}

function reset(v) {
	if(v)	
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

function checkwin() {
	if(board[0][0]==board[0][1]&&board[0][0]==board[0][2]&&board[0][0]>0)
		return won(board[0][0]);
	else if(board[1][0]==board[1][1]&&board[1][0]==board[1][2]&&board[1][0]>0)
		return won(board[1][0]);
	else if(board[2][0]==board[2][1]&&board[2][0]==board[2][2]&&board[2][0]>0)
		return won(board[2][0]);
	else if(board[0][0]==board[1][0]&&board[0][0]==board[2][0]&&board[0][0]>0)
		return won(board[0][0]);
	else if(board[0][1]==board[1][1]&&board[0][1]==board[2][1]&&board[0][1]>0)
		return won(board[0][1]);
	else if(board[0][2]==board[1][2]&&board[0][2]==board[2][2]&&board[0][2]>0)
		return won(board[0][2]);
	else if(board[0][0]==board[1][1]&&board[0][0]==board[2][2]&&board[0][0]>0)
		return won(board[0][0]);
	else if(board[0][2]==board[1][1]&&board[0][2]==board[2][0]&&board[0][2]>0)
		return won(board[0][2]);
	else if(cnt>=9)
		return draw();		
}

function draw() {
	confirm("The game is a draw!");
	clearAll();
}

function won(a) {
	if(a==1)
	{
		confirm("Player 1 wins!");
		pscore++;	
	}
	else 
	{
		confirm("Player 2 wins!");
		cscore++;
	}	
	update();
	clearAll();
	return 1;
}

function canvasClicked(i) {
		
	x = parseInt(i/3);
	y = i%3;
	if(board[x][y]==0)
	{
		cnt++;
		$("#invalid_warning").hide();
		if(cnt%2==1)
			player1(i);	
		else
			player2(i);
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

	checkwin();	
}
function player2(i) {
	
	board[x][y]=2;

	var canvas = document.getElementById("c"+i);
	var context = canvas.getContext('2d');
	var img = document.getElementById("o");
	context.drawImage(img,0,0,50,50);
	context.rect(0,0,canvas.width,canvas.height);

	checkwin();	
}