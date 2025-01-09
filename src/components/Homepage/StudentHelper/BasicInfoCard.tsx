import { Button } from "@/components/ui/button";
import { BasicInfoProps } from "@/utils/types";

const BasicInfo: React.FC<BasicInfoProps> = ({ details }) => {
  const handleEditDetailsButton = () => {
    console.log("handle edit button");
  };

  return (
    <div className="border rounded-lg bg-gradient-to-br from-white to-gray-100 shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      {/* Student Image */}
      <div className="relative bg-gray-100">
        <img
          src={details.image}
          alt={`${details.name}'s profile`}
          className="aspect-square object-cover rounded-lg p-6"
        />
        <div className="absolute top-2 right-2">
          <button
            onClick={handleEditDetailsButton}
            className="bg-indigo-500 text-white px-4 py-2 text-sm rounded-md shadow-md hover:bg-indigo-600 transition focus:outline-none focus:ring focus:ring-indigo-300"
          >
            Edit Details
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 text-center flex flex-col gap-5">
        <div>
          {/* Name and URN */}
          <h2 className="text-2xl font-bold text-gray-800">{details.name}</h2>
          <p className="text-sm text-gray-500 mt-1">URN: {details.urn}</p>

          {/* Divider */}
          <div className="my-4 border-t border-gray-300"></div>
        </div>

        {/* Other Details */}
        <div className="grid grid-cols-2 gap-4 text-left text-gray-700">
          <div>
            <span className="font-semibold">Semester:</span>{" "}
            <span className="text-gray-600">{details.semester}</span>
          </div>
          <div>
            <span className="font-semibold">Department:</span>{" "}
            <span className="text-gray-600">{details.department}</span>
          </div>
          <div>
            <span className="font-semibold">Section:</span>{" "}
            <span className="text-gray-600">{details.section}</span>
          </div>
          <div>
            <span className="font-semibold">TG:</span>{" "}
            <span className="text-gray-600">{details.TG}</span>
          </div>
        </div>

        {/* View All Details Button */}
        <Button
          className="bg-indigo-500 hover:bg-indigo-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={!details.detailsFilled}
        >
          View All Details
        </Button>
      </div>
    </div>
  );
};

export default BasicInfo;
