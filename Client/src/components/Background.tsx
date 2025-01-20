function Background() {
  return (
    <div className="min-h-dvh min-w-full bg-gray/10 fixed top-0 left-0 -z-10 blur-3xl">
      <div className="absolute w-[150px] h-[150px] rounded-full bg-[#C56EFF] -top-10 right-10"></div>
      <div className="absolute w-[150px] h-[150px] rounded-full bg-[#80D9FF] top-[200px] -left-5"></div>
      <div className="absolute w-[150px] h-[150px] rounded-full bg-[#80D9FF] top-[440px] -right-5"></div>
      <div className="absolute w-[150px] h-[150px] rounded-full bg-[#C56EFF] bottom-[150px] -left-10"></div>
    </div>
  );
}

export default Background;
