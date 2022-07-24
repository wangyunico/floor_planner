import * as THREE from 'three'
import { Wall } from './wall'
import * as Graphics from '../graphcs/basicGraphics'
import {BaseModel} from './basemodel'
import {Direction, Position} from '../helpers/metrics'

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
    const deg = wall.direction.angle();
     const index = this.findIndex(this.startWalls,deg);
     //todo 增加其他的操作 找到前后的 wall 修改值
    this.startWalls.splice(index,0 ,[deg,wall]);
    
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