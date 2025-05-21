import { CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TabComp() {
  return (
    <CardHeader className="pb-2">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
        Articles
      </h2>
      <Tabs
        defaultValue="generated"
        className="flex flex-col sm:flex-row items-start sm:items-center"
      >
        <TabsList className="mb-2 sm:mb-0 flex-wrap h-auto">
          <TabsTrigger
            value="generated"
            className="mb-1 sm:mb-0 mr-1 transition-all  data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Generated Articles
          </TabsTrigger>
          <TabsTrigger
            value="published"
            className="mb-1 sm:mb-0 mr-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Published Articles
          </TabsTrigger>
          <TabsTrigger
            value="scheduled"
            className="mb-1 sm:mb-0 mr-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Scheduled Articles
          </TabsTrigger>
          <TabsTrigger
            value="archived"
            className="mb-1 sm:mb-0 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Archived Articles
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </CardHeader>
  );
}
