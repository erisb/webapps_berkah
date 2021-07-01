import React, {useState, useEffect} from 'react';
import Head from 'next/head';
import Sidebar from '../components/admin/Sidebar_layout_donatur';
import Header from '../components/admin/Header_layout';
import Router from 'next/router';
import cookie from "js-cookie";
import withSizes from 'react-sizes';

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 480,
  isTablet: width >= 480 && width < 1024
})

  function LayoutAdminDonatur  ({children, isMobile, isTablet, username}) {
    // side-overlay-o sidebar overlay status
    const [ sideOverlay, setSetOverlay ] = useState('side-overlay-o');
    // fungsi deteksi layar sidebar-overlay
    function handleSideOverlay() {
      if(isMobile || isTablet){
        setSetOverlay('side-overlay-h');
      }else if (!isMobile || !isTablet){
        setSetOverlay('side-overlay-o');
      }
    }
    // Buat Hooks dan set nilai awal
    const [ sidebar, setSidebar ] = useState('sidebar-o');
    // terima event dari component Header_layout.js
    const handleSidebar = (sidebarVal) => {
        setSidebar(sidebarVal);
    }

    const logout = () => {
      localStorage.clear();
      cookie.remove("cookie_token");
      Router.push('/admin-donatur/login');
    };

    useEffect(() => {
      handleSideOverlay();
    })

    return(
      <React.Fragment>
        <Head>
            <title>#AyoCariBerkah | presented by: Danasyariah.id</title>
            {/* <!-- Fonts and Codebase framework --> */}
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,400i,600,700" />
            <link rel="stylesheet" id="css-main" href="/assetsBE/css/codebase.min.css" />
            {/* <!-- slick --> */}
            <link rel="stylesheet" href="/assetsBE/js/plugins/slick/slick.css" />
            <link rel="stylesheet" href="/assetsBE/js/plugins/slick/slick.css" />
            <link rel="stylesheet" href="/assetsBE/js/plugins/slick/slick-theme.css" />
            {/* <!-- end slick --> */}
            {/* <!-- You can include a specific file from css/themes/ folder to alter the default color theme of the template. eg: --> */}
            <link rel="stylesheet" id="css-theme" href="/assetsBE/css/themes/flat.css"></link>
            <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossOrigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossOrigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossOrigin="anonymous"></script>
            {/* <script src="/assetsBE/js/plugins/bootstrap-wizard/jquery.bootstrap.wizard.js"></script>
            <script src="/assetsBE/js/pages/be_forms_wizard.min.js"></script> */}
        </Head>
      <div id="page-container" className={'side-scroll page-header-modern main-content-boxed' + ' ' + sidebar + ' ' + sideOverlay }>
      {/* <div id="page-container" className="sidebar-o side-overlay-o side-scroll page-header-modern main-content-boxed"> */}
        {/* Sidebar */}
        <Sidebar onClickButton={handleSidebar} sidebarInit={sidebar}/>
        <Header onClickButton={handleSidebar} sidebarInit={sidebar} username={username} onClickLogout={logout}/>
        
          <main id="main-container">
              {/* Page Content */}
              {children}
          </main> 
      {/* </div> */}
      </div>      
    </React.Fragment>
    )
}
export default withSizes(mapSizesToProps)(LayoutAdminDonatur);