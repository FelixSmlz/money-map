import Background from "../components/Background";

function EmailVerification() {
  return (
    <div className="flex items-center px-5 py-10 h-dvh position-relative">
      <Background />
      <div className="bg-white w-full rounded-[15px] my-auto shadow-card p-10 flex flex-col gap-4">
        <h1 className="text-bg_black font-medium text-lg">
          Email Verification
        </h1>
        <p>
          We have sent you an email.
          <br />
          Please verify your email address to continue.
        </p>
        <button className="bg-bg_black mt-5 hover:bg-white hover:text-bg_black text-white rounded-[15px] p-3 w-full">
          Resend Email
        </button>
      </div>
    </div>
  );
}
export default EmailVerification;
