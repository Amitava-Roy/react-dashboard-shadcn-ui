import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronDown, SendHorizontal } from "lucide-react";
import type { Article } from "@/lib/data";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

type FilterState = {
  type: "keyword" | "words" | "createdOn";
  value: 0 | 1;
};

export default function TableComp({ articles }: { articles: Article[] }) {
  const [filter, setFilter] = useState<FilterState | null>();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const articlesRender = useMemo(() => {
    let articleFilter = articles;
    if (filter?.type == "words")
      articleFilter = articleFilter?.sort((a, b) =>
        filter.value == 0 ? a.words - b.words : b.words - a.words
      );

    return articleFilter;
  }, [filter, articles]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-40">
        <span className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900" />
      </div>
    );

  return (
    <div className="rounded-md border overflow-x-auto">
      {/* Make table scrollable horizontally */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-8">
              <Checkbox />
            </TableHead>
            <TableHead className="min-w-[150px]">Article Title</TableHead>
            <TableHead className="min-w-[150px]">
              <div className="flex items-center">
                <span>Keyword [Traffic]</span>
              </div>
            </TableHead>
            <TableHead className="hidden sm:table-cell">
              {/* Hide on small screens */}
              <div className="flex items-center">
                <span>Words</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => setFilter({ type: "words", value: 1 })}
                    >
                      Highest Word Count
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setFilter({ type: "words", value: 0 })}
                    >
                      Lowest Word Count
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableHead>
            <TableHead className="hidden md:table-cell">
              {/* Hide on smaller than medium screens */}
              <div className="flex items-center">
                <span>Created On</span>
              </div>
            </TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Publish</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articlesRender.map((article) => (
            <TableRow key={article.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>
                <div className="font-medium">{article.title}</div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  {article.keyword} [{article.traffic}]
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                {article.words}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {article.createdOn}
              </TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 cursor-pointer"
                >
                  View
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    toast.success(`${article.title} sent.`);
                  }}
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 cursor-pointer"
                >
                  <SendHorizontal className="w-4 h-4 text-gray-600" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
