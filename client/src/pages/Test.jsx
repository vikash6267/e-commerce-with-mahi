import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // Import OrbitControls
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'; // Import GLTFLoader

const ThreeScene = () => {
  const canvasRef = useRef();
  const [hintVisible, setHintVisible] = useState(true);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.rotateSpeed = 1.5;
      controls.enablePan  = false;


    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    const loader = new GLTFLoader();
    loader.load(
      './main/scene.gltf',
      (gltf) => {
        gltf.scene.position.set(0, 0, 0);
        gltf.scene.scale.set(0.03, 0.03, 0.03); 
        gltf.scene.name = "loadedModel";
        scene.add(gltf.scene);
      },
      undefined,
      (error) => {
        console.error('Error loading 3D model', error);
      }
    );




    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      controls.update();
    };
    const rotationSpeedX = 0.01; // Adjust as needed
    const rotationSpeedY = 0.02; // Adjust as needed
    const rotationSpeedZ = 0.03; // Adjust as needed
  
    // Rotate the loaded model around each axis
    if (scene.children.length > 0) {
      scene.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
          // Rotate the model around each axis
          child.rotation.x += rotationSpeedX;
          child.rotation.y += rotationSpeedY;
          child.rotation.z += rotationSpeedZ;
        }
      });
    }
  
    

    
    animate();

    return () => {
      renderer.dispose();
      controls.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Hide hint on touch
  useEffect(() => {
    const hideHint = () => {
      setHintVisible(false);
      setTimeout(() => setHintVisible(true), 5000); // Show hint again after 5 seconds
    };

    document.addEventListener('touchstart', hideHint);

    return () => {
      document.removeEventListener('touchstart', hideHint);
    };
  }, []);


  return (
    <div className=''>


    <div className="container mb-10">
      <canvas ref={canvasRef} className="three-canvas" />
      <div className="video-background">
        <video autoPlay loop muted playsInline className="video  lg:hidden sm:hidden md:hidden">
          <source src="https://cdn.shopify.com/videos/c/o/v/e27e50ee8a7e453b9044463347621952.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>


      {
        hintVisible &&(
          <div id="hints" className='hint-container'>
        <svg id="hint-drag" width="34" height="49" viewBox="0 0 34 49" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g>
            <circle cx="11.5" cy="11.5" r="9" fill="white" fillOpacity="0.75" stroke="black"></circle>
            <g>
              <path d="M13.5808 28.5807C13.5808 29.1151 14.014 29.5484 14.5485 29.5484C15.083 29.5484 15.5163 29.1151 15.5163 28.5807V24.7097C15.5163 23.6407 16.3828 22.7742 17.4517 22.7742C18.5207 22.7742 19.3872 23.6407 19.3872 24.7097V28.5807C19.3872 29.1152 19.8205 29.5484 20.355 29.5484C20.8894 29.5484 21.3227 29.1152 21.3227 28.5807V26.6452C21.3227 25.5762 22.1893 24.7097 23.2582 24.7097C24.3271 24.7097 25.1937 25.5762 25.1937 26.6452V28.5807C25.1937 29.1152 25.6269 29.5484 26.1614 29.5485C26.6959 29.5485 27.1292 29.1151 27.1292 28.5806C27.1292 27.5117 27.9957 26.6452 29.0646 26.6452C30.1336 26.6452 31.0001 27.5117 31.0001 28.5806L31.0001 38.9677C31.0001 43.386 27.4184 46.9677 23.0001 46.9677L20.1974 46.9677C18.5785 47.1273 5.02742 48.0887 4.87243 35.5722C4.87155 35.5568 4.87109 35.5413 4.87109 35.5256L4.87109 32.4197C4.87109 30.8339 6.15663 29.5484 7.74242 29.5484C7.76004 29.5484 7.77432 29.5627 7.77432 29.5803L7.77432 34.871C7.77432 35.1117 7.94423 35.3548 8.18496 35.3548H8.87384C9.33553 35.3548 9.7098 34.9806 9.7098 34.5189L9.7098 17.9355C9.7098 16.8665 10.5764 16 11.6453 16C12.7142 16 13.5808 16.8665 13.5808 17.9355L13.5808 28.5807Z" fill="white"></path>
              <path d="M15.0163 24.7097V28.5807C15.0163 28.839 14.8068 29.0484 14.5485 29.0484C14.2902 29.0484 14.0808 28.839 14.0808 28.5807L14.0808 17.9355C14.0808 16.5904 12.9904 15.5 11.6453 15.5C10.3002 15.5 9.2098 16.5904 9.2098 17.9355L9.2098 34.5189C9.2098 34.7044 9.05939 34.8548 8.87384 34.8548H8.27432L8.27432 29.5803C8.27432 29.2865 8.03616 29.0484 7.74242 29.0484C5.88049 29.0484 4.37109 30.5578 4.37109 32.4197L4.37109 35.5256C4.37109 35.5467 4.3716 35.5676 4.3726 35.5884C4.41428 38.8082 5.31931 41.2025 6.71237 42.9656C8.10271 44.7253 9.94976 45.8194 11.8161 46.4937C15.4974 47.824 19.3423 47.5525 20.2217 47.4677L23.0001 47.4677C27.6945 47.4677 31.5001 43.6621 31.5001 38.9677L31.5001 28.5806C31.5001 27.2356 30.4097 26.1452 29.0646 26.1452C27.7196 26.1452 26.6292 27.2356 26.6292 28.5806C26.6292 28.839 26.4197 29.0485 26.1614 29.0485C25.9031 29.0485 25.6937 28.839 25.6937 28.5807V26.6452C25.6937 25.3001 24.6033 24.2097 23.2582 24.2097C21.9131 24.2097 20.8227 25.3001 20.8227 26.6452V28.5807C20.8227 28.839 20.6133 29.0484 20.355 29.0484C20.0966 29.0484 19.8872 28.839 19.8872 28.5807V24.7097C19.8872 23.3646 18.7968 22.2742 17.4517 22.2742C16.1067 22.2742 15.0163 23.3646 15.0163 24.7097Z" stroke="black"></path>
            </g>
          </g>
        </svg>
      </div>
        )
      }
    </div>
    </div>
  );
};

