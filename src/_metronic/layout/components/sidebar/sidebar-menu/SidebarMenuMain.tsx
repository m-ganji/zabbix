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
        icon="element-plus"
      >
        <SidebarMenuItem
          to="/Hosts"
          title="هاست"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/Problems"
          title="مشکلات"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/crafted/pages/profile/campaigns"
          title="آخرین مشکلات"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/crafted/pages/profile/documents"
          title="نقشه ها"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/crafted/pages/profile/connections"
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
        to="/crafted/accounts"
        title="دیتا"
        icon="profile-circle"
        fontIcon="bi-person"
      >
        <SidebarMenuItem
          to="/crafted/account/overview"
          title="گروه های قالب"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/crafted/account/settings"
          title="گروه های هاست"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/crafted/account/settings"
          title="قالب ها"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/crafted/account/settings"
          title="نگهداری"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/crafted/account/settings"
          title="همبستگی رویداد"
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to="/error"
        title="اعلاتات"
        fontIcon="bi-sticky"
        icon="cross-circle"
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
        icon="element-7"
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
        icon="message-text-2"
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
        icon="abstract-28"
        title="پروفایل"
        fontIcon="bi-layers"
      />
      <SidebarMenuItem
        to="#"
        icon="abstract-28"
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
