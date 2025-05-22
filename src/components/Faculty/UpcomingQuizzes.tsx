import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const UpcomingQuizzes: React.FC = () => {
  const quizzes = [
    {
      title: "Data Structures Quiz",
      date: "March 20, 2025",
      subject: "Data Structures & Algorithms",
    },
    {
      title: "Database Systems Quiz",
      date: "March 22, 2025",
      subject: "Database Management",
    },
    {
      title: "Operating Systems Test",
      date: "March 25, 2025",
      subject: "Operating Systems",
    },
    {
      title: "Networks Quiz",
      date: "March 28, 2025",
      subject: "Computer Networks",
    },
    {
      title: "Compiler Design Test",
      date: "March 30, 2025",
      subject: "Compiler Design",
    },
  ];

  return (
    <Card className="max-h-[40dvh] flex flex-col overflow-hidden">
      <CardHeader>
        <CardTitle>Upcoming Quizzes</CardTitle>
        <CardDescription>
          Don’t miss out on the upcoming assessments.
        </CardDescription>
      </CardHeader>

      {/* Smooth scroll container */}
      <CardContent className="overflow-y-auto flex-grow max-h-full px-1">
        <div className="space-y-3 pr-1 scrollbar-thin scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500 transition-all duration-300">
          {quizzes.map((quiz, index) => (
            <div
              key={index}
              className="px-3 py-2 border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 transition"
            >
              <h3 className="text-sm font-semibold text-indigo-700">
                {quiz.title}
              </h3>
              <p className="text-xs text-gray-600">
                {quiz.subject} —{" "}
                <span className="font-medium">{quiz.date}</span>
              </p>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="justify-center">
        <Button className="bg-indigo-500 hover:bg-indigo-600 text-white">
          View All Quizzes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UpcomingQuizzes;
