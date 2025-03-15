import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input"; // Assuming you're using a custom Input component
import { ChangeStudentPasswordAPI } from "@/api/studentAPI";
import { ChangeFacultyPasswordAPI } from "@/api/facultyAPI";
import { toast } from "sonner";

interface IChangePassword {
  isOpen: boolean;
  onOpenChange: (arg: boolean) => void;
  userType: "student" | "faculty";
}

const ChangePassword: React.FC<IChangePassword> = ({
  isOpen,
  onOpenChange,
  userType,
}) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const api =
        userType === "student"
          ? ChangeStudentPasswordAPI(oldPassword, newPassword, confirmPassword)
          : ChangeFacultyPasswordAPI(oldPassword, newPassword, confirmPassword);

      const response = await api;

      console.log(response);

      if (response.success) {
        toast.success("Password changed successfully!");
        onOpenChange(false); // Close modal on success
      } else {
        toast.error(response.data.message || "Failed to change password.");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl h-auto overflow-auto flex flex-col p-6">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {/* Footer Buttons */}
        <div className="flex gap-4 justify-end mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleChangePassword} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePassword;
