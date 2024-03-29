import { BuildObject } from "./buildObject";
import * as THREE from 'three'
import * as Graphics from '../graphcs/basicGraphics'
import { ThreeCompnent } from "./threeComponent";
import {Position} from "../helpers/metrics"
// 要改成entity 使用component会有问题
class Window extends BuildObject {
   public thickness:number = 0; //初始化的时候都给0
   public start: Position = new Position(0,0) ; //todo: 要修改开始位置 表示距离墙面起始点的offset // 表示距离墙面终点的offeset
   public end: Position = new Position(0,0); //结束位置
   public fillColorHex:number = 0xffffff;
   public lineColorHex:number = 0x000000;
   
   constructor(){
    super()
   }

     update(value: any){

        if (this.thickness!=value.thickness || this.start != value.start || this.end != value.end){
            this.thickness = value.thickness
            this.start = value.start
            this.end = value.end
            if (this.group == null){
                this.group = new THREE.Group() 
            }else{
                this.group.parent?.remove(this.group)
                this.group = new THREE.Group()
            }
            //1. 厚度相当于宽度
            //2. 宽度相当绘制的高度
            this.update2DGraph(this.group,this.thickness,this.start,this.end);
            //todo: 3D的Graph的内容
        }

   
     }


    update2DGraph(group2D:THREE.Group, thickness:number, start:Position, end:Position){
        debugger;
       const scale = thickness/0.9 
       const windowWidth =  start.distanceTo(end)
       //以0.9为基准画墙
       let size = new THREE.Vector2(0.3,windowWidth)
       let headLength= 0.6*scale*size.width
       const bgGraphic =  Graphics.fillRectangle({x:0,y:0},new THREE.Vector2(0.9, windowWidth),this.fillColorHex);
       const upRect = Graphics.gridrectangle({x:0.3,y:0},new THREE.Vector2(size.width,headLength),this.lineColorHex);
       const downRect = Graphics.gridrectangle({x:0.3,y:size.height-headLength},new THREE.Vector2(size.width,headLength),this.lineColorHex);
       const path = new THREE.Path();
       const startY = headLength;
       const endY =  size.height-headLength;
       [0,0.1,0.2,0.3].forEach((val)=>{
          path.moveTo(val+0.3,startY);
          path.lineTo(val+0.3,endY);
       })
       const geomery = new THREE.BufferGeometry().setFromPoints(path.getPoints());
       const material = new THREE.LineBasicMaterial({color: 0x000000});
       const middle = new THREE.LineSegments(geomery,material);
        group2D.add(bgGraphic)
        group2D.add(upRect)
        group2D.add(downRect)
        group2D.add(middle)
        group2D.scale.setX(scale); 
    }
   
}











export {Window}