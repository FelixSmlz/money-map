import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useLoaderData } from "react-router";
import NotificationMenu from "../components/NotificationMenu";
import { getUnreadNotifications, markNotificationAsRead } from "../utils/api";

vi.mock("../utils/api", () => ({
  getUnreadNotifications: vi.fn(),
  markNotificationAsRead: vi.fn(),
}));

vi.mock("react-router", () => ({
  useLoaderData: vi.fn(),
}));

describe("NotificationMenu", () => {
  const mockNotifications = [
    {
      id: "1",
      data: {
        title: "Test Notification",
        message: "This is a test notification",
      },
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (useLoaderData as any).mockReturnValue({
      user: { notifications_enabled: true },
    });
  });

  it("renders notification bell when notifications are enabled", () => {
    render(<NotificationMenu />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders disabled state when notifications are disabled", () => {
    (useLoaderData as any).mockReturnValue({
      user: { notifications_enabled: false },
    });
    render(<NotificationMenu />);
    expect(screen.getByRole("button")).toHaveClass("bg-white/60");
  });

  it("fetches notifications on mount", async () => {
    (getUnreadNotifications as any).mockResolvedValue({
      notifications: mockNotifications,
    });

    render(<NotificationMenu />);

    await waitFor(() => {
      expect(getUnreadNotifications).toHaveBeenCalled();
    });
  });

  it("shows unread indicator when there are notifications", async () => {
    (getUnreadNotifications as any).mockResolvedValue({
      notifications: mockNotifications,
    });

    render(<NotificationMenu />);

    await waitFor(() => {
      expect(screen.getByTestId("unread-indicator")).toBeInTheDocument();
    });
  });

  it("opens notification menu when clicked", async () => {
    (getUnreadNotifications as any).mockResolvedValue({
      notifications: mockNotifications,
    });

    render(<NotificationMenu />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Notifications")).toBeInTheDocument();
      expect(screen.getByText("Test Notification")).toBeInTheDocument();
    });
  });

  it("marks notification as read when clicked", async () => {
    (getUnreadNotifications as any).mockResolvedValue({
      notifications: mockNotifications,
    });
    (markNotificationAsRead as any).mockResolvedValue({});

    render(<NotificationMenu />);

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      fireEvent.click(screen.getByText("Test Notification"));
    });

    expect(markNotificationAsRead).toHaveBeenCalledWith("1");
  });

  it("closes menu when clicking outside", async () => {
    (getUnreadNotifications as any).mockResolvedValue({
      notifications: mockNotifications,
    });

    render(
      <div>
        <div data-testid="outside">Outside</div>
        <NotificationMenu />
      </div>
    );

    fireEvent.click(screen.getByRole("button"));

    fireEvent.mouseDown(screen.getByTestId("outside"));

    await waitFor(() => {
      expect(screen.queryByText("Notifications")).not.toBeInTheDocument();
    });
  });

  it("shows empty state when no notifications", async () => {
    (getUnreadNotifications as any).mockResolvedValue({
      notifications: [],
    });

    render(<NotificationMenu />);

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByText("No new notifications")).toBeInTheDocument();
    });
  });
});
