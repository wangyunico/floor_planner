
import * as THREE from 'three'

export interface BaseModel<T> {
    instance?: THREE.Group
    isSelected: boolean
    generateGraphicsObject(group:THREE.Group, ...args:any[]):void 
}