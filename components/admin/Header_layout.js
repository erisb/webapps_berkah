import React, {useState, useEffect} from 'react';
import withSizes from 'react-sizes'
import {loadState} from "../../constant/localStorage";

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 480,
  isTablet: width >= 480 && width < 1024
});


function Header_layout({onClickButton, sidebarInit, isMobile, isTablet, onClickLogout, username}) {
  
  // componentDidMount atau DidUpdate di react Hooks
  useEffect(() => {

  })
  // terima data dan kirim data dari ke onCLickButton dari halaman LayoutAdmin.js
  const handleSidebarChange = () => {
      if( sidebarInit === 'sidebar-o' || sidebarInit === 'sidebar-o sidebar-o-xs'){
        // jika di < 480
        if(isMobile || isTablet ){ 
          sidebarInit = 'sidebar-o sidebar-o-xs';
        }else if (!isMobile || !isTablet){
          sidebarInit = 'sidebar-h';
        }
      }else if (sidebarInit === 'sidebar-h'){
        // jika di < 480
        if(isMobile || isTablet){
          sidebarInit = 'sidebar-o sidebar-o-xs';
        }else if (!isMobile || !isTablet ){
          sidebarInit = 'sidebar-o';
        }
      }else{
        return(sidebarInit)
      }
      
      onClickButton(sidebarInit);            
  }

 
 
  // handle tombol close menu di mobile
  // const handleMini = () => {
  //   if( sidebarInit === 'sidebar-o' || sidebarInit === 'sidebar-o sidebar-o-xs'){
  //     sidebarInit = 'sidebar-h'
  //   }else{
  //     sidebarInit = 'sidebar-o'
  //   }

  //   onClickButton(sidebarInit);  
  // };
  const logout = () => {
    onClickLogout();
  }
 
  return (
    <header id="page-header">
      {/* Header Content */}
      <div className="content-header">
        {/* Left Section */}
        <div className="content-header-section">
          {/* Toggle Sidebar */}
          {/* Layout API, functionality initialized in Codebase() -> uiApiLayout() */}
          <button type="button" onClick={handleSidebarChange} className="btn btn-circle btn-dual-secondary" data-toggle="layout" data-action="sidebar_toggle">
            <i className="fa fa-navicon" />
          </button>
          <span className="btn btn-circle btn-dual-secondary">
            <span className="font-w400 ml-2 text-dark" style={{fontSize: '1.271429rem'}}>Hi, <span className="text-black">{username}</span></span>
          </span>
          {/* END Toggle Sidebar */}
        </div>
        {/* END Left Section */}
        {/* Right Section */}
        <div className="content-header-section">   
          {/* Toggle Side Overlay */}
          {/* Layout API, functionality initialized in Codebase() -> uiApiLayout() */}
          <button onClick={logout} className="btn btn-circle btn-dual-secondary text-danger">
            <i className="si si-power" /> LOGOUT
          </button>
          {/* END Toggle Side Overlay */}
        </div>
        {/* END Right Section */}
      </div>
      {/* END Header Content */}
      {/* Header Search */}
      <div id="page-header-search" className="overlay-header">
        <div className="content-header content-header-fullrow">
          <form>
            <div className="input-group">
              <div className="input-group-prepend">
                {/* Close Search Section */}
                {/* Layout API, functionality initialized in Codebase() -> uiApiLayout() */}
                <button type="button"className="btn btn-secondary px-15" data-toggle="layout" data-action="header_search_off">
                  <i className="fa fa-times" />
                </button>
                {/* END Close Search Section */}
              </div>
              <input type="text" className="form-control" placeholder="Search or hit ESC.." id="page-header-search-input" name="page-header-search-input" />
              <div className="input-group-append">
                <button type="submit" className="btn btn-secondary px-15">
                  <i className="fa fa-search" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* END Header Search */}
      {/* Header Loader */}
      <div id="page-header-loader" className="overlay-header bg-primary">
        <div className="content-header content-header-fullrow text-center">
          <div className="content-header-item">
            <i className="fa fa-sun-o fa-spin text-white" />
          </div>
        </div>
      </div>
      {/* END Header Loader */}
    </header>
  );
}

export default withSizes(mapSizesToProps)(Header_layout);
