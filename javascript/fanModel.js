import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { AmbientLight, Color, DirectionalLight, HemisphereLight, PerspectiveCamera, Vector2, WebGLRenderer } from 'three';


let container;
let scene, camera, renderer, controls, model;



function init(){

    container = document.querySelector('.model-container');

    createScene();

    // show scene axes in the canvas
    addAxes();

    createCamera();
    createLights();
    createRenderer();
    loadModels();
    createControls();

}

function createScene(){
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
}

function createCamera(){
    const fov = 35;
    const aspect = container.clientWidth/container.clientHeight;
    const near = 1;
    const far = 1000;
    
    camera = new PerspectiveCamera(fov, aspect, near, far);

    // set camera position;
    camera.position.set(-1.5, 1.5, 10);
    camera.rotation.z = Math.PI;
    console.log(camera.rotation.y);
}

function createLights(){
    const ambientLight = new AmbientLight(0x404040, 100);
    const mainLight = new DirectionalLight(0xffffff, 5);
    mainLight.position.set(10, 10, 10);
    mainLight.castShadow = true;

    scene.add(mainLight, ambientLight);

    const light1 = new THREE.PointLight(0xc4c4c4, 10);
    light1.position.set(0, 300, 500);
    scene.add(light1);

    const light2 = new THREE.PointLight(0xc4c4c4, 10);
    light2.position.set(500, 100, 0);
    scene.add(light2);

    const light3 = new THREE.PointLight(0xc4c4c4, 10);
    light3.position.set(0, 100, -500);
    scene.add(light3);

    const light4 = new THREE.PointLight(0xc4c4c4, 10);
    light4.position.set(-500, 300, 0);
    scene.add(light4);

    // const hemisphereLight = new HemisphereLight(0xddeeff, 0x202020, 5);
    // scene.add(mainLight, hemisphereLight);
}

function loadModels(){
    const loader = new GLTFLoader();

    // let modelPosition = new THREE.Vector3(0, 0, 0);

    loader.load("../models/roverModel/scene.gltf", function(gltf){
        model = gltf.scene.children[0];
        // model.scale.set(0.5, 0.5, 0.5);
        // model.position.set(1, -2, -3);
        scene.add(gltf.scene);
        animate();
    });
}

function animate(){
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

function createRenderer(){
    renderer = new WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth*0.95, container.clientHeight*0.95);
    renderer.gammaFactor = 2.2;
    renderer.gammaOutput = true;
    renderer.physicallyCorrectLights = true;

    container.appendChild(renderer.domElement);
}

function createControls(){
    controls = new OrbitControls(camera, renderer.domElement);

    // controls.center = new THREE.Vector3(
    //     model.position.x,
    //     model.position.y,
    //     model.position.z
    // );
    controls.autoRotate = true;

    controls.addEventListener('change', render);

    renderer.render(scene, camera);
}

function render(){
    renderer.render(scene, camera);
}

function onWindowResize(){
    camera.aspect = container.clientWidth/container.clientHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth*0.95, container.clientHeight*0.95);
}

// helper function
function addAxes(){
    const axesHelper = new THREE.AxesHelper( 5 );
    scene.add( axesHelper );
}

init();

window.addEventListener("resize", onWindowResize, false);