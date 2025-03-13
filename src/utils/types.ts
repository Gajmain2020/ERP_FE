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
  currentAddress?: Address;
  permanentAddress?: Address;
  guardianDetails?: {
    father?: GuardianDetails;
    mother?: GuardianDetails;
    alternateGuardian?: AlternateGuardianDetails;
  };
  emergencyContact?: EmergencyContact;
  profilePhoto?: string;
  aadharNumber?: string;
  abcId?: string;
  admissionNumber?: string;
  dob?: string;
  nationality?: string;
  bloodGroup?: string;
  category?: string;
  gender?: string;
  // Fix: More precise index signature
  [key: string]:
    | string
    | EmergencyContact
    | Address
    | undefined
    | {
        father?: GuardianDetails;
        mother?: GuardianDetails;
        alternateGuardian?: AlternateGuardianDetails;
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
