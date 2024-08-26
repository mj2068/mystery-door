import { PlaneGeometry, WireframeGeometry } from "three";
import { ConfettiModel } from "./ConfettiModel";

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

  const particles = Array.from({ length: amount }).map((_, i) => {
    const x = width / 2 - Math.random() * width;
    const y = height / 2 - Math.random() * height;
    const [P, rnd] = [Math.PI, Math.random];

    const angleRange = P / 8;
    const delta = rnd() * angleRange - angleRange / 2;
    const angleRange2 = P / 2;
    const delta2 = rnd() * angleRange2 - angleRange2 / 2;

    return (
      <group
        key={i}
        position={[x, y, 0]}
        rotation={[0, -Math.PI / 2 + delta, delta2]}
      >
        <ConfettiModel
          scale={0.05 + Math.random() * 0.05}
          timeScale={0.5 + Math.random() * 1.5}
          stripType={1 + Math.floor(Math.random() * 3)}
        />
      </group>
    );
  });

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
