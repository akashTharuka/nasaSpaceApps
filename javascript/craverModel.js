import Model from './model';

let container = document.querySelector('.model-container');
let pathToModel = "../models/craverModel/craver.gltf";

let craver = new Model();

let scene = craver.createScene(0x000000);

let camera = craver.createCamera(container);
craver.setCameraPosition(-1.5, 1.5, 10);

// let ambientLight = craver.createAmbientLight(0x404040, 50);
let mainLight1 = craver.createDirectionalLight(0xffffff, 5);
craver.setLightPosition(mainLight1, 10, 10, 10);
let mainLight2 = craver.createDirectionalLight(0xffffff, 5);
craver.setLightPosition(mainLight2, -10, -10, -10);

// let light1 = craver.createPointLight(0xc4c4c4, 10);
// craver.setLightPosition(light1, 0, 300, 500);
// let light2 = craver.createPointLight(0xc4c4c4, 10);
// craver.setLightPosition(light2, 500, 100, 0);
// let light3 = craver.createPointLight(0xc4c4c4, 10);
// craver.setLightPosition(light3, 0, 100, -500);
// let light4 = craver.createPointLight(0xc4c4c4, 10);
// craver.setLightPosition(light4, -500, 300, 0);

scene.add(mainLight1, mainLight2);


let renderer = craver.createRenderer(container, 2.2, true);
// console.log(renderer);

craver.loadModel(renderer, scene, camera, pathToModel, 6, -1, -1, -2);

let controls = craver.createControls(camera, renderer);
controls.addEventListener('change', render);
renderer.render(scene, camera);

function render(){
    renderer.render(scene, camera);
}


craver.addAxes(5);

window.addEventListener("resize", () => craver.onWindowResize(container), false);


// console.log(drill.camera.position);