import { Input } from "@/components/ui/input";
import { StudentData } from "@/utils/types";
import { Label } from "@radix-ui/react-label";

interface BasicInfoFormProps {
  onChangeHandler: (key: keyof StudentData, value: string) => void;
  studentInfo: StudentData;
}

const fields: {
  label: string;
  key: keyof StudentData;
  subKey?: string;
  disabled?: boolean;
}[] = [
  { label: "Name", key: "name", disabled: true },
  { label: "Email", key: "email" },
  { label: "CRN", key: "crn", disabled: true },
  { label: "URN", key: "urn", disabled: true },
  { label: "Semester", key: "semester", disabled: true },
  { label: "Section", key: "section", disabled: true },
  { label: "Department", key: "department", disabled: true },
  {
    label: "Teacher Guardian",
    key: "TG",
    subKey: "teacherName",
    disabled: true,
  },
];

const BasicInfoForm = ({
  onChangeHandler,
  studentInfo,
}: BasicInfoFormProps) => (
  <div className="grid grid-cols-2 gap-4">
    {fields.map(({ label, key, subKey, disabled }) => (
      <div key={key}>
        <Label>{label}</Label>
        <Input
          disabled={disabled}
          value={
            subKey
              ? (studentInfo[key] as { [key: string]: string })?.[subKey] || ""
              : typeof studentInfo[key] === "string"
              ? studentInfo[key]
              : ""
          }
          onChange={(e) => onChangeHandler(key, e.target.value)}
        />
      </div>
    ))}
  </div>
);

export default BasicInfoForm;
