import NotificationSwitch from "./NotificationSwitch";

const NotificationBtn = () => {
  return (
    <div className="flex items-center gap-4 p-4 hover:bg-bg_gray/5 transition-colors rounded-[15px] border-b border-light_gray">
      <div className="bg-[#F2F2F2] p-3 rounded-[15px] transition-colors group-hover:bg-bg_black">
        <svg
          fill="none"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            className="group-hover:stroke-white"
            stroke="#1A1B1C"
            strokeMiterlimit="10"
            strokeWidth="1.75"
          >
            <path
              d="m12.02 2.91003c-3.31003 0-6.00003 2.69-6.00003 6v2.88997c0 .61-.26 1.54-.57 2.06l-1.15 1.91c-.71 1.18-.22 2.49 1.08 2.93 4.31 1.44 8.96003 1.44 13.27003 0 1.21-.4 1.74-1.83 1.08-2.93l-1.15-1.91c-.3-.52-.56-1.45-.56-2.06v-2.88997c0-3.3-2.7-6-6-6z"
              strokeLinecap="round"
            />
            <path
              d="m13.87 3.19994c-.31-.09-.63-.16-.96-.2-.96-.12-1.88-.05-2.74.2.29-.74 1.01-1.26 1.85-1.26s1.56.52 1.85 1.26z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="m15.02 19.0601c0 1.65-1.35 3-3 3-.82 0-1.58-.34-2.11998-.88-.54-.54-.88-1.3-.88-2.12" />
          </g>
        </svg>
      </div>
      <p className="text-bg_black font-medium">Notifications</p>
      <div className="ml-auto">
        <NotificationSwitch enabled={user?.notifications_enabled} />
      </div>
    </div>
  );
};

export default NotificationBtn;
