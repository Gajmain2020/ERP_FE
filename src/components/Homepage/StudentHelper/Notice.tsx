import { Button } from "@/components/ui/button";
import { NoticeComponentProps } from "@/utils/types";

const NoticeComponent: React.FC<NoticeComponentProps> = ({ notices }) => {
  return (
    <div className="relative flex flex-col max-w-full max-h-[50dvh] overflow-hidden rounded-lg bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-lg">
      {/* Heading */}
      <div className="text-2xl text-center py-2 bg-gray-100 border-gray-500 border rounded-t-lg font-semibold text-indigo-700">
        Notice & Events
      </div>

      {/* Scrolling Container */}
      <div className="overflow-y-auto flex-grow max-h-full scrollbar-thin scrollbar-thumb-gray-600 ">
        {notices.map((notice, index) => (
          <div key={index}>
            {/* Divider */}
            <div className="border-b border-gray-300 my-1"></div>

            {/* Notice */}
            <div className="px-4 py-2 hover:bg-gray-200 transition cursor-pointer">
              <div className="flex gap-2">
                <a
                  href={notice.link}
                  className="text-xl font-bold text-indigo-600 hover:text-indigo-800 transition"
                >
                  {notice.title}
                </a>
                <p className="text-xs text-gray-500 mt-2">[{notice.date}]</p>
              </div>

              <p className="text-sm text-gray-600 mt-0.5">
                {notice.description}
              </p>
            </div>
          </div>
        ))}
        {/* View All Notices Button */}
        <div className="px-4 py-1 text-center mt-4 mb-4">
          <Button className="bg-indigo-500 hover:bg-indigo-600 text-white">
            View All Notices
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NoticeComponent;
