import { render, screen } from "@testing-library/react";
import { DataContext, DataType } from "../pages/History";
import HistoryTable from "../components/HistoryTable";
import { BrowserRouter } from "react-router-dom";

const mockContextValue = {
  data: [] as Array<any>,
  dataType: "transactions" as DataType,
  filters: {
    dateFrom: "",
    dateTo: "",
    amountMin: 0,
    amountMax: 0,
    type: undefined,
    period: undefined,
    icon_name: "",
  },
  setFilters: () => {},
};

// Helper function to render with context
const renderWithContext = (
  searchFilter = "",
  contextValue = mockContextValue
) => {
  return render(
    <BrowserRouter>
      <DataContext.Provider value={contextValue}>
        <HistoryTable searchFilter={searchFilter} />
      </DataContext.Provider>
    </BrowserRouter>
  );
};

describe("HistoryTable", () => {
  it("shows empty state message when no data is available", () => {
    renderWithContext();
    expect(screen.getByText("No transactions yet")).toBeInTheDocument();
  });

  it("displays transactions correctly", () => {
    const transactions = [
      {
        id: 1,
        name: "Groceries",
        amount: 50,
        type: "expense",
        date: "2024-02-17",
        category_id: 1,
      },
    ];

    renderWithContext("", {
      ...mockContextValue,
      data: transactions,
    });

    expect(screen.getByText("Groceries")).toBeInTheDocument();
    expect(screen.getByText(/50/)).toBeInTheDocument();
  });

  it("filters by search term", () => {
    const transactions = [
      {
        id: 1,
        name: "Groceries",
        amount: 50,
        type: "expense",
        date: "2024-02-17",
        category_id: 1,
      },
      {
        id: 2,
        name: "Salary",
        amount: 2000,
        type: "income",
        date: "2024-02-17",
        category_id: 2,
      },
    ];

    renderWithContext("groc", {
      ...mockContextValue,
      data: transactions,
    });

    expect(screen.getByText("Groceries")).toBeInTheDocument();
    expect(screen.queryByText("Salary")).not.toBeInTheDocument();
  });

  it("shows no results message when filter returns empty", () => {
    const transactions = [
      {
        id: 1,
        name: "Groceries",
        amount: 50,
        type: "expense",
        date: "2024-02-17",
        category_id: 1,
      },
    ];

    renderWithContext("xyz", {
      ...mockContextValue,
      data: transactions,
    });

    expect(
      screen.getByText("No transactions match your filters")
    ).toBeInTheDocument();
  });

  it("renders categories in grid layout", () => {
    const categories = [
      {
        id: 1,
        name: "Food",
        color_code: "#FF0000",
        icon_name: "food",
      },
    ];

    renderWithContext("", {
      ...mockContextValue,
      data: categories,
      dataType: "categories",
    });

    expect(screen.getByText("Food")).toBeInTheDocument();
  });
});
