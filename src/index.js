import "./styles.css";

import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Canvas } from "react-three-fiber";
import Logo from "./components/Logo";
import Lights from "./components/Lights";
import Akai from "./akai";

function App() {
  const controller = useRef();
  const maxVelocity = 127;
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    controller.current = new Akai();
  }, []);

  useEffect(() => {
    const callback = (data) => setRotation((data.velocity % maxVelocity) / maxVelocity);
    const effect = controller.current.on({ controlId: 12, callback });
    return () => effect.unsubscribe();
  }, []);

  const aspect = window.innerWidth / window.innerHeight;
  // Ortho zoom
  const zoom = 60;
  const frustumSize = 45;

  return (
    <>
      <Canvas
        resize={{scroll: false}}
        orthographic
        camera={{zoom, left: frustumSize * aspect / - 2, right: frustumSize * aspect / 2, top: frustumSize / 2, bottom: frustumSize / - 2, far:100, near:0.1}}
      >
        <Logo rotation={rotation} />
        <Lights />
      </Canvas>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
