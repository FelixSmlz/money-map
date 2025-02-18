type PasswordRequirementsProps = {
  password: string;
};

const PasswordRequirements = ({ password }: PasswordRequirementsProps) => {
  const requirements = [
    {
      text: "At least 6 characters",
      met: password.length >= 6,
    },
    {
      text: "Contains at least one number",
      met: /\d/.test(password),
    },
    {
      text: "Maximum 250 characters",
      met: password.length <= 250,
    },
  ];

  return (
    <div className="space-y-2">
      {/* <p className="text-xs font-medium text-my_gray">Password requirements:</p> */}
      <ul className="space-y-1">
        {requirements.map((req, index) => (
          <li
            key={index}
            className={`flex items-center gap-2 text-xs ${
              req.met ? "text-green" : "text-my_gray"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-4 h-4 ${req.met ? "text-green" : "text-my_gray"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {req.met ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              )}
            </svg>
            {req.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordRequirements;
