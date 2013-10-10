// tom.hetmer.cz 2013
var camera, scene, renderer;
var geometry, material, mesh;
var projector;
var container;
var time;
var timer;

function init() {
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 500;
    scene = new THREE.Scene();
    geometry = new THREE.CubeGeometry(10, 10, 12.5);
    material = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('nsd.png')
    });
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    container = document.getElementById('game');
    projector = new THREE.Projector();
    var canvas = !! window.CanvasRenderingContext2D;
    var webgl = (function() {
        try {
            return !!window.WebGLRenderingContext & !! document.createElement('canvas').getContext('experimental-webgl');
        } catch (e) {
            return false;
        }
    })();
    if (webgl) renderer = new THREE.WebGLRenderer();
    else if (canvas) renderer = new THREE.CanvasRenderer();
    else if (!renderer && !window.WebGLRenderingContext) {
        window.location = "http://get.webgl.org";
    } else if (!renderer && window.WebGLRenderingContext) {
        window.location = "http://get.webgl.org/troubleshooting";
    }
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
}
animate = function() {
    camera.lookAt(scene.position);
    mesh.scale.x += 0.01;
    mesh.scale.y += 0.02;
    mesh.scale.z += 0.01;
    if (time >= 25) {
        mesh.rotation.x += 0.1;
        mesh.rotation.y += 0.5;
        mesh.rotation.z += 0.4;
        mesh.position.x += 0.2;
        mesh.position.y += 0.3;
    } else if (time >= 15) {
        mesh.rotation.x += 0.06;
        mesh.rotation.y += 0.2;
        mesh.rotation.z += 0.1;
        mesh.position.x -= 0.1;
        mesh.position.y -= 0.1;
    } else {
        mesh.rotation.x += 0.03;
        mesh.rotation.y += 0.04;
        mesh.rotation.z += 0.03;
        mesh.position.x -= 0.1;
        mesh.position.y -= 0.1;
    }
    renderer.render(scene, camera);
    if (willAnimate) window.requestAnimationFrame(animate, renderer.domElement);
}
startAnimating = function() {
    willAnimate = true;
    animate();
}
stopAnimating = function() {
    willAnimate = false;
}

function gameTick() {
    time--;
    if (time == 0) {
        stopAnimating();
        window.clearInterval(timer);
    }
}
window.onload = function() {
    timer = window.setInterval("gameTick()", 1000);
    time = 30;
    init();
    startAnimating();
}