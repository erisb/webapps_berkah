import React, { Component } from 'react';
import {throttle} from 'lodash';
import LayoutAdmin from "../../components/LayoutAdminDonatur";
import {Button} from "reactstrap";
import { connect } from "react-redux";
import Router from 'next/router';
import {loadState} from "../../constant/localStorage";
import axios from 'axios';
import {URL} from "../../constant/constant_func";	
import parse from 'html-react-parser';
import Link from 'next/link';
import Swal from 'sweetalert2';
import Joyride, { CallBackProps, STATUS, Step, StoreHelpers } from 'react-joyride';
class Dashboard extends Component{

  static getInitialProps({store}) {
    return store;
  }
  
  userData;
  constructor(props) {
    super(props);
    this.state = { 
      titleForgot: 'Lupa Password ?', 
      subTitleForgot: 'Masukkan username atau alamat email anda...',
      run: false,
      steps: [],
      username : '' ,
      id_user : '',
      session_login : '',
      list_pendanaan : [],
      jumlah_total : '',
      jumlah_pembayaran : '',
      jumlah_selesai : '',
      va_number : '',
      va_number_split : '',
      sesion_link: '',
      session_nominaldonasi: '',
      divActive : '',
      detailName : '',
      proses_pembayaran : [],
      selesai_pembayaran : []
      };
  }
  
  componentDidMount(){
    
    this.historyPendanaan = localStorage.getItem('session_link');
    this.historyNominalPendanaan = localStorage.getItem('session_nominal');
    this.userData = JSON.parse(localStorage.getItem('session_login'));
    this.setState({ 
      session_login : this.userData,     
      session_link : this.historyPendanaan,
      session_nominaldonasi: this.historyNominalPendanaan
    });
    console.log(this.session_login)
    if(this.historyPendanaan !== ''){
      let session_link_query = this.session_link;
    }
    //  console.log(this.sesion_pendanaan);
    if (localStorage.getItem('session_login')) {
      this.setState({
          id_user: this.userData.id_user,
          username: this.userData.username
      })
  } else {
      location.href ="/admin-donatur/login";
      this.setState({
        id_user: ''
      })
  }
  this.ListPendanaan(this.userData.id_user);
  this.DashboardData(this.userData.id_user);
  console.log(this.state.va_number)

  }

  DashboardData = (id) =>{
    axios({
        method: 'get',
        url: URL+'/user_sosial/SelectDashboardUser/'+id,
        responseType: 'stream'
      }).then((result) => {
            this.setState({

              jumlah_total:result.data.jumlah_pendanaan.jumlah_total,
              jumlah_pembayaran:result.data.jumlah_pendanaan.jumlah_pembayaran,
              jumlah_selesai:result.data.jumlah_pendanaan.jumlah_selesai,
              va_number:result.data.va_number.full,
              va_number_split:result.data.va_number.split,
              
            });
            if(!this.state.va_number){
              this.setState({
                steps: [
                  {
                    run: true,
                    content: (
                              <React.Fragment>
                              <h2>Selamat Datang Donatur</h2>
                              <p>klik next untuk melanjutkan tour singkat dashboard donatur</p>
                              </React.Fragment>
                            ),
                    locale: { skip: <strong aria-label="skip">SKIP</strong> },
                    placement: 'center',
                    target: 'body',
                    title: 'Tour Beranda Donatur',
                  },
                  {
                    content: (
                      <React.Fragment>
                      <h2>Total Donasi</h2>
                      <p>jumlah total donasi anda, dengan status dalam proses pembayaran dan yang sudah selesai pembayaran</p>
                      </React.Fragment>
                    ),
                    floaterProps: {
                      disableAnimation: true,
                    },
                    spotlightPadding: 20,
                    target: '#satu',
                    title: 'Tour Beranda Donatur',
                  },
                  {
                    content: (
                      <React.Fragment>
                        <h2>Dalam Proses Pembayaran</h2>
                        <p>jumlah total donasi anda, dengan status dalam proses pembayaran </p>
                      </React.Fragment>
                    ),
                    placement: 'bottom',
                    styles: {
                      options: {
                        width: 300,
                      },
                    },
                    target: '#dua',
                    title: 'Tour Beranda Donatur',
                  },
                  {
                    content: (
                      <React.Fragment>
                      <h2>Donasi Berhasil</h2>
                      <p>jumlah total donasi anda, dengan status pembayaran berhasil </p>
                      </React.Fragment>
                    ),
                    placement: 'top',
                    target: '#tiga',
                    title: 'Tour Beranda Donatur',
                  },
                  {
                    content: (
                      <React.Fragment>
                        <h2>Virtual Akun Anda</h2>
                        <p>Nomor Virtual akun digunakan untuk transfer donasi</p>
                      </React.Fragment>
                    ),
                    placement: 'left',
                    target: '#empat',
                  },
                  {
                    content: (
                      <React.Fragment>
                        <h2>Putar Podcast</h2>
                        <p>Dengarkan podcast dan follow Ust. Hanan Attaki di Spotify</p>
                      </React.Fragment>
                    ),
                    placement: 'top',
                    target: '#lima',
                    title: 'Tour Beranda Donatur',
                  },
                  {
                    content: (
                      <React.Fragment>
                        <h2>Rincian Pendanaan</h2>
                        <p>Daftar rincian donasi kamu</p>
                      </React.Fragment>
                    ),
                    placement: 'top',
                    target: '#enam',
                    title: 'Tour Beranda Donatur',
                  },
                  {
                    content: (
                      <React.Fragment>
                        <h2>Donasi Sekarang</h2>
                        <p>Klik menu untuk mulai berdonasi</p>
                      </React.Fragment>
                    ),
                    placement: 'top',
                    target: '#btn-pendanaan',
                    title: 'Tour Beranda Donatur',
                  }
                ]
              })
            }else{
              this.setState({
                steps: [
                  {
                    run: false
                  }
                ]
              })
            }
            console.log(result);
          },
          (error) => {
            this.setState({ error });
          }
      )
  }

