import { Entity,World } from "ape-ecs"
import { Transform } from "../components/transform"
import { Object3D ,Scene} from "three"
import {ThreeCompnent} from "../components/threeComponent"
class FloorEntity extends Entity {

public parentEntity?: FloorEntity
public children?:[FloorEntity]   //entity是树状结构组织的
private  world?:World
 constructor(){
  super()
  this.world?.registerComponent(Transform) //每一个FloorEntity都有一个Transform对象
  this.addComponent({type:'Transform'})
  
 }

 //直接对object3D对象的封装
 addObject3DComponent<T extends Object3D>(value:T, parentEntity?: FloorEntity) {
    this.addComponent(
      {
        type: 'ThreeCompnent',
        instance: value
      }
    )
    if(parentEntity != null){
      this.parentEntity = parentEntity
    }
 }

 getObject3DComponent<T extends Object3D>(type: new () => T):ThreeCompnent<T>|null {
   const component = this.getOne(ThreeCompnent<T>);
   if (component?.instance instanceof type){
      return component
   }
   return null


 }
 

}

export {FloorEntity}