import * as Progress from "@radix-ui/react-progress";
import LoadingCube from "./LoadingCube";

export default function LoadingGame({ loadingProgression }) {
  return (
    <div className=" flex h-full flex-col items-center justify-center gap-6">
      <LoadingCube />
      <Progress.Root
        className="relative h-[25px] w-[300px] overflow-hidden rounded-full bg-black"
        style={{
          // Fix overflow clipping in Safari
          // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
          transform: "translateZ(0)",
        }}
        value={Math.round(loadingProgression * 100)}
      >
        <Progress.Indicator
          className="ease-[cubic-bezier(0.65, 0, 0.35, 1)] h-full w-full bg-white transition-transform duration-[660ms]"
          style={{
            transform: `translateX(-${
              100 - Math.round(loadingProgression * 100)
            }%)`,
          }}
        />
      </Progress.Root>
      <h4 className="font-medium">
        Loading Game... {Math.round(loadingProgression * 100)}%
      </h4>
    </div>
  );
}
