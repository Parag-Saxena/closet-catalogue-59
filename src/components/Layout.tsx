import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import AppSidebar from "./Sidebar";
import { LayoutProps } from "@/types";
import { useApp } from "@/context/AppContext";
import { useSidebar } from "@/context/SidebarContext";

const Layout: React.FC<LayoutProps> = ({
  children,
  excludeSidebar = false,
}) => {
  const location = useLocation();
  const isAddPage = location.pathname === "/add";
  const isDashboard = location.pathname === "/";
  const isHomePage = location.pathname === "/home";
  const { user } = useApp();
  const { sidebarOpen } = useSidebar();

  const showSidebar = user && !isHomePage && !excludeSidebar;

  return (
    <div className="flex flex-col min-h-screen w-full bg-background overflow-x-hidden">
      <Header />
      <div className="flex flex-1 w-full pt-16">
        {" "}
        {/* Space below the header */}
        {showSidebar && sidebarOpen && (
          <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] z-40 lg:static lg:h-auto">
            <AppSidebar />
          </div>
        )}
        <main
          className={`flex-1 px-4 py-6 md:px-6 lg:px-8 w-full transition-all duration-300
          ${isDashboard ? "pt-4 pb-12" : isAddPage ? "pt-4" : "pt-6"}`}
        >
          <div className="animate-fade-in max-w-6xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
