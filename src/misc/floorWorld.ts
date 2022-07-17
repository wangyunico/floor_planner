import { World,IWorldConfig} from 'ape-ecs'
 import { FloorEntityPool } from "./floorEntityPool";


class FloorWorld extends World {
     private entityPool: FloorEntityPool
    constructor(config?: IWorldConfig){
        super(config)
         this.entityPool = new FloorEntityPool(this, config?.entityPool)
    }
}


export {FloorWorld}