import { Outlet } from "react-router";
// import Sidebar from "../components/Sidebar";
// import { StoreProvider } from "../appState/store";
function MainLayout() {
  return (
    // <StoreProvider>
    //   <Sidebar />
    //   <Outlet />
    // </StoreProvider>
    <Outlet />
  );
}

export default MainLayout;