export default ThreeScene;




  // import React, { useRef, useEffect, useState } from 'react';
  // import * as THREE from 'three';
  // import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // Import OrbitControls
  // import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'; // Import GLTFLoader

  // const ThreeScene = () => {
  //   const canvasRef = useRef();
  //   const [hintVisible, setHintVisible] = useState(true);
  //   const cubeRef = useRef(); // Reference to the cube object

  //   useEffect(() => {
  //     const scene = new THREE.Scene();
  //     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  //     camera.position.z = 5;

  //     const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
  //     renderer.setSize(window.innerWidth, window.innerHeight);
  //     renderer.setClearColor(0x000000, 0);

  //     const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  //     scene.add(ambientLight);

  //     const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  //     directionalLight.position.set(10, 10, 10);
  //     scene.add(directionalLight);

  //     const controls = new OrbitControls(camera, renderer.domElement);
  //     controls.enableDamping = true;
  //     controls.enableZoom = false;
  //     controls.enablePan  = false;
  //     controls.rotateSpeed = 3.5;

  //     const handleResize = () => {
  //       camera.aspect = window.innerWidth / window.innerHeight;
  //       camera.updateProjectionMatrix();
  //       renderer.setSize(window.innerWidth, window.innerHeight);
  //     };

  //     window.addEventListener('resize', handleResize);

  //     // Create a cube
  //     const geometry = new THREE.BoxGeometry();
  //     const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
  //     const cube = new THREE.Mesh(geometry, material);

  //     // const geometry = new THREE.SphereGeometry(1, 32, 32)
  //     // const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
  //     // const cube = new THREE.Mesh(geometry, material);




  //     scene.add(cube);
  //     cubeRef.current = cube; // Save cube reference for animation
  //     const animate = () => {
  //       requestAnimationFrame(animate);
  //       renderer.render(scene, camera);
  //       controls.update();
        
  //     const rotationSpeed = 0.002;

  //       // Rotate the cube with slower speed
  //       if (cubeRef.current) {
  //         cubeRef.current.rotation.x += rotationSpeed;
  //         cubeRef.current.rotation.y += rotationSpeed;
  //       }
  //     };

  //     animate();

  //     return () => {
  //       renderer.dispose();
  //       controls.dispose();
  //       window.removeEventListener('resize', handleResize);
  //     };
  //   }, []);

  //   // Hide hint on touch
  //   useEffect(() => {
  //     const hideHint = () => {
  //       setHintVisible(false);
  //       setTimeout(() => setHintVisible(true), 5000); // Show hint again after 5 seconds
  //     };

  //     document.addEventListener('touchstart', hideHint);

  //     return () => {
  //       document.removeEventListener('touchstart', hideHint);
  //     };
  //   }, []);


  //   return (
  //     <div className="containerone mb-10">
  //       <canvas ref={canvasRef} className="three-canvas" />
  //       <div className="video-background" >
  //         <video autoPlay loop muted playsInline className="video lg:hidden sm:hidden md:hidden " >
  //           <source src="https://cdn.shopify.com/videos/c/o/v/e27e50ee8a7e453b9044463347621952.mp4" type="video/mp4" />
  //           Your browser does not support the video tag.
  //         </video>
  //       </div>

  //       {/* {hintVisible && (
  //         <div id="hints" className='hint-container'>
  //         <svg id="hint-drag" width="34" height="49" viewBox="0 0 34 49" fill="none" xmlns="http://www.w3.org/2000/svg">
  //           <g>
  //             <circle cx="11.5" cy="11.5" r="9" fill="white" fillOpacity="0.75" stroke="black"></circle>
  //             <g>
  //               <path d="M13.5808 28.5807C13.5808 29.1151 14.014 29.5484 14.5485 29.5484C15.083 29.5484 15.5163 29.1151 15.5163 28.5807V24.7097C15.5163 23.6407 16.3828 22.7742 17.4517 22.7742C18.5207 22.7742 19.3872 23.6407 19.3872 24.7097V28.5807C19.3872 29.1152 19.8205 29.5484 20.355 29.5484C20.8894 29.5484 21.3227 29.1152 21.3227 28.5807V26.6452C21.3227 25.5762 22.1893 24.7097 23.2582 24.7097C24.3271 24.7097 25.1937 25.5762 25.1937 26.6452V28.5807C25.1937 29.1152 25.6269 29.5484 26.1614 29.5485C26.6959 29.5485 27.1292 29.1151 27.1292 28.5806C27.1292 27.5117 27.9957 26.6452 29.0646 26.6452C30.1336 26.6452 31.0001 27.5117 31.0001 28.5806L31.0001 38.9677C31.0001 43.386 27.4184 46.9677 23.0001 46.9677L20.1974 46.9677C18.5785 47.1273 5.02742 48.0887 4.87243 35.5722C4.87155 35.5568 4.87109 35.5413 4.87109 35.5256L4.87109 32.4197C4.87109 30.8339 6.15663 29.5484 7.74242 29.5484C7.76004 29.5484 7.77432 29.5627 7.77432 29.5803L7.77432 34.871C7.77432 35.1117 7.94423 35.3548 8.18496 35.3548H8.87384C9.33553 35.3548 9.7098 34.9806 9.7098 34.5189L9.7098 17.9355C9.7098 16.8665 10.5764 16 11.6453 16C12.7142 16 13.5808 16.8665 13.5808 17.9355L13.5808 28.5807Z" fill="white"></path>
  //               <path d="M15.0163 24.7097V28.5807C15.0163 28.839 14.8068 29.0484 14.5485 29.0484C14.2902 29.0484 14.0808 28.839 14.0808 28.5807L14.0808 17.9355C14.0808 16.5904 12.9904 15.5 11.6453 15.5C10.3002 15.5 9.2098 16.5904 9.2098 17.9355L9.2098 34.5189C9.2098 34.7044 9.05939 34.8548 8.87384 34.8548H8.27432L8.27432 29.5803C8.27432 29.2865 8.03616 29.0484 7.74242 29.0484C5.88049 29.0484 4.37109 30.5578 4.37109 32.4197L4.37109 35.5256C4.37109 35.5467 4.3716 35.5676 4.3726 35.5884C4.41428 38.8082 5.31931 41.2025 6.71237 42.9656C8.10271 44.7253 9.94976 45.8194 11.8161 46.4937C15.4974 47.824 19.3423 47.5525 20.2217 47.4677L23.0001 47.4677C27.6945 47.4677 31.5001 43.6621 31.5001 38.9677L31.5001 28.5806C31.5001 27.2356 30.4097 26.1452 29.0646 26.1452C27.7196 26.1452 26.6292 27.2356 26.6292 28.5806C26.6292 28.839 26.4197 29.0485 26.1614 29.0485C25.9031 29.0485 25.6937 28.839 25.6937 28.5807V26.6452C25.6937 25.3001 24.6033 24.2097 23.2582 24.2097C21.9131 24.2097 20.8227 25.3001 20.8227 26.6452V28.5807C20.8227 28.839 20.6133 29.0484 20.355 29.0484C20.0966 29.0484 19.8872 28.839 19.8872 28.5807V24.7097C19.8872 23.3646 18.7968 22.2742 17.4517 22.2742C16.1067 22.2742 15.0163 23.3646 15.0163 24.7097Z" stroke="black"></path>
  //             </g>
  //           </g>
  //         </svg>
  //         </div>
  //       )} */}
  //     </div>
  //   );
  // };

  // export default ThreeScene;











