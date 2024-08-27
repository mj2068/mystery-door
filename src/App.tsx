import { Canvas } from "@react-three/fiber";
import "./App.css";
import Scene from "./components/Scene";
import { Suspense, useEffect, useRef, useState } from "react";
import { ActionState } from "./types";
import Hammer from "hammerjs";
import PinchOutIcon from "./components/PinchOutIcon";
import SwipeRightIcon from "./components/SwipeRightIcon";
import MouseScrollUpIcon from "./components/MouseScrollUpIcon";
import { Html } from "@react-three/drei";
import Image404 from "/src/assets/404.png";

function App() {
  const [action, setAction] = useState<ActionState>("init");
  const appRef = useRef<HTMLDivElement>(null);
  const [isFinishedOpen, setIsFinishedOpen] = useState(false);
  const [showPinchOut, setShowPinchOut] = useState(false);
  const [showSwipeRight, setShowSwipeRight] = useState(false);
  const [isSceneMounted, setIsSceneMounted] = useState(false);

  function pullIn() {
    setAction("pullIn");
  }

  function openDoor() {
    setAction("open");
  }

  useEffect(() => {
    const app = appRef.current;

    if (!app) return;

    const hammer = new Hammer(app, {
      recognizers: [
        [Hammer.Pinch],
        [Hammer.Swipe, { direction: Hammer.DIRECTION_RIGHT }],
      ],
    });
    // console.log(hammer);

    function onPinchOut(/* _e: HammerInput */) {
      if ("init" === action) {
        pullIn();
      }
    }
    function onSwipeRight(/* _e: HammerInput */) {
      if ("pullIn" === action) {
        openDoor();
      }
    }
    hammer.on("pinchout", onPinchOut);
    hammer.on("swiperight", onSwipeRight);

    function onWheel(e: globalThis.WheelEvent) {
      if ("init" === action && e.deltaY < 0) pullIn();
    }
    appRef.current.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      hammer.off("pinchout", onPinchOut);
      hammer.off("swiperight", onSwipeRight);
      hammer.destroy();

      app.removeEventListener("wheel", onWheel);
    };
  }, [action]);

  // pinct out icon
  useEffect(() => {
    // console.log("app effect");

    setShowPinchOut(false);
    setShowSwipeRight(false);

    let timeoutID = null;

    if (isSceneMounted) {
      if ("init" === action) {
        timeoutID = setTimeout(() => {
          setShowPinchOut(true);
        }, 4000);
      } else if ("pullIn" === action) {
        timeoutID = setTimeout(() => {
          setShowSwipeRight(true);
        }, 4000);
      }
    }

    return () => {
      if (timeoutID) clearTimeout(timeoutID);
    };
  }, [action, isSceneMounted]);

  return (
    <div ref={appRef} className="app" id="app">
      {isFinishedOpen ? (
        <div className="welcome-container">
          <img src={Image404} />
        </div>
      ) : (
        <Canvas
          gl={{ alpha: false }}
          camera={{
            fov: 60,
            position: [-11.201, 13.805, -30.777],
            rotation: [1.912, -0.131, 2.79],
          }}
          shadows
        >
          <color attach={"background"} args={["#222"]} />
          <Suspense
            fallback={
              <Html>
                <p style={{ color: "white", width: "200px" }}>加载中...</p>
              </Html>
            }
          >
            <Scene
              action={action}
              setIsFinishedOpen={() => setIsFinishedOpen(true)}
              sync={() => setIsSceneMounted(true)}
            />
          </Suspense>
        </Canvas>
      )}

      {!isSceneMounted && (
        <div className="ui-container text-container">
          <p>
            <i>加载中...</i>
          </p>
        </div>
      )}

      <div className={`icon-container${showPinchOut ? "" : " hidden"}`}>
        <PinchOutIcon />
        /
        <MouseScrollUpIcon />
      </div>

      <div className={`icon-container${showSwipeRight ? "" : " hidden"}`}>
        <SwipeRightIcon />
      </div>

      {/* <div className="ui-container"> */}
      {/*   <button onClick={() => setAction("init")}>init</button> */}
      {/*   <button onClick={pullIn}>pull in</button> */}
      {/*   <button onClick={openDoor}>open</button> */}
      {/* </div> */}
    </div>
  );
}

export default App;
