import Background from "../components/Background";

const Loading = () => {
  return (
    <>
      <Background />
      <div className="flex items-center justify-center h-dvh">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    </>
  );
};

export default Loading;
