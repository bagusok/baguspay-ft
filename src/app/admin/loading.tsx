"use client";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

export default function Loading() {
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <Player
          autoplay
          loop
          src="/assets/lottie/loading.json"
          style={{ height: "100px", width: "100px" }}
        >
          <Controls visible={false} />
        </Player>
      </div>
    </>
  );
}
