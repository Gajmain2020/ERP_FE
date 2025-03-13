import { Label } from "@/components/ui/label";
import { StudentDetailsData } from "@/utils/types";

interface OtherInfoFormProps {
  studentDetails: StudentDetailsData;
  onChangeHandler: (key: string, value: string) => void;
}

const OtherInfoForm: React.FC<OtherInfoFormProps> = ({
  studentDetails,
  onChangeHandler,
}) => (
  <div className="grid grid-cols-2 gap-4">
    {[
      { label: "Mobile Number", key: "studentMobileNumber", type: "text" },
      { label: "Aadhar Number", key: "aadharNumber", type: "text" },
      { label: "ABC ID", key: "abcId", type: "text" },
      { label: "Admission Number", key: "admissionNumber", type: "text" },
      { label: "Date of Birth", key: "dob", type: "date" },
      { label: "Nationality", key: "nationality", type: "text" },
    ].map(({ label, key, type }) => (
      <div key={key}>
        <Label>{label}</Label>
        <input
          type={type}
          value={
            key === "dob"
              ? studentDetails[key]
                ? new Date(studentDetails[key]).toISOString().split("T")[0] // Convert to YYYY-MM-DD
                : ""
              : typeof studentDetails[key] === "string"
              ? studentDetails[key]
              : ""
          }
          onChange={(e) => onChangeHandler(key, e.target.value)}
          className="border rounded-lg p-2 w-full"
        />
      </div>
    ))}

    {[
      {
        label: "Blood Group",
        key: "bloodGroup",
        options: ["Select", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      },
      {
        label: "Category",
        key: "category",
        options: ["Select", "Gen", "OBC", "ST", "SC"],
      },
      {
        label: "Gender",
        key: "gender",
        options: ["Select", "Male", "Female", "Other"],
      },
    ].map(({ label, key, options }) => (
      <div key={key}>
        <Label>{label}</Label>
        <select
          value={
            typeof studentDetails[key] === "string" ? studentDetails[key] : ""
          }
          onChange={(e) => onChangeHandler(key, e.target.value)}
          className="border rounded-lg p-2 w-full"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    ))}
  </div>
);

export default OtherInfoForm;
