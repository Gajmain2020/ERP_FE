import Complaints from "@/components/Faculty/Complaints";
import QuickLinks from "@/components/Faculty/QuickLinks";
import UpcomingQuizzes from "@/components/Faculty/UpcomingQuizzes";
import NoticeComponent from "@/components/Homepage/StudentHelper/Notice";
import { dummyNotice } from "@/utils/dummy";

export default function Homepage() {
  return (
    <div className="w-full h-screen flex flex-col gap-5 p-2">
      <QuickLinks />
      {/* Upcoming Quizzes Section */}
      <div className="flex-grow">
        <UpcomingQuizzes />
      </div>

      {/* Container with flex to balance available space */}
      <div className="flex  flex-col md:flex-row gap-5 flex-grow">
        {/* Complaints Section */}
        <div className="flex-1 ">
          <Complaints />
        </div>

        {/* Notice Section */}
        <div className="flex-1  ">
          <NoticeComponent notices={dummyNotice} />
        </div>
      </div>
    </div>
  );
}
