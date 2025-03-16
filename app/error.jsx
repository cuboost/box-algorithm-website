"use client"; // Error components must be Client components

import { useEffect } from "react";
import ErrorCube from "./components/ui/loading/ErrorCube";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <ErrorCube />
      <h2>Something went wrong!</h2>
      <h4>Error: {error.message}</h4>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        className="button-outlined mt-5"
      >
        Try again
      </button>
    </div>
  );
}
