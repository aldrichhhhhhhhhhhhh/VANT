import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import "./mote3d.css";

const MODEL_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_3K9MRUnNrthw91dT4xb4arUxpDj/hf_20261029_072844_640afb7f-22ff-4e37-aeac-2eb6de2a17ba.glb";
const FALLBACK_IMAGE = "https://d2ol7oe51mr4n9.cloudfront.net/user_3K9MRUnNrthw91dT4xb4arUxpDj/7d9a440a-e2e2-4c6b-a48b-984966f798e5.png";

export default function Mote3D() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let disposed = false;
    let frame = 0;
    let model: THREE.Object3D | undefined;
    let renderer: THREE.WebGLRenderer | undefined;
    let observer: ResizeObserver | undefined;
    let pointerX = 0;
    let pointerY = 0;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.01, 100);
    camera.position.set(0, 0.2, 4.5);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x28221a, 2.1));
    const key = new THREE.DirectionalLight(0xfff4dd, 3.2);
    key.position.set(4, 5, 6);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xc7d4ed, 2.2);
    rim.position.set(-4, 2, -4);
    scene.add(rim);
    const fill = new THREE.PointLight(0xc49a50, 16, 12);
    fill.position.set(0, -1.5, 3);
    scene.add(fill);

    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      renderer.setClearColor(0x000000, 0);
      renderer.domElement.setAttribute("aria-label", "Interactive 3D model of MOTE.EXE");
      host.appendChild(renderer.domElement);
    } catch {
      setFailed(true);
      return;
    }

    const resize = () => {
      if (!renderer || !host) return;
      const width = Math.max(1, host.clientWidth);
      const height = Math.max(1, host.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();

    const loader = new GLTFLoader();
    loader.load(MODEL_URL, (gltf) => {
      if (disposed) return;
      model = gltf.scene;
      const bounds = new THREE.Box3().setFromObject(model);
      const size = bounds.getSize(new THREE.Vector3());
      const center = bounds.getCenter(new THREE.Vector3());
      model.position.sub(center);
      const maxDimension = Math.max(size.x, size.y, size.z) || 1;
      model.scale.setScalar(2.45 / maxDimension);
      scene.add(model);
      camera.position.set(0, 0.05, 4.35);
      camera.lookAt(0, 0, 0);
      setLoaded(true);
    }, undefined, () => {
      if (!disposed) setFailed(true);
    });

    const onPointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const onPointerLeave = () => { pointerX = 0; pointerY = 0; };
    host.addEventListener("pointermove", onPointerMove);
    host.addEventListener("pointerleave", onPointerLeave);

    const clock = new THREE.Clock();
    const animate = () => {
      if (disposed || !renderer) return;
      frame = window.requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      if (model) {
        model.rotation.y += (pointerX * 0.34 + Math.sin(time * 0.42) * 0.045 - model.rotation.y) * 0.035;
        model.rotation.x += (-pointerY * 0.16 + Math.sin(time * 0.7) * 0.018 - model.rotation.x) * 0.035;
        model.position.y = -Math.sin(time * 1.1) * 0.035;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
      if (model) scene.remove(model);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer?.dispose();
      renderer?.domElement.remove();
    };
  }, []);

  return <div className="vt-mote-3d-host" ref={hostRef} data-loaded={loaded ? "true" : "false"}>
    {failed && <img className="vt-mote-3d-fallback" src={FALLBACK_IMAGE} alt="MOTE.EXE robotic mascot" />}
    {!loaded && !failed && <div className="vt-mote-3d-loading">INITIALIZING 3D MODEL<span> · </span></div>}
    <span className="vt-mote-3d-tag">3D / PREVIEW BUILD</span>
  </div>;
}
