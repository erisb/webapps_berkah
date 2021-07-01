import React, { Component } from 'react';
import LayoutAdmin from '../../components/LayoutAdmin';
import SidebarOverlay from '../../components/admin/Side_overlay_layout';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Link from 'next/link';
import {URL} from "../../constant/constant_func";									  
import axios from 'axios';
import Router from 'next/router';
import Swal from 'sweetalert2';
import {loadState} from "../../constant/localStorage";
import BootstrapTable from 'react-bootstrap-table-next'; 
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';   
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';


class Pendanaan extends Component{

  userData;
  constructor(props){
    super(props)

    this.state = {
      shows_data : [],
      selectedFile : null,
      modal_delete : false,
      session_username:'',
      
      columns: [
        {  
          dataField: 'no',  
          text: 'No',
          align: 'center',
          headerStyle: {textAlign: 'center'}

        },
        {  
          dataField: 'id_pendanaan',
          text: 'Id Pendanaan',
          align: 'center',
          headerStyle: {textAlign: 'center'},
          hidden: true
          
          // sort: true,
          // headerStyle: (column, colIndex) => {
          //   return { width: 0 , 'display': 'none'}
          // },
          // style: {'display': 'none'}
        },
        {  
          dataField: 'id_tipe_pendanaan',  
          text: 'Tipe Pendanaan',
          align: 'center',
          headerStyle: {textAlign: 'center'},
          hidden: true
        },
        {  
          dataField: 'nama_pendanaan',  
          text: 'Nama Pendanaan',
          align: 'center',
          sort: true,
          headerStyle: {textAlign: 'center', width:'300px'},
          filter: textFilter()
        },
        {  
          dataField: 'id_status_pendanaan',  
          text: 'Status',
          align: 'center',
          sort: true,
          headerStyle: {textAlign: 'center'},
          formatter: (cellContent, row) => {

            if (row.id_status_pendanaan == "Aktif") {
              return (
                
                  <span className="badge badge-success">{row.id_status_pendanaan}</span>
                
              );
            }
            if (row.id_status_pendanaan == "Penggalangan Selesai") {
              return (
                
                  <span className="badge badge-warning">{row.id_status_pendanaan}</span>
                
              );
            }
            if (row.id_status_pendanaan == "Pendanaan Selesai") {
              return (
                
                  <span className="badge badge-info">{row.id_status_pendanaan}</span>
                
              );
            }
           
          }

        },
        {  
          dataField: 'Action',  
          text: 'Pengaturan',
          align: 'center',
          headerStyle: {textAlign: 'center'},
          formatter: (cellContent, row) => {
            return (
              <div className="btn-group">
                <button type="button" className="btn btn-sm btn-secondary" data-toggle="tooltip" title="Edit" onClick={()=>this.edit_pendanaan(row.id_pendanaan)}>
                  <i className="fa fa-pencil" />
                </button> &nbsp;
                <button type="button" className="btn btn-sm btn-secondary" data-toggle="tooltip" title="Delete" onClick={() => this.handleClickDelete(row.id_pendanaan, row.nama_pendanaan)}>
                  <i className="fa fa-times" />
                </button> 
              
              </div>
            );
          }
        }]                   
    }
  }

