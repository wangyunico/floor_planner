/****
 * Entity类似于GO对象
 * 户型图由Entity构成，
 * 一个FloorPlan 由多个Room 与相关辅助工具的标识构成
 * 一个Room 由多块walls、corner、地板、天花板(不做2D显示)构成，
 * wall 除了几何以外，有两面(edge)构成，每一个面可以贴壁纸
 * wall 可以镶嵌 门窗等组件
 * edge 分内外面可以进行装饰
 * foor 一面就可以了，可以选材质，另外可以放置组件
 */
import {IEntityConfig, World} from "ape-ecs"
import { FloorEntity } from "./floorEntity"

interface AbstractModel extends IEntityConfig {

     addDefaultComponents(entity:FloorEntity):void,
     
}


class HalfEdge implements AbstractModel{
     public tags?: string[] = ["halfEdge"]
     constructor(){}
     addDefaultComponents(entity: FloorEntity): void {
          //todo 增加默认的组件
     }
}

class Wall implements AbstractModel {
      // 增加Component 能够操控两个Edge的组件
      // 判断外墙，设置尺寸测量的租价
     addDefaultComponents(entity: FloorEntity): void {
          
     }
}

class Corner implements AbstractModel {
     //增加用来定位墙体的组件
     addDefaultComponents(entity: FloorEntity): void {
          
     }
}


class Room implements AbstractModel {
     //
     addDefaultComponents(entity: FloorEntity): void {
          
     }
}

class FloorPlan implements AbstractModel {
     //增加组件能够增加Room 并且执行判断的组件
     addDefaultComponents(entity: FloorEntity): void {
          
     }
}


function createEntity<T extends AbstractModel>(world:World, t:new () => T): FloorEntity|undefined {
      const description = new t();
      const entity = world.createEntity(description) as FloorEntity
       description.addDefaultComponents(entity)
     return entity;
}


export {createEntity, HalfEdge,Wall,Corner,Room,FloorPlan}