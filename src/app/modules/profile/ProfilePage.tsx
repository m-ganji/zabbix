import { Navigate, Routes, Route, Outlet } from "react-router-dom";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import { Overview } from "./components/Overview";
import { Problems } from "./components/Problems";
import { Campaigns } from "./components/Campaigns";
import { Maps } from "./components/Maps";
import { Discovery } from "./components/Discovery";

const profileBreadCrumbs: Array<PageLink> = [
  {
    title: "Profile",
    path: "/Hosts",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "",
    path: "",
    isSeparator: true,
    isActive: false,
  },
];

const ProfilePage = () => (
  <Routes>
    <Route element={<Outlet />}>
      <Route
        path="overview"
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Overview</PageTitle>
            <Overview />
          </>
        }
      />
      <Route
        path="problems"
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Projects</PageTitle>
            <Problems />
          </>
        }
      />
      <Route
        path="campaigns"
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Campaigns</PageTitle>
            <Campaigns />
          </>
        }
      />
      <Route
        path="documents"
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Documents</PageTitle>
            <Maps />
          </>
        }
      />
      <Route
        path="connections"
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Connections</PageTitle>
            <Discovery />
          </>
        }
      />
      <Route
        index
        element={<Navigate to="/Hosts" />}
      />
    </Route>
  </Routes>
);

export default ProfilePage;
