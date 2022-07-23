import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'     
import * as CANNON  from 'cannon' // 简单的物理库
import { Entity ,System,Component,World,Query,EntityRef} from 'ape-ecs'
import {FloorWorld} from '../misc/floorWorld'
import {FloorEntity} from '../entities/floorEntity'
import {ThreeCompnent}from '../components/threeComponent'
import { Scene, Vector2 } from 'three'
import * as Graphics from '../graphcs/basicGraphics'
import {Window} from '../components/window'
import {Door, Pivot, Toward} from '../components/door'

import {Line2} from "three/examples/jsm/lines/Line2"
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';

 new ThreeCompnent<THREE.Scene>()

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
    testRef: EntityRef
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
      const frameInfo = this.world.getEntity('frame') as FloorEntity;
      for (const entity of entities){
        const point = entity.getOne('Position');
        if (! entity.has(Vector)){
            entity.addComponent({
                type: 'Vector',
                mx: 0,
                my: 0
            })
        }
        debugger; 
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
    // debugger;
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
scene.background = new THREE.Color(0xcccccc);
 
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 2
 
const renderer = new THREE.WebGLRenderer({antialias:true})
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

// debugger;
const testGeometry =  new THREE.SphereGeometry( 1, 8, 8 )
const testMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, visible: true } )
const mesh2 = new THREE.Mesh(testGeometry,testMaterial)

const box = new THREE.Box3();
const selectionBox = new THREE.Box3Helper( box );
box.setFromObject(mesh2,true)
// scene.add(mesh2)
// scene.add(selectionBox)



const ge = new THREE.PlaneGeometry( 1, 1 );
const edges = new THREE.EdgesGeometry(ge)
const line2 = new THREE.LineSegments(edges,new THREE.LineBasicMaterial( { color: 0xffff00 } ))


 const test = new THREE.Group();

 const obj = new Door()
 obj.update2DGraph(test,1,3,Pivot.End, Toward.Outer)
var geometry1 = new LineGeometry();
// 顶点坐标构成的数组pointArr
var pointArr = [-100,0,0,
  -100,100,0,
  0,0,0,
  100,100,0,
  100,0,0,]
// 几何体传入顶点坐标
geometry1.setPositions( pointArr);
// 自定义的材质
var material1  = new LineMaterial( {
  color: 0xdd2222,
  // 线宽度
  linewidth: 20,
} );
// 把渲染窗口尺寸分辨率传值给材质LineMaterial的resolution属性
// resolution属性值会在着色器代码中参与计算
material1.resolution.set(window.innerWidth,window.innerHeight);
var line = new Line2(geometry1, material1);

line2.translateX(1)


 scene.add(test)

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


function initialize(): void {
  const world = new FloorWorld()
  
}



function toString(a: string){

    return function<T>(C:new()=>T){
          C.prototype.test = a;
        debugger
    }
}

@toString("qiaohongm")
class User {
    username: string = ""
    id: number = 2
    token: string = ""
    avatar: string = ""
    role: string = ""
}

const testUser = new User();

console.log(2);







