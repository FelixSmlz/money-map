import { fireEvent, render, screen } from "@testing-library/react";
import DatePicker from "../components/DatePicker";

describe("DatePicker", () => {
  const defaultProps = {
    id: "date-input",
    placeholder: "Select date",
  };
  it("renders correctly", () => {
    render(<DatePicker id="date" />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders with value", () => {
    render(<DatePicker id="date" value="2024-02-17" />);
    expect(screen.getByRole("textbox")).toHaveValue("2024-02-17");
  });

  it("renders with placeholder", () => {
    render(<DatePicker {...defaultProps} />);
    const input = screen.getByRole("textbox");
    expect(input.parentElement?.querySelector("label")?.textContent).toBe(
      "Select date"
    );
  });
  it("renders with error message", () => {
    render(<DatePicker id="date" errorMsg="Invalid date" />);
    expect(screen.getByText("Invalid date")).toBeInTheDocument();
  });

  it("shows placeholder behavior", () => {
    render(<DatePicker {...defaultProps} />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("placeholder", " ");
  });

  it("calls onChange handler when date is selected", async () => {
    const onChange = vi.fn();
    render(<DatePicker id="date" onChange={onChange} />);

    const input = screen.getByRole("textbox");
    fireEvent.click(input);

    const dateButton = screen.getByRole("button", { name: "17" });
    fireEvent.click(dateButton);

    expect(onChange).toHaveBeenCalledWith(
      expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/)
    );
  });
});
