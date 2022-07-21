import { Component } from "ape-ecs"
import { Mesh } from "three"
import {ThreeCompnent} from "./threeComponent"
// 构建几何体的组件
class MeshFilter extends ThreeCompnent<Mesh> {
   

 
    public get mesh():Mesh|undefined {
        return this.instance
    }

}



export {MeshFilter}