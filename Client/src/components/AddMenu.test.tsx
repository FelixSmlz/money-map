import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import AddMenu from "./AddMenu";

test("renders AddMenu component", () => {
  const router = createMemoryRouter([
    {
      path: "/",
      element: <AddMenu />,
    },
  ]);

  render(<RouterProvider router={router} />);

  const buttonElement = screen.getByRole("button");
  expect(buttonElement).toBeInTheDocument();
});

// test("opens menu when button is clicked", () => {
//   const router = createMemoryRouter([
//     {
//       path: "/",
//       element: <AddMenu />,
//     },
//   ]);

//   render(<RouterProvider router={router} />);

//   const buttonElement = screen.getByRole("button");
//   fireEvent.click(buttonElement);

//   const transactionButton = screen.getByText(/transaction/i);
//   expect(transactionButton).toBeInTheDocument();
// });

// test("closes menu when clicking outside", () => {
//   const router = createMemoryRouter([
//     {
//       path: "/",
//       element: <AddMenu />,
//     },
//   ]);

//   render(<RouterProvider router={router} />);

//   const buttonElement = screen.getByRole("button");
//   fireEvent.click(buttonElement);

//   const transactionButton = screen.getByText(/transaction/i);
//   expect(transactionButton).toBeInTheDocument();

//   fireEvent.mouseDown(document);
//   expect(transactionButton).not.toBeInTheDocument();
// });

// test("opens AddModal when a menu item is clicked", () => {
//   const router = createMemoryRouter([
//     {
//       path: "/",
//       element: <AddMenu />,
//     },
//   ]);

//   render(<RouterProvider router={router} />);

//   const buttonElement = screen.getByRole("button");
//   fireEvent.click(buttonElement);

//   const transactionButton = screen.getByText(/transaction/i);
//   fireEvent.click(transactionButton);

//   const modalElement = screen.getByText(/transaction/i);
//   expect(modalElement).toBeInTheDocument();
// });
