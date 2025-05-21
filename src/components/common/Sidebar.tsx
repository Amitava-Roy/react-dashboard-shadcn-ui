import { useState } from "react";
import {
  FileText,
  BarChart3,
  Link as LinkIcon,
  RocketIcon,
  PuzzleIcon,
  Users,
  HelpCircle,
  Bell,
  MessageSquare,
  User,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SidebarStateProps } from "@/layouts/Dashboardlayout";
// Navigation Items for Sidebar
const navigationItems = [
  {
    title: "Articles",
    icon: FileText,
    submenu: [
      { name: "Create Article", href: "#" },
      { name: "Generated Articles", href: "#" },
      { name: "Keyword Projects", href: "#" },
      { name: "AI Keyword to Article", href: "#" },
      { name: "Steal Competitor Keyword", href: "#" },
      { name: "Import Keyword from GSC", href: "#" },
      { name: "Manual Keyword to Article", href: "#" },
      { name: "Bulk Keyword to Article", href: "#" },
      { name: "Longtail Keyword to Article", href: "#" },
      { name: "Article Settings", href: "#" },
    ],
  },
  { title: "Auto Blog", icon: BarChart3, href: "#" },
  { title: "Internal Links", icon: LinkIcon, href: "#" },
  { title: "Free Backlinks", icon: LinkIcon, href: "#" },
  { title: "Integrations", icon: PuzzleIcon, href: "#" },
  { title: "Subscription", icon: Users, href: "#" },
  { title: "Affiliate Program", icon: RocketIcon, href: "#" },
  { title: "Help Center", icon: HelpCircle, href: "#" },
  { title: "Updates", icon: Bell, href: "#" },
  { title: "Live Chat Support", icon: MessageSquare, href: "#" },
  { title: "Profile", icon: User, href: "#" },
];

export default function Sidebar({
  isSidebarExpanded,
  setIsSidebarExpanded,
}: SidebarStateProps) {
  // Default to collapsed on mobile
  const [expandedNavItem, setExpandedNavItem] = useState("Articles");
  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 flex-col transition-all duration-300 h-full fixed inset-y-0 left-0 z-50",
        isSidebarExpanded ? "md:w-64 w-16" : "w-12 md:w-16",
        "flex"
      )}
    >
      {/* Logo */}
      <div className="p-4 flex items-center justify-between border-b border-gray-100">
        {isSidebarExpanded && (
          <span className="text-xl font-bold hidden md:inline">abun</span>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
          className={!isSidebarExpanded ? "mx-auto" : ""}
        >
          {isSidebarExpanded ? (
            <ArrowLeft className="w-4 h-4 md:w-6 md:h-6" />
          ) : (
            <ArrowRight className="w-4 h-4 md:w-6 md:h-6" />
          )}
        </Button>
      </div>

      {/* Domain Selection */}
      <div
        className={cn(
          "p-4 border-b border-gray-100",
          !isSidebarExpanded && "hidden"
        )}
      >
        <Select defaultValue="amazon">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select domain" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="amazon">amazon.com</SelectItem>
            <SelectItem value="google">google.com</SelectItem>
            <SelectItem value="ebay">ebay.com</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-2">
        <nav className="px-2 space-y-1">
          {navigationItems.map((item) => (
            <div key={item.title}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start mb-1 py-1", // Added py-1 for smaller height on mobile
                  !isSidebarExpanded && "justify-center px-1 md:px-2" // Smaller padding on mobile
                )}
                onClick={() =>
                  item.submenu &&
                  setExpandedNavItem(
                    expandedNavItem === item.title ? "" : item.title
                  )
                }
              >
                <item.icon
                  className={cn(
                    "h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2",
                    !isSidebarExpanded && "mr-0"
                  )} // Smaller icons on mobile
                />
                {isSidebarExpanded && (
                  <span className="text-xs md:text-sm hidden md:inline">
                    {item.title}
                  </span>
                )}
                {isSidebarExpanded && item.submenu && (
                  <span className="ml-auto hidden md:inline">
                    {expandedNavItem === item.title ? (
                      <ChevronUp className="w-4 h-4 md:w-6 md:h-6" />
                    ) : (
                      <ChevronDown className="w-4 h-4 md:w-6 md:h-6" />
                    )}
                  </span>
                )}
              </Button>

              {isSidebarExpanded &&
                item.submenu &&
                expandedNavItem === item.title && (
                  <div className="ml-6 space-y-1">
                    {item.submenu.map((subItem) => (
                      <Button
                        key={subItem.name}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-sm"
                      >
                        {subItem.name}
                      </Button>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
