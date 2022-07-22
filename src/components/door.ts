import { BuildObject } from "./buildObject";
import * as THREE from 'three'
import * as Graphics from '../graphcs/basicGraphics'
import { ThreeCompnent } from "./threeComponent";

// Door 有3D模型构成,由位置构成用于镶嵌到墙体中
class Door extends BuildObject {
   public thickness:number = 0; //初始化的时候都给0
   public width:number = 0; // 初始化的时候都给0
   public fillColorHex:number = 0xffffff;
   public lineColorHex:number = 0x000000;
   
   constructor(){
    super()
   }

}


export {Door}