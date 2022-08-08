import React, { FC } from 'react'
import { Button } from 'antd'
import '../styles/App.css'
import 'aframe'
import * as THREE from  'three'
import '../aframeJSX'
import '../components/orthoCamera'


const a = new THREE.OrthographicCamera();
const b =  a instanceof THREE.Object3D;
debugger;
console.log('sssss');



const App: FC = () => (

    <div className="App">
      <Button type="primary">Button</Button>
      <a-scene class="aframebox"  vr-mode-ui="enabled: false">
      <a-box color="red" position = "0  2 -5"></a-box>
      <a-entity id="rig" position="25 10 0">
  <a-entity id="camera" orthocamera look-controls></a-entity>
</a-entity>
      </a-scene>

    </div>
  );
  
  export default App;