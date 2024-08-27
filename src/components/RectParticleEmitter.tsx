import { PlaneGeometry } from "three";
import { ConfettiModel } from "./ConfettiModel";
import { useState } from "react";

export default function RectParticleEmitter({
  amount,
  width,
  height,
  ...props
}: JSX.IntrinsicElements["group"] & {
  amount: number;
  width: number;
  height: number;
}) {
  const plane = new PlaneGeometry(width, height);

  const [particlesData] = useState(
    Array.from({ length: amount }).map(() => {
      const [P, rnd] = [Math.PI, Math.random];

      const x = width / 2 - rnd() * width;
      const y = height / 2 - rnd() * height;
      const angleYRange = P / 8;
      const angleY = -P / 2 + (rnd() * angleYRange - angleYRange / 2);
      const angleZRange = P / 2;
      const angleZ = rnd() * angleZRange - angleZRange / 2;
      const scale = 0.06 + rnd() * 0.06;

      const timeScale = 0.5 + rnd() * 1.5;
      const stripType = 1 + Math.floor(rnd() * 3);
      return { x, y, angleY, angleZ, scale, timeScale, stripType };
    }),
  );

  const particles = particlesData.map(
    ({ x, y, angleY, angleZ, scale, timeScale, stripType }, i) => {
      return (
        <group
          key={i}
          position={[x, y, 0]}
          rotation={[0, angleY, angleZ]}
          scale={scale}
        >
          <ConfettiModel timeScale={timeScale} stripType={stripType} />
        </group>
      );
    },
  );

  return (
    <group {...props}>
      <group>
        <lineSegments>
          <wireframeGeometry args={[plane]} />
        </lineSegments>
      </group>

      <group>{particles}</group>
    </group>
  );
}