  listPendanaan(){
    
    axios({
      method: 'get',
      url: URL+'/admin_sosial/SelectPendanaanAdmin',
      responseType: 'stream'
    }).then((result) => {
          
          if(result.data.pendanaan == ""){
        
            this.setState({
              shows_data : []
            });

          }else{
          
            this.setState({

              shows_data : result.data
            
              });
          }
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
      this.listPendanaan();
      this.getSession();
    } else if(id_status==2){
      location.href ="/admin-donatur/dashboard";
    }else{
      location.href ="/admin/login";
    }
  }

  edit_pendanaan(id){
    Router.push({
      pathname:'/admin/edit_pendanaan',
        query:{id:id}
      }
    );
  }

  showModal = () => {
    this.setState({ modal_delete: true });
  };

  hideModal = () => {
    this.setState({ modal_delete: false });
  };
  
  // 
  
  
  // action delete pendanaan
  DeletePendanaan=(getID)=>{

    axios({
      method: 'get',
      url: URL+'/admin_sosial/DeletePendanaan/'+getID,
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

  
  handleClickDelete(id, nama) {
    Swal.fire({
      title: 'Hapus',
      text: `Apakah anda yakin ingin menghapus pendanaan ${nama}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak'
    }).then((result) => {
      if (result.value) {
        this.DeletePendanaan(id);
      }
    })
    
  }

  render(){
    
  
  const { list_pendanaan } = this.state;
  

  return (
        <LayoutAdmin title='Pendanaan' username={this.state.session_username}>
          
          {/* <SidebarOverlay /> */}
            {/* Page Content */}
            <div id="detect-screen" className="content-full-right">
              <div className="container">
                <div className="row">
                <div id="col" className="col-12 col-md-9 mt-30">
                    <div className="row mb-10 pb-10">
                        <div className=" col-8">
                            <h1 className="no-paddingTop font-w400 text-dark">Daftar Pendanaan</h1>                       
                        </div>
                        <div className="col-4">
                            <Link href={`/admin/add_pendanaan`}>
                            <a color="success" className="btn btn-rounded btn-big btn-noborder btn-success min-width-150">
                                +Tambah Pendanaan
                            </a>
                          </Link>
                        </div> 
                    </div> 
                  </div>
                  <div id="col" className="col-12 col-md-9">
                    <span className="mb-10">
                      <div className="form-material floating">
                        <input type="text" className="form-control col-12 col-md-10" style={{height: 'calc(1.5em + .957143rem + 3px)'}} id="material-text2" name="material-text2" onKeyUp={this.handleLoginKeyUp}/>
                        <label htmlFor="material-text2" style={{color: '#8B8B8B!important'}} className="font-w300"> <i className="fa fa-search" /> Cari Berdasarkan Nama Pendanaan</label>
                      </div>
                    </span>
                    <div className="col-12 mt-20" style={{paddingLeft: '0px'}}>
                      <label className="css-control css-control-pengajuan css-radio mr-10 text-dark">
                        <input type="checkbox" className="css-control-input" name="sppp" defaultChecked />
                        <span className="css-control-indicator" /> Pengajuan
                      </label>
                      <label className="css-control css-control-primary css-radio mr-10 text-dark">
                        <input type="checkbox" className="css-control-input" name="sppp" defaultChecked />
                        <span className="css-control-indicator" /> Aktif
                      </label>
                      <label className="css-control css-control-penggalangandana css-radio mr-10 text-dark">
                        <input type="checkbox" className="css-control-input" name="sppp" defaultChecked />
                        <span className="css-control-indicator" /> Penggalangan Dana
                      </label>
                      <label className="css-control css-control-ttd css-radio mr-10 text-dark">
                        <input type="checkbox" className="css-control-input" name="sppp" defaultChecked />
                        <span className="css-control-indicator" /> Proses TTD
                      </label>
                      <label className="css-control css-control-proyekberjalan css-radio mr-10 text-dark">
                        <input type="checkbox" className="css-control-input" name="sppp" defaultChecked />
                        <span className="css-control-indicator" /> Proyek Berjalan
                      </label>
                      <label className="css-control css-control-selesai css-radio mr-10 text-dark">
                        <input type="checkbox" className="css-control-input" name="sppp" defaultChecked />
                        <span className="css-control-indicator" /> Selesai
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
                  <div id="col" className="col-md-9 mt-5 pt-5">
                    <div className="row">
                      <div className="col-12">
                        {/* Table */}
                        <div className="block">
                          <div className="block-header block-header-default">
                            <h3 className="block-title">List Pendanaan</h3>
                            
                          </div>

                          <div className="block-content">
                          <BootstrapTable
                          striped  
                          hover  
                          keyField='Id_pendanaan'   
                          data={ this.state.shows_data }   
                          columns={this.state.columns} 
                          pagination={ paginationFactory() } 
                          filter={ filterFactory() }>
                          </BootstrapTable>  
                            {/* <table className="table table-vcenter">
                              <thead>
                                <tr>
                                  <th className="text-center" style={{width: '50px'}}>#</th>
                                  <th>Name</th>
                                  <th className="d-none d-sm-table-cell" style={{width: '15%'}}>Status</th>
                                  <th className="text-center" style={{width: '100px'}}>Actions</th>
                                </tr>
                              </thead>
                              

                              {this.state.shows_data.map(data => (
                              <tbody>
                              <tr key={data.no}>
                                <th className="text-center" scope="row">{data.no}</th>
                                <td><a href="#" className="{{$row->id}}" id="deitil" data-toggle="layoutS" data-action="side_overlay_toggle">{data.nama_pendanaan}</a></td>
                                <td className="d-none d-sm-table-cell">
                                  <span className="badge badge-warning">{data.id_status_pendanaan}</span>
                                </td>
                                <td className="text-center">
                                  <div className="btn-group">
                                    <button type="button" className="btn btn-sm btn-secondary" data-toggle="tooltip" title="Edit" onClick={()=>this.edit_pendanaan(data.id_pendanaan_sosial)}>
                                    <i className="fa fa-pencil" />
                                    </button>
                                      <button type="button" className="btn btn-sm btn-secondary" data-toggle="tooltip" title="Delete" onClick={() => this.handleClickDelete(data.id_pendanaan_sosial, data.nama_pendanaan)}>
                                      <i className="fa fa-times" />
                                    </button> 
                                   
                                  </div>
                                </td>
                              </tr> 
                              </tbody> 
                              ))}
                             
                            </table> */}
                          </div>
                        </div>
                        {/* END Table */}
                      </div>
                    </div>                           
                  </div>
                </div>
              </div>

            </div>

                
          </LayoutAdmin>  
    
      );
  }
} 

export default Pendanaan;