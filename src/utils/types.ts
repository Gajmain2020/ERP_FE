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

interface Address {
  address: string;
  city: string;
  pinCode: string;
  state: string;
}

interface EmergencyContact {
  mobileNumber: string;
  name: string;
  relation: string;
}

interface GuardianDetails {
  alternateGuardian?: {
    mobileNumber?: string;
    name?: string;
    relationship?: string;
  };
  father: {
    mobileNumber: string;
    name: string;
  };
  mother: {
    mobileNumber: string;
    name: string;
  };
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
