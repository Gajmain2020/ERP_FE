import { useState } from "react";

interface UserTypeSelectorProps {
  selectedType?: "Faculty" | "Student";
  onChange: (type: "Faculty" | "Student") => void;
}

const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({
  selectedType = "Student",
  onChange,
}) => {
  const [userType, setUserType] = useState<"Faculty" | "Student">(selectedType);

  const handleSelect = (type: "Faculty" | "Student") => {
    setUserType(type);
    onChange(type);
  };

  return (
    <div className="flex gap-4">
      <div
        onClick={() => handleSelect("Student")}
        className={`cursor-pointer px-4 py-1 border rounded-lg flex-1 text-center ${
          userType === "Student"
            ? "bg-blue-500 text-white border-blue-700 hover:bg-blue-600/90 transition"
            : "bg-gray-100 text-gray-700 border-gray-300"
        }`}
      >
        Student
      </div>
      <div
        onClick={() => handleSelect("Faculty")}
        className={`cursor-pointer px-4 py-1 border rounded-lg flex-1 text-center ${
          userType === "Faculty"
            ? "bg-blue-500 text-white border-blue-700 hover:bg-blue-600/90 transition"
            : "bg-gray-100 text-gray-700 border-gray-300"
        }`}
      >
        Faculty
      </div>
    </div>
  );
};

export default UserTypeSelector;
