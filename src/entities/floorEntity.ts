import { Entity,World } from "ape-ecs"
import { Transform } from "../components/transform";



class FloorEntity extends Entity {

public parentEntity?: FloorEntity
public children?:[FloorEntity]   //entity是树状结构组织的
private  world?:World
 constructor(){
  super()
  this.world?.registerComponent(Transform) //注册组件，添加默认组件
  this.addComponent({type:'Transform'})
  
 }

}

export {FloorEntity}