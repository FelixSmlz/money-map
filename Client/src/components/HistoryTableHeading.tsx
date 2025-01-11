type Props = {
  date: string;
};

const HistoryTableHeading = ({ date }: Props) => {
  return (
    <p className="text-sm text-bg_black font-medium my-2">
      {date === new Date().toLocaleDateString("en-CA")
        ? "Today"
        : date ===
          new Date(
            new Date().setDate(new Date().getDate() - 1)
          ).toLocaleDateString("en-CA")
        ? "Yesterday"
        : date}
    </p>
  );
};

export default HistoryTableHeading;
