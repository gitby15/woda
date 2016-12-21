/**
 * Created by timl on 2016/12/19.
 */
var THREE = require('three');
var Stats = require('stats.js');
var img = require('./img/earth.jpg');
var css = require('./style.css');

 st1 = require('./template/1st.html');
 st2 = require('./template/2st.html');
 st3 = require('./template/3st.html');
 st4 = require('./template/4st.html');

//var renderer,camera,scene,sphere;
var cx = 0,cy = 0,cz = 160,closeZ = 60;
var height = 1200,width=900;

var container, stats;
var camera, scene, renderer;
var group;
var mouseX = 0, mouseY = 0, touchFlag = false;
var canvas = document.getElementById('mainCanvas');
var startX = startY = endX = endY = 0;
var panelFlag = false;

bodyOnLoad = function(){
    //渲染器、相机、场景
    canvas = document.getElementById('mainCanvas')
    renderer = new THREE.WebGLRenderer({canvas:canvas});
    camera = new THREE.PerspectiveCamera(45, 4/3, 0.1, 1000);
    scene = new THREE.Scene();
    group = new THREE.Group();

    //放置相机
    camera.position.set(cx,cy,cz);
    //把相机添加到场景里面


    // 设置光源
    var pointLight = new THREE.PointLight(0XFFFFFF);
    pointLight.position.x = 30;
    pointLight.position.y = 50;
    pointLight.position.z = 150;




    var loader = new THREE.TextureLoader();
    //设置球体的值，半径，维度切面，经度切面
    var radius = 50, segemnt = 32, rings = 32;
    loader.load(img,function(texture){
        var geometry = new THREE.SphereGeometry(radius,segemnt,rings);
        var material = new THREE.MeshLambertMaterial( { map: texture, overdraw: 0.5 });
        var mesh = new THREE.Mesh(geometry,material);
        group.add(mesh);
    });


    // 将地球添加到场景
    scene.add(pointLight);
    scene.add(camera);
    scene.add(group);
    //scene.add(sphere);

    stats = new Stats();
    document.body.appendChild(stats.dom);



    canvas.addEventListener('touchstart',function(event){
        touchFlag = true;
        var touch = event.targetTouches[0];
        startX = touch.pageX;
        startY = touch.pageY;
    },false);

    canvas.addEventListener('touchmove',function(event){
        touchFlag = true;
        var touch = event.targetTouches[0];
        endX = touch.pageX;
        endY = touch.pageY;

        mouseX = endX - startX;
        mouseY = endY - startY;

        startX = endX;
        startY = endY;

    },false);


    canvas.addEventListener('touchend',function(event){
        touchFlag = false;
        startX = startY = endX = endY = mouseX = mouseY = 0;

    },false);



    animate();


}

keyDown = function(e){
    var keynum;
    var keychar;
    keynum = window.event ? e.keyCode : e.which;
    keychar = String.fromCharCode(keynum);
    // console.log(keynum+':'+keychar);
    switch (keynum){
        case 69:{
            arriveE();
            break;
        }
        case 66:{
            arriveB();
            break;
        }
        case 73:{
            arriveI();
            break;
        }
        case 67:{
            arriveC();
            break;
        }
        case 27:{
            rmPPT();
            break;
        }

    }
}

moveTo = function(x,y,template) {
    if(!((x || x == 0) && (y || y == 0))){
        return;
    }
    var x1 = group.rotation.x;
    var y1 = group.rotation.y;
    var dx = (x - x1)/50;
    var dy = (y - y1)/50;
    var counter = 50;
    var dc = -100/50;

    var anim = setInterval(function(){
        if(counter-- > 0){
            group.rotation.x += dx;
            group.rotation.y += dy;
            camera.position.z += dc;
        }else{
            clearInterval(anim);
            if(!panelFlag && template){
                setTimeout(function(){
                    popPanel(template);
                },100);
            }
        }
    },20);
}

var animate = function(){
    requestAnimationFrame(animate);
    reflesh();
    stats.update();
}

reflesh = function(){
    //group.rotation.y += 0.02;
    if(touchFlag){
        group.rotation.y += mouseX/500;
        group.rotation.x += mouseY/500;
        touchFlag = false;
    }
    renderer.render(scene, camera);
};

// 埃及第一个
arriveE = function(){
    moveTo(0.35,-2.17,st1);
}

// 巴比伦第二个
arriveB = function(){
    moveTo(0.4,-2.45,st2);
}

// 印度第三个
arriveI = function(){
    moveTo(0.37,-2.95,st3);
}

// 中国第四个
arriveC = function(){
    moveTo(0.5,-3.45,st4);
}

removePanel = function(){
    panelFlag = false;
    var container = document.getElementById('ppt-panel');
    document.body.removeChild(container);

}

popPanel = function(template){
    panelFlag = true;
    var container = document.createElement( 'div' );
    container.addEventListener('dblclick',function(){
        alert('--');
    });


    container.id = 'ppt-panel';
    container.innerHTML = template;

    document.body.appendChild(container);
};


close = function(){
    camera.position.set(0,0,61);
    reflesh();
}
leave = function(){
    camera.position.set(0,0,150);
    reflesh();
}

rmPPT = function(){
    if(!panelFlag){
        return;
    }
    removePanel();
    var dc = 100/50;
    var counter = 50;
    var anim = setInterval(function(){

        if(counter-- > 0){
            group.rotation.x -= Math.abs(counter*(Math.random()+0.3)/240);
            group.rotation.y -= Math.abs(counter*(Math.random()+0.3)/240);
            camera.position.z += dc;
        }else {
            camera.position.z = 160;
            clearInterval(anim);
        }
    },20);
}
