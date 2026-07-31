import React from "react";
import { Link, useLocation } from "react-router-dom";
import { i18n } from "../../i18n";

function TabBottomNavigator() {
  const location = useLocation();

  const isActive = (pathname: string) => location.pathname === pathname;

  const tabs = [
    {
      icon: "fas fa-car-side", // Changed from home to car
      path: "/",
      name: i18n('pages.tabBottomNavigator.home'),
    },
    {
      icon: "fas fa-tachometer-alt", // Changed from star to speedometer (racing theme)
      path: "/grap",
      name: i18n('pages.tabBottomNavigator.starting'),
    },
    {
      icon: "fas fa-user-astronaut", // Changed from user to driver/astronaut theme
      path: "/profile",
      name: i18n('pages.tabBottomNavigator.profile'),
    },
  ];

  return (
    <>
      <style>{`
        .tabbottomNavigator {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-around;
          align-items: center;
          background: rgba(10, 10, 10, 0.9);
          backdrop-filter: blur(16px);
          border-top: 1px solid rgba(136, 189, 31, 0.3);
          padding: 10px 0 16px 0;
          z-index: 1000;
          box-shadow: 0 -8px 25px rgba(0, 0, 0, 0.5);
        }

        .singleTab {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 6px 16px;
          border-radius: 40px;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .singleTab::before {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #97cc2a, #6a9c1c);
          transition: width 0.2s ease;
        }

        .tabbottomNavigator a:hover .singleTab::before {
          width: 30px;
        }

        .singleTab i {
          font-size: 24px;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .singleTab span {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.5px;
          transition: all 0.2s;
          text-transform: uppercase;
        }

        .tabbottomNavigator a:hover .singleTab i {
          transform: translateY(-3px) scale(1.1);
        }

        .tabbottomNavigator a:hover .singleTab span {
          transform: translateY(-1px);
        }

        /* Active tab indicator animation */
        .tabbottomNavigator a.active-tab .singleTab i {
          animation: pulse 0.3s ease;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }

        /* tabbottomNavigator a styles */
        .tabbottomNavigator a {
          text-decoration: none;
          color: inherit;
          transition: all 0.2s;
          flex: 1;
          display: flex;
          justify-content: center;
        }

        /* Responsive adjustments */
        @media (max-width: 480px) {
          .tabbottomNavigator {
            padding: 8px 0 14px 0;
          }
          
          .singleTab {
            padding: 4px 12px;
            gap: 4px;
          }
          
          .singleTab i {
            font-size: 20px;
          }
          
          .singleTab span {
            font-size: 10px;
            letter-spacing: 0.3px;
          }
        }

        /* For tablets */
        @media (min-width: 481px) and (max-width: 768px) {
          .singleTab i {
            font-size: 22px;
          }
          
          .singleTab span {
            font-size: 11px;
          }
        }

        /* Safe area for notched devices */
        @supports (padding-bottom: env(safe-area-inset-bottom)) {
          .tabbottomNavigator {
            padding-bottom: calc(12px + env(safe-area-inset-bottom));
          }
        }
      `}</style>

      <div className="tabbottomNavigator">
        {tabs.map((item, index) => {
          const active = isActive(item.path);
          return (
            <Link
              key={index}
              to={item.path}
              className={active ? "active-tab" : ""}
              style={{
                color: active ? "#9ed13a" : "rgba(255,255,255,0.6)",
              }}
            >
              <div className="singleTab">
                <i className={item.icon} />
                <span>{item.name}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default TabBottomNavigator;