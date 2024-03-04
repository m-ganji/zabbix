import { lazy, FC, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { MasterLayout } from "../../_metronic/layout/MasterLayout";
import TopBarProgress from "react-topbar-progress-indicator";
import { DashboardWrapper } from "../pages/dashboard/DashboardWrapper";
import { MenuTestPage } from "../pages/MenuTestPage";
import { getCSSVariableValue } from "../../_metronic/assets/ts/_utils";
import { WithChildren } from "../../_metronic/helpers";
import BuilderPageWrapper from "../pages/layout-builder/BuilderPageWrapper";
import { Problems } from "../pages/Monitoring/Problems";
import { Overview } from "../pages/Monitoring/Hosts";
import { Discovery } from "../pages/Monitoring/Discovery";
import { Maps } from "../pages/Monitoring/Maps";
import { LatestData } from "../pages/Monitoring/LatestData";
import DataTemplatesGroups from "../pages/LatestData/DataTemplatesGroups";
import { DataHostGroups } from "../pages/LatestData/DataHostGroups";
import { SystemInfo } from "../pages/Reports/SystemInfo";
import { Notifications } from "../pages/Reports/Notifications";
import { ScheduledReports } from "../pages/Reports/ScheduledReports";
import AuditLog from "../pages/Reports/AuditLog";
import ActionLog from "../pages/Reports/ActionLog";
import AvailabilityReport from "../pages/Reports/AvailabilityReport";
import BusiestTriggers from "../pages/Reports/BusiestTriggers";

const PrivateRoutes = () => {
  const ProfilePage = lazy(() => import("../modules/profile/ProfilePage"));
  const WizardsPage = lazy(() => import("../modules/wizards/WizardsPage"));
  const AccountPage = lazy(() => import("../modules/accounts/AccountPage"));
  const WidgetsPage = lazy(() => import("../modules/widgets/WidgetsPage"));
  const ChatPage = lazy(() => import("../modules/apps/chat/ChatPage"));
  const UsersPage = lazy(
    () => import("../modules/apps/user-management/UsersPage")
  );

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />
        {/* Pages */}
        <Route path="dashboard" element={<DashboardWrapper />} />
        <Route path="builder" element={<BuilderPageWrapper />} />
        <Route path="menu-test" element={<MenuTestPage />} />
        {/* MONITORING PAGES */}
        <Route path="Monitoring/Problems" element={<Problems />} />
        <Route path="Monitoring/Problems/:id/:value" element={<Problems />} />
        <Route path="Monitoring/Hosts" element={<Overview />} />
        <Route path="Monitoring/Discovery" element={<Discovery />} />
        <Route path="Monitoring/Maps" element={<Maps />} />
        <Route path="Monitoring/LatestData" element={<LatestData />} />
        {/* REPORTS PAGES */}
        <Route path="Reports/System-Info" element={<SystemInfo />} />
        <Route
          path="Reports/Scheduled-Reports"
          element={<ScheduledReports />}
        />
        <Route path="Reports/Notifications" element={<Notifications />} />
        <Route path="Reports/Availability-Report" element={<AvailabilityReport />} />
        <Route path="Reports/Busiest-Triggers" element={<BusiestTriggers />} />
        <Route path="Reports/Audit-log" element={<AuditLog />} />
        <Route path="Reports/Action-log" element={<ActionLog />} />
        {/* DATA PAGES */}
        <Route path="Data/Templates-Groups" element={<DataTemplatesGroups />} />
        <Route path="Data/Host-Groups" element={<DataHostGroups />} />
        <Route path="Data/Templates" element={<Maps />} />
        <Route path="Data/Hosts" element={<Maps />} />
        <Route path="Data/Maintenance" element={<Maps />} />
        <Route path="Data/Event-Correlation" element={<Maps />} />
        <Route path="Data/Discovery" element={<Maps />} />

        {/* Lazy Modules */}

        <Route
          path="crafted/pages/wizards/*"
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path="crafted/pages/profile/*"
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path="crafted/widgets/*"
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path="crafted/account/*"
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path="apps/chat/*"
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path="apps/user-management/*"
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  );
};

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue("--bs-primary");
  TopBarProgress.config({
    barColors: {
      "0": baseColor,
    },
    barThickness: 2,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };
