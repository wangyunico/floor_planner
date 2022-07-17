import {Component} from "ape-ecs";
import { Texture } from "three";
import { Color } from "three/src/math/Color";


// 主要的材质类型
class Material<T extends THREE.Material> extends Component {
   public mainTexture?: Texture  
   public color?: Color
   public material?: T


}