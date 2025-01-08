import {
  Home,
  Calendar,
  ClipboardList,
  FileText,
  Book,
  Archive,
  User,
  Bell,
  AlertCircle,
  ReceiptIndianRupee,
  ArrowLeftRight,
} from "lucide-react";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { TbReportAnalytics } from "react-icons/tb";
import { VscFeedback } from "react-icons/vsc";

// Grouped Navigation Items with Suitable Icons
export const navItems = {
  general: [
    {
      title: "Dashboard",
      icon: Home,
      path: "/",
    },
    {
      title: "Details",
      icon: User,
      path: "/details",
    },
    {
      title: "Notice",
      icon: Bell,
      path: "/notice",
    },
    {
      title: "Complaints",
      icon: AlertCircle,
      path: "/complaints",
    },
  ],
  academics: [
    {
      title: "Attendance",
      icon: ClipboardList,
      path: "/attendance",
    },
    {
      title: "Time Table",
      icon: Calendar,
      path: "/time-table",
    },
    {
      title: "Assignments",
      icon: FileText,
      path: "/assignments",
    },
    {
      title: "Quiz",
      icon: Archive,
      path: "/quiz",
    },
    {
      title: "PYQ(s)",
      icon: Book,
      path: "/pyqs",
    },
  ],
  financial: [
    {
      title: "Fees",
      icon: ReceiptIndianRupee,
      path: "/fees",
    },
    {
      title: "Transections",
      icon: ArrowLeftRight,
      path: "/transections",
    },
  ],

  performance: [
    {
      title: "CT Marks",
      icon: TbReportAnalytics,
      path: "/ct-marks",
    },
    {
      title: "Exam Results",
      icon: HiOutlineDocumentReport,
      path: "/exam-results",
    },
    {
      title: "Feedback of Faculty",
      icon: VscFeedback,
      path: "/feedback-faculty",
    },
  ],
};
