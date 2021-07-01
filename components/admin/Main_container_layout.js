import SidebarOverlay from './Side_overlay_layout';
function Main_container_layout() {
  return (
    <main id="main-container">
       <SidebarOverlay />
        {/* Page Content */}
        <div id="detect-screen" className="content-full-right">
          <div className="container">
            <div className="row">
              <div id="col" className="col-12 col-md-9 mt-30">
                <span className="mb-10 pb-10 ">
                  <h1 className="no-paddingTop font-w400" style={{float: 'left', marginBlockEnd: '0em', color: '#31394D'}}>Status Pendanaan</h1>
                  <span id="btn-ajukan-pendanaan" className="pull-right">
                    <a href="true" className="btn btn-rounded btn-big btn-noborder btn-success min-width-150 "><span className="p-5">Ajukan Pendanaan Baru</span></a>
                  </span>
                </span>
              </div>
            </div>
            <div className="row mt-5 pt-5">
              <div id="col2" className="col-md-9 mt-5 pt-5">
                <div className="row">
                  <div className="col-6 col-md-3">
                    <a className="block " href="true" id="change_layout_8" data-toggle="layout" data-action="side_overlay_toggle">
                      <div className="block dsiBgGreen">
                        <div className="block-content text-white pt-30">
                          <i className="si si-briefcase" />
                          <h1 className="text-white font-bold-x3  font-w700">56</h1>
                          <p>Total<br />Keseluruhan</p>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="block">
                      <div className="block-content">
                        <br />
                        <h1 className="font-bold-x3 text-primary pt-30 font-w700">21</h1>
                        <p className="text-dark">Berjalan</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="block">
                      <div className="block-content">
                        <br />
                        <h1 className="font-bold-x3 text-pengajuan pt-30 font-w700">03</h1>
                        <p className="text-dark font-w500">Pengajuan</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="block">
                      <div className="block-content">
                        <br />
                        <h1 className="font-bold-x3 text-selesai pt-30 font-w700">32</h1>
                        <p className="text-dark">Selesai</p>
                      </div>
                    </div>
                  </div>
                  
                  
                  <div className="col-12 col-md-12">
                    {/* timeline */}
                    <div className="block">
                      <div className="block-header block-header-default">
                        <h3 className="block-title">Aktifitas Terbaru</h3>
                        <div className="block-options">
                          <button type="button" className="btn-block-option" data-toggle="block-option" data-action="fullscreen_toggle"><i className="si si-size-fullscreen" /></button>
                          <button type="button" className="btn-block-option" data-toggle="block-option" data-action="state_toggle" data-action-mode="demo">
                            <i className="si si-refresh" />
                          </button>
                          <button type="button" className="btn-block-option" data-toggle="block-option" data-action="content_toggle"><i className="si si-arrow-up" /></button>
                        </div>
                      </div>
                      <div className="block-content">
                        <ul className="list list-activity">
                          <li>
                            <div className="block pull-r-l">
                              <div className="block shadow-flat">  
                                <div className="block-content block-content-full d-flex align-items-center justify-content-start" style={{padding: '5px 5px'}}>
                                  <div className="p-5 pr-30">
                                    <div className="avatar-circle">
                                      <span className="initials">PD</span>
                                    </div>
                                  </div>
                                  <div className="ml-2 text-left">   
                                    <div className="font-w600">Pendanaan Baru Diajukan</div>
                                    <div>
                                      <a href="true">Pendanaan Pembuatan Admin Template</a>
                                    </div>
                                    <div className="font-size-xs text-muted">5 min ago</div>
                                  </div>                                                                  
                                </div>
                              </div>
                            </div> 
                          </li>
                          <li>
                            <div className="block pull-r-l">
                              <div className="block shadow-flat">  
                                <div className="block-content block-content-full d-flex align-items-center justify-content-start" style={{padding: '5px 5px'}}>
                                  <div className="p-5 pr-30">
                                    <div className="avatar-circle">
                                      <span className="initials">PV</span>
                                    </div>
                                  </div>
                                  <div className="ml-2 text-left">   
                                    <div className="font-w600">Pendanaan Baru Terverifikasi</div>
                                    <div>
                                      <a href="true">Pendanaan Pembuatan Admin Template</a>
                                    </div>
                                    <div className="font-size-xs text-muted">25 min ago</div>
                                  </div>                                                                  
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>                           
            </div>
          </div>
        </div>
        {/* END Page Content */}
        
      </main>
      

  );
}

export default Main_container_layout;
