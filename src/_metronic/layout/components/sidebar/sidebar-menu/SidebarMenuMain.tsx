import { useIntl } from "react-intl";
import { KTIcon } from "../../../../helpers";
import { SidebarMenuItemWithSub } from "./SidebarMenuItemWithSub";
import { SidebarMenuItem } from "./SidebarMenuItem";

const SidebarMenuMain = () => {
  const intl = useIntl();

  return (
    <>
      <SidebarMenuItem
        to="/dashboard"
        icon="element-11"
        title="داشبورد"
        fontIcon="bi-app-indicator"
      />
      {/* <SidebarMenuItem
        to="/builder"
        icon="switch"
        title="Layout Builder"
        fontIcon="bi-layers"
      /> */}
      {/* <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            Crafted
          </span>
        </div>
      </div> */}
      <SidebarMenuItemWithSub
        to="/crafted/pages"
        title="نظارت"
        fontIcon="bi-archive"
        icon="eye"
      >
        <SidebarMenuItem to="/Monitoring/Hosts" title="هاست" hasBullet={true} />
        <SidebarMenuItem
          to="/Monitoring/Problems"
          title="مشکلات"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/Monitoring/LatestData"
          title="آخرین داده ها"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/Monitoring/Maps"
          title="نقشه ها"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/Monitoring/Discovery"
          title="اکتشاف"
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>

      <SidebarMenuItemWithSub
        to="/crafted/pages/wizards"
        title="خدمات"
        icon="abstract-43"
      >
        <SidebarMenuItem
          to="/crafted/pages/wizards/horizontal"
          title="خدمات"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/crafted/pages/wizards/vertical"
          title="SLA"
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to="/crafted/widgets"
        title="فهرست"
        icon="note-2"
        fontIcon="bi-layers"
      ></SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to="/crafted/widgets"
        title="گزارشات"
        icon="chart-pie-3"
        fontIcon="bi-layers"
      >
        <SidebarMenuItem
          to="Reports/System-Info"
          title="اطلاعات سیستم"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="Reports/Scheduled-Reports"
          title="گزارش های برنامه ریزی شده"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="Reports/Availability-Report"
          title="گزارش در دسترس بودن"
          hasBullet={true}
        />
            <SidebarMenuItem
          to="Reports/Busiest-Triggers"
          title="100 شلوغ ترین محرک"
          hasBullet={true}
        />
            <SidebarMenuItem
          to="Reports/Audit-log"
          title="گزارش حسابرسی"
          hasBullet={true}
        />
            <SidebarMenuItem
          to="Reports/Action-log"
          title="گزارش اقدام"
          hasBullet={true}
        />
            <SidebarMenuItem
          to="Reports/Notifications"
          title="اعلانات"
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to="/crafted/accounts"
        title="جمع آوری داده ها"
        icon="data"
      >
        <SidebarMenuItem
          to="/Data/Templates-Groups"
          title="گروه های قالب"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/Data/Host-Groups"
          title="گروه های هاست"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/Data/Templates"
          title="قالب ها"
          hasBullet={true}
        />
        <SidebarMenuItem to="/Data/Hosts" title="هاست ها" hasBullet={true} />
        <SidebarMenuItem
          to="/Data/Maintenance"
          title="نگهداری"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/Data/Event-Correlation"
          title="همبستگی رویداد"
          hasBullet={true}
        />
        <SidebarMenuItem to="/Data/Discovery" title="کشف" hasBullet={true} />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to="/error"
        title="اعلاتات"
        fontIcon=""
        icon="notification"
      >
        <SidebarMenuItem to="/error/404" title="اقدامات" hasBullet={true} />
        <SidebarMenuItem
          to="/error/500"
          title="انواع رسانه ها"
          hasBullet={true}
        />
        <SidebarMenuItem to="/error/404" title="اسکریپت ها" hasBullet={true} />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to="/crafted/widgets"
        title="اعضا"
        icon="people"
        fontIcon="bi-layers"
      >
        <SidebarMenuItem
          to="/crafted/widgets/statistics"
          title="گروه های کاربر"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/crafted/widgets/charts"
          title="نقش های کاربر"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/crafted/widgets/mixed"
          title="اعضا"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/crafted/widgets/lists"
          title="توکن API "
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/crafted/widgets/tables"
          title="احراز هویت"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/crafted/widgets/feeds"
          title="Feeds"
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to="/crafted/widgets"
        title="مدیریت"
        icon="medal-star"
        fontIcon="bi-layers"
      ></SidebarMenuItemWithSub>
      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-7">
            دیگر
          </span>
        </div>
      </div>
      <SidebarMenuItemWithSub
        to="/apps/chat"
        title="پشتیبانی"
        fontIcon="bi-chat-left"
        icon="information-3"
      >
        <SidebarMenuItem
          to="/apps/chat/private-chat"
          title="Private Chat"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/apps/chat/group-chat"
          title="Group Chart"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/apps/chat/drawer-chat"
          title="Drawer Chart"
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>
      <SidebarMenuItem
        to="/apps/user-management/users"
        icon="profile-circle"
        title="پروفایل"
        fontIcon="bi-layers"
      />
      <SidebarMenuItem
        to="#"
        icon="exit-right"
        title="خروج از اکانت"
        fontIcon="bi-layers"
      />
      <div className="menu-item">
        <a
          target="_blank"
          className="menu-link"
          href={import.meta.env.VITE_APP_PREVIEW_DOCS_URL + "/changelog"}
        >
          <span className="menu-icon">
            <KTIcon iconName="code" className="fs-2" />
          </span>
          <span className="menu-title">
            Changelog {import.meta.env.VITE_APP_VERSION}
          </span>
        </a>
      </div>
    </>
  );
};

export { SidebarMenuMain };
