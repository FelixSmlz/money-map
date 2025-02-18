import BarChartComponent from "./BarChart";

function Analytics() {
  return (
    <div className="bg-bg_black w-full p-8 rounded-[20px] transition-transform hover:scale-[1.01] duration-300">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white text-lg font-semibold">Balance</h3>
        <div className="flex justify-between items-center">
          <p className="text-my_gray text-sm font-medium px-3 py-1 rounded-full bg-white/10">
            Last week
          </p>
        </div>
      </div>

      <BarChartComponent />
    </div>
  );
}

export default Analytics;
