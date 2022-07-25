import * as THREE from 'three'
import { Wall } from './wall'
import * as Graphics from '../graphcs/basicGraphics'
import {BaseModel} from './basemodel'
import {Direction, Position,calcNormalFromDirection, NormalType} from '../helpers/metrics'

type WallContainer = [number,Wall][];
export class Corner implements BaseModel<Corner> {

  public startWalls: WallContainer
  public endWalls: WallContainer
  private _positon: Position;
  isSelected: boolean
   constructor(pos: Position){
    this.startWalls = [];
    this.endWalls = [];
    this.isSelected = false;
    this._positon = pos;
   }


   

   addStartWall(wall:Wall){
    // 获取到相邻位置的wall,修改wall edge的start值
    const len = this.startWalls.length;
    const deg = wall.direction.angle();
     const index = this.findIndex(this.startWalls,deg);
     //todo 增加其他的操作 找到前后的 wall 修改当前wall的edge的值
     if(len > 0){
        const frontWall = this.startWalls[index][1];
        const backWall = this.startWalls[index%len][1];
         this.resetBoundary(frontWall, wall);
         this.resetBoundary(wall, backWall);
     }
    this.startWalls.splice(index,0 ,[deg,wall]);
    
   }


   // 逆时针方向，inner 在 outer的逆时针方向最近的
  private resetBoundary(outer:Wall, inner:Wall){
       const outVector =  new THREE.Vector2();
       const innerVector = new THREE.Vector2();
       const commbineVector = new THREE.Vector2();
       const li_normal = calcNormalFromDirection(inner.direction, NormalType.down);
       debugger;
       let deg = li_normal.dot(outer.direction);
       if(deg >= -0.001 && deg<=0.001) //防止角度太大的时候，就不修改
        return;
        debugger;
       outVector.addVectors(this.positon, outer.direction.clone().multiplyScalar(inner.thickness/(2*deg)));
       innerVector.addVectors(this.positon, inner.direction.clone().multiplyScalar(outer.thickness/(2*deg)));
       commbineVector.addVectors(outVector,innerVector);
       outer.outEdge.startPosition = commbineVector;
       inner.innerEdge.startPosition = commbineVector;
  }




   private findIndex(arr:WallContainer ,deg: number):number{
    let index = 0;
    const len = arr.length;
     for(let i= 0; i< len -1; i++){
        if (i== 0){
         if(deg < arr[i][0]){
            break;
         }
        }else if (i == len - 1){
            if(deg > arr[i][0]){
                index = len;
                break;
            }
        }
       if(deg <= arr[i][0] && deg > arr[i-1][0]){
            index = i;
            break;
           } 
        
     }
     return index;
   }

   
   addEndWall(wall:Wall){
    this.endWalls?.push([0,wall]);
    //todo 增加其他操作
   }

   generateGraphicsObject(group:THREE.Group, ...args:any[]) {
     //通过点精灵表示
   }
   //获取postion
   public get positon() {
    return this._positon
   }
}