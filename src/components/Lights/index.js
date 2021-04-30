import React from "react";

export default () => {
  return (
    <group>
      <ambientLight intensity={0.6} />
      <pointLight intensity={1} position={[0, 0, 4]} />
    </group>
  );
};
