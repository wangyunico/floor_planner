import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'     
import * as CANNON  from 'cannon' // 简单的物理库
import { Entity ,System,Component,World,Query} from 'ape-ecs'
import {FloorWorld} from '../misc/floorWorld'

class Position extends Component {
  
}
Position.properties = {
    x: 0, 
    y: 0
}

class Vector extends Component {
    public get speed(){
        return Math.sqrt(this.mx**2 + this.my**2);
    }
}
Vector.properties = {
    mx: 0,
    my: 0,
    // speed: 0
  };

class FrameInfo extends Component {

   update(value: any): void{

     console.log('小王子回家');
   } 
}
FrameInfo.properties = {
    deltaTime: 0,
    deltaFrame:0,
    time: 0
}

class Gravity extends System {
    private mainQuery? : Query 
 
  init(...initArgs: any[]): void {
      this.mainQuery = this.createQuery().fromAll('FrameInfo');
  }
  update(tick: number): void {
      const entities = this.mainQuery!.execute();
      const frameInfo = this.world.getEntity('frame');
      for (const entity of entities){
        const point = entity.getOne('Position');
        if (! entity.has(Vector)){
            entity.addComponent({
                type: 'Vector',
                mx: 0,
                my: 0
            })
        }
        const vector = entity.getOne('Vector') as Vector
        let a = vector.speed

        

      }
  }
}



const world = new FloorWorld();
world.registerComponent(Position)
world.registerComponent(Vector)
world.registerComponent(FrameInfo)
world.registerTags('Physics')
world.registerSystem('frame',Gravity);

const frame = world.createEntity({
    id: 'frame',
    c: {
      time: {
        type: 'FrameInfo',
      }
    }
  })

  let lastTime = 0;
  function update(time:number) {
    debugger;
    const delta = time - lastTime;
    time = lastTime;
    frame.getOne(FrameInfo)?.update({
        time: time,
        deltaTime: delta,
        deltaFrame: delta / 16.667
    }   
    )
    world.runSystems('frame')
    window.requestAnimationFrame(update);
  }
   update(0);

  


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
// scene.add(cube)

debugger;
const testGeometry =  new THREE.SphereGeometry( 1, 8, 8 )
const testMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, visible: true } )
const mesh2 = new THREE.Mesh(testGeometry,testMaterial)

const box = new THREE.Box3();
const selectionBox = new THREE.Box3Helper( box );
box.setFromObject(mesh2,true)
scene.add(mesh2)
scene.add(selectionBox)

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