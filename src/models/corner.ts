import * as THREE from 'three'
import { Wall } from './wall'
import * as Graphics from '../graphcs/basicGraphics'
import {BaseModel} from './basemodel'
import {Direction, Position,calcNormalFromDirection, NormalType} from '../helpers/metrics'

enum  Kind {
   start,
   end
}

interface WrappedWall {
    deg:number;
    kind: Kind;
    wall: Wall;
}



export class Corner implements BaseModel<Corner> {

  public startWalls: Wall[]
  public endWalls: Wall[]
  public wallCollection:WrappedWall[];
  private _positon: Position;
  isSelected: boolean
   constructor(pos: Position){
    this.startWalls = [];
    this.endWalls = [];
    this.wallCollection = [];
    this.isSelected = false;
    this._positon = pos;
   }


   

   addStartWall(wall:Wall){
    this.startWalls.push(wall);
    const deg = wall.direction.angle();
    const warppedWall = {deg:deg,wall:wall,kind: Kind.start};
    this.insertAndSort(warppedWall);
    debugger;
    let len = this.wallCollection.length;
    const index = this.wallCollection.indexOf(warppedWall); //一定存在
     if(len > 1){
        const frontWrappedWall = this.wallCollection[(index-1+len)%len];
        const backWrappedWall = this.wallCollection[(index+1+len)%len];
        debugger;
         this.resetBoundary(frontWrappedWall, warppedWall);
         this.resetBoundary(warppedWall, backWrappedWall);
     }
   
   }

   addEndWall(wall:Wall){
     this.endWalls.push(wall);
     const deg = wall.direction.clone().negate().angle();
     this.insertAndSort({deg:deg, wall:wall, kind: Kind.end});

   }

   insertAndSort(wall:WrappedWall){
     const index = this.findIndex(wall.deg);
     this.wallCollection.splice(index, 0, wall); 
   }


   // 逆时针方向，inner 在 outer的逆时针方向最近的
  private resetBoundary(outer:WrappedWall, inner:WrappedWall){
       debugger;
       const outVector =  new THREE.Vector2();
       const innerVector = new THREE.Vector2();
       const commbineVector = new THREE.Vector2();
       const innerDirection = inner.kind == Kind.start ? inner.wall.direction.clone() : inner.wall.direction.clone().negate();
       const outerDirection  = outer.kind == Kind.start ? outer.wall.direction.clone() : outer.wall.direction.clone().negate();
       const li_normal = calcNormalFromDirection(innerDirection, NormalType.down);
       let deg = li_normal.dot(outerDirection);
       if(deg >= -0.001 && deg<=0.001) //防止角度太大的时候，就不修改
        return;
       outVector.addVectors(this.positon, outerDirection.multiplyScalar(inner.wall.thickness/(2*deg)));
       innerVector.addVectors(this.positon, innerDirection.multiplyScalar(outer.wall.thickness/(2*deg)));
       commbineVector.addVectors(outVector,innerVector);
       if(outer.kind == Kind.start){
        outer.wall.outEdge.startPosition = commbineVector;
       }else{
         outer.wall.outEdge.endPosition = commbineVector;
       }
       if (outer.kind == Kind.start){
        inner.wall.innerEdge.startPosition = commbineVector;
       }else{
         inner.wall.innerEdge.endPosition = commbineVector;
       }
       
  }




   private findIndex(deg: number):number{
    let index = 0;
    const len = this.wallCollection.length;
     for(let i= 0; i< len; i++){
        if (i== 0){
         if(deg < this.wallCollection[i].deg)
          break;
         continue;
        }
       
       if (deg <= this.wallCollection[i].deg && deg > this.wallCollection[i-1].deg){
            index = i;
            break;
       } 

       if (i == len - 1){
            if(deg > this.wallCollection[i].deg)
                index = len;   
            break;
        }      
     }
     return index;
   }

   

   generateGraphicsObject(group:THREE.Group, ...args:any[]) {
     //通过点精灵表示
   }
   //获取postion
   public get positon() {
    return this._positon
   }
}