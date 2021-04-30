import React, {
  useRef,
} from "react";
import { Box } from '@react-three/drei'

const HorzontalBox = ({ position = [0,0,0]}) => {
  const mesh = useRef();
  return (
    <mesh
      ref={mesh}
      position={position}
    >
      <Box attach="geometry" args={[0.35*3, 0.65*3, 0.2*3]}>
      <meshStandardMaterial
          attach="material"
          color={'white'}
          roughness={0.6}
          metalness={0.1}
        />
      </Box>
    </mesh>
  );
};

const VerticalBox = ({ position = [0,0,0]}) => {
  const mesh = useRef();
  return (
    <mesh
      ref={mesh}
      position={position}
    >
      <Box attach="geometry" args={[0.35 * 3, 0.2 * 3, 0.3 * 3]}>
      <meshStandardMaterial
          attach="material"
          color={'white'}
          roughness={0.6}
          metalness={0.1}
        />
      </Box>
    </mesh>
  );
};

export default () => {
  const group = useRef();

  return <group ref={group}>
    <HorzontalBox position={[0,0,-0.23 * 3]} />
    <HorzontalBox position={[0,0,0.23 * 3]} />
    <VerticalBox />
  </group>;
};