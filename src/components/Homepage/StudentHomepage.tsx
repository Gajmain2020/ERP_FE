import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { dummyNotice } from "@/utils/dummy";
import { BasicInfoProps, NoticeComponentProps } from "@/utils/types";
import QuickLinksComponent from "./StudentHelper/ImportantLinks";

export default function StudentHomepage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [studentDetails, setStudentDetails] = useState({
    detailsFilled: false,
    name: "Jone Doe",
    urn: "123123",
    semester: "1",
    department: "CSE",
    section: "A",
    TG: "DOE jone",
    image:
      "https://gimgs2.nohat.cc/thumb/f/640/flat-person-icon-download-dummy-man--m2i8d3i8N4d3N4K9.jpg",
  });

  useEffect(() => {
    // Fetch student details from the database
    // If details are not filled, set detailsFilled to false
    // If details are filled, set detailsFilled to true
    // Also set the student name
  }, []);

  const handleFillFormClick = () => {
    console.log("handle fill form");
  };

  return (
    <div className="w-full h-full flex gap-5">
      <div className="w-[70%] flex flex-col gap-5">
        {!studentDetails.detailsFilled && (
          <div className="border relative px-4 py-2 rounded-md bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-md grid gap-3">
            <div className="text-xl font-semibold text-red-600">
              Incomplete Profile Alert !!!
            </div>
            <div className="text-gray-800">
              Your profile is incomplete. Some mandatory details are missing,
              which are required for accessing the full features of the system.
              Please update your information by filling out the Student Details
              Form at the earliest. <br />
              <span className="text-red-500 font-semibold">
                Note: Until your profile is updated, you may encounter limited
                access to certain services.
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
        )}

        <QuickLinksComponent />

        <div>important links</div>

        <NoticeComponent notices={dummyNotice} />
      </div>
      <div className="w-[30%]">
        <BasicInfo details={studentDetails} />
      </div>
    </div>
  );
}

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

const NoticeComponent: React.FC<NoticeComponentProps> = ({ notices }) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) {
      document.body.style.overflow = "hidden"; // Disable body scroll on hover
    } else {
      document.body.style.overflow = "auto"; // Enable body scroll when not hovered
    }
  }, [isHovered]);

  return (
    <div
      className="relative flex flex-col max-w-full h-full overflow-hidden rounded-lg bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Heading */}
      <div className="text-2xl text-center py-2 bg-gray-100 border-gray-500 border rounded-t-lg font-semibold text-indigo-700">
        Notice & Events
      </div>

      {/* Scrolling Container */}
      <div
        className={`overflow-y-auto flex-grow max-h-full scrollbar-thin scrollbar-thumb-gray-600 ${
          isHovered ? "scrolling-pause" : "scrolling-auto"
        }`}
      >
        {notices.map((notice, index) => (
          <div key={index}>
            {/* Divider */}
            <div className="border-b border-gray-300 my-1"></div>

            {/* Notice */}
            <div className="px-4 py-2 hover:bg-gray-200 transition cursor-pointer">
              <div className="flex gap-2">
                <a
                  href={notice.link}
                  className="text-xl font-bold text-indigo-600 hover:text-indigo-800 transition"
                >
                  {notice.title}
                </a>
                <p className="text-xs text-gray-500 mt-2">[{notice.date}]</p>
              </div>

              <p className="text-sm text-gray-600 mt-0.5">
                {notice.description}
              </p>
            </div>
          </div>
        ))}
        {/* View All Notices Button */}
        <div className="px-4 py-1 text-center mt-4 mb-4">
          <Button className="bg-indigo-500 hover:bg-indigo-600 text-white">
            View All Notices
          </Button>
        </div>
      </div>
    </div>
  );
};
