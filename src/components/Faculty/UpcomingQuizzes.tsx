import { Button } from "../ui/button";

const UpcomingQuizzes: React.FC = () => {
  const quizzes = [
    {
      title: "Data Structures Quiz",
      date: "March 20, 2025",
      subject: "Data Structures & Algorithms",
    },
    {
      title: "Data Structures Quiz",
      date: "March 20, 2025",
      subject: "Data Structures & Algorithms",
    },
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
  ];

  return (
    <div className="relative flex flex-col max-w-full max-h-[40dvh] overflow-hidden rounded-lg bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-lg">
      <div className="text-2xl text-center py-2 bg-gray-100 border-gray-500 border rounded-t-lg font-semibold text-indigo-700">
        Upcoming Quizzes
      </div>

      <div className="overflow-y-auto flex-grow max-h-full scrollbar-thin scrollbar-thumb-gray-600">
        {quizzes.map((quiz, index) => (
          <div key={index}>
            <div className="border-b border-gray-300 my-1"></div>
            <div className="px-4 py-2 hover:bg-gray-200 transition cursor-pointer">
              <h3 className="text-xl font-bold text-indigo-600">
                {quiz.title}
              </h3>
              <p className="text-sm text-gray-500">
                {quiz.subject} -{" "}
                <span className="font-medium">{quiz.date}</span>
              </p>
            </div>
          </div>
        ))}
        <div className="px-4 py-1 text-center mt-4 mb-4">
          <Button className="bg-indigo-500 hover:bg-indigo-600 text-white">
            View All Quizzes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingQuizzes;
