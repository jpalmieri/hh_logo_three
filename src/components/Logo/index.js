import React, { useEffect, useRef } from "react";

import Diamond from "./Diamond";
import H from "./H";

export default ({ rotation }) => {
  const group = useRef();

  useEffect(() => {
    group.current.rotation.y = rotation * 10;
  }, [rotation]);

  return <group ref={group}>
    <Diamond />
    <H />
  </group>;
};
