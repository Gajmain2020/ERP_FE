import { Button } from "../ui/button";

const Complaints: React.FC = () => {
  const complaints = [
    {
      subject: "WiFi Not Working",
      text: "The WiFi in the library has been down for the past two days.",
      raisedBy: "Amit Sharma",
    },
    {
      subject: "WiFi Not Working",
      text: "The WiFi in the library has been down for the past two days.",
      raisedBy: "Amit Sharma",
    },
    {
      subject: "WiFi Not Working",
      text: "The WiFi in the library has been down for the past two days.",
      raisedBy: "Amit Sharma",
    },
    {
      subject: "Classroom Projector Issue",
      text: "The projector in Room 302 is not functioning properly.",
      raisedBy: "Neha Verma",
    },
    {
      subject: "Canteen Food Quality",
      text: "The quality of food in the canteen has deteriorated recently.",
      raisedBy: "Rahul Singh",
    },
    {
      subject: "WiFi Not Working",
      text: "The WiFi in the library has been down for the past two days.",
      raisedBy: "Amit Sharma",
    },
    {
      subject: "WiFi Not Working",
      text: "The WiFi in the library has been down for the past two days.",
      raisedBy: "Amit Sharma",
    },
  ];

  return (
    <div className="relative flex flex-col max-w-full max-h-[50dvh] overflow-hidden rounded-lg bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-lg">
      <div className="text-2xl text-center py-2 bg-gray-100 border-gray-500 border rounded-t-lg font-semibold text-indigo-700">
        Complaints
      </div>

      <div className="overflow-y-auto flex-grow max-h-full scrollbar-thin scrollbar-thumb-gray-600">
        {complaints.map((complaint, index) => (
          <div key={index}>
            <div className="border-b border-gray-300 my-1"></div>
            <div className="px-4 py-2 hover:bg-gray-200 transition cursor-pointer">
              <h3 className="text-xl font-bold text-indigo-600">
                {complaint.subject}{" "}
                <span className="text-xs text-gray-500">
                  Raised by:{" "}
                  <span className="font-medium">{complaint.raisedBy}</span>
                </span>
              </h3>
              <p className="text-sm text-gray-600">{complaint.text}</p>
            </div>
          </div>
        ))}
        <div className="px-4 py-1 text-center mt-4 mb-4">
          <Button className="bg-indigo-500 hover:bg-indigo-600 text-white">
            View All Complaints
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Complaints;
