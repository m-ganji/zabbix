import { FC } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { checkIsActive, KTIcon, WithChildren } from "../../../../helpers";
import { useLayout } from "../../../core";

type Props = {
  to?: string;
  title: string;
  icon?: string;
  hasBullet?: boolean;
  onClick?:CallableFunction
};

const SidebarMenuItem: FC<Props & WithChildren> = ({
  children,
  to,
  title,
  icon,
  hasBullet = false,
  onClick
}) => {
  const { pathname } = useLocation();
  const isActive = checkIsActive(pathname, to);
  const { config } = useLayout();
  const { app } = config;

  return to ? (
    <div className="menu-item">
      <Link
        className={clsx("menu-link without-sub", { active: isActive })}
        to={to}
      >
        {hasBullet && (
          <span className="menu-bullet">
            <span className="bullet bullet-dot"></span>
          </span>
        )}
        {icon && app?.sidebar?.default?.menu?.iconType === "svg" && (
          <span className="menu-icon">
            <KTIcon iconName={icon} className="fs-2" />
          </span>
        )}
        <span className="menu-title">{title}</span>
      </Link>
      {children}
    </div>
  ) : (
    <div className="menu-item" onClick={onClick}>
      <div className={clsx("menu-link without-sub", { active: isActive })}>
        {hasBullet && (
          <span className="menu-bullet">
            <span className="bullet bullet-dot"></span>
          </span>
        )}
        {icon && app?.sidebar?.default?.menu?.iconType === "svg" && (
          <span className="menu-icon">
            <KTIcon iconName={icon} className="fs-2" />
          </span>
        )}
        <span className="menu-title">{title}</span>
      </div>
      {children}
    </div>
  );
};

export { SidebarMenuItem };
