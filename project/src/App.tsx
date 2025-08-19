import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import * as THREE from '../node_modules/@types/three'




function App() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const node = ref.current;

    const renderer = new THREE.WebGLRenderer();
    node.appendChild(renderer.domElement);

    let scene : THREE.Scene;
    let camera : THREE.Camera;
    let light : THREE.Light;
    let objectAxes : THREE.AxesHelper;
    let box : THREE.Mesh;

    function init(){
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 1000 );
      camera.position.z = 50;
      renderer.setSize( window.innerWidth, window.innerHeight );

      //Define lighting
      light = new THREE.AmbientLight(0xffffff, 3);
      scene.add(light);

      const planeGeometry = new THREE.PlaneGeometry( 2000, 2000 );
      planeGeometry.rotateX( - Math.PI / 2 );
      const planeMaterial = new THREE.ShadowMaterial( { color: 0x000000, opacity: 0.2 } );


      const helper = new THREE.GridHelper( 2000, 100 );
      helper.position.y = - 199;
      helper.material.opacity = 0.25;
      helper.material.transparent = true;
      scene.add( helper );

      const boxGeometry = new THREE.BoxGeometry(10, 10, 30);
      const boxMaterial = new THREE.MeshNormalMaterial();
      box = new THREE.Mesh( boxGeometry, boxMaterial );
      box.position.set(10,10,10);
      objectAxes = new THREE.AxesHelper(30); 
      scene.add( box );
      box.add(objectAxes);
    }

    init();

    document.addEventListener('keydown', (event) => {
        let pressed_key = event.key;
        console.log(pressed_key);
        if(pressed_key === 'ArrowLeft'){
            box.rotation.z -= 0.1;
        }else if(pressed_key === 'ArrowRight'){
            box.rotation.z += 0.1;
        }
        else if(pressed_key === 'ArrowDown'){
            box.rotation.x += 0.1;
        }else if(pressed_key === 'ArrowUp'){
            box.rotation.x -= 0.1;
        }
        else if(pressed_key === 'Shift'){
            box.translateX(1);
            
        }else if(pressed_key === 'Control'){
            box.translateX(-1);
        }

        // Update box geometry
        box.geometry.dispose();
        box.geometry = new THREE.BoxGeometry(10, 10, 30);
        
    });
    function animate() {
        renderer.render( scene, camera);

    }
    //Define animation loop
    renderer.setAnimationLoop( animate );

  }, [])

  return (
    <>
      <div ref={ref} ></div>
    </>
  )
  

}

export default App
