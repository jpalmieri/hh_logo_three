import React, {
  useMemo,
  useRef,
  useState,
  useEffect,
  useCallback
} from "react";
import { random } from "lodash";
import { useFrame } from "react-three-fiber";
import { RoundedBox } from '@react-three/drei'

export default () => {
  const mesh = useRef();
  const time = useRef(0);

  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const isActiveRef = useRef(isActive);

  // position
  const position = useMemo(() => {
    return [0,0,0];
  }, []);

  // random time mod factor
  const timeMod = useMemo(() => random(0.1, 4, true), []);

  // color
  const color = isHovered ? 0xe5d54d : (isActive ? 0xf7e7e5 : 0xf95b3c);

  useEffect(() => {
    mesh.current.rotation.x = 0.25 * Math.PI;
  }, [])

  //useEffect of the activeState
  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  // raf loop
  useFrame(() => {
    // mesh.current.rotation.y += 0.01 * timeMod;
    if (isActiveRef.current) {
      time.current += 0.03;
      mesh.current.position.y = position[1] + Math.sin(time.current) * 0.4;
    }
  });

  // Events
  const onHover = useCallback(
    (e, value) => {
      e.stopPropagation();
      setIsHovered(value);
    },
    [setIsHovered]
  );

  const onClick = useCallback(
    e => {
      e.stopPropagation();
      setIsActive(v => !v);
    },
    [setIsActive]
  );

  return (
    <mesh
      ref={mesh}
      position={position}
      onClick={e => onClick(e)}
      onPointerOver={e => onHover(e, true)}
      onPointerOut={e => onHover(e, false)}
    >
      <RoundedBox
        attach="geometry"
        radius={0.25}
        args={[0.25 * 3, 1 * 3, 1 * 3]}

      >
        <meshStandardMaterial
          attach="material"
          color={color}
          roughness={0.6}
          metalness={0.1}
        />
      </RoundedBox>
    </mesh>
  );
};