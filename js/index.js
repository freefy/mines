var startBtn = document.getElementById('startBtn');
var mainer = document.getElementById('mainer');
var close = document.getElementById('close');
var number = document.getElementById('number');
var box = document.getElementById('box');
var result = document.getElementById('result');
var resultShow= document.getElementById('resultShow');
var choose = document.getElementById('choose');
var reGame = document.getElementById('reGame');
var area;

var minesNum;
var mineOver;
var one = document.getElementById('one');
var two = document.getElementById('two');
var three = document.getElementById('three');
var model;
var space;
var arr = [];
var min = 0;
var timer = null;
var time = document.getElementById('time');




init();

function init() {
    blinkEvent(); //点击事件声明
}
//游戏区初始化
function bgMine() {
    for (var i = 0; i < space; i++) {
        for (var j = 0; j < space; j++) {
            con = document.createElement('div');
            con.classList.add('block');
            var oWidth = parseInt(getComputedStyle(box).width);
            var oHeight = parseInt(getComputedStyle(box).height);
            con.style.width = (oWidth / space - 1) + 'px';
            con.style.height = (oHeight / space - 1) + 'px';
            con.style.lineHeight = (oHeight / space - 1) + 'px';

            con.setAttribute('id', i + '-' + j);
            box.appendChild(con);
            arr.push({
                mines: 0
            });
        }
    }
}
//产雷
function produceMine() {

    minesNum = model;
    mineOver = model;
    number.innerHTML = mineOver;
    area = document.getElementsByClassName('block');
    while (minesNum) {
        var mine = Math.floor(Math.random() * space * space);
        if (arr[mine].mines == 0) {
            arr[mine].mines = 1;
            area[mine].classList.add("isLei");
            minesNum--;
        }


    }
}
//点击事件声明
function blinkEvent() {
    startBtn.onclick = function () {
        startBtn.style.display = "none";
        choose.style.display = "block";
    }
    one.onclick = function () {
        model = 10;
        space = 10;
        bgMine(); //初始化游戏区

        startGame();

    }
    two.onclick = function () {
        model = 20;
        space = 20;
        bgMine(); //初始化游戏区
        startGame();
    }
    three.onclick = function () {
        model = 30;
        space = 30;
        bgMine(); //初始化游戏区

        startGame();
    }
    reGame.onclick = function () {
        result.style.display = "none";
        mainer.style.display = "none";
        box.innerHTML = "";
        startBtn.style.display = "block";
        init();
        clearInterval(timer);
        min = 0;
        time.innerHTML = '0';

    }
    box.oncontextmenu = function () {
        return false;
    }
    box.onmousedown = function (e) {
        var event = e.target;
        if (e.which == 1) {
            leftOnclick(event);
        } else if (e.which == 3) {
            rightOnclick(event);
        }
    }
    close.onclick = function () {
        result.style.display = "none";
        mainer.style.display = "none";
        box.innerHTML = "";
        init();
    }

}

function startGame() {
    clearInterval(timer);
    choose.style.display = "none";
    mainer.style.display = "block";

    produceMine(); //产雷

    timer = setInterval(function () {
        time.innerHTML = ++min;
    }, 1000);
}

function leftOnclick(dom) {
    if (dom.classList.contains('flag')) {
        return;
    }
    var isLei = document.getElementsByClassName('isLei');
    if (dom && dom.classList.contains('isLei')) {
        for (var i = 0; i < isLei.length; i++) {
            isLei[i].classList.add('show');
            clearTimeout(timer);
            setTimeout(function () {
                result.style.display = "block";
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
                            leftOnclick(near);
                        }

                    }
                }
            }

        }


    }
}

function rightOnclick(dom) {

    if (dom.classList.contains('num')) {
        return;
    } else {
        dom.classList.toggle('flag');
        if (dom.classList.contains('flag') && dom.classList.contains('isLei')) {
            mineOver--;
        }
        if (!dom.classList.contains('flag') && dom.classList.contains('isLei')) {
            mineOver++;
        }
    }
    number.innerHTML = mineOver;
    if (mineOver == 0) {
        result.style.display = "block";
        resultShow.style.backgroundImage = "url('./images/success.jpg')";
        clearTimeout(timer);
    }
}