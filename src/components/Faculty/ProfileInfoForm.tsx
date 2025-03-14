import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { IFaculty } from "@/utils/types";

interface BasicInfoFormProps {
  onChangeHandler: (key: keyof IFaculty, value: string) => void;
  facultyData: IFaculty;
}

const fields: { label: string; key: keyof IFaculty; disabled?: boolean }[] = [
  { label: "Name", key: "name" },
  { label: "Email", key: "email" },
  { label: "Employee ID", key: "empId" },
  { label: "Department", key: "department" },
  { label: "Position", key: "position" },
  { label: "Mobile Number", key: "mobileNumber" },
  { label: "Gender", key: "gender" },
  { label: "Blood Group", key: "bloodGroup" },
];

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({
  onChangeHandler,
  facultyData,
}) => (
  <div className="grid grid-cols-2 gap-4 p-1">
    {fields.map(({ label, key, disabled }) => (
      <div key={key}>
        <Label>{label}</Label>
        <Input
          disabled={disabled}
          value={facultyData[key] ? String(facultyData[key]) : ""}
          onChange={(e) => onChangeHandler(key, e.target.value)}
        />
      </div>
    ))}
  </div>
);

export default BasicInfoForm;
