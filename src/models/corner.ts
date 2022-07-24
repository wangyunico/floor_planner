import * as THREE from 'three'
import { Wall } from '../entities/entityCreator'
import * as Graphics from '../graphcs/basicGraphics'
import {BaseModel} from './basemodel'
import {Position} from '../helpers/metrics'

export class Corner implements BaseModel<Corner> {
  
  public startWalls?: Wall[]
  public endWalls?: Wall[]
  private _positon: Position;
  isSelected: boolean
   constructor(pos: Position){
    this.startWalls = [];
    this.endWalls = [];
    this.isSelected = false;
    this._positon = pos;
   }
   addStartWall(wall:Wall){
    this.startWalls?.push(wall);
    //todo 增加其他的操作
   }
   
   addEndWall(wall:Wall){
    this.endWalls?.push(wall);
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