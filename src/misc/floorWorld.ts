import { World,IWorldConfig} from 'ape-ecs'
import { FloorEntityPool } from "./floorEntityPool";
import {ThreeCompnent} from "../components/threeComponent"

class FloorWorld extends World {
     private entityPool: FloorEntityPool
    constructor(config?: IWorldConfig){
        super(config)
         this.entityPool = new FloorEntityPool(this, config?.entityPool)
         this.registerComponent(ThreeCompnent)
    }
}


export {FloorWorld}