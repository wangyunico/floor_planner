

import * as THREE from 'three'
import * as Graphics from '../graphcs/basicGraphics'
import {BaseModel} from './basemodel'
import {Wall} from './wall'


export class Window implements BaseModel<Window> {
    
    isSelected: boolean;
    public wall: Wall;

    constructor(wall: Wall){
      this.isSelected = false;
      this.wall = wall;
    }


    generateGraphicsObject(group:THREE.Group, thinckness:number) {
     // conner是中心点，基于中心点向两侧扩展
    }
 }