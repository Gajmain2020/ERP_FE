interface Notice {
  title: string;
  description: string;
  date: string;
  link: string;
}

export interface NoticeComponentProps {
  notices: Notice[];
}

export interface BasicInfoProps {
  details: {
    detailsFilled: boolean;
    name: string;
    urn: string;
    semester: string;
    department: string;
    section: string;
    TG: string;
    image: string; // URL of the student's image
  };
}
