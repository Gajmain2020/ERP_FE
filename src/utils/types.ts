interface Notice {
  title: string;
  description: string;
  date: string;
  link: string;
}

export interface NoticeComponentProps {
  notices: Notice[];
}

interface TeacherGuardian {
  teacherEmpId?: string;
  teacherId?: string;
  teacherName?: string;
  teacherPhoneNumber?: string;
}

// ! important
export interface StudentProps {
  crn: string;
  department: string;
  email: string;
  isDetailsFilled: boolean;
  isVerified: boolean;
  name: string;
  section: string;
  semester: string;
  TG: TeacherGuardian;
  urn: string;
}

interface EmergencyContact {
  mobileNumber: string;
  name: string;
  relation: string;
}

// ! important
export interface StudentDetailsProps {
  aadharNumber: string;
  abcId: string;
  admissionNumber: string;
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-" | string;
  category: "GEN" | "OBC" | "ST" | "SC" | "EWS" | string;
  currentAddress: Address;
  dob: string;
  emergencyContact: EmergencyContact;
  gender: "male" | "female" | "other" | string;
  guardianDetails: GuardianDetails;
  nationality: string;
  permanentAddress: Address;
  profilePhoto: string;
  studentId: string;
  studentMobileNumber: string;
  studentUrn: string;
}

export interface Address {
  address?: string;
  city?: string;
  state?: string;
  pinCode?: string;
}

export interface GuardianDetails {
  alternateGuardian?: {
    name?: string;
    mobileNumber?: string;
    relationship?: string;
  };
  father?: {
    name?: string;
    mobileNumber?: string;
  };
  mother?: {
    name?: string;
    mobileNumber?: string;
  };
}

export interface StudentData {
  urn: string;
  crn: string;
  name: string;
  email: string;
  department: string;
  section: string;
  semester: string;
  isDetailsFilled: boolean;
  TG?: {
    teacherEmpId?: string;
    teacherId?: string;
    teacherName?: string;
    teacherPhoneNumber?: string;
  };
}

interface EmergencyContact {
  mobileNumber: string;
  name: string;
  relation: string;
}

export interface StudentDetailsData {
  studentMobileNumber?: string;
  aadharNumber?: string;
  abcId?: string;
  admissionNumber?: string;
  bloodGroup?: string;
  category?: string;
  gender?: string;
  dob?: string;
  nationality?: string;
  profilePhoto: string;
  emergencyContact: EmergencyContact;
  currentAddress?: Address;
  permanentAddress?: Address;
  guardianDetails?: GuardianDetails;
}

export interface EditStudentDialogProps {
  studentData: StudentData;
  studentDetailsData: StudentDetailsData;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (
    studentBasicDetails: StudentData,
    studentDetails: StudentDetailsData
  ) => void;
}
