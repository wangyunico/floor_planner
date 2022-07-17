import EntityPool from "ape-ecs/src/entitypool";
import { FloorEntity } from "../entities/floorEntity";


class FloorEntityPool extends EntityPool{
    constructor(world, spinup) {
        super(world,spinup)
        this.config()
    }

    config(){
        this.worldEntity = FloorEntity
        this.worldEntity.prototype.world = this.world 
    }
}

export {FloorEntityPool}