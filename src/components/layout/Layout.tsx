import Footer from './footer/Footer';
import Header from './header/Header';

interface ILayoutProps {
  children: JSX.Element | JSX.Element[];
}

export default function Layout({ children }: ILayoutProps) {
  return (
    <>
      <Header />
      <main className="p-2">{children}</main>
      <Footer />
    </>
  );
}
