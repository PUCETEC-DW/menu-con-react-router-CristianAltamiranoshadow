import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FcHome,
  FcAbout,
  FcTemplate,
  FcSynchronize,
  FcSms,
  FcOpenedFolder,
  FcSettings,
  FcViewDetails,
  FcWorkflow,
  FcManager
} from "react-icons/fc";

// Configuración centralizada
const MENU = [
  {
    section: "General",
    items: [
      { to: "/", label: "Home", icon: FcHome, end: true },
      { to: "/about", label: "Acerca de", icon: FcAbout },
      { to: "/dashboard", label: "Dashboard", icon: FcTemplate },
      { to: "/updates", label: "Updates", icon: FcSynchronize, badge: 1 },
      { to: "/messages", label: "Messages", icon: FcSms },
      { to: "/mail", label: "Mail", icon: FcOpenedFolder }
    ]
  },
  {
    section: "Workspace",
    collapsible: true,
    items: [
      { to: "/overview", label: "Overview", icon: FcViewDetails },
      { to: "/settings", label: "Settings", icon: FcSettings },
      { to: "/members", label: "Members", icon: FcManager },
      { to: "/integrations", label: "Integrations", icon: FcWorkflow }
    ]
  }
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = React.useState(false);
  const [openSection, setOpenSection] = React.useState("Workspace");
  const location = useLocation();

  React.useEffect(() => {
    const belongsToSection = MENU.find(s =>
      s.items.some(i => i.to === location.pathname)
    );
    if (belongsToSection?.section) setOpenSection(belongsToSection.section);
  }, [location.pathname]);

  return (
    <aside className={"sidebar " + (collapsed ? "collapsed" : "")}>
      <div className="sidebar-top">
        <div className="brand">
          <span className="brand-logo">▴▴</span>
          {!collapsed && <span className="brand-name">Mi menú XD</span>}
        </div>
        <button className="collapse-btn" onClick={() => setCollapsed(c => !c)}>
          {collapsed ? "›" : "‹"}
        </button>
      </div>

      <div className="search-wrap">
        {!collapsed && (
          <label className="search">
            <span className="search-icon">⌕</span>
            <input placeholder="Search" />
            <kbd className="kbd">⌘K</kbd>
          </label>
        )}
      </div>

      {MENU.map(({ section, items, collapsible }) => (
        <div key={section} className="menu-section">
          {!collapsed && <p className="section-title">{section}</p>}
          {collapsible ? (
            <Collapsible
              title={section}
              open={openSection === section}
              onToggle={() =>
                setOpenSection(s => (s === section ? "" : section))
              }
              collapsed={collapsed}
              items={items}
            />
          ) : (
            <nav className="menu">
              {items.map(item => (
                <MenuItem key={item.to} {...item} collapsed={collapsed} />
              ))}
            </nav>
          )}
        </div>
      ))}

      <div className="sidebar-footer">
        {collapsed ? (
          <span className="user-avatar" title="Tu cuenta">CA</span>
        ) : (
          <div className="user">
            <span className="user-avatar">CA</span>
            <div className="user-meta">
              <strong>Cristian</strong>
              <small>Admin</small>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

function MenuItem({ to, label, icon: Icon, end, collapsed, badge }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => "menu-item" + (isActive ? " active" : "")}
    >
      <span className="icon-wrap">{Icon ? <Icon /> : null}</span>
      {!collapsed && <span className="label">{label}</span>}
      {badge && !collapsed && <span className="badge">{badge}</span>}
    </NavLink>
  );
}

function Collapsible({ title, open, onToggle, items, collapsed }) {
  if (collapsed) {
    return (
      <div className="flyout-group">
        <button className="menu-item flyout-trigger">
          <span className="icon-wrap"><FcTemplate /></span>
        </button>
        <div className="flyout">
          {items.map(i => (
            <NavLink key={i.to} to={i.to} className="flyout-item">
              <span className="icon-wrap">{i.icon ? <i.icon /> : null}</span>
              <span className="label">{i.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="collapsible">
      <button className="menu-item heading" onClick={onToggle}>
        <span className="icon-wrap"><FcTemplate /></span>
        <span className="label">{title}</span>
        <span className="chev">{open ? "▾" : "▸"}</span>
      </button>
      {open && (
        <nav className="submenu">
          {items.map(i => (
            <MenuItem key={i.to} {...i} />
          ))}
        </nav>
      )}
    </div>
  );
}
