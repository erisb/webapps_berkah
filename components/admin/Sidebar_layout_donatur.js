import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
function Sidebar_layout_donatur({onClickButton, sidebarInit}) {
  let router = useRouter();

  const handleMini = () => {
    if( sidebarInit === 'sidebar-o' || sidebarInit === 'sidebar-o sidebar-o-xs'){
      sidebarInit = 'sidebar-h'
    }else{
      sidebarInit = 'sidebar-o sidebar-o-xs'
    }

    onClickButton(sidebarInit);  
  }
  return (
    <nav id="sidebar">
      {/* Sidebar Content */}
      <div className="sidebar-content">
        {/* Side Header */}
        <div className="content-header content-header-fullrow px-15 mt-10 " style={{height: '90px !important'}}>
          {/* Mini Mode */}
          <div className="content-header-section sidebar-mini-visible-b">
            {/* Logo */}
            <span className="content-header-item font-w700 font-size-xl float-left animated fadeIn">
              <span className="text-dual-primary-dark">D</span><span className="text-primary">B</span>
            </span>
            {/* END Logo */}
          </div>
          {/* END Mini Mode */}
          {/* Normal Mode */}
          <div className="content-header-section text-left pl-20 align-parent sidebar-mini-hidden">
            {/* Close Sidebar, Visible only on mobile screens */}
            {/* Layout API, functionality initialized in Codebase() -> uiApiLayout() */}
            <button type="button" onClick={handleMini} className="btn btn-circle btn-dual-secondary d-lg-none align-v-r" data-toggle="layout" data-action="sidebar_close">
              <i className="fa fa-times text-danger" />
            </button>
            {/* END Close Sidebar */}
            {/* Logo */}
            <div className="content-header-item ">
              <span className="link-effect font-w600 " href="true">
                <span className="font-size-h3 text-primary">DSI </span><span className="font-size-h3 text-dual-primary-dark">Sosial App</span>
              </span>
            </div>
            {/* END Logo */}
          </div>
          {/* END Normal Mode */}
        </div>
        {/* END Side Header */}
        {/* Side Navigation */}
        <div className="content-side content-side-full">
          <ul className="nav-main">
            <li>
              <Link  href="/admin-donatur/dashboard">
                <a className={router.pathname === '/admin-donatur/dashboard' ? 'active' : 'asd'}>
                  <i className="si si-bar-chart" />
                  <span className="sidebar-mini-hide">Dashboard</span>
                </a>
              </Link>
            </li>
            <li>
                <Link  href="/admin-donatur/edit_profile">
                    <a className={router.pathname === '/admin-donatur/edit_profile' ? 'active' : 'asd'}>
                        <i className="si si-settings" />
                        <span className="sidebar-mini-hide">Akun</span>
                    </a>
                </Link>
            </li>
          </ul>
        </div>
        {/* END Side Navigation */}
      </div>
      {/* Sidebar Content */}
    </nav>
  );
}

export default Sidebar_layout_donatur;
