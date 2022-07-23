import { BuildObject } from "./buildObject";
import * as THREE from 'three'
import * as Graphics from '../graphcs/basicGraphics'
import { ThreeCompnent } from "./threeComponent";


export enum Pivot {
     Start,
     End
}
export enum Toward {
    Inner,
    Outer,
}

// Door 有3D模型构成,由位置构成用于镶嵌到墙体中
class Door extends BuildObject {
   public thickness:number = 0; //初始化的时候都给0
   public width:number = 0; // 初始化的时候都给0
   public fillColorHex:number = 0xffffff;
   public lineColorHex:number = 0x000000;
   public pivot: Pivot = Pivot.Start;
   public toward: Toward = Toward.Inner;
   constructor(){
    super()
   }



   update2DGraph(group2D:THREE.Group, width:number, height:number,pivot:Pivot, toward:Toward){

    const scale = width/1
    const margin = 0.3;
    const origin = {x:0, y:0}
    //以1为基准画墙
    let size = new THREE.Vector2(0.4,height)
    let headLength= 0.6*scale*size.width
    const bgGraphic =  Graphics.fillRectangle(origin,new THREE.Vector2(1, height),this.fillColorHex);
    const upRect = Graphics.gridrectangle({x:0.3,y:0},new THREE.Vector2(size.width,headLength),this.lineColorHex);
    const downRect = Graphics.gridrectangle({x:0.3,y:size.height-headLength},new THREE.Vector2(size.width,headLength),this.lineColorHex);
    const path = new THREE.Path();
    const startY = headLength;
    const endY =  size.height-headLength;
    [0,0.1,0.3,0.4].forEach((val)=>{
       path.moveTo(val+margin,startY);
       path.lineTo(val+margin,endY);
    })
    const geomery = new THREE.BufferGeometry().setFromPoints(path.getPoints());
    const material = new THREE.LineBasicMaterial({color: 0x000000});
    const middle = new THREE.LineSegments(geomery,material);
    //绘制门的户型,origin相当于inner
    const redius =  height - 2*headLength;
    let pivotPoint:THREE.Vector2|undefined;
    let outPoint: THREE.Vector2|undefined;
    let endPoint: THREE.Vector2|undefined;
    let baseRedius = 0;
     switch(pivot){
        case Pivot.Start:
         if(toward == Toward.Outer){
            pivotPoint = new THREE.Vector2(origin.x+width-margin, origin.y+headLength);
            outPoint = new THREE.Vector2(origin.x+width-margin+redius, origin.y+headLength);
            endPoint = new THREE.Vector2(origin.x+width-margin, origin.y+height-headLength);
            break;
         }
         if(toward == Toward.Inner){
            pivotPoint = new THREE.Vector2(origin.x+margin, origin.y+headLength);
            outPoint = new THREE.Vector2(origin.x+ margin-redius, origin.y+headLength);
            endPoint = new THREE.Vector2(origin.x+margin, origin.y+height-headLength);
            baseRedius = 0.5*Math.PI
            break; 
         }
        
        case Pivot.End:
            if(toward == Toward.Outer){
                pivotPoint =new THREE.Vector2(origin.x+width-margin, origin.y+height-headLength);
                outPoint = new THREE.Vector2(origin.x+width-margin+redius, origin.y+height-headLength);
                endPoint = new THREE.Vector2(origin.x+width-margin, origin.y+headLength);
                baseRedius = -0.5*Math.PI
                break;
             }
             if(toward == Toward.Inner){
                pivotPoint = new THREE.Vector2(origin.x+margin, origin.y+height-headLength)
                outPoint = new THREE.Vector2(origin.x+margin-redius, origin.y+height-headLength);
                endPoint = new THREE.Vector2(origin.x+margin, origin.y+headLength);
                baseRedius = Math.PI;
                break; 
             }  
        
     }

     const doorPath = new THREE.Path();
      doorPath.moveTo(pivotPoint!.x,pivotPoint!.y);
      doorPath.lineTo(outPoint!.x, outPoint!.y);
      doorPath.moveTo(pivotPoint!.x,pivotPoint!.y);
      doorPath.arc(0, 0,redius, baseRedius, baseRedius+0.5*Math.PI, false);
      const doorGeomery = new THREE.BufferGeometry().setFromPoints(doorPath.getPoints());
      const doorarc = new THREE.Line(doorGeomery,new THREE.LineBasicMaterial({color: this.lineColorHex}));
     group2D.add(bgGraphic)
     group2D.add(upRect)
     group2D.add(downRect)
     group2D.add(middle)
     group2D.add(doorarc)
     group2D.scale.setX(scale); 
   }


}


export {Door}