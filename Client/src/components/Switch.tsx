function Switch() {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input type="checkbox" value="" className="sr-only peer" />
      <div className="relative w-11 h-6 bg-light_gray peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-[16px] rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-white after:rounded-full after:h-4 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-turkois"></div>
    </label>
  );
}

export default Switch;
