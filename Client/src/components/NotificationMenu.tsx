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
          className="group bg-white hover:bg-bg_black p-2 rounded-full relative hover:scale-105 transition-all duration-200 ease-out"
        >
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
          {hasUnread && (
            <div
              data-testid="unread-indicator"
              className="absolute top-2 right-2.5 w-2 h-2 bg-red rounded-full"
            />
          )}
        </button>
      ) : (
        <button className="group bg-white/60 p-2 rounded-full relative">
          <svg
            fill="none"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
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
          <div className="absolute top-0 left-0 w-[42px] h-[42px] flex items-center justify-center">
            <div className="w-full h-[2px] bg-[#1A1B1C] rotate-45" />
          </div>
        </button>
      )}

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-[15px] shadow-lg z-50">
          <div className="p-4">
            <h3 className="text-base font-medium mb-4">Notifications</h3>
            <div className="flex flex-col gap-2">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="p-3 hover:bg-gray/5 rounded-[15px] cursor-pointer"
                    onClick={() => handleMarkAsRead(notification.id)}
                  >
                    <p className="font-medium">{notification.data.title}</p>
                    <p className="text-sm text-gray">
                      {notification.data.message}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray py-4">
                  No new notifications
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationMenu;
