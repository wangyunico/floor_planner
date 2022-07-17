import { Entity } from "ape-ecs";


class FloorEntity extends Entity {
  
   

  get parentEntity(){
    return this.parentEntity
  }

  set parentEntity(value){
    this.parentEntity = value
  }


}

export {FloorEntity}