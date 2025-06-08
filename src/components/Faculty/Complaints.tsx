import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const Complaints: React.FC = () => {
  const complaints = [
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
      subject: "Washroom Hygiene",
      text: "The cleanliness of the washrooms in Block A needs improvement.",
      raisedBy: "Priya Sinha",
    },
    {
      subject: "Library AC Problem",
      text: "The air conditioning in the library is not working.",
      raisedBy: "Ravi Patel",
    },
    {
      subject: "Noisy Fans in Lab",
      text: "The fans in Lab 5 are making too much noise.",
      raisedBy: "Sakshi Mehra",
    },
  ];

  return (
    <Card className="max-h-[50dvh] flex flex-col overflow-hidden">
      <CardHeader>
        <CardTitle>Complaints</CardTitle>
        <CardDescription>
          Recently raised complaints by students
        </CardDescription>
      </CardHeader>

      <CardContent className="overflow-y-auto flex-grow max-h-full px-1">
        <div className="space-y-3 pr-1 scrollbar-thin scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500 transition-all duration-300">
          {complaints.map((complaint, index) => (
            <div
              key={index}
              className="px-3 py-2 border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 transition"
            >
              <h3 className="text-sm font-semibold text-indigo-700 flex items-end gap-2">
                {complaint.subject}
                <p className="text-xs text-gray-600">
                  <span className="font-medium">Raised by:</span>{" "}
                  {complaint.raisedBy}
                </p>
              </h3>

              <p className="text-sm text-gray-700">{complaint.text}</p>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="justify-center">
        <Button className="bg-indigo-500 hover:bg-indigo-600 text-white">
          View All Complaints
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Complaints;
