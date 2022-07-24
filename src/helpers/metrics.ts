
import * as THREE from 'three'

export class Position extends THREE.Vector2{}


//表示方向的向量,确定
export class Direction extends THREE.Vector2{}

export enum NormalType {
    up, //逆时针
    down // 顺时针
}


//获取向量的方向
export function calcDirection(start:Position, end: Position):Direction {
       const direction = new Direction();
       direction.subVectors(end, start);
       direction.normalize();
      return direction;
}


export function calcNormal(start:Position, end:Position, normalDirection:NormalType):Direction {
      const direction =  calcDirection(start,end);
      if(normalDirection == NormalType.up){
        [direction.x ,direction.y]= [-direction.y,direction.x];
      }else{
        [direction.x ,direction.y]= [direction.y,-direction.x];
      }
     
      return direction;
}

export function calcNormalFromDirection(target:Direction, normalType:NormalType):Direction{
     const direction = target.clone();
     if(normalType == NormalType.up){
        [direction.x ,direction.y]= [-direction.y,direction.x];
      }else{
        [direction.x ,direction.y]= [direction.y,-direction.x];
      }
     
     return direction;
}


// 针对一个方向向量，给定目标方向向量，判断目标向量是在给定向量的上方还是下方  通过叉乘判断向量的方向
export function sideFrom(source:Direction, target:Direction):NormalType{
      if(source.cross(target) >= 0){
         return NormalType.up;
      }else{
        return NormalType.down;
      }
}

