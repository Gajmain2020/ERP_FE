import { useState } from "react";

import CreateTimeTable from "@/components/Admin/CreateTimeTable";
import SearchTimeTableCard from "@/components/Admin/SearchTimeTableCard";
import ShowTimetable from "@/components/Admin/ShowTimetable";

export default function ManageTimeTable() {
  const [semester, setSemester] = useState("");
  const [section, setSection] = useState("");

  // for existing and set timetable
  const [timetable, setTimetable] = useState<any>();

  // to create new timetable
  const [createNewTimetable, setCreateNewTimetable] = useState(false);

  return (
    <div className="w-full h-screen flex flex-col gap-5">
      <SearchTimeTableCard
        semester={semester}
        section={section}
        setSemester={setSemester}
        setSection={setSection}
        setTimetable={setTimetable}
        setCreateNewTimetable={setCreateNewTimetable}
      />

      {timetable && <ShowTimetable data={timetable} />}

      {!timetable && createNewTimetable && (
        <CreateTimeTable
          semester={semester}
          section={section}
          setTimetable={setTimetable}
        />
      )}
    </div>
  );
}
