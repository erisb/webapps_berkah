import React, { Component } from 'react';

class Sidebar_overlay_layout extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
    <aside id="side-overlay">
        {/* Side Header */}
        <div className="content-header content-header-fullrow">
          <div className="content-header-section align-parent">
            {/* Close Side Overlay */}
            {/* Layout API, functionality initialized in Codebase() -> uiApiLayout() */}
            <button id="change_layout_12" type="button" className="btn btn-circle btn-dual-secondary align-v-r" data-toggle="layout" data-action="side_overlay_close">
              <i className="fa fa-times text-muted " />
            </button>
            {/* END Close Side Overlay */}
            {/* User Info */}
            <div className="content-header-item mb-30 mt-10">
              <h4 className="align-middle text-dark font-w300 mb-0">Detail</h4>
              <h5><small className="font-w400">Total Keseluruhan</small></h5>
            </div>
            {/* END User Info */}
          </div>
        </div>
        {/* END Side Header */}
        {/* Side Content */}
        <div className="content-side mt-20">
          {/* Mini Stats */}
          {this.props.detail_pendanaan.map(data => (
              <div className="block pull-r-l">
              <div className="block shadow-flat">  
                <div className="block-content block-content-full d-flex align-items-center justify-content-start" style={{padding: '5px 5px'}}>
                  <div className="p-10">
                    <img className="img-side" src="/assetsBE/media/photos/photo21.jpg" alt="" />
                  </div>
                  <div className="ml-2 text-left">   
                    <p className="font-size-sm font-w600 mb-0">
                      {data.nama}
                    </p> 
                    <p className="font-size-sm font-w600 text-muted mb-0">
                      <a href="true">Lihat Detail</a>
                    </p>
                  </div>
                  <small style={{fontSize: '.7rem', marginTop: '-45px'}}><i className="fa fa-circle text-success pull-right ml-4 mt-0 pt-0 " /></small>  
                </div>
              </div>
            </div>
            ))
          }
          {/* END Mini Stats */}
        </div>
        {/* END Side Content */}
      </aside>
    )
  }
}

export default Sidebar_overlay_layout;
