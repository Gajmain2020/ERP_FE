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
  IdCard,
} from "lucide-react";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { TbReportAnalytics } from "react-icons/tb";
import { VscFeedback } from "react-icons/vsc";

// Grouped Navigation Items for Student
export const studentNavItems = {
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
      title: "Quizzes",
      icon: Archive,
      path: "/quizzes",
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
      title: "Transactions",
      icon: ArrowLeftRight,
      path: "/transactions",
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
      title: "Faculty Feedback",
      icon: VscFeedback,
      path: "/feedback",
    },
  ],
};

// Grouped Navigation Items for Faculty
export const facultyNavItems = {
  general: [
    {
      title: "Dashboard",
      icon: Home,
      path: "/",
    },
    {
      title: "Profile",
      icon: User,
      path: "/profile",
    },
    {
      title: "Notifications",
      icon: Bell,
      path: "/notifications",
    },
    {
      title: "Complaints",
      icon: AlertCircle,
      path: "/complaints",
    },
  ],
  academics: [
    {
      title: "Manage Attendance",
      icon: ClipboardList,
      path: "/manage-attendance",
    },
    {
      title: "Manage Students",
      icon: IdCard,
      path: "/manage-attendance",
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
      title: "Quizzes",
      icon: Archive,
      path: "/quizzes",
    },
    {
      title: "Previous Year Questions (PYQs)",
      icon: Book,
      path: "/pyqs",
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
    // {
    //   title: "Faculty Feedback",
    //   icon: VscFeedback,
    //   path: "/faculty/feedback",
    // },
  ],
};

// Export Combined Nav Items for Student and Faculty
export const navItems = {
  student: studentNavItems,
  faculty: facultyNavItems,
};
