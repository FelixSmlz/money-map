import { useNavigate } from "react-router-dom";

const BackArrow = () => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(-1)}>
      <svg
        fill="none"
        stroke="black"
        strokeWidth="1"
        height="35"
        viewBox="0 0 24 24"
        width="35"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clipRule="evenodd"
          d="m10.7071 12 4.6464-4.64645c.1953-.19526.1953-.51184 0-.7071s-.5118-.19529-.7071 0l-5.3536 5.35355c-.1953.19526-.1953.51184 0 .7071l5.3536 5.3536c.1953.1953.5118.1953.7071 0s.1953-.5118 0-.7071l-4.6464-4.6464h12.2929c.2828 0 .5-.2239.5-.5s-.2232-.5-.5-.5z"
          fillRule="evenodd"
        />
      </svg>
    </div>
  );
};

export default BackArrow;
