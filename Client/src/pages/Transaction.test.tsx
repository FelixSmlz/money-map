import { fireEvent, screen, waitFor } from "@testing-library/react";

describe("Transaction Component", () => {
  test("renders edit button and opens modal on click", async () => {
    const editButton = await screen.findByRole("button", { name: /edit/i });
    expect(editButton).toBeInTheDocument();

    fireEvent.click(editButton);

    await waitFor(() => {
      expect(screen.getByText("Update Transaction")).toBeInTheDocument();
    });
  });
});
