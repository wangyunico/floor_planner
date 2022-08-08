import { AFrame, ComponentDefinition, Schema } from "aframe";
import * as THREE from  'three'


interface OrthoCamera {
    width?: number;
    height?:number;
    near?:number;
    far?:number;
    camera?:THREE.OrthographicCamera;
    active?:boolean;
    zoom?:number;
    orginalCamera?: THREE.Camera;
    cameraParent?: THREE.Object3D;
}


 AFRAME.registerComponent('orthocamera',<ComponentDefinition<OrthoCamera>>{
  schema:{
     active:{default:true},
     far:{default: 1},
     near:{default: -1},
     zoom:{default:1, min:0}
  },

  init() {
    debugger;
    const el = this.el;
    const sceneEl = el.sceneEl;
    sceneEl?.addEventListener('render-target-loaded',()=>{
        debugger;
        this.orginalCamera = sceneEl.camera;
        this.cameraParent = this.orginalCamera.parent??undefined;
        this.cameraParent?.add(this.camera!);
        sceneEl.camera = this.camera!
    })
    const camera = this.camera = new THREE.OrthographicCamera();
    el.setObject3D('camera',camera) 
  },
  
  update(oldData) {
      const data = this.data;
      let camera = this.camera!;
      const sceneEl = this.el.sceneEl;
      camera.far = data.far;
      camera.near = data.near;
      camera.zoom = data.zoom;
      let sceneSize = new THREE.Vector2();
      sceneEl?.renderer.getSize(sceneSize);
      camera.left = sceneSize.width / -2;
      camera.right = sceneSize.width / 2;
      camera.top = sceneSize.height /2;
      camera.bottom = sceneSize.height /-2;

  },



  remove() {
      this.el.removeObject3D('camera');
      this.cameraParent?.remove(this.camera!);
      const sceneEl = this.el.sceneEl;
      if(sceneEl != null)
      sceneEl.camera = this.orginalCamera!;
  },


});