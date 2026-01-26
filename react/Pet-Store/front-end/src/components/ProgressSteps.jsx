const Step = ({ active, title }) => {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-full 
        ${active ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"}`}
      >
        ✓
      </div>
      <span
        className={`mt-2 text-sm font-medium ${
          active ? "text-green-500" : "text-gray-400"
        }`}
      >
        {title}
      </span>
    </div>
  );
};

const Line = ({ active }) => (
  <div
    className={`flex-1 h-1 mx-2 rounded 
    ${active ? "bg-green-500" : "bg-gray-300"}`}
  ></div>
);

const ProgressSteps = ({ step1, step2, step3 }) => {
  return (
    <div className="flex items-center justify-center mt-20 max-w-2xl mx-auto">
      <Step active={step1} title="Login" />
      <Line active={step2} />

      <Step active={step2} title="Shipping" />
      <Line active={step3} />

      <Step active={step3} title="Summary" />
    </div>
  );
};

export default ProgressSteps;
