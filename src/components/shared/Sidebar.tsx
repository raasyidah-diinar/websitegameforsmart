"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { isSidebarOpen, setSidebarOpen } = useSidebar();

  const isActive = (path: string) => {
    if (path === "/home" && pathname === "/") return true;
    return pathname === path || pathname.startsWith(path + "/");
  };

  const menuItems = [
    { href: "/home", icon: "ti-home", label: "Beranda" },
    { href: "/competitions", icon: "ti-trophy", label: "Kompetisi" },
    { href: "/games", icon: "ti-device-gamepad-2", label: "Permainan" },
    { href: "/community", icon: "ti-users", label: "Komunitas" },
    { href: "/about", icon: "ti-info-circle", label: "Tentang" },
    { href: "/contact", icon: "ti-mail", label: "Kontak" },
  ];

  return (
    <aside className="sidebar">
      {/* SIDEBAR CONTENT */}

      {/* SIDEBAR CONTENT */}
      <div className={`sidebar-wrapper ${isSidebarOpen ? "show-menu" : ""}`}>
        <div className="sidebar-menu-capsule py-xxl-20 py-sm-15 py-10 px-6">
          <div className="d-grid gap-sm-10 gap-6 sidebar-menu-items text-center">
            {menuItems.map((item) => (
              <div key={item.href} className="p-1">
                <Link
                  href={item.href}
                  className={`menu-link relative transition-all ${isActive(item.href) ? "active-menu" : ""
                    }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  {isActive(item.href) && <div className="active-circle"></div>}
                  <i
                    className={`ti ${item.icon} menu-icon`}
                    style={{
                      position: "relative",
                      zIndex: 2,
                      color: isActive(item.href)
                        ? "#ffffff"
                        : "rgba(255,255,255,0.4)",
                      textShadow: isActive(item.href)
                        ? "0 0 15px rgba(255, 255, 255, 0.5)"
                        : undefined,
                      transition: "all 0.3s ease",
                    }}
                  ></i>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        /* ============================= */
        /* STICKY DESKTOP VERSION */
        /* ============================= */

        .sidebar {
          position: sticky !important;
          top: 90px !important;
          align-self: flex-start !important;
          height: fit-content !important;
          z-index: 1000 !important;
          width: 110px !important;
          min-width: 110px !important;
          flex-shrink: 0 !important;
          display: block !important;
          background: transparent !important;
          margin-bottom: 0 !important;
        }

        .sidebar-menu-capsule {
          background: #1a1a1a;
          border-radius: 100px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          display: inline-block;
          margin-left: 15px;
          margin-top: 10px;
          margin-bottom: 10px;
          max-height: calc(100vh - 115px); /* 90px top + 10px margin-top + 15px bottom = 115px */
          overflow-y: auto;
          scrollbar-width: none; /* Firefox */
        }

        .sidebar-menu-capsule::-webkit-scrollbar {
          display: none; /* Safari and Chrome */
        }

        .sidebar-wrapper {
          transition: all 0.3s ease;
          position: relative !important;
          display: flex !important;
          z-index: 1001;
          height: 100%;
        }

        .menu-icon {
          font-size: 36px;
        }

        .menu-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: transparent;
          position: relative;
        }

        .active-circle {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 60px;
          height: 60px;
          background: #ff8c00;
          border-radius: 50%;
          z-index: 1;
          box-shadow: 0 0 20px rgba(255, 140, 0, 0.6), 0 0 30px rgba(255, 140, 0, 0.3);
          transform: translate(-50%, -50%);
          animation: circlePop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes circlePop {
          from { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
          to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }

        .active-menu {
          transform: scale(1.05);
        }

        .transition-all {
          transition: all 0.3s ease;
        }

        /* ============================= */
        /* MOBILE OVERLAY */
        /* ============================= */

        @media (max-width: 1280px) {
          .sidebar {
            position: fixed !important;
            top: 70px !important; /* Start below header */
            left: 0 !important;
            width: 0 !important;
            min-width: 0 !important;
            flex-basis: 0 !important;
            margin: 0 !important;
            height: 0 !important;
            z-index: 1000 !important; /* Keep below header's 1100 */
            overflow: visible !important;
          }

          .sidebar-wrapper {
            position: fixed !important;
            top: 70px !important; /* Start below header */
            left: -100vw !important; 
            height: calc(100vh - 70px) !important;
            min-height: calc(100vh - 70px) !important;
            background: rgba(0, 0, 0, 0.6) !important; 
            width: 100vw !important;
            display: flex !important;
            justify-content: flex-start !important;
            align-items: center !important;
            backdrop-filter: blur(4px) !important;
            z-index: 10000 !important;
            transition: left 0.3s ease-in-out !important;
            visibility: hidden !important;
          }

          .sidebar-wrapper.show-menu {
            left: 0 !important;
            visibility: visible !important;
          }

          .sidebar-menu-capsule {
            margin-left: 20px !important;
            margin-top: 0px !important;
            border-radius: 40px !important;
            padding-top: 24px !important;
            padding-bottom: 24px !important;
          }

          .menu-link {
            width: 50px;
            height: 50px;
          }

          .active-circle {
            width: 44px;
            height: 44px;
          }

          .menu-icon {
            font-size: 24px;
          }
        }

        /* ============================= */
        /* DESKTOP */
        /* ============================= */

        @media (min-width: 1281px) {
          .sidebar-wrapper {
            display: flex !important;
            position: static !important;
            transform: none !important;
            opacity: 1 !important;
          }

          .sidebar {
            display: block !important;
            transform: none !important;
            position: sticky !important;
            top: 90px !important;
            height: fit-content !important;
            align-self: flex-start !important;
            width: 110px !important;
            min-width: 110px !important;
            flex-shrink: 0 !important;
            z-index: 1000;
          }
        }
      `}</style>
    </aside>
  );
}