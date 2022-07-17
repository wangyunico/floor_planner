import EntityPool from "ape-ecs/src/entitypool";
import { FloorEntity } from "../entities/floorEntity";


class FloorEntityPool extends EntityPool{
    constructor(world, spinup) {
        super(world,spinup)
        this.worldEntity = FloorEntity 
        this.worldEntity.prototype.world = this.world 
    }
}