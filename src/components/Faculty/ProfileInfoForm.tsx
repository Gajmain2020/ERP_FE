import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
];

const selectFields = [
  { label: "Gender", key: "gender", options: ["male", "female", "other"] },
  {
    label: "Blood Group",
    key: "bloodGroup",
    options: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
  },
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
          value={typeof facultyData[key] === "string" ? facultyData[key] : ""}
          onChange={(e) => onChangeHandler(key, e.target.value)}
        />
      </div>
    ))}
    {selectFields.map(({ label, key, options }) => (
      <div key={key}>
        <Label>{label}</Label>
        <Select
          value={
            typeof facultyData[key as keyof IFaculty] === "string"
              ? (facultyData[key as keyof IFaculty] as string)
              : undefined
          }
          onValueChange={(value) =>
            onChangeHandler(key as keyof IFaculty, value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder={`Select ${label}`} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option.toLocaleUpperCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    ))}
  </div>
);

export default BasicInfoForm;
