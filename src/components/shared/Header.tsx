"use client";
import { useSearch } from '@/context/SearchContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSidebar } from '@/context/SidebarContext';
import Link from 'next/link';
import { gamesData } from '@/data/gamesData';
import { tournamentsData } from '@/data/tournamentsData';
import NotificationArea from './NotificationArea';
import UserAccountPopup from './UserAccountPopup';
export default function Header() {
    const { searchQuery, setSearchQuery } = useSearch();
    const router = useRouter();
    const { isSidebarOpen, toggleSidebar } = useSidebar();
    const [isNotificationOpen, setNotificationOpen] = useState(false);
    const [isProfileOpen, setProfileOpen] = useState(false);
    const [isSearchOpen, setSearchOpen] = useState(false);

    // Custom event for sidebar toggle
    const handleSidebarToggle = () => {
        toggleSidebar();
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        const allData = [...gamesData, ...tournamentsData];
        const firstMatch = allData.find(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.type.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (firstMatch) {
            router.push(firstMatch.href);
        }
    };

    return (
        <header className="header-section bgn-4 w-100" style={{ zIndex: 1100, position: 'fixed', top: 0, left: 0, right: 0 }}>
            <div className="py-sm-6 py-3 px-lg-15 px-md-10 px-6">
                <div className="d-between gap-lg-4 gap-2">
                    <div className="top-bar alt d-flex align-items-center gap-4">
                        <button 
                            className={`sidebar-toggle-btn d-lg-none d-block ${isSidebarOpen ? 'active' : ''}`} 
                            type="button" 
                            aria-label="Toggle sidebar" 
                            onClick={handleSidebarToggle}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                        <Link className="navbar-brand d-flex align-items-center gap-4" href="/home" style={{ maxWidth: '260px', width: '100%' }}>
                            <img className="w-100 d-block" src="/images/gameforsmartlogo.webp" alt="GameForSmart Logo" />
                        </Link>
                    </div>
                    <div className="header-btn-area d-flex align-items-center justify-content-between gap-xl-6 gap-3 w-100 position-relative">
                        <div className={`search-bar ${isSearchOpen ? 'open' : ''}`} style={{ maxWidth: '400px', width: '100%' }}>
                            <form action="#" onSubmit={handleSearchSubmit}>
                                <div className="input-area d-flex align-items-center gap-2">
                                    <i className="ti ti-search"></i>
                                    <input
                                        type="text"
                                        placeholder="Search Competition, Games..."
                                        style={{ padding: '0 4px' }}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </form>
                        </div>

                        <div className="header-btns d-flex align-items-center justify-content-end gap-lg-6 gap-sm-4 gap-2 w-100">
                            <button 
                                className="search-toggle-btn toggle-btn box-style fs-2xl d-block d-lg-none"
                                onClick={() => setSearchOpen(!isSearchOpen)}
                            >
                                <i className="ti ti-search"></i>
                            </button>

                            <div className="position-relative">
                                <button 
                                    className={`ntf-btn box-style fs-2xl ${isNotificationOpen ? 'active' : ''}`}
                                    onClick={() => {
                                        setNotificationOpen(!isNotificationOpen);
                                        setProfileOpen(false);
                                    }}
                                >
                                    <i className="ti ti-bell-filled"></i>
                                </button>
                                <NotificationArea isOpen={isNotificationOpen} />
                            </div>

                            <div className="position-relative">
                                <div className={`header-profile pointer ${isProfileOpen ? 'open' : ''}`} 
                                    onClick={() => {
                                        setProfileOpen(!isProfileOpen);
                                        setNotificationOpen(false);
                                    }}
                                >
                                    <div className="profile-wrapper d-flex align-items-center gap-3">
                                        <div className="img-area overflow-hidden">
                                            <img className="w-100" src="/assets/img/profile.png" alt="profile" />
                                        </div>
                                        <span className="user-name d-none d-xxl-block text-nowrap">David Malan</span>
                                        <i className="ti ti-chevron-down d-none d-xxl-block"></i>
                                    </div>
                                </div>
                                <UserAccountPopup isOpen={isProfileOpen} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .sidebar-toggle-btn {
                    width: 30px;
                    height: 24px;
                    position: relative;
                    cursor: pointer;
                    background: transparent;
                    border: none;
                    padding: 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .sidebar-toggle-btn span {
                    display: block;
                    position: absolute;
                    height: 3px;
                    width: 100%;
                    background: #fff;
                    border-radius: 9px;
                    opacity: 1;
                    left: 0;
                    transform: rotate(0deg);
                    transition: .25s ease-in-out;
                }

                .sidebar-toggle-btn span:nth-child(1) { top: 0px; }
                .sidebar-toggle-btn span:nth-child(2),
                .sidebar-toggle-btn span:nth-child(3) { top: 10px; }
                .sidebar-toggle-btn span:nth-child(4) { top: 20px; }

                .sidebar-toggle-btn.active span:nth-child(1) {
                    top: 10px;
                    width: 0%;
                    left: 50%;
                    opacity: 0;
                }

                .sidebar-toggle-btn.active span:nth-child(2) {
                    transform: rotate(45deg);
                }

                .sidebar-toggle-btn.active span:nth-child(3) {
                    transform: rotate(-45deg);
                }

                .sidebar-toggle-btn.active span:nth-child(4) {
                    top: 10px;
                    width: 0%;
                    left: 50%;
                    opacity: 0;
                }
            `}</style>
        </header>
    );
}
