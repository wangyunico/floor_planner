
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
    const path = new THREE.Path();
    path.moveTo(origin.x,origin.y);
    path.lineTo(origin.x+size.width, origin.y);
    path.lineTo(origin.x+size.width,origin.y+size.height);
    path.lineTo(origin.x,origin.y+size.height);
    path.closePath();
    const geomery = new THREE.BufferGeometry().setFromPoints(path.getPoints());
    const material = new THREE.LineBasicMaterial({color: colorHex});
    return new THREE.Line(geomery,material);

}

export function fillRectangle(origin:Origin,size:Size,colorHex:number):Object3D{
    const path = new THREE.Shape();
    path.moveTo(origin.x,origin.y);
    path.lineTo(origin.x+size.width, origin.y);
    path.lineTo(origin.x+size.width,origin.y+size.height);
    path.lineTo(origin.x,origin.y+size.height);
    path.closePath();
    const geomery = new THREE.ShapeGeometry( path );;
    const material = new THREE.MeshBasicMaterial( { color: colorHex } );
    return new THREE.Mesh(geomery,material); 
}