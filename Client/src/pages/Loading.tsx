import Background from "../components/Background";
import { PulseLoader } from "react-spinners";

const Loading = () => {
  return (
    <>
      <Background />
      <div className="flex items-center justify-center h-dvh">
        <PulseLoader color="#1A1B1C" size={20} margin={4} />
      </div>
    </>
  );
};

export default Loading;
