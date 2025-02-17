import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useFetcher } from "react-router-dom";
import NotificationSwitch from "../components/NotificationSwitch";

vi.mock("react-router-dom", () => ({
  useFetcher: vi.fn(() => ({
    submit: vi.fn(),
  })),
}));

describe("NotificationSwitch", () => {
  it("renders correctly", () => {
    render(<NotificationSwitch enabled={false} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
  });

  it("displays enabled state correctly", () => {
    render(<NotificationSwitch enabled={true} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  it("displays disabled state correctly", () => {
    render(<NotificationSwitch enabled={false} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  it("calls fetcher.submit when toggled", () => {
    const mockSubmit = vi.fn();
    (useFetcher as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      () => ({
        submit: mockSubmit,
      })
    );

    render(<NotificationSwitch enabled={false} />);
    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);

    expect(mockSubmit).toHaveBeenCalledWith(
      { intent: "toggleNotifications" },
      { method: "POST" }
    );
  });

  it("maintains accessibility features", () => {
    render(<NotificationSwitch enabled={false} />);
    const checkbox = screen.getByRole("checkbox");

    checkbox.focus();
    expect(checkbox).toHaveFocus();

    expect(checkbox).toHaveAttribute("type", "checkbox");
  });
});
