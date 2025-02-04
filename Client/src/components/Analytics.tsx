import BarChartComponent from "./BarChart";

function Analytics() {
  return (
    <div className="bg-bg_black w-full p-6 rounded-[15px]">
      <div className="flex justify-between">
        <h3 className="text-white text-[1.25rem]">Balance</h3>
        <div className="flex justify-between items-center">
          <p className="text-my_gray text-[0.75rem] font-medium">Last week</p>
        </div>
      </div>
      <BarChartComponent />
    </div>
  );
}

export default Analytics;
