import { Fragment, PropsWithoutRef, useEffect, useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { Bloom, EffectComposer, GodRays } from "@react-three/postprocessing";
import { Mesh } from "three";
import CartoonGirlModel from "/src/components/CartoonGirlModel";
import { ActionState } from "/src/types";
import { SpiralParticleModel } from "./SpiralParticleModel";
import { ConfettiModel } from "./ConfettiModel";
import { generateVibrantWarmBlueColor } from "/src/utils";
import RectParticleEmitter from "./RectParticleEmitter";

export default function Scene(
  props: PropsWithoutRef<{ action: ActionState; setIsOpened: () => void }>,
) {
  // console.log("scene render");

  const sunRef = useRef<Mesh | null>(null);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  return (
    <Fragment>
      {/* <OrbitControls /> */}
      <axesHelper args={[3]} />

      <directionalLight intensity={2} position={[0, 10, 0]} castShadow />
      {/* <directionalLight intensity={2} position={[-10, 20, -10]} castShadow/> */}
      <directionalLight intensity={1} position={[0, 0, 10]} castShadow />
      {/* <ambientLight /> */}

      {/* <mesh name="ground" rotation={[-Math.PI / 2, 0, 0]} receiveShadow> */}
      {/*   <circleGeometry args={[3, 128]} /> */}
      {/*   <meshStandardMaterial color={"grey"} /> */}
      {/* </mesh> */}

      {/* {Array.from({ length: 30 }).map((_, i) => ( */}
      {/*   <SpiralParticleModel */}
      {/*     key={i} */}
      {/*     position={[0, 0.1, 0]} */}
      {/*     scale={0.03 + 0.05 * Math.random()} */}
      {/*     rotation={[0, Math.PI / 2 + Math.PI * Math.random(), 0]} */}
      {/*     // timeScale={0.5 + Math.random() * 1.5} */}
      {/*     timeScale={1} */}
      {/*   /> */}
      {/* ))} */}

      {Array.from({ length: 0 }).map((_, i) => (
        <ConfettiModel
          key={i}
          position={[0, 1.8, 0]}
          scale={0.05 + 0.1 * Math.random()}
          rotation={[
            -Math.PI / 4 + (Math.PI / 2) * Math.random(),
            -Math.PI * Math.random(),
            0,
          ]}
          timeScale={1}
          // timeScale={0.5 + Math.random() * 0.5}
          stripType={1 + Math.floor(Math.random() * 3)}
        />
      ))}

      <CartoonGirlModel
        rotation={[0, Math.PI, 0]}
        action={props.action}
        showGround={false}
        setIsOpened={props.setIsOpened}
      />

      <RectParticleEmitter
        name="emitter"
        width={0.2}
        height={1.8}
        amount={20}
        position={[-0.45, 1.22, 0.05]}
        rotation={[-0.1, -Math.PI / 3.2, -0.1]}
      />

      <mesh name="sun" ref={sunRef} position={[0, 1.17, -0.06]}>
        <planeGeometry args={[1.32, 2.15]} />
        <meshBasicMaterial />
      </mesh>

      {/* {isMounted && sunRef.current ? ( */}
      {/*   <EffectComposer> */}
      {/*     <GodRays sun={sunRef.current} decay={0.86} /> */}
      {/*     <Bloom luminanceThreshold={1} intensity={1} /> */}
      {/*   </EffectComposer> */}
      {/* ) : null} */}
    </Fragment>
  );
}
