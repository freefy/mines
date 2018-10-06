obj = {
    init: function () {
        this.startBtn = document.getElementById('startBtn');
        this.mainer = document.getElementById('mainer');
        this.close = document.getElementById('close');
        this.number = document.getElementById('number');
        this.box = document.getElementById('box');
        this.result = document.getElementById('result');
        this.resultShow = document.getElementById('resultShow');
        this.choose = document.getElementById('choose');
        this.reGame = document.getElementById('reGame');
        this.easy = document.getElementById('easy');
        this.nor = document.getElementById('nor');
        this.dif = document.getElementById('dif');
        this.arr = [];
        this.min = 0;
        this.timer = null;
        this.time = document.getElementById('time');
        this.blinkEvent();
    },
//游戏区初始化
bgMine:function() {
    for (var i = 0; i < this.space; i++) {
        for (var j = 0; j < this.space; j++) {
            con = document.createElement('div');
            con.classList.add('block');
            var oWidth = parseInt(getComputedStyle(this.box).width);
            var oHeight = parseInt(getComputedStyle(this.box).height);
            con.style.width = (oWidth / this.space - 1) + 'px';
            con.style.height = (oHeight / this.space - 1) + 'px';
            con.style.lineHeight = (oHeight / this.space - 1) + 'px';
            con.setAttribute('id', i + '-' + j);
            this.box.appendChild(con);
            this.arr.push({
                mines: 0
            });
        }
    }
},
//产雷
produceMine:function () {
    this.minesNum = this.model;
    this.mineOver = this.model;
    this.number.innerHTML = this.mineOver;
    this.area = document.getElementsByClassName('block');
    while (this.minesNum) {
        var mine = Math.floor(Math.random() * this.space * this.space);
        if (this.arr[mine].mines == 0) {
            this.arr[mine].mines = 1;
            this.area[mine].classList.add("isLei");
            this.minesNum--;
        }


    }
},
//点击事件声明
blinkEvent:function () {
    var _this = this;
    this.startBtn.onclick = function () {
        _this.startBtn.style.display = "none";
        _this.choose.style.display = "block";
    }
    this.easy.onclick = function () {
        _this.model = 10;
       _this.space = 10;
        _this.bgMine(); //初始化游戏区
        _this.startGame();

    }
    this.nor.onclick = function () {
        _this.model = 20;
        _this.space = 20;
        _this.bgMine(); //初始化游戏区
        _this.startGame();
    }
    this.dif.onclick = function () {
        _this.model = 30;
        _this.space = 30;
        _this.bgMine(); //初始化游戏区

        _this.startGame();
    }
    this.reGame.onclick = function () {
        clearInterval(_this.timer);
        _this.result.style.display = "none";
        _this.mainer.style.display = "none";
        _this.box.innerHTML = "";
        _this. startBtn.style.display = "block";
        _this.init();
        clearInterval(_this.timer);
        _this.min = 0;
        _this.time.innerHTML = '0';

    }
    this.box.oncontextmenu = function () {
        return false;
    }
    this.box.onmousedown = function (e) {
        var event = e.target;
        if (e.which == 1) {
            _this.leftOnclick(event);
        } else if (e.which == 3) {
            _this.rightOnclick(event);
        }
    }
    this.close.onclick = function () {
        _this.result.style.display = "none";
        _this.mainer.style.display = "none";
        _this.box.innerHTML = "";
        _this.init();
    }

},

startGame:function () {
    var _this = this;
    clearInterval(_this.timer);
    this.choose.style.display = "none";
    this.mainer.style.display = "block";

    this.produceMine(); //产雷

    this.timer = setInterval(function () {
        _this.time.innerHTML = ++_this.min;
    }, 1000);
},

leftOnclick:function (dom) {
    var _this = this;
    if (dom.classList.contains('flag')) {
        return;
    }
    var isLei = document.getElementsByClassName('isLei');
    if (dom && dom.classList.contains('isLei')) {
        for (var i = 0; i < isLei.length; i++) {
            isLei[i].classList.add('show');
            clearTimeout(_this.timer);
            setTimeout(function () {
                _this.resultShow.style.backgroundImage = "url('./images/gameOver.jpg')";
                _this.result.style.display = "block";
            }, 400)
        }
    } else {
        var n = 0;
        var pos = dom.getAttribute('id').split('-');
        var posX = dom && +pos[0];
        var posY = dom && +pos[1];
        dom && dom.classList.add('num');
        for (var i = posX - 1; i <= posX + 1; i++) {
            for (var j = posY - 1; j <= posY + 1; j++) {
                var around = document.getElementById(i + '-' + j);
                if (around && around.classList.contains('isLei')) {
                    n++;
                }
            }

        }
        dom && (dom.innerHTML = n);
        if (n == 0) {
            for (var i = posX - 1; i <= posX + 1; i++) {
                for (var j = posY - 1; j <= posY + 1; j++) {
                    var near = document.getElementById(i + '-' + j);
                    if (near && near.length != 0) {
                        if (near && !near.classList.contains('check')) {
                            near.classList.add('check');
                            this.leftOnclick(near);
                        }

                    }
                }
            }

        }


    }
},
rightOnclick:function (dom) {
    var _this=this; 
    if (dom.classList.contains('num')) {
        return;
    } else {
        dom.classList.toggle('flag');
        if (dom.classList.contains('flag') && dom.classList.contains('isLei')) {
            this.mineOver--;
        }
        if (!dom.classList.contains('flag') && dom.classList.contains('isLei')) {
            this.mineOver++;
        }
    }
    this.number.innerHTML = this.mineOver;
    if (this.mineOver == 0) {
        this.result.style.display = "block";
        this.resultShow.style.backgroundImage = "url('./images/success.jpg')";
        clearTimeout(_this.timer);
    }
}
}
obj.init();