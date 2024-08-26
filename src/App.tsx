import { Canvas } from "@react-three/fiber";
import "./App.css";
import Scene from "./components/Scene";
import { useEffect, useRef, useState } from "react";
import { ActionState } from "./types";
import Hammer from "hammerjs";

function App() {
  const [action, setAction] = useState<ActionState>("init");
  const appRef = useRef(null);
  const [hammerAction, setHammerAction] = useState("xxx");
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    if (!appRef.current) return;

    const hammer = new Hammer(appRef.current, {
      recognizers: [
        [Hammer.Pinch],
        [Hammer.Swipe, { direction: Hammer.DIRECTION_RIGHT }],
      ],
    });
    // console.log(hammer);

    function onPinchOut(e: HammerInput) {
      console.log("pinchout");
      console.log(e);
      setHammerAction("pinchout");

      if ("init" === action) {
        setAction("pullIn");
      }
    }
    function onSwipeRight(e: HammerInput) {
      console.log("swiperight");
      console.log(e);
      setHammerAction("swiperight");

      if ("pullIn" === action) {
        setAction("open");
      }
    }
    hammer.on("pinchout", onPinchOut);
    hammer.on("swiperight", onSwipeRight);

    return () => {
      hammer.off("pinchout", onPinchOut);
      hammer.off("swiperight", onSwipeRight);
      hammer.destroy();
    };
  }, [action]);

  return (
    <div ref={appRef} className="app" id="app">
      {isOpened ? (
        <h1>welcome</h1>
      ) : (
        <Canvas
          gl={{ alpha: false }}
          camera={{ fov: 60, position: [0, 1, 0] }}
          shadows
        >
          <Scene action={action} setIsOpened={()=>setIsOpened(true)}/>
        </Canvas>
      )}
      <div className="ui-container">
        <button onClick={() => setAction("init")}>init</button>
        <button onClick={() => setAction("pullIn")}>pull in</button>
        <button onClick={() => setAction("open")}>open</button>
        <p className="debug">{hammerAction}</p>
      </div>
    </div>
  );
}

export default App;
