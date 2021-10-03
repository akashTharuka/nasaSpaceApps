import Model from './model';

let container = document.querySelector('.model-container');
let pathToModel = "../models/drillModel/Drill.glb";

let drill = new Model();

let scene = drill.createScene(0x000000);

let camera = drill.createCamera(container);
drill.setCameraPosition(-1.5, 1.5, 10);

let ambientLight = drill.createAmbientLight(0x404040, 100);
let mainLight = drill.createDirectionalLight(0xffffff, 5);
drill.setLightPosition(drill.directionalLight, 10, 10, 10);

let light1 = drill.createPointLight(0xc4c4c4, 10);
drill.setLightPosition(light1, 0, 300, 500);
let light2 = drill.createPointLight(0xc4c4c4, 10);
drill.setLightPosition(light2, 500, 100, 0);
let light3 = drill.createPointLight(0xc4c4c4, 10);
drill.setLightPosition(light3, 0, 100, -500);
let light4 = drill.createPointLight(0xc4c4c4, 10);
drill.setLightPosition(light4, -500, 300, 0);

scene.add(ambientLight, mainLight, light1, light2, light3, light4);


let renderer = drill.createRenderer(container, 2.2, true);
// console.log(renderer);

drill.loadModel(renderer, scene, camera, pathToModel, 0.1);

let controls = drill.createControls(camera, renderer);
controls.addEventListener('change', render);
renderer.render(scene, camera);

function render(){
    renderer.render(scene, camera);
}


drill.addAxes(5);

window.addEventListener("resize", () => drill.onWindowResize(container), false);


// console.log(drill.camera.position);