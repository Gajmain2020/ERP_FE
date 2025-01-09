import useAuthStore from "@/store/userAuthStore";
import { quickLinks } from "@/utils/constants";

const QuickLinksComponent: React.FC = () => {
  const { name, userType } = useAuthStore() as {
    name: string;
    userType: string;
  };
  const getDynamicPath = (basePath: string) => {
    console.log(basePath);
    return `/user/${userType}/${name}${basePath}`;
  };
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Quick Links
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickLinks.map((link, index) => (
          <a
            key={index}
            href={getDynamicPath(link.link)}
            className="flex flex-col items-center justify-center gap-3 p-6 bg-gradient-to-br from-white to-gray-100 border rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition transform duration-300 text-center"
          >
            <div className="text-4xl">{link.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800">
              {link.title}
            </h3>
            <p className="text-sm text-gray-600">{link.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default QuickLinksComponent;
