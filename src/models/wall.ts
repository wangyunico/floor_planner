import * as THREE from 'three'
import * as Graphics from '../graphcs/basicGraphics'
import {BaseModel} from './basemodel'
import {Corner} from './corner'


export class Wall implements BaseModel<Wall> {
    
    private start: Corner;
    private end: Corner;
    isSelected: boolean;

    constructor(start:Corner,end:Corner){
      this.isSelected = false;
      this.start = start; 
      this.end = end;
    }


    generateGraphicsObject(group:THREE.Group, thinckness:number) {
     // conner是中心点，基于中心点向两侧扩展
    }
 }