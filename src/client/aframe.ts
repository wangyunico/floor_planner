import { AFrame, ComponentDefinition, Schema } from "aframe";
import * as THREE from  'three'

interface Box {
   geomery?:THREE.BoxBufferGeometry
   material?: THREE.MeshStandardMaterial
   mesh?: THREE.Mesh
}


AFRAME.registerComponent('box',<ComponentDefinition<Box>>{
    schema: {
        width: {type: 'number', default: 1},
        height: {type: 'number', default: 1},
        depth: {type: 'number', default: 1},
        color: {type: 'color', default: '#AAA'}
      },
    init() {
       const data = this.data;
       const el = this.el;
       this.geomery = new THREE.BoxBufferGeometry(data.width,data.height,data.depth);
       this.material = new THREE.MeshStandardMaterial({color:data.color})
       this.mesh = new THREE.Mesh(this.geomery,this.material)
       el.setObject3D('mesh',this.mesh)
       
    },

    update(oldData) {
        const data = this.data;
        const el = this.el;
        if (Object.keys(oldData).length == 0) 
        return;
        if (data.width !== oldData.width ||
            data.height !== oldData.height ||
            data.depth !== oldData.depth){
                (el.getObject3D('mesh') as THREE.Mesh).geometry = new THREE.BoxBufferGeometry(data.width, data.height,
                    data.depth);
            }
        if (data.color !== oldData.color) {
               (<THREE.MeshStandardMaterial> (< THREE.Mesh>el.getObject3D('mesh')) .material) .color = new THREE.Color(data.color);
              }
    },

    remove() {
        this.el.removeObject3D('mesh');
    },
})