interface Notice {
  title: string;
  description: string;
  date: string;
  link: string;
}

export interface NoticeComponentProps {
  notices: Notice[];
}
export interface EditStudentDialogProps {
  studentData: StudentData;
  studentDetailsData?: StudentDetailsData;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (
    studentInfo: StudentData,
    studentDetails: StudentDetailsData
  ) => void;
}

export interface EditFacultyProfile {
  setOpenModal: (open: boolean) => void;
  studentProfile: StudentDetailsData | null;
}

export interface StudentData {
  _id: string;
  name: string;
  email: string;
  crn: string;
  urn: string;
  semester: string;
  section: string;
  department: string;
  TG?: {
    teacherId: string | null;
    teacherName: string;
  };
  isDetailsFilled: boolean;
  isVerified: boolean;
}

export interface StudentDetailsData {
  currentAddress: Address;
  permanentAddress: Address;
  guardianDetails: {
    father: GuardianDetails;
    mother: GuardianDetails;
    alternateGuardian: AlternateGuardianDetails;
  };
  emergencyContact: EmergencyContact;
  profilePhoto: string;
  aadharNumber: string;
  abcId: string;
  admissionNumber: string;
  dob: string;
  nationality: string;
  bloodGroup: string;
  category: string;
  gender: string;
  // Fix: More precise index signature
  [key: string]:
    | string
    | EmergencyContact
    | Address
    | undefined
    | {
        father: GuardianDetails;
        mother: GuardianDetails;
        alternateGuardian: AlternateGuardianDetails;
      }; // Allow nested object properly
}

export interface Address {
  address: string;
  city: string;
  pinCode: string;
  state: string;
}

export interface GuardianDetails {
  name: string;
  mobileNumber: string;
}

export interface AlternateGuardianDetails extends GuardianDetails {
  relationship: string;
}

export interface EmergencyContact {
  name: string;
  mobileNumber: string;
  relation: string;
}

export interface IFaculty {
  _id?: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
  department?: string;
  email: string;
  empId: string;
  gender?: "male" | "female" | "other";
  mobileNumber: string;
  isTG?: boolean;
  name: string;
  password?: string;
  position: string;
  profileImage?: string;
}

export interface IStudent {
  _id?: string;
  name: string;
  email: string;
  urn: string;
  crn: string;
  semester: string;
  section: string;
  TG?: {
    facultyId: string;
    facultyName: string;
  };
  isDetailsFilled?: boolean;
  isVerified?: boolean;
}

interface FaultyForCourse {
  facultyId: string;
  name?: string;
}

export interface ICourse {
  _id: string;
  courseCode: string;
  courseName: string;
  courseShortName: string;
  semester: string;
  courseType: string;
  takenBy?: FaultyForCourse[];
  classType: string;
}

export interface IFacultyForCourse {
  _id: string;
  name: string;
  email: string;
}

export interface INotice {
  _id: string;
  noticeNumber: string;
  noticeLink?: string;
  author: { userType: string; userId: string; userName: string };
  pdf?: string;
  createdAt: string;
}

interface Period {
  periodNumber: number;
  courseShortName: string;
  facultyName: string;
}

export interface ITimetable {
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
  periods: Period[];
}