  ListPendanaan = (id) =>{
    axios({
        method: 'get',
        url: URL+'/user_sosial/list_pendanaan/'+id,
        responseType: 'stream'
      }).then((result) => {

          if(result.data.pendanaan == ""){
        
            this.setState({
              list_pendanaan:[]
            });
            
          }else{
  
            this.setState({
              list_pendanaan:result.data.pendanaan
            });
  
          }
      },
        (error) => {
          this.setState({ error });
        }
      )
  }

  detail_pendanaan = (id, nama) => {
    this.setState({
      divActive: true,
      detailName : nama
    });

    this.ProsesPembayaranList(id);
    this.SelesaiPembayaranList(id);
    
  };

  ProsesPembayaranList = (id) =>{
    axios({
        method: 'get',
        url: URL+'/user_sosial/list_pendanaan_pembayaran_proses/'+this.userData.id_user+'/'+id,
        responseType: 'stream'
      }).then((result) => {
          if(result.data.pendanaan == ""){
        
            this.setState({
              proses_pembayaran:[]
            });
            
          }else{
  
            this.setState({
              proses_pembayaran:result.data.pendanaan
            });
  
          }
      },
        (error) => {
          this.setState({ error });
        }
      )
  }

  SelesaiPembayaranList = (id) =>{
    axios({
        method: 'get',
        url: URL+'/user_sosial/list_pendanaan_pembayaran_selesai/'+this.userData.id_user+'/'+id,
        responseType: 'stream'
      }).then((result) => {
          if(result.data.pendanaan == ""){
        
            this.setState({
              selesai_pembayaran:[]
            });
            
          }else{
  
            this.setState({
              selesai_pembayaran:result.data.pendanaan
            });
  
          }
      },
        (error) => {
          this.setState({ error });
        }
      )
  }

  redirect = () => {
    Router.push({
      pathname: '/detail_pendanaan',
      query: { id: this.state.session_link },
    })
  }

  copyToClipboard = e => {
    navigator.clipboard.writeText(this.state.va_number)
    Swal.fire('Berhasil', 'Nomor VA berhasil di copy', 'info');
  }

