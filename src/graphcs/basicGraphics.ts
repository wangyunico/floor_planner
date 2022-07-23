
import * as THREE from 'three'
import { Object3D } from 'three/src/core/Object3D';

export interface  Size {
    width: number;
    height: number;
}

export interface Origin {
    x: number;
    y: number;
}



export function gridrectangle(origin:Origin, size:Size, colorHex:number):Object3D {

    const geomery = new THREE.PlaneGeometry(size.width,size.height);
    const edges = new THREE.EdgesGeometry(geomery);
    const obj = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({color: colorHex}));
     obj.translateX(origin.x + size.width/2)  //中心点在中心
     obj.translateY(origin.y + size.height/2) //中心点在中心
    return obj;

}

export function fillRectangle(origin:Origin,size:Size,colorHex:number):Object3D{
     const geomery = new THREE.PlaneGeometry(size.width,size.height);
     const obj = new THREE.Mesh(geomery, new THREE.MeshBasicMaterial({color:colorHex}))
     obj.translateX(origin.x + size.width/2)  //中心点在中心
     obj.translateY(origin.y + size.height/2) //中心点在中心
    return  obj
}