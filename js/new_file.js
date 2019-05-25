onload = function() {
	background = document.querySelector('#background');
	background.x = 0;
	bird = document.querySelector('#bird');
	bird.fly = 0;
	var speed = 1;
	var play = true; //游戏运行变量
	bird.y = bird.offsetTop;
	document.onclick = function() {
		speed = -4; //小鸟每次点击后跳起的高度(不完全是跳起的高度 是跳起时的速度 速度会减小 因为有'重力加速度'这种东西)
	}
	var mark = new Array();
	var timerId = new Array();
	var k = 0;
	var j = 0; //记录通过柱子个数
	mark[k] = createPipe(k); //先创建第一个对象(因为计时器在0时不执行)
	setInterval(function() {
		if (play)
		createPipe(++k);
	}, 3000); //创建管道 储存入数组

	function createPipe(m) {
		var pipe = new Object();
		var long = Math.random() * 300; //柱子随机高度的基础
		pipe.top = document.createElement('div');
		pipe.bottom = document.createElement('div');
		pipe.x = 0;
		pipe.top.style.background = 'url(img/pipe2.png) no-repeat';
		pipe.top.style.width = '52px';
		pipe.top.style.height = '420px';
		pipe.top.style.position = 'absolute';
		pipe.top.style.top = -320 + long + 'px';
		pipe.top.style.right = 0 + 'px';
		pipe.bottom.style.background = 'url(img/pipe1.png) no-repeat'
		pipe.bottom.style.width = '52px';
		pipe.bottom.style.height = '420px';
		pipe.bottom.style.position = 'absolute';
		pipe.bottom.style.top = 220 + long + 'px'; //设定管子固定的间隔是100px 计算不详解
		pipe.bottom.style.right = 0 + 'px';
		background.appendChild(pipe.top);
		background.appendChild(pipe.bottom);
		timerId[m] = setInterval(function() {
			if (play) {
				pipe.x += 2;
				pipe.top.style.right = pipe.x + 'px';
				pipe.bottom.style.right = pipe.x + 'px'; //移动柱子
				if (pipe.top.offsetLeft <= (bird.offsetLeft + bird.offsetWidth - 15) && pipe.top.offsetLeft >= (bird.offsetLeft -
						pipe.top.offsetWidth + 15)) {
					//判断当柱子移动到某个区间时 小鸟的高度是否触碰到柱子 计算不详解 15是因为小鸟图左右各有15的距离是空的
					if (bird.offsetTop <= 85 + long || bird.offsetTop + bird.offsetWidth >= pipe.bottom.offsetTop + 15) //判断如果触碰到柱子 游戏执行变量会等于false;
					{
						play = false;
						j = m; //记录当前通过的个数
					}

				}
				if (pipe.bottom.offsetLeft + pipe.bottom.offsetWidth <= 0) {
					clearInterval(timerId[m]);
					pipe.top.parentNode.removeChild(pipe.bottom);
					pipe.top.parentNode.removeChild(pipe.top);
					delete pipe.bottom;
					delete pipe.top;
					delete pipe; //删除节点删除元素 防止占内存太多

				}
			}
		}, 30);
		return pipe;
	}
	var time = setInterval(function() {
		if (play) {
			background.x -= 2;
			background.style.backgroundPositionX = background.x + 'px'; //背景移动
			bird.fly++;
			bird.style.backgroundPositionX = (bird.fly % 3) * bird.offsetWidth + 'px'; //小鸟翅膀扇动 实际上是一个精灵图不断变换位置
		} else {

			alert('通过' + j + '个柱子!'); //游戏结束的提示
			clearInterval(time);
		}
	}, 10);
	setInterval(function() {
		if (play) {
			bird.y += speed;
			speed += 0.12; //加速度设置 速度如同一个等加数列
			bird.style.top = bird.y + 'px';
			if (bird.y >= background.offsetHeight - bird.offsetHeight + 15)
				play = false; //小鸟触碰到底部 执行变量变为false
		}
	}, 10)
}
