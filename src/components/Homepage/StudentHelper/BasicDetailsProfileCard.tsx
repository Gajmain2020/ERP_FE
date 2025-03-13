import { StudentData } from "@/utils/types";

const StudentProfileCard = ({
  studentDetails,
}: {
  studentDetails: StudentData;
}) => {
  return (
    <div className="w-full flex flex-col gap-4 h-fit">
      <div className="text-2xl font-bold">Basic Details</div>

      <div className="flex gap-4 ">
        {/* Details Card */}
        <div
          className={`${
            studentDetails.isDetailsFilled ? "w-[86%]" : "w-full"
          } bg-opacity-20 backdrop-blur-lg bg-white/30 rounded-lg shadow-lg p-6 space-y-6 border border-white/30 hover:bg-white/55 transition-all h-full`}
        >
          <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-3">
            {[
              { label: "Name", value: studentDetails.name },
              { label: "URN", value: studentDetails.urn },
              { label: "Semester", value: studentDetails.semester },
              { label: "Department", value: studentDetails.department },
              { label: "Section", value: studentDetails.section },
              {
                label: "Teacher Guardian",
                value: studentDetails?.TG?.teacherName,
              },
            ].map((item, index) => (
              <div key={index} className="space-y-0.5">
                <label className="text-sm font-medium text-gray-700">
                  {item.label}
                </label>
                <p className="text-lg font-semibold text-gray-800">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Image */}
        {studentDetails.isDetailsFilled && (
          <div className="w-[14%] flex items-center justify-center h-full">
            <div className="group relative w-full aspect-square max-h-full">
              <img
                src={
                  "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359554_1280.png"
                }
                alt={`${studentDetails.name}'s profile`}
                className="w-full h-full object-cover rounded-full transition-all duration-300 shadow-md"
              />
              <div className="absolute -inset-2 rounded-full border-2 border-transparent group-hover:border-teal-500 transition-all duration-300"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfileCard;
