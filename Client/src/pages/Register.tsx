import Background from "../components/Background";
import Nav from "../components/Nav";
import NavMember from "../components/NavMember";

function Register() {
  return (
    <div className="flex items-center px-5 py-10 position-relative">
      <Background />
      <div className="bg-white w-full mt-[15%] rounded-[15px] shadow-card p-10">
        <form action="" className="flex flex-col gap-8">
          <h1 className="text-bg_black font-medium text-lg">Register</h1>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <input
                type="name"
                id="name"
                placeholder="name and surname"
                className="w-full focus:border-bg_black p-4 border border-light_gray rounded-[15px]"
              />
              <small className="text-red hidden">Error message example!</small>
            </div>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                id="email"
                placeholder="email"
                className="w-full focus:border-bg_black p-4 border border-light_gray rounded-[15px]"
              />
              <small className="text-red hidden">Error message example!</small>
            </div>
            <div className="flex flex-col gap-3">
              <input
                type="password"
                id="password"
                placeholder="password"
                className="w-full focus:border-bg_black p-4 border border-light_gray rounded-[15px]"
              />
              <small className="text-red hidden">Error message example!</small>
            </div>
            <div className="flex flex-col gap-3">
              <input
                type="password"
                id="confirm_password"
                placeholder="confirm password"
                className="w-full focus:border-bg_black p-4 border border-light_gray rounded-[15px]"
              />
              <small className="text-red hidden">Error message example!</small>
            </div>
          </div>
          <button
            type="submit"
            className="bg-bg_black hover:bg-white hover:text-bg_black text-white rounded-[15px] p-3 w-full"
          >
            Login
          </button>
          <a
            href="/login"
            className="text-bg_black font-medium hover:text-gray text-sm underline"
          >
            Already registered?
          </a>
        </form>
      </div>
      <NavMember />
    </div>
  );
}

export default Register;
