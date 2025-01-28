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
      className="flex items-center gap-4 mx-4 py-4 border-b border-light_gray"
    >
      <div className="bg-[#F2F2F2] w-fit p-2 rounded-[15px]">
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.0156 19.05H13.0156L8.56561 22.01C7.90561 22.45 7.01562 21.98 7.01562 21.18V19.05C4.01562 19.05 2.01562 17.05 2.01562 14.05V8.04993C2.01562 5.04993 4.01562 3.04993 7.01562 3.04993H17.0156C20.0156 3.04993 22.0156 5.04993 22.0156 8.04993V14.05C22.0156 17.05 20.0156 19.05 17.0156 19.05Z"
            stroke="#171717"
            stroke-width="1.5"
            strokeMiterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12.0154 11.98V11.77C12.0154 11.09 12.4355 10.73 12.8555 10.44C13.2655 10.16 13.6754 9.80001 13.6754 9.14001C13.6754 8.22001 12.9354 7.47998 12.0154 7.47998C11.0954 7.47998 10.3555 8.22001 10.3555 9.14001"
            stroke="#171717"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12.0107 14.37H12.0197"
            stroke="#171717"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <p className="text-bg_black text-base h-fit mr-auto">Feedback</p>
      <svg
        width="25"
        height="22"
        viewBox="0 0 19 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.6872 7.61997C10.6872 9.61299 8.65259 11.2237 6.13509 11.2237C3.61759 11.2237 1.58301 9.61299 1.58301 7.61997C1.58301 5.62695 3.61759 4.01624 6.13509 4.01624"
          stroke="#171717"
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M7.91699 7.61991C7.91699 5.54542 10.0466 3.8595 12.667 3.8595C15.2874 3.8595 17.417 5.54542 17.417 7.61991C17.417 9.69441 15.2874 11.3803 12.667 11.3803"
          stroke="#171717"
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  );
};

export default FeedbackBtn;
