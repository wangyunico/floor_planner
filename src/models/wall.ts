import * as THREE from 'three'
import * as Graphics from '../graphcs/basicGraphics'
import { calcDirection, Direction, NormalType } from '../helpers/metrics';
import {BaseModel} from './basemodel'
import {Corner} from './corner'
import {Edge} from "./edge"

export class Wall implements BaseModel<Wall> {
    
    public start: Corner;
    public end: Corner;
    isSelected: boolean;
    direction:Direction; //表示墙延伸的方向
    public outEdge: Edge; //外墙:法线类型 up
    public innerEdge: Edge; //内向 法线类型 down
    public thickness: number;
    public color?:number;

    constructor(start:Corner,end:Corner, thickness:number){
      this.isSelected = false;
      this.start = start; 
      this.end = end;
      this.thickness = thickness;
      this.direction = calcDirection(start.positon,end.positon);
      this.outEdge = new Edge(this,NormalType.up);
      this.innerEdge = new Edge(this, NormalType.down);
    }

   // 调用完成画 wall的方法,逆时针针检测,修改wall对应的edge位置
    finishAdded(){
     this.start.addStartWall(this);
     this.end.addEndWall(this);
    }
   

    generateGraphicsObject(scene:THREE.Group) {
     // conner是中心点，基于中心点向两侧扩展
      const shape = new THREE.Shape();
       shape.moveTo(this.start.positon.x, this.start.positon.y)
       shape.lineTo(this.outEdge.startPosition.x, this.outEdge.startPosition.y);
       shape.lineTo(this.outEdge.endPosition.x, this.outEdge.endPosition.y);
       shape.lineTo(this.end.positon.x, this.end.positon.y)
       shape.lineTo(this.innerEdge.endPosition.x, this.innerEdge.endPosition.y);
       shape.lineTo(this.innerEdge.startPosition.x,this.innerEdge.startPosition.y);
      shape.closePath();
      const geometry = new THREE.ShapeGeometry( shape);
      const material = new THREE.MeshBasicMaterial( { color: this.color??0x000000} );
      const mesh = new THREE.Mesh( geometry, material );
      scene.add(mesh);
    }
 }