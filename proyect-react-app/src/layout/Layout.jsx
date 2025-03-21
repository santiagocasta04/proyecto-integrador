import "./Layout.css";
import Footer from "./footer/Footer";
import Header from "./header/Header";

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      {/* Header */}
      <Header/>
           
      {/* Main Content */}
      <main className="main-content">{children}</main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
