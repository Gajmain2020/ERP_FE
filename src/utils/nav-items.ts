import {
  Home,
  BookOpen,
  FileText,
  Layers,
  Settings,
  Users,
} from "lucide-react";

export const navItems = [
  {
    title: "Dashboard",
    icon: Home,
    path: "/",
  },
  {
    title: "Courses",
    icon: BookOpen,
    path: "/courses",
  },
  {
    title: "Students",
    icon: Users,
    path: "/students",
  },
  {
    title: "Inventory",
    icon: Layers,
    path: "/inventory",
  },
  {
    title: "Reports",
    icon: FileText,
    path: "/reports",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];
