"use client";

import LoadingGame from "@/app/components/ui/loading/LoadingGame";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsCamera, BsFullscreen, BsUnity } from "react-icons/bs";
import { Unity, useUnityContext } from "react-unity-webgl";

export default function Home() {
  const [imageUrls, setImageUrls] = useState([]);

  // Unity
  const buildUrl = `/game/Build/`;
  const {
    unityProvider,
    loadingProgression,
    isLoaded,
    requestFullscreen,
    takeScreenshot,
    unload,
  } = useUnityContext({
    loaderUrl: buildUrl + "Box Algorithm.loader.js",
    dataUrl: buildUrl + "Box Algorithm.data",
    frameworkUrl: buildUrl + "Box Algorithm.framework.js",
    codeUrl: buildUrl + "Box Algorithm.wasm",
    webglContextAttributes: {
      preserveDrawingBuffer: true,
    },
  });

  // We'll use a state to store the device pixel ratio.
  const [devicePixelRatio, setDevicePixelRatio] = useState(
    typeof window !== "undefined" && window.devicePixelRatio
  );

  useEffect(() => {
    if (isLoaded) {
      // A function which will update the device pixel ratio of the Unity
      // Application to match the device pixel ratio of the browser.
      const updateDevicePixelRatio = function () {
        if (typeof window !== "undefined") {
          setDevicePixelRatio(window.devicePixelRatio);
        }
      };
      // A media matcher which watches for changes in the device pixel ratio.
      const mediaMatcher = window.matchMedia(
        `screen and (resolution: ${devicePixelRatio}dppx)`
      );
      // Adding an event listener to the media matcher which will update the
      // device pixel ratio of the Unity Application when the device pixel
      // ratio changes.
      mediaMatcher.addEventListener("change", updateDevicePixelRatio);
      return function () {
        // Removing the event listener when the component unmounts.
        mediaMatcher.removeEventListener("change", updateDevicePixelRatio);
      };
    }
  }, [devicePixelRatio, isLoaded]);

  return (
    <div className="h-full w-full">
      {!isLoaded && <LoadingGame loadingProgression={loadingProgression} />}

      <div className="flex flex-col items-center justify-center">
        {isLoaded && (
          <>
            <h1 className="text-6xl font-bold">Algorithme</h1>
          </>
        )}
        <div className={isLoaded ? "w-10/12 max-w-4xl" : "h-0 w-0"}>
          <AspectRatio.Root ratio={16 / 9} asChild>
            <Unity
              unityProvider={unityProvider}
              style={{
                visibility: isLoaded ? "visible" : "hidden",
              }}
              devicePixelRatio={devicePixelRatio}
              className="h-full w-full rounded-3xl"
            />
          </AspectRatio.Root>
          {isLoaded && (
            <>
              <div className="mb-6 flex w-full items-center justify-between p-2 px-6">
                <a
                  className="button-simple flex cursor-pointer items-center gap-4"
                  href="https://unity.com/"
                  target="_blank"
                >
                  <BsUnity className="text-4xl" />
                  <h4>Simulation Unity</h4>
                </a>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      setImageUrls([...imageUrls, takeScreenshot("image/jpg")]);
                      console.log(imageUrls);
                    }}
                    className="button-simple rounded-full p-3"
                  >
                    <BsCamera className="text-3xl" />
                  </button>
                  <button
                    onClick={() => requestFullscreen(true)}
                    className="button-simple rounded-full p-3"
                  >
                    <BsFullscreen className="text-2xl" />
                  </button>
                </div>
              </div>

              {imageUrls.length != 0 && (
                <div>
                  <h2>Captures d'écran</h2>
                  <div className="flex w-full items-center gap-5 overflow-x-scroll">
                    {imageUrls.map((image) => (
                      <Image
                        key={image}
                        src={image}
                        alt="Image Screenshot"
                        height="100"
                        width="300"
                        className="rounded-3xl"
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
