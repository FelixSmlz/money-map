import { useState, useEffect, useRef } from "react";
import { getUnreadNotifications, markNotificationAsRead } from "../utils/api";
import { useLoaderData } from "react-router";

type NotificationType = {
  id: string;
  data: {
    title: string;
    message: string;
  };
};

const NotificationMenu = () => {
  const data = useLoaderData();
  const user = data?.user;
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [hasUnread, setHasUnread] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await getUnreadNotifications();
      if (response?.notifications) {
        setNotifications(response.notifications);
        setHasUnread(response.notifications.length > 0);
      }
    };
    fetchNotifications();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleMarkAsRead = async (id: string) => {
    await markNotificationAsRead(id);

    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );

    if (notifications.length <= 1) {
      setHasUnread(false);
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      {user?.notifications_enabled ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group bg-white hover:bg-bg_black w-[42px] h-[42px] rounded-full relative hover:scale-105 transition-all duration-200 ease-out shadow-sm hover:shadow-md flex items-center justify-center"
          aria-label="Notifications"
        >
          <svg
            fill="none"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
            className="transform transition-transform group-hover:rotate-12"
          >
            <g
              className="group-hover:stroke-white transition-colors"
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
          {hasUnread && (
            <div
              data-testid="unread-indicator"
              className="absolute top-2 right-2.5 w-2 h-2 bg-red rounded-full animate-pulse"
            />
          )}
        </button>
      ) : (
        <button
          className="group bg-white/60 hover:bg-white/70 w-[42px] h-[42px] rounded-full relative transition-all duration-200 ease-out flex items-center justify-center"
          aria-label="Notifications disabled"
        >
          <svg
            fill="none"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-50"
          >
            <g stroke="#666666" strokeMiterlimit="10" strokeWidth="1.75">
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
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[30px] h-[2px] bg-[#666666] rotate-45 rounded-full" />
          </div>
        </button>
      )}

      {isOpen && (
        <div className="absolute right-0 mt-3 lg:w-96 w-80 bg-white  rounded-[20px] shadow-xl z-50 transform opacity-0 animate-fadeIn">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-bg_black">
                Notifications
              </h3>
              {notifications.length > 0 && (
                <span className="text-xs font-medium text-turkois bg-turkois/10 px-2.5 py-1 rounded-full">
                  {notifications.length} new
                </span>
              )}
            </div>

            <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto custom-scrollbar">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => handleMarkAsRead(notification.id)}
                    className="group p-4 hover:bg-gray-50 rounded-2xl cursor-pointer transition-all duration-200 ease-out border border-transparent hover:border-gray-100"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="font-medium text-bg_black group-hover:text-turkois transition-colors mb-1">
                          {notification.data.title}
                        </p>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {notification.data.message}
                        </p>
                      </div>
                      <button
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkAsRead(notification.id);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center">
                  <p className="text-gray-500 font-medium mb-2">
                    No new notifications
                  </p>
                  <p className="text-sm text-gray-400">
                    We'll notify you when something arrives
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationMenu;
