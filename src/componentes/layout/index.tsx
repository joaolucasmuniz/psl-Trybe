import { Outlet } from 'react-router-dom';
import Header from '../header';

function Layout() {
  return (
    <>
      <Header />
      <section>
        <Outlet />
      </section>
    </>
  );
}

export default Layout;
