import linkIcon from "../assets/icons/link.svg";

const FeedbackBtn = () => {
  const handleFeedback = () => {
    const subject = "MoneyMap Feedback";
    const body = "Hi, I would like to provide feedback about MoneyMap:\n\n";
    const mailtoLink = `mailto:schmoelz.felix@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <button
      onClick={handleFeedback}
      className="w-full flex items-center gap-4 p-4 hover:bg-bg_gray/5 
        transition-colors  group border-b "
    >
      <div
        className="bg-[#F2F2F2] p-3 rounded-[15px] transition-colors 
        group-hover:bg-bg_black"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform group-hover:scale-110"
        >
          <path
            className="transition-colors group-hover:stroke-white"
            d="M17.0156 19.05H13.0156L8.56561 22.01C7.90561 22.45 7.01562 21.98 7.01562 21.18V19.05C4.01562 19.05 2.01562 17.05 2.01562 14.05V8.04993C2.01562 5.04993 4.01562 3.04993 7.01562 3.04993H17.0156C20.0156 3.04993 22.0156 5.04993 22.0156 8.04993V14.05C22.0156 17.05 20.0156 19.05 17.0156 19.05Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="transition-colors group-hover:stroke-white"
            d="M12.0154 11.98V11.77C12.0154 11.09 12.4355 10.73 12.8555 10.44C13.2655 10.16 13.6754 9.80001 13.6754 9.14001C13.6754 8.22001 12.9354 7.47998 12.0154 7.47998C11.0954 7.47998 10.3555 8.22001 10.3555 9.14001"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="transition-colors group-hover:stroke-white"
            d="M12.0107 14.37H12.0197"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="flex flex-col text-left">
        <p className="text-bg_black font-medium">Feedback</p>
        <span className="text-my_gray text-sm">Help us improve MoneyMap</span>
      </div>

      <img
        src={linkIcon}
        alt=""
        className="w-4 h-4 ml-auto transition-transform 
          group-hover:translate-x-1"
      />
    </button>
  );
};

export default FeedbackBtn;
