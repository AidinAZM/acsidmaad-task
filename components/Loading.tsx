import Image from "next/image";

function Loading() {
  return (
    <div className="h-[100vh] flex items-center justify-center bg-transparent z-10">
      <div className="h-[150px] w-[150px] flex flex-col items-center justify-center bg-white rounded-lg shadow-lg">
        <p>Loading...</p>
      </div>
    </div>
  );
}

export default Loading;
