import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StudentDetailsData, Address } from "@/utils/types";

interface AddressFormProps {
  studentDetails: StudentDetailsData;
  onChangeHandler: (
    parentField: keyof StudentDetailsData,
    field: string,
    value: string
  ) => void;
}

const AddressForm = ({ studentDetails, onChangeHandler }: AddressFormProps) => (
  <div className="grid grid-cols-2 gap-6">
    {["currentAddress", "permanentAddress"].map((type: string, index) => (
      <div key={type} className="p-4 border rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            {index === 0 ? "Current Address" : "Permanent Address"}
          </h3>
          {index === 0 && (
            <Button
              variant="outline"
              onClick={() => {
                if (studentDetails.currentAddress) {
                  Object.keys(studentDetails.currentAddress).forEach(
                    (field) => {
                      onChangeHandler(
                        "permanentAddress",
                        field,
                        studentDetails.currentAddress?.[
                          field as keyof Address
                        ] || ""
                      );
                    }
                  );
                }
              }}
            >
              Copy to Permanent
            </Button>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {["address", "city", "pinCode", "state"].map((field) => {
            const isPinCode = field === "pinCode";
            const pinCodeValue =
              (studentDetails[type] as Address)?.pinCode || "";
            const isPinCodeValid = pinCodeValue.length === 6;

            return (
              <div key={field}>
                <Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                <Input
                  value={
                    (
                      studentDetails[
                        type as keyof StudentDetailsData
                      ] as Address
                    )?.[field as keyof Address] || ""
                  }
                  onInput={(e) => {
                    if (isPinCode) {
                      e.currentTarget.value = e.currentTarget.value.replace(
                        /\D/g,
                        ""
                      );
                    }
                  }}
                  onChange={(e) =>
                    onChangeHandler(
                      type as keyof StudentDetailsData,
                      field,
                      e.target.value
                    )
                  }
                  className={
                    isPinCode
                      ? isPinCodeValid
                        ? "border-green-500"
                        : "border-red-500"
                      : ""
                  }
                />
                {isPinCode && pinCodeValue && !isPinCodeValid && (
                  <p className="text-red-500 text-sm mt-1">
                    Pin Code must be 6 digits
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    ))}
  </div>
);

export default AddressForm;
