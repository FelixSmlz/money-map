import Background from "../components/Background";
import Input from "../components/Input";
import NavMember from "../components/NavMember";

function Login() {
  return (
    <div className="flex items-center px-5 py-10 position-relative">
      <Background />
      <div className="bg-white w-full mt-[40%] rounded-[15px] shadow-card p-10">
        <form action="" className="flex flex-col gap-8">
          <h1 className="text-bg_black font-medium text-lg">Login</h1>
          <div className="flex flex-col gap-6">
            <Input type="email" id="email" placeholder="email" />
            <Input type="password" id="password" placeholder="password" />
          </div>
          <button
            type="submit"
            className="bg-bg_black hover:bg-white hover:text-bg_black text-white rounded-[15px] p-3 w-full"
          >
            Login
          </button>
          <a
            href="/register"
            className="text-bg_black font-medium hover:text-gray text-sm underline"
          >
            Not registered yet?
          </a>
        </form>
      </div>
      <NavMember />
    </div>
  );
}

export default Login;
