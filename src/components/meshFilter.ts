import { Component } from "ape-ecs";
import { Mesh } from "three";

// 构建几何体的组件
class MeshFilter extends Component {
    public mesh? :Mesh

}



export {MeshFilter}