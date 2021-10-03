import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls';


export default class Model {

    // -----------------------SCENE---------------------------------------
    // set the bgColor in hex eg: 0x808080
    createScene(bgColor) {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(bgColor);

        return this.scene;
    };

    // -----------------------CAMERA---------------------------------------

    // container is an dom element
    createCamera(container) {
        const fov = 35;
        const aspect = container.clientWidth / container.clientHeight;
        const near = 1;
        const far = 1000;

        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

        return this.camera;
    }

    setCameraPosition(x = 0, y = 0, z = 0) {
        this.camera.position.set(x, y, z);
    }

    setCameraRotation(x, y, z) {
        this.camera.rotation.set(x, y, z);
    }

    // -----------------------LIGHTS---------------------------------------

    createAmbientLight(color, intensity){
        this.ambientLight = new THREE.AmbientLight(color, intensity);

        return this.ambientLight;
    }
    createDirectionalLight(color, intensity, castShadow=true){
        this.directionalLight = new THREE.DirectionalLight(color, intensity);
        this.directionalLight.castShadow = castShadow;

        return this.directionalLight;
    }
    createPointLight(color, intensity){
        this.pointLight = new THREE.PointLight(color, intensity);

        return this.pointLight;
    }
    createHemisphereLight(color, intensity){
        this.hemisphereLight = new THREE.HemisphereLight(color, intensity);

        return this.hemisphereLight;
    }
    setLightPosition(light, x, y, z){
        light.position.set(x, y, z);
    }


    // -----------------------RENDERER---------------------------------------

    createRenderer(container, gammaFactor, gammaOutput){
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(container.clientWidth * 0.95, container.clientHeight * 0.95);
        this.renderer.gammaFactor = gammaFactor;
        this.renderer.gammaOutput = gammaOutput;
        this.renderer.physicallyCorrectLights = true;

        container.appendChild(this.renderer.domElement);

        return this.renderer;
    }


    // -----------------------CONTROLS---------------------------------------

    createControls(camera, renderer, autoRotate = true){
        this.controls = new OrbitControls(camera, renderer.domElement);
        this.controls.autoRotate = autoRotate;

        return this.controls;
    }
    render(scene, camera, renderer){
        console.log("here");
        renderer.render(scene, camera);
    }


    // -----------------------LOAD MODEL---------------------------------------

    loadModel(renderer, scene, camera, pathToModel, scale, x = 0, y = 0, z = 0){
        this.loader = new GLTFLoader();

        // console.log(this.renderer, this.scene, this.camera);

        this.loader.load(pathToModel, gltf => {
            this.model = gltf.scene.children[0];
            // this.model.scale.set(scale, scale, scale);
            // this.model.position.set(x, y, z);
            scene.add(gltf.scene);
            this.animate(renderer, scene, camera);
        });
    }
    animate(renderer, scene, camera){
        renderer.render(scene, camera);
        requestAnimationFrame(() => this.animate(renderer, scene, camera));
    }


    // -----------------------ON WINDOW RESIZE---------------------------------------

    onwindowResize(container){
        this.camera.aspect = container.clientWidth / container.clientHeight;

        this.camera.updateProjectionMatrix();

        this.renderer.setSize(container.clientWidth * 0.95, container.clientHeight * 0.95);
    }


    // -----------------------AXES---------------------------------------

    addAxes(size){
        this.axesHelper = new THREE.AxesHelper(size);
        this.scene.add(this.axesHelper);
    }


}

