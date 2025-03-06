import "./Layout.css";
import Footer from "./footer/footer";
import Header from "./header/header";

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