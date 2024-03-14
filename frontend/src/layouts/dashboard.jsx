import { Routes, Route } from "react-router-dom";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController } from "@/context";
import { createContext } from "react";

export const MyContext = createContext();

export function Dashboard({ rol }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/favicon.jpg" : "/img/favicon.jpg"
        }
        rol={rol}
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <MyContext.Provider value={rol}>
          <Routes>
            {routes.map(({ layout, pages }) =>
              // layout === "dashboard" &&
              pages.map(({ path, element }) => (
                <Route exact path={path} element={element} />
              ))
            )}
          </Routes>
        </MyContext.Provider>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
