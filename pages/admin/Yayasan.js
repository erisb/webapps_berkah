import React, { Component } from 'react';
import LayoutAdmin from '../../components/LayoutAdmin';
import SidebarOverlay from '../../components/admin/Side_overlay_layout';
import Link from 'next/link';
import {URL} from "../../constant/constant_func";												  
import axios from 'axios';
import Router from 'next/router';
import {loadState} from "../../constant/localStorage";
import Swal from 'sweetalert2';

class Yayasan extends Component{
  userData;
  constructor(props){
    super(props)

    this.state = {
      yayasan : [],
      session_username:''
    }
  }


  listYayasan(){
    axios({
      method: 'get',
      url: URL+'/admin_sosial/SelectYayasan/',
      responseType: 'stream'
    }).then((result) => {
          console.log(result);
          this.setState({
            yayasan:result.data.yayasan
          });
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  getSession=()=>{
    const session_login = JSON.parse(localStorage.getItem('session_login'));
    if (typeof session_login !== 'undefined' && session_login !== null){
      this.setState({ session_username : session_login.username });
    }else{
      this.setState({ session_username : 'Admin' });
    }
  }


  componentDidMount(){
    this.userData = JSON.parse(localStorage.getItem('session_login'));
    let id_status = this.userData ? this.userData.id_status_user : 'empty';
    console.log(id_status);
    if (localStorage.getItem('session_login')&&id_status==1) {
      this.listYayasan();
      this.getSession();
    } else if(id_status==2){
      location.href ="/admin-donatur/dashboard";
    }else{
      location.href ="/admin/login";
    }
  }

  edit_yayasan(id){
    Router.push({
      pathname:'/admin/edit_yayasan',
      query:{id:id}}
      );
  }


  DeleteYayasan=(getId)=>{
    
    axios({
      method: 'get',
      url: URL+'/admin_sosial/DeleteYayasan/'+getId,
      responseType: 'stream'
    }).then((result) => {
          if(result.data.status=='sukses'){
              Swal.fire("Sukses", "Data Berhasil dihapus","success").then( () => {
              location.href = ''
          })
          }else{
            Swal.fire("Gagal", "Data Gagal dihapus","failed").then( () => {
                location.href = ''
            })
          }
          
        },
        (error) => {
          console.log(error);
        }
      )
  }

  // modal show delete pendanaan
  handleClickDelete(id, nama) {
    Swal.fire({
      title: 'Hapus',
      text: `Apakah anda yakin ingin menghapus campaigner ${nama}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak'
    }).then((result) => {
      if (result.value) {
        this.DeleteYayasan(id);
      }
    })
    
  }

  render(){
  return (
        <LayoutAdmin title='Campaigner' username={this.state.session_username}>
            {/* Page Content */}
            <div id="detect-screen" className="content-full-right">
              <div className="container">
                <div className="row">
                  <div id="col" className="col-12 col-md-9 mt-30">
                    <div className="row mb-10 pb-10">
                        <div className=" col-8">
                            <h1 className="no-paddingTop font-w400 text-dark">Daftar Yayasan</h1>                       
                        </div>
                        <div className="col-4">
                            <Link href={`/admin/add_yayasan`}>
                            <a color="success" className="btn btn-rounded btn-big btn-noborder btn-success min-width-150">
                                +Tambah Yayasan
                            </a>
                          </Link>
                        </div> 
                    </div> 
                  </div>
                  <div id="col" className="col-12 col-md-9">
                    <span className="mb-10">
                      <div className="form-material floating">
                        <input type="text" className="form-control col-12 col-md-10" style={{height: 'calc(1.5em + .957143rem + 3px)'}} id="material-text2" name="material-text2" />
                        <label htmlFor="material-text2" style={{color: '#8B8B8B!important'}} className="font-w300"> <i className="fa fa-search" /> Cari Berdasarkan Nama atau Lokasi</label>
                      </div>
                    </span>
                    <div className="col-12 mt-20" style={{paddingLeft: '0px'}}>
                      <label className="css-control css-control-primary css-radio mr-10 text-dark">
                        <input type="checkbox" className="css-control-input" name="sppp" defaultChecked />
                        <span className="css-control-indicator" /> Aktif
                      </label>
                      <label className="css-control css-control-primary css-radio mr-10 text-dark">
                        <input type="checkbox" className="css-control-input" name="sppp" defaultChecked />
                        <span className="css-control-indicator" /> Suspend
                      </label>
                      
                    </div>
                  </div>
                  {/* kanan */}
                  <div id="col" className="col-12 col-md-3 pt-30 d-none d-xl-block">
                    <span className="pt-30 ">
                      <h6 className="text-muted font-w300" > </h6>                       
                    </span>
                  </div>
                </div>
                <div className="row mt-10 pt-5">
                  <div id="col" className="col-md-8 mt-5 pt-5">
                    <div className="row">
                      <div className="col-12">
                        {/* Table */}
                        <div className="block">
                          <div className="block-header block-header-default">
                            <h3 className="block-title">Table</h3>
                            <div className="block-options">
                              <div className="block-options-item">
                              </div>
                            </div>
                          </div>

                          <div className="block-content">
                            
                            <table className="table table-vcenter">
                              <thead>
                                <tr>
                                  <th className="text-center" style={{width: '50px'}}>#</th>
                                  <th>Nama Yayasan</th>
                                  <th className="text-center" style={{width: '100px'}}>Actions</th>
                                </tr>
                              </thead>
                              <tbody>

                              {this.state.yayasan.map(data => (
                              <tr key={data.no}>
                                <th className="text-center" scope="row">{data.no}</th>
                                <td><a href="#" className="{{$row->id}}" id="deitil" data-toggle="layoutS" data-action="side_overlay_toggle">{data.nama}</a></td>
                                
                                <td className="text-center">
                                  <div className="btn-group">
                                    {/* <button type="button" className="btn btn-sm btn-secondary" data-toggle="tooltip" title="Edit">
                                      <i className="fa fa-eye" />
                                    </button> */}
                                    <button type="button" className="btn btn-sm btn-secondary" data-toggle="tooltip" title="Edit" onClick={()=>this.edit_yayasan(data.id)}>
                                      <i className="fa fa-pencil" />
                                    </button>
                                    <button type="button" className="btn btn-sm btn-secondary" data-toggle="tooltip" title="Delete" onClick={() => this.handleClickDelete(data.id, data.nama)}>
                                      <i className="fa fa-times" />
                                    </button>
                                    {/* <button type="button" className="btn btn-sm btn-secondary" data-toggle="tooltip" title="Delete" onClick={()=> $('#exampleModal').modal('show')}>
                                      <i className="fa fa-times" />
                                    </button> */}
                                  </div>
                                </td>
                              </tr>  
                              ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        {/* END Table */}
                      </div>
                    </div>                           
                  </div>
                </div>
              </div>

            
              <div className="modal fade" id="modal_delete_yayasan" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                        
                        <h5 className="modal-title" id="exampleModalLabel">Hapus Data Yayasan</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                     <p id="txt_show_id_yayasan" style={{display:'none'}}></p>
                      <p>Anda Yakin Ingin Menghapus <b id="txt_show_nama_yayasan"></b> Ini ? </p>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Batal</button>
                      <button type="button" id="btn_delete_yayasan" onClick={() => this.DeleteYayasan()}  className="btn btn-primary">Proses</button>
                    </div>
                  </div>
                </div>
              </div>
              {/* END Page Content */}
              
          </div>

                
          </LayoutAdmin>  
    
      );
  }
} 

export default Yayasan;