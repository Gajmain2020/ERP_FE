import { TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabItems = [
  { value: "basic", label: "Basic Info" },
  { value: "address", label: "Address" },
  { value: "guardian", label: "Guardian Info" },
  { value: "profile", label: "Profile Pic" },
  { value: "other", label: "Other Info" },
];

const TabsListComponent = () => (
  <TabsList className="grid grid-cols-5 mb-4">
    {tabItems.map(({ value, label }) => (
      <TabsTrigger key={value} value={value}>
        {label}
      </TabsTrigger>
    ))}
  </TabsList>
);

export default TabsListComponent;
