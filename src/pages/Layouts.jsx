import React from "react";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  // Define styles as JavaScript objects
  const styles = {
    container: {
      display: "flex",
      height: "100vh",
      fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
    },
    sidebar: {
      width: "250px",
      backgroundColor: "#2D3748",
      color: "white",
      display: "flex",
      flexDirection: "column",
      boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)"
    },
    sidebarLogo: {
      padding: "20px 24px",
      borderBottom: "1px solid #4A5568",
      display: "flex",
      flexDirection: "column"
    },
    logoText: {
      fontSize: "22px",
      fontWeight: "700",
      color: "#A855F7",
      margin: 0
    },
    logoSubtext: {
      fontSize: "14px",
      color: "#CBD5E0",
      marginTop: "4px"
    },
    nav: {
      padding: "16px 0"
    },
    navList: {
      listStyle: "none",
      padding: 0,
      margin: 0
    },
    navItem: {
      margin: "2px 0"
    },
    navLink: {
      display: "flex",
      alignItems: "center",
      padding: "12px 24px",
      color: "#E2E8F0",
      textDecoration: "none",
      transition: "background-color 0.2s ease",
      borderLeft: "4px solid transparent"
    },
    activeNavLink: {
      backgroundColor: "#3A4A5C",
      borderLeft: "4px solid #A855F7"
    },
    navIcon: {
      marginRight: "12px",
      fontSize: "18px"
    },
    main: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      backgroundColor: "#F7FAFC"
    },
    header: {
      backgroundColor: "#FFFFFF",
      borderBottom: "1px solid #E2E8F0",
      padding: "0 24px",
      height: "64px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
    },
    headerTitle: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#1A202C"
    },
    buttonsContainer: {
      display: "flex",
      gap: "12px"
    },
    loginButton: {
      padding: "8px 16px",
      backgroundColor: "transparent",
      color: "#A855F7",
      border: "1px solid #A855F7",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      transition: "background-color 0.2s ease"
    },
    signupButton: {
      padding: "8px 16px",
      backgroundColor: "#A855F7",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      transition: "background-color 0.2s ease"
    },
    content: {
      flex: 1,
      padding: "24px",
      overflowY: "auto"
    }
  };

  // Hover effect handlers
  const handleNavLinkHover = (e, enter) => {
    if (enter) {
      e.target.style.backgroundColor = "#3A4A5C";
    } else {
      e.target.style.backgroundColor = "transparent";
    }
  };

  const handleLoginButtonHover = (e, enter) => {
    if (enter) {
      e.target.style.backgroundColor = "#F3E8FF";
    } else {
      e.target.style.backgroundColor = "transparent";
    }
  };

  const handleSignupButtonHover = (e, enter) => {
    if (enter) {
      e.target.style.backgroundColor = "#9333EA";
    } else {
      e.target.style.backgroundColor = "#A855F7";
    }
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        {/* Logo in sidebar */}
        <div style={styles.sidebarLogo}>
          <h1 style={styles.logoText}>Udemy</h1>
          <p style={styles.logoSubtext}>Learn Online</p>
        </div>
        
        {/* Navigation */}
        <nav style={styles.nav}>
          <ul style={styles.navList}>
            <li style={styles.navItem}>
              <Link 
                to="/" 
                style={styles.navLink}
                onMouseEnter={(e) => handleNavLinkHover(e, true)}
                onMouseLeave={(e) => handleNavLinkHover(e, false)}
              >
                <span style={styles.navIcon}>🏠</span>
                <span>Home</span>
              </Link>
            </li>
            <li style={styles.navItem}>
              <Link 
                to="/categories" 
                style={styles.navLink}
                onMouseEnter={(e) => handleNavLinkHover(e, true)}
                onMouseLeave={(e) => handleNavLinkHover(e, false)}
              >
                <span style={styles.navIcon}>📋</span>
                <span>Categories</span>
              </Link>
            </li>
            <li style={styles.navItem}>
              <Link 
                to="/courses" 
                style={styles.navLink}
                onMouseEnter={(e) => handleNavLinkHover(e, true)}
                onMouseLeave={(e) => handleNavLinkHover(e, false)}
              >
                <span style={styles.navIcon}>📚</span>
                <span>Courses</span>
              </Link>
            </li>
            <li style={styles.navItem}>
              <Link 
                to="/statistics" 
                style={styles.navLink}
                onMouseEnter={(e) => handleNavLinkHover(e, true)}
                onMouseLeave={(e) => handleNavLinkHover(e, false)}
              >
                <span style={styles.navIcon}>📊</span>
                <span>Statistics</span>
              </Link>
            </li>
            <li style={styles.navItem}>
              <Link 
                to="/tags" 
                style={styles.navLink}
                onMouseEnter={(e) => handleNavLinkHover(e, true)}
                onMouseLeave={(e) => handleNavLinkHover(e, false)}
              >
                <span style={styles.navIcon}>🏷️</span>
                <span>Tags</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div style={styles.main}>
        {/* Header */}
        <header style={styles.header}>
          <h1 style={styles.headerTitle}>Udemy Learn Online</h1>
          <div style={styles.buttonsContainer}>
            <button 
              style={styles.loginButton}
              onMouseEnter={(e) => handleLoginButtonHover(e, true)}
              onMouseLeave={(e) => handleLoginButtonHover(e, false)}
            >
              Log in
            </button>
            <button 
              style={styles.signupButton}
              onMouseEnter={(e) => handleSignupButtonHover(e, true)}
              onMouseLeave={(e) => handleSignupButtonHover(e, false)}
            >
              Sign up
            </button>
          </div>
        </header>
        
        {/* Page content */}
        <main style={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;