import { useState } from "react";
import { toast } from "sonner";

import { EnrollFacultyAPI } from "@/api/adminAPI";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IFaculty } from "@/utils/types";
import { addFacultySchema } from "@/utils/zodSchemas";

export default function ManageFaculty() {
  const [faculty, setFaculty] = useState<IFaculty>({
    name: "",
    email: "",
    empId: "",
    mobileNumber: "",
    position: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFaculty((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (field: "position", value: string) => {
    setFaculty((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddFaculty = async () => {
    const result = addFacultySchema.safeParse(faculty);

    if (!result.success) {
      const errorMessages = result.error.errors.map(
        (err) => `${err.path.join(".")}: ${err.message}`
      );
      console.log("Validation errors:", errorMessages);
      toast.error(errorMessages[0] || "All fields are required."); // show the first error
      return;
    }

    const res = await EnrollFacultyAPI(faculty);

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    toast.success("Student added successfully.");
    handleClear();
  };

  const handleClear = () => {
    setFaculty({
      name: "",
      email: "",
      empId: "",
      mobileNumber: "",
      position: "",
    });
  };

  return (
    <div className="w-full h-screen flex flex-col gap-5 p-2">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Add Faculty</CardTitle>
          <CardDescription>
            Fill in the details of the new faculty to enroll the faculty into
            BIT-BUDDY portal.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-gray-800">Faculty Name</label>
            <Input
              name="name"
              value={faculty.name}
              placeholder="Faculty Name"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm text-gray-800">Faculty Email</label>
            <Input
              value={faculty.email}
              name="email"
              type="email"
              placeholder="Faculty Email"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm text-gray-800">Faculty Emp ID</label>
            <Input
              value={faculty.empId}
              placeholder="Faculty Emp ID"
              name="empId"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm text-gray-800">
              Faculty Mobile Number
            </label>
            <Input
              value={faculty.mobileNumber}
              placeholder="Faculty Mobile Number"
              name="mobileNumber"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm text-gray-800">Faculty Position</label>
            <Select
              value={faculty.position}
              onValueChange={(value) => handleSelectChange("position", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Position" />
              </SelectTrigger>
              <SelectContent>
                {["Assistant Professor", "Associate Professor"].map(
                  (section) => (
                    <SelectItem key={section} value={section}>
                      {section}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          <Button variant="secondary" onClick={handleClear}>
            Clear
          </Button>
          <Button onClick={handleAddFaculty}>Add Faculty</Button>
        </CardFooter>
      </Card>

      <div>{/* search student */} search student field</div>
      <div>{/* Table view for searched student */} table view</div>
    </div>
  );
}
