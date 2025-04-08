import {
  AlertCircle,
  Archive,
  ArrowLeftRight,
  BadgeAlert,
  Bell,
  Book,
  Calendar,
  ClipboardList,
  FileText,
  Home,
  IdCard,
  ReceiptIndianRupee,
  User,
} from "lucide-react";
import { FaWpforms } from "react-icons/fa";
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
      title: "Notice / Complaints",
      icon: Bell,
      path: "/notice-complaints",
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
    {
      title: "Exam Form",
      icon: FaWpforms,
      path: "/exam-form",
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
      title: "Current Backlog(s)",
      icon: BadgeAlert,
      path: "/current-backlogs",
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

// Grouped Navigation Items for Admin
export const adminNavItems = {
  general: [
    {
      title: "Dashboard",
      icon: Home,
      path: "/",
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
      title: "Manage Students",
      icon: IdCard,
      path: "/manage-students",
    },
    {
      title: "Manage Faculty",
      icon: IdCard,
      path: "/manage-faculty",
    },
    {
      title: "Manage Courses",
      icon: Book,
      path: "/manage-courses",
    },
    {
      title: "Time Table",
      icon: Calendar,
      path: "/time-table",
    },
  ],
  TG: [
    {
      title: "Assign TG",
      icon: TbReportAnalytics,
      path: "/assign-tg",
    },
  ],
};

// Export Combined Nav Items for Student and Faculty
export const navItems = {
  student: studentNavItems,
  faculty: facultyNavItems,
  admin: adminNavItems,
};
