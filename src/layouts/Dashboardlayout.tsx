import Sidebar from "@/components/common/Sidebar";
import { Outlet } from "react-router-dom";

export type SidebarStateProps = {
  isSidebarExpanded: boolean;
  setIsSidebarExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Dashboardlayout({
  isSidebarExpanded,
  setIsSidebarExpanded,
}: SidebarStateProps) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        isSidebarExpanded={isSidebarExpanded}
        setIsSidebarExpanded={setIsSidebarExpanded}
      />
      <Outlet />
    </div>
  );
}
