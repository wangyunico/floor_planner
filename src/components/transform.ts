import * as THREE from 'three'
import { Component } from 'ape-ecs'
import { Vector3 } from 'three/src/math/Vector3'
import { Euler, Quaternion } from 'three';


type Position = Vector3;
type Rotation = Quaternion;
type Scale =  Vector3;


// 用于标识Entity具备的Transform的属性
class Transform extends Component {

public eulerAngles? :Euler //欧拉角
public localPosition?: Position
public localScale?: Scale
public localRotation?: Rotation
private parent?: Transform
public postion?: Position
public scale?: Scale  
public rotation?:Rotation



}


export {Position,Rotation,Scale, Transform}
