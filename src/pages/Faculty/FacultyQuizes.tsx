import { GetQuizzesAPI } from "@/api/facultyAPI";
import QuizSchedulerCard from "@/components/Faculty/QuizScheduleCard";
import { IQuizData } from "@/utils/types";
import { useEffect, useState } from "react";

export default function FacultyQuizzes() {
  const [quizzes, setQuizzes] = useState<IQuizData[]>([]);

  const handleSchedule = (data: IQuizData) => {
    setQuizzes((prev) => [...prev, data]);
  };

  useEffect(() => {
    const fetchQuizzes = async () => {
      const res = await GetQuizzesAPI();
      if (res.success) {
        setQuizzes(res.quizzes);
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <div>
      <QuizSchedulerCard onSchedule={handleSchedule} />

      <>{quizzes.length}</>
    </div>
  );
}
