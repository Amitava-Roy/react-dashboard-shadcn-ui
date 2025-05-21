import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./article/Page";
import Dashboardlayout from "./layouts/Dashboardlayout";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

export default function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: "#334155",
            color: "#f8fafc",
            borderRadius: "8px",
            padding: "12px 16px",
            fontSize: "15px",
          },

          success: {
            duration: 3000,
            iconTheme: {
              primary: "#22c55e",
              secondary: "#f8fafc",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#ef4444",
              secondary: "#f8fafc",
            },
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <Dashboardlayout
                isSidebarExpanded={isSidebarExpanded}
                setIsSidebarExpanded={setIsSidebarExpanded}
              />
            }
          >
            <Route
              path="/"
              element={
                <Dashboard
                  isSidebarExpanded={isSidebarExpanded}
                  setIsSidebarExpanded={setIsSidebarExpanded}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
