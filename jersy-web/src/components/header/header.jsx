import {
  Search,
  User,
  Heart,
  ShoppingBag,
  ChevronDown
} from "lucide-react";

import "./Header.css";

export default function Header() {
  return (
    <>
      {/* Announcement */}

      <div className="announcement-bar">
        <span>FREE STANDARD SHIPPING WITH ADICLUB</span>

        <ChevronDown size={18} />
      </div>

      {/* Utility */}

      <div className="utility-bar">

        <div className="utility-links">

          <a href="/">Store Finder</a>

          <a href="/">Help</a>

          <a href="/">Orders & Returns</a>

          <a href="/">Gift Cards</a>

          <a href="/">Join adiClub</a>

        </div>

      </div>

      {/* Main Navbar */}

      <header className="main-header">

        <div className="logo">

          <img
            src="/logo.svg"
            alt="Logo"
          />

        </div>

        <nav>

          <a href="/">MEN</a>

          <a href="/">WOMEN</a>

          <a href="/">KIDS</a>

          <a href="/">NEW</a>

          <a href="/">SALE</a>

        </nav>

        <div className="header-right">

          <div className="search-box">

            <input
              type="text"
              placeholder="Search"
            />

            <Search size={22} />

          </div>

          <User size={24} className="icon" />

          <Heart size={24} className="icon" />

          <ShoppingBag size={24} className="icon" />

        </div>

      </header>
    </>
  );
}