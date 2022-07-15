import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'     
import * as CANNON  from 'cannon' // 简单的物理库
const scene = new THREE.Scene()
 
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 2
 
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera,renderer.domElement)
 
const geometry = new THREE.BufferGeometry()
const vertices  = new Float32Array([
    -1.0, -1.0,  1.0,
    1.0, -1.0,  1.0,
    1.0,  1.0,  1.0,

    1.0,  1.0,  1.0,
   -1.0,  1.0,  1.0,
   -1.0, -1.0,  1.0 
])
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
const material = new THREE.MeshBasicMaterial({color:0xff0000})
material.side = THREE.DoubleSide
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)


const testGeometry = new THREE.BoxGeometry(1,1,1)
const testMaterial = new THREE.MeshBasicMaterial({color:0xffff00})
const mesh2 = new THREE.Mesh(testGeometry,testMaterial)
scene.add(mesh2)

const shape = new THREE.Shape()


const plane = new THREE.Plane( new THREE.Vector3( 1, 1, 0.2 ), 3 );
const helper = new THREE.PlaneHelper( plane, 1, 0xffff00 );
scene.add( helper );

THREE.GridHelper
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}
 
const stats = Stats()
document.body.appendChild(stats.dom)


const gui = new GUI()
const cubeFolder = gui.addFolder('Cube')
cubeFolder.add(cube.rotation, 'x', 0, Math.PI * 2)
cubeFolder.add(cube.rotation, 'y', 0, Math.PI * 2)
cubeFolder.add(cube.rotation, 'z', 0, Math.PI * 2)
cubeFolder.open()
const cameraFolder = gui.addFolder('Camera')
cameraFolder.add(camera.position, 'z', 0, 10)
cameraFolder.open()

function animate() {
    requestAnimationFrame(animate)

    render()
    stats.update()
}
 
function render() {
    renderer.render(scene, camera)
}
 
animate()