import { Entity,World } from "ape-ecs"
import { Transform } from "../components/transform";



class FloorEntity extends Entity {

public parentEntity?: FloorEntity
public children?:[FloorEntity]   //entity是树状结构组织的
private  world?:World
 constructor(){
  super()
  this.world?.registerComponent(Transform) //每一个FloorEntity都有一个Transform对象
  this.addComponent({type:'Transform'})
  
 }

}

export {FloorEntity}