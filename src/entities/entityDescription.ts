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
import {IEntityConfig} from "ape-ecs"
class HalfEdge implements IEntityConfig {
     public tags?: string[] = ["halfEdge"]
     constructor(){
       
     }
}