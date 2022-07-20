import { Component } from "ape-ecs";
import { Object3D } from "three";


export class ThreeCompnent<T extends Object3D> extends Component {
  public instance?: T;

 
 static typeName?: string | undefined;
}


