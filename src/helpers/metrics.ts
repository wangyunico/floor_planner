
import * as THREE from 'three'

export class Position extends THREE.Vector2{}


//表示方向的向量,确定
export class Direction extends THREE.Vector2{}

export enum NormalDirection {
    positive, //逆时针
    negative // 顺时针
}


//获取向量的方向
export function calcDirection(start:Position, end: Position):Direction {
       const direction = new Direction();
       direction.subVectors(end, start);
       direction.normalize();
      return direction;
}


export function calcNormalDirection(start:Position, end:Position, normalDirection:NormalDirection):Direction {
      const direction =  calcDirection(start,end);
      if(normalDirection == NormalDirection.positive){
        [direction.x ,direction.y]= [-direction.y,direction.x];
      }else{
        [direction.x ,direction.y]= [direction.y,-direction.x];
      }
     
      return direction;
}