import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import type { SidebarStateProps } from "@/layouts/Dashboardlayout";
import TabComp from "./Tabs";
import Search from "./Search";
import { articles } from "@/lib/data";
import TableComp from "./TableComp";
import { useMemo, useState } from "react";

export default function Dashboard({ isSidebarExpanded }: SidebarStateProps) {
  const [query, setQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currPage, setCurrPage] = useState(1);

  const articleRender = useMemo(() => {
    let articleFilter = articles.filter(
      (article) =>
        article.title.toLocaleLowerCase().includes(query) ||
        article.keyword.toLocaleLowerCase().includes(query)
    );

    const startIndex = (currPage - 1) * itemsPerPage;
    const endIndex = currPage * itemsPerPage;

    articleFilter = articleFilter.slice(startIndex, endIndex);

    return articleFilter;
  }, [query, currPage, itemsPerPage]);

  const isDisabled = (type: "prev" | "next") => {
    if (type == "prev") return currPage == 1;
    if (query) {
      return currPage == Math.ceil(articleRender.length / itemsPerPage);
    } else {
      return currPage == Math.ceil(articles.length / itemsPerPage);
    }
  };

  return (
    <div
      className={`flex-1 flex flex-col overflow-hidden ${
        isSidebarExpanded ? "ml-16 md:ml-64" : "ml-12 md:ml-16"
      } `}
    >
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <Card>
            <TabComp />
            <CardContent>
              <Search query={query} setQuery={setQuery} />
              <TableComp articles={articleRender} />
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 sm:space-x-2 py-4">
                <div className="text-sm text-muted-foreground">
                  Total {articleRender.length} Article Titles
                </div>
                <div className="flex flex-wrap items-center space-x-2">
                  <p className="text-sm font-medium">Show</p>
                  <Select
                    defaultValue="10"
                    onValueChange={(val) => {
                      setCurrPage(1);
                      setItemsPerPage(parseInt(val));
                    }}
                  >
                    <SelectTrigger className="h-8 w-[70px]">
                      <SelectValue placeholder="10" />
                    </SelectTrigger>
                    <SelectContent side="top">
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm font-medium">entries per page</p>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrPage((s) => s - 1)}
                      disabled={isDisabled("prev")}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrPage((s) => s + 1)}
                      disabled={isDisabled("next")}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
