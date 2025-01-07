import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process the contact form submission
    console.log({ name, email, message });
    onClose();
    alert("Message sent successfully!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-opacity-50 flex justify-center items-center z-50">
        <div className="w-full max-w-md rounded-lg p-6 sm:px-2">
          <DialogHeader>
            <DialogTitle className="text-xl text-center underline font-semibold text-gray-800">
              Helpline
            </DialogTitle>
          </DialogHeader>

          {/* Contact Number */}
          <div className="mb-4 text-center flex flex-col">
            <span className="font-medium text-lg text-gray-700">
              Helpline No :{" "}
              <span className="font-semibold">+91 9713829282</span> <br /> Our
              helpline is available from 10 AM to 5 PM on working days.
            </span>
          </div>

          <div className="flex justify-center items-center mb-2">
            <div className="border-t border-gray-500 w-full"></div>
            <div className="w-full text-center text-gray-500">
              Raise A Request
            </div>
            <div className="border-t border-gray-500 w-full"></div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full"
            />
            <Input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-700 text-sm"
              rows={4}
            ></textarea>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                onClick={onClose}
                className="bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                Send
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
