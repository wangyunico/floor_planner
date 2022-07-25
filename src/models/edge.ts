import * as THREE from 'three'
import { Wall } from './wall'
import * as Graphics from '../graphcs/basicGraphics'
import {BaseModel} from './basemodel'
import {calcNormalFromDirection, NormalType, Position} from '../helpers/metrics'


export class Edge implements BaseModel<Edge> {
    isSelected: boolean = false;
    startPosition: Position = new Position(); //表示边缘的起点
    endPosition: Position = new Position(); // 表示边缘的终点
    owner: Wall;  // 表示这个边是属于那个Wall
    normalType: NormalType; //up表示外墙，normal表示里面的强

    constructor(wall:Wall, normalType:NormalType){
        this.owner = wall;
        this.normalType = normalType; //法线类型
        let normal = calcNormalFromDirection(wall.direction, normalType);
        this.startPosition.addVectors(wall.start.positon, normal.clone().multiplyScalar(wall.thickness/2));
        this.endPosition.addVectors(wall.end.positon, normal.clone().multiplyScalar(wall.thickness/2));

    } 

    generateGraphicsObject(group:THREE.Group, thinckness:number) {
        // conner是中心点，基于中心点向两侧扩展
       }
}