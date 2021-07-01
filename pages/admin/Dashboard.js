import React, { Component } from 'react';
import Link from 'next/link';
import LayoutAdmin from "../../components/LayoutAdmin";
import SidebarOverlay from "../../components/admin/Side_overlay_layout";
import { connect } from "react-redux";
import Router from 'next/router';
import axios from 'axios';								 
import {URL} from '../../constant/constant_func';
import cookie from 'cookie';
import Cookies from 'js-cookie';
import {loadState} from "../../constant/localStorage";

class Dashboard extends Component{
  static getInitialProps({store}) {
    return store;
  }

  // static async getInitialProps (args) {
  //     const {req, res} = args
  //     let autoRedirect = false
  //     let profile
  //     if (process.env.DEBUG || (!req && window.location.origin === 'http://localhost:3000')) {
  //       console.log('debug profile')
  //       profile = JSON.stringify({
  //         username: 'lipplocal',
  //         name: 'Gerhard Preuss',
  //         photo: 'https://avatars.githubusercontent.com/u/445883?v=3',
  //         provider: 'github'
  //       })
  //     } else if (req) {
  //       console.log('req');
  //       const cookies = cookie.parse(req.headers.cookie || '')
  //       console.log(cookies);
  //       profile = cookies.profile
  //     } else {
  //       profile = Cookies.get('profile')
  //     }
  //     try {
  //       console.log('try');
  //       profile = JSON.parse(profile)
  //       if (typeof profile.name === 'object') {
  //         profile.name = profile.name.givenName
  //         profile.username = profile.name.displayName
  //       }
  //       const props = Component.getInitialProps ? await Component.getInitialProps({...args, profile}) : {}
  //       return {
  //         ...props,
  //         profile
  //       }
  //     } catch (_) {
  //       if (autoRedirect) {
  //         console.log('autoRedirect');
  //         if (req) {
  //           console.log('req bawah');
  //           res.writeHead(302, { Location: '/login' })
  //         } else {
  //           console.log('else req');
  //           document.location.pathname = '/login'
  //         }
  //       } else {
  //         console.log('else redirect');
  //         return Component.getInitialProps ? await Component.getInitialProps({...args}) : {}
  //       }
  //     }
  //   }

//   static async getInitialProps({res}) {
//     res.writeHead(301, {
//       Location: '/admin/login'
//     })
//     res.end()
//     res.finished = true
//     return {}
// }

  
  userData;
  constructor(props) {
    super(props);
    this.state = { 
      titleForgot: 'Lupa Password ?', 
      subTitleForgot: 'Masukkan username atau alamat email anda...',
      username : '' ,
      password : '',
      session_username:'',		
      jumlah_total:'',
      jumlah_berjalan:'',
      jumlah_pengajuan:'',
      jumlah_selesai:'',
      detail_pendanaan:[]
      };
  }

  componentDidMount(){
    this.userData = JSON.parse(localStorage.getItem('session_login'));
    let id_status = this.userData ? this.userData.id_status_user : 'empty';
    console.log(id_status);
    if (localStorage.getItem('session_login')&&id_status==1) {
      this.fetchData();  
      this.getSession();
    }else if(id_status==2){
      location.href ="/admin-donatur/dashboard";
    }else{
      location.href ="/admin/login";
    }
  }

  getSession=()=>{
    const session_login = JSON.parse(localStorage.getItem('session_login'));
    if (typeof session_login !== 'undefined' && session_login !== null){
      this.setState({ session_username : session_login.username });
    }else{
      this.setState({ session_username : 'Admin' });
    }
  }

  fetchData=()=>{
    axios({
      method: 'get',
      url: URL+'/admin_sosial/SelectDashboardAdmin/',
      responseType: 'stream'
    }).then((result) => {
          this.setState({
            jumlah_total:result.data.jumlah_pendanaan.jumlah_total,
            jumlah_berjalan:result.data.jumlah_pendanaan.jumlah_berjalan,
            jumlah_pengajuan:result.data.jumlah_pendanaan.jumlah_pengajuan,
            jumlah_selesai:result.data.jumlah_pendanaan.jumlah_selesai,
            detail_pendanaan:result.data.pendanaan
          });
        },
        (error) => {
          this.setState({ error });
        }
      )
  }
  
  render(){
    return(
      <LayoutAdmin username={this.state.session_username}>
          {/* Page Content */}          
          <SidebarOverlay detail_pendanaan={this.state.detail_pendanaan}/>
          <div id="detect-screen" className="content-full-right">
            <div className="container">
              <div className="row">
                <div id="col" className="col-12 col-md-9 mt-30">
                  <span className="mb-10 pb-10 ">
                    <h1 className="no-paddingTop font-w400" style={{float: 'left', marginBlockEnd: '0em', color: '#31394D'}}>Status Pendanaan</h1>
                    <Link href="/admin/add_pendanaan">
                        <a className="pull-right btn btn-rounded btn-big btn-noborder btn-success min-width-150 "><span className="p-5">Tambah Pendanaan Baru</span></a>
                    </Link>
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
                            <h1 className="text-white font-bold-x3  font-w700">{this.state.jumlah_total}</h1>
                            <p>Total<br />Keseluruhan</p>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div className="col-6 col-md-3">
                      <div className="block">
                        <div className="block-content">
                          <br />
                          <h1 className="font-bold-x3 text-primary pt-30 font-w700">{this.state.jumlah_berjalan}</h1>
                          <p className="text-dark">Berjalan</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-6 col-md-3">
                      <div className="block">
                        <div className="block-content">
                          <br />
                          <h1 className="font-bold-x3 text-pengajuan pt-30 font-w700">{this.state.jumlah_pengajuan}</h1>
                          <p className="text-dark font-w500">Pengajuan</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-6 col-md-3">
                      <div className="block">
                        <div className="block-content">
                          <br />
                          <h1 className="font-bold-x3 text-selesai pt-30 font-w700">{this.state.jumlah_selesai}</h1>
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
                                        <span className="initials">P</span>
                                      </div>
                                    </div>
                                    <div className="ml-2 text-left">   
                                      <div className="font-w600">Log under maintenance</div>
                                      <div>
                                        <a href="/admin/dashboard">Info lebih lanjut hubungi support_danasosial@danasyariah.id</a>
                                      </div>
                                      <div className="font-size-xs text-muted">.. min ago</div>
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
      </LayoutAdmin>
    )
  }
}

const mapStateToProps = state => {
  const {  auth } = state;
  return {  auth };
};

export default connect(
  mapStateToProps
)(Dashboard);