  render(){
    const { steps } = this.state;
    return(
      <LayoutAdmin username={this.state.session_login.username}>
        <Joyride
          callback={this.handleJoyrideCallback}
          continuous={true}
          getHelpers={this.getHelpers}
          // run={true}
          scrollToFirstStep={true}
          showProgress={true}
          showSkipButton={true}
          steps={steps}
          styles={{
            options: {
              zIndex: 10000,
            },
          }}
        />
          <div id="detect-screen" className="content-full-right">
            <div className="container">
              <div className="row">
                <div id="col" className="col-12 col-md-12 mt-30">
                  <span className=" row mb-5 pb-5 ">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                      <span className="badge badge-dark" style={{ display : !this.state.session_link ? "none" : "block"  }}>
                        <Button className="text-white" color="link" onClick={this.redirect}>
                        <i className="fa fa-eye"></i> Kamu memiliki history donasi yang belum di selesaikan - <ins>Lanjutkan-></ins>
                        </Button>
                      </span>
                    </div>
                  </span>
                </div>
              </div>
              <div className="row mt-5 pt-5">
                <div id="col2" className="col-md-12 mt-5 pt-5">
                  <div className="row">                    
                    
                    <div id="empat" className="col-xs-12 col-sm-12 col-md-8">
                      <a className="block ">
                        <div className="block dsiBgGreen">
                          <div className="block-content text-white pt-30 pb-2">
                            <span id="btn-pendanaan" className="pull-right">
                              <a href="../all_pendanaan" className="btn btn-rounded btn-big btn-noborder btn-success min-width-150 " style={{boxShadow: "rgba(252,255,251, 0) 0 8px 14px 0", border: "solid 1.2px white"}}><span className="p-5">Donasi Sekarang</span></a>
                            </span>
                            <i  className="si si-briefcase" /> Nomor Virtual Akun
                            {!this.state.va_number ?
                            <React.Fragment>
                              <h3 className="text-white pt-5 font-w700">#AyoCariBerkah, Silahkan melakukan Donasi atau Zakat...</h3>
                              <p>Nomor Virtual Akun akan secara otomatis dibuat ketika anda sudah melakukan donasi atau berzakat...</p>
                            </React.Fragment>
                              :
                              <React.Fragment>
                                <h1 className="text-white  font-w700"> VA : {this.state.va_number}</h1>
                                <p>Nomor Virtual Akun digunakan untuk pembayaran donasi</p>
                              </React.Fragment>
                            }
                            <p onClick={this.copyToClipboard} style={{ cursor: "context-menu" }}><i className="fa fa-copy" ></i> <ins>Salin nomor VA</ins></p>
                            
                          </div>
                        </div>
                      </a>
                    </div>
                    <div id="lima" className="col-xs-12 col-sm-12 col-md-4">
                          <iframe src="https://open.spotify.com/embed-podcast/show/26jhSaXP7A8CS8Nu6jJ3AG" width="100%" height="232" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>                                              
                    </div>
                    <div className="col-12">
                      <h3 className="text-dark">Status Donasi</h3>                     
                    </div>
                    <div id="satu" className="col-xs-12 col-sm-12 col-md-4">
                      <div className="block">
                        <div className="block-content ">
                          <h1 className="font-bold-x3 pl-5 text-primary pt-30 font-w700">{this.state.jumlah_total}</h1>
                          <p className="text-dark">Total Pendanaan Diikuti</p>
                        </div>
                      </div>
                    </div>
                    <div id="dua" className="col-xs-12 col-sm-12 col-md-4">
                      <div className="block">
                        <div className="block-content ">
                          <h1 className="font-bold-x3 pl-5 text-pengajuan pt-30 font-w700">{this.state.jumlah_pembayaran}</h1>
                          <p className="text-dark font-w500">Dalam Proses Pembayaran</p>
                        </div>
                      </div>
                    </div>
                    <div id="tiga" className="col-xs-12 col-sm-12 col-md-4">
                      <div className="block">
                        <div className="block-content ">
                          <h1 className="font-bold-x3 pl-5 text-selesai pt-30 font-w700">{this.state.jumlah_selesai}</h1>
                          <p className="text-dark">Berhasil Donasi</p>
                        </div>
                      </div>
                    </div>
                    
                 
                    <div className="col-12">
                      <h3 className="text-dark">Rincian Pendanaan</h3>
                    </div>
                    <div id="enam" className="col-12 col-md-12">
                        <div className="block">
                          <div className="block-header block-header-default">
                            <h3 className="block-title">Pendanaan Anda</h3>
                            <div className="block-options">
                              <div className="block-options-item">
                                {/* <code>3 dari 3 Pendanaan</code> */}
                              </div>
                            </div>
                          </div>

                          <div className="block-content">
                            
                            <table className="table table-vcenter">
                              <thead>
                                <tr>
                                  <th className="text-center" style={{width: '50px'}}>#</th>
                                  <th>Nama Pendanaan</th>
                                  <th className="d-none d-sm-table-cell" style={{width: '15%'}}>Status</th>
                                  <th className="text-center" style={{width: '100px'}}>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                              
                              {this.state.list_pendanaan.map(data => (
                              <tr>
                                <th className="text-center" scope="row">{data.no}</th>
                              <td><a href={`/detail_pendanaan?id=${data.id_encrypt}`} className="{{$row->id}}" id="deitil" data-toggle="layoutS" data-action="side_overlay_toggle">{data.nama_pendanaan}</a></td>
                                <td className="d-none d-sm-table-cell">
                                  <span className="badge badge-success">{data.id_status_pendanaan}</span>
                                </td>
                                <td className="text-center">
                                  <div className="btn-group">
                                    <button type="button" onClick={()=>this.detail_pendanaan(data.id_pendanaan_sosial, data.nama_pendanaan)}className="btn btn-sm btn-secondary" data-toggle="tooltip" title="Lihat Detail Pendanaan" >
                                      <i className="fa fa-eye" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                              ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        
                        {/* Detail Pendanaan  */}
                        {this.state.divActive == true ? 
                          <div className="block">
                            <div className="block-header block-header-default">
                             <h3 className="block-title">Detail Pendanaan {this.state.detailName}</h3>
                              <div className="block-options">
                                <div className="block-options-item">
                                  <i className="fa fa-times pull-right"></i>
                                </div>
                              </div>
                            </div>

                            <div className="block-content">
                              <div class="js-wizard-validation-classic block">
                              
                                <ul class="nav nav-tabs nav-tabs-alt nav-fill" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" href="#proses_pembayaran" data-toggle="tab">Proses Pembayaran</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="#selesai" data-toggle="tab">Selesai</a>
                                    </li>
                                   
                                </ul>

                                <div class="block-content block-content-full tab-content">
                                  <div class="tab-pane active" id="proses_pembayaran" role="tabpanel">
                                    <table className="table table-vcenter">
                                      <thead>
                                        <tr>
                                          <th className="text-center" style={{width: '50px'}}>#</th>
                                          <th>Nama Pendanaan</th>
                                          <th className="d-none d-sm-table-cell">Tanggal Danai</th>
                                          <th className="d-none d-sm-table-cell">Dana</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                      
                                        <tr style={{display: this.state.proses_pembayaran === undefined || null ? "none" : "block" }}>
                                          <th className="text-center" scope="row">Data Donasi Kosong</th>                                          
                                        </tr>
                                      {this.state.proses_pembayaran.map(data => (
                                        <tr>
                                          <th className="text-center" scope="row">{data.no}</th>
                                          <td><a href={`/detail_pendanaan?id=${data.id_encrypt}`} className="{{$row->id}}" id="deitil" data-toggle="layoutS" data-action="side_overlay_toggle">{data.nama_pendanaan}</a></td>
                                          <td className="d-none d-sm-table-cell">
                                            <span className="badge badge-success">{data.tanggal}</span>
                                          </td>
                                          <td className="d-none d-sm-table-cell">
                                            <span className="badge badge-success">{data.dana}</span>
                                          </td>
                                          
                                        </tr>
                                      ))}
                                      </tbody>
                                    </table>

                                  </div>

                                  <div class="tab-pane" id="selesai" role="tabpanel">
                                  <table className="table table-vcenter">
                                      <thead>
                                        <tr>
                                          <th className="text-center">#</th>
                                          <th>Nama Pendanaan</th>
                                          <th className="d-none d-sm-table-cell">Tanggal Danai</th>
                                          <th className="d-none d-sm-table-cell">Dana</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                              
                                      {this.state.selesai_pembayaran.map(data => (
                                      <tr>
                                        <th className="text-center" scope="row">{data.no}</th>
                                        <td><a href={`/detail_pendanaan?id=${data.id_encrypt}`} className="{{$row->id}}" id="deitil" data-toggle="layoutS" data-action="side_overlay_toggle">{data.nama_pendanaan}</a></td>
                                        <td className="d-none d-sm-table-cell">
                                          <span className="badge badge-success">{data.tanggal}</span>
                                        </td>
                                        <td className="d-none d-sm-table-cell">
                                          <span className="badge badge-success">{data.dana}</span>
                                        </td>
                                        
                                      </tr>
                                      ))}
                                      </tbody>
                                    </table>
                                  </div>
                                  
                                </div>
                              </div>
                            </div>
                          </div>

                        : "" }

                        {/* Detail Pendanaan  */}
                        
                        {/* END Table */}    
                    </div>
                  </div>

                  
                </div>                           
              </div>
              </div>
          </div>
          {/* END Page Content */}
          ...
       
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