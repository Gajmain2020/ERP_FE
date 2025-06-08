import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NoticeComponentProps } from "@/utils/types";

const NoticeComponent: React.FC<NoticeComponentProps> = ({ notices }) => {
  return (
    <Card className="max-h-[50dvh] flex flex-col overflow-hidden">
      <CardHeader>
        <CardTitle>Notices & Events</CardTitle>
        <CardDescription>Recent updates and announcements</CardDescription>
      </CardHeader>

      <CardContent className="overflow-y-auto flex-grow max-h-full px-1">
        <div className="space-y-3 pr-1 scrollbar-thin scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500 transition-all duration-300">
          {notices.map((notice, index) => (
            <div
              key={index}
              className="px-3 py-2 border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 transition"
            >
              <div className="flex justify-between items-center">
                <a
                  href={notice.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-indigo-700 hover:text-indigo-900"
                >
                  {notice.title}
                </a>
                <p className="text-xs text-gray-500 whitespace-nowrap">
                  [{notice.date}]
                </p>
              </div>
              <p className="text-sm text-gray-700 mt-1">{notice.description}</p>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="justify-center">
        <Button className="bg-indigo-500 hover:bg-indigo-600 text-white">
          View All Notices
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NoticeComponent;
