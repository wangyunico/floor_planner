import { MeshFilter } from "./MeshFilter";

/**
 * window 和 door 还有其他3D的物品相当于组件，添加到entity中
 */

// todo 构成 2D shape 的函数
class BuildObject extends MeshFilter {
    public group?:THREE.Group

}


export{BuildObject}