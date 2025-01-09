import { Button } from "@/components/ui/button";

const DetailsNotFilledWarning: React.FC = () => {
  const handleFillFormClick = () => {
    console.log("handle fill form");
  };
  return (
    <div className="border relative px-4 py-2 rounded-md bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-md grid gap-3">
      <div className="text-xl font-semibold text-red-600">
        Incomplete Profile Alert !!!
      </div>
      <div className="text-gray-800">
        Your profile is incomplete. Some mandatory details are missing, which
        are required for accessing the full features of the system. Please
        update your information by filling out the Student Details Form at the
        earliest. <br />
        <span className="text-red-500 font-semibold">
          Note: Until your profile is updated, you may encounter limited access
          to certain services.
        </span>
      </div>
      <div className="absolute right-1 top-1 ">
        <Button
          onClick={handleFillFormClick}
          className="bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 animate-pulse duration-1000 hover:animate-none"
        >
          Fill Form Now
        </Button>
      </div>
    </div>
  );
};

export default DetailsNotFilledWarning;
