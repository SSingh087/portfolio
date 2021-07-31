import gsap from "https://cdn.skypack.dev/gsap";
import * as THREE from 'https://cdn.skypack.dev/three@0.130.1';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.130.1/examples/jsm/controls/OrbitControls.js';
import * as dat from "https://cdn.skypack.dev/dat.gui";
import { STLLoader } from 'https://cdn.skypack.dev/three@0.130.1/examples/jsm/loaders/STLLoader.js';
import {GLTFLoader} from 'https://cdn.skypack.dev/three@0.130.1/examples/jsm/loaders/GLTFLoader.js'

let camera, scene, light, renderer, loader

scene = new THREE.Scene()
scene.background = new THREE.Color( 0xcce0ff )
scene.fog = new THREE.Fog( 0xcce0ff, 500, 10000 )

camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000)
camera.position.set(0,-50,18)
camera.rotation.set(1.3, 0, 0)
camera.castShadow = true
scene.add(camera)



//GROUND --------------------------------------------------------------------
const plane = new THREE.PlaneGeometry(200, 200, 5, 5)
loader = new THREE.TextureLoader()
const groundTexture = loader.load( 'grasslight-big.jpg' )
groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping
groundTexture.repeat.set( 25, 25 )
groundTexture.anisotropy = 16
groundTexture.encoding = THREE.sRGBEncoding
const groundMaterial = new THREE.MeshLambertMaterial( { map: groundTexture } );
const mesh = new THREE.Mesh(plane, groundMaterial)
scene.add(mesh)


//LIGHT --------------------------------------------------------------------
scene.add( new THREE.AmbientLight( 0x666666 ) );
light = new THREE.DirectionalLight( 0xffffff, .9)
light.position.set(0,0,1)
light.rotation.set(10,10,10)
scene.add(light)

//MODELS --------------------------------------------------------------------
loader = new STLLoader()
loader.load('/FL_Taj Mahal.stl', function ( geometry ) {

	const material = new THREE.MeshPhongMaterial( {color: 0xfffff0} );
	const mesh = new THREE.Mesh( geometry, material );
	mesh.scale.set( 0.05, 0.05, 0.05 );
	mesh.rotation.set(0, 0, 90);
	mesh.castShadow = true;
	mesh.receiveShadow = true;
	scene.add( mesh );
				})

function move_car(){

	let car = new GLTFLoader();

	car.load('/car/scene.gltf', function(gltf){
	gltf.scene.scale.set( 0.01, 0.01, 0.01 );
	gltf.scene.position.set(-10,-10,0)
	gltf.scene.rotation.set(1.57,0,0);
	scene.add(gltf.scene);
	
	const keyStates = {};
	document.addEventListener( 'keydown', ( event ) => {
				keyStates[event.code] = true;
			});
	if ( keyStates['KeyW'] ) {
		gltf.scene.position.x += 1;
					}
	if ( keyStates['KeyS'] ) {
		gltf.scene.position.x -= 1;
					}

	if ( keyStates['KeyA'] ) {
		gltf.scene.position.y -= 1;
					}

	if ( keyStates['KeyD'] ) {
		gltf.scene.position.y += 1;
					}
		console.log(keyStates)
})

}

function wave_flag(){

loader = new GLTFLoader()
loader.load('/flag_of_india/scene.gltf', function(gltf){
	gltf.scene.scale.set(5,5,5);
	gltf.scene.position.set(0,-10,0)
	gltf.scene.rotation.set(1.57,0,0);
	scene.add(gltf.scene);
})
}

wave_flag();

function gui(){
const gui = new dat.GUI()
const world = {
  loader: {
    x: 0,
    y: 0,
    z: 0,
  }
}	

gui.add(loader.rotation, 'x', -3.14, 3.14).name('x')
gui.add(loader.rotation, 'y', -3.14, 3.14).name('y')
gui.add(loader.rotation, 'z', -3.14, 3.14).name('z')
}


renderer = new THREE.WebGLRenderer( { antialias: true } )
renderer.setPixelRatio( window.devicePixelRatio )
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild(renderer.domElement)

//new OrbitControls(camera, renderer.domElement)

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
	//move_car();
}

animate()

