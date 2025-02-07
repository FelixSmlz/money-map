function Background() {
  return (
    <div className="min-h-dvh min-w-full bg-light_gray/10 fixed top-0 left-0 -z-10 blur-3xl">
      <div className="absolute w-[150px] h-[150px] rounded-full bg-[#C56EFF] -top-10 sm:-top-0 right-10 sm:right-[50px]"></div>
      <div className="absolute w-[150px] h-[150px] 3xl:block hidden 3xl:top-[400px] 3xl:right-[500px] rounded-full bg-[#C56EFF] -top-10 sm:-top-0 right-10 sm:right-[50px]"></div>
      <div className="absolute w-[150px] h-[150px] rounded-full bg-[#80D9FF] top-[200px] -left-5 sm:left-8"></div>
      <div className="absolute w-[150px] hidden h-[150px] lg:block rounded-full bg-[#80D9FF] top-[450px] -left-5 sm:left-[500px]"></div>
      <div className="absolute w-[150px] h-[150px] rounded-full bg-[#80D9FF] top-[440px] sm:top-[600px] -right-5"></div>
      <div className="absolute w-[150px] h-[150px] rounded-full bg-[#C56EFF] bottom-[150px] -left-10 sm:left-0"></div>
      <div className="absolute w-[150px]  h-[150px] rounded-full bg-[#C56EFF] bottom-[1300px] left-[600px] "></div>
      <div className="absolute w-[150px] h-[150px] rounded-full bg-[#C56EFF] bottom-[150px]  2xl:left-[900px] 2xl:bottom-[50px] -left-10 sm:left-0"></div>
    </div>
  );
}

export default Background;
