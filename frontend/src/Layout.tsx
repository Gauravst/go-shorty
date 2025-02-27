import Footer from "./components/Footer";
import Header from "./components/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen grid-pattern">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
