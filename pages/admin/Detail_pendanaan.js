import React, { Component } from 'react';
import Link from 'next/link';
import LayoutAdmin from "../../components/LayoutAdmin";
import { Editor} from '@tinymce/tinymce-react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import {loadState} from "../../constant/localStorage";
import Router from 'next/router';

class Detail_pendanaan extends Component{
  userData;
  constructor(props){
    super(props)

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      beritaView: false
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  }
  beritaShow = () => {
    if (!this.state.beritaView) {
      this.setState({ beritaView: true });
    }else{
      this.setState({ beritaView: false });
    }
    console.log('view : ' + this.state.beritaView)
  }
  editPendanaan(id){
    Router.push({
      pathname:'/admin/edit_pendanaan',
      query:{id:id}}
      );

      console.log('ID Pendanaan : ' + id)
  }
  componentDidMount(){
    this.userData = JSON.parse(localStorage.getItem('session_login'));
    
    if (localStorage.getItem('session_login')) {
      // 
    } else {
      location.href ="/admin/login";
      
    }
    
  }
  handleEditorChange = (content, editor) => {
    console.log('Content was updated:', content);
  }
  render(){
    let tabDetailBerita = (
        <div className="layout">
          <div className="block-header block-header-default">
              <h3 className="block-title">Table</h3>
              <div className="block-options">
                <div className="block-options-item">
                  <code>.table</code>
                </div>
              </div>
            </div>
            <div className="block-content">
              <table className="table table-vcenter">
                <thead>
                  <tr>
                    <th className="text-center" style={{width: '50px'}}>#</th>
                    <th>Judul Berita</th>
                    <th className="d-none d-sm-table-cell" style={{width: '15%'}}>Status</th>
                    <th className="text-center" style={{width: '100px'}}>Tanggal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="text-center" scope="row">1</th>
                    <td><a href="#" className="{{$row->id}}" id="deitil" data-toggle="layoutS" data-action="side_overlay_toggle">Albert Ray</a></td>
                    <td className="d-none d-sm-table-cell">
                      <span className="badge badge-success">Tayang </span>
                      <span className="badge badge-danger">tidak tayang</span>
                    </td>
                    <td className="text-center">
                      <div className="btn-group">
                        <button onClick={this.beritaShow} type="button" className="btn btn-sm btn-secondary" data-toggle="tooltip" title="Edit">
                          <i className="fa fa-pencil" />
                        </button>
                        <button type="button" className="btn btn-sm btn-secondary" data-toggle="tooltip" title="Hapus">
                          <i className="fa fa-times" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                </tbody>
              </table>
            </div>
        </div>
    )
    let tabDetailDonatur = (
      <div className="layout">
        <div className="block-header block-header-default">
            <h3 className="block-title">Daftar Donatur</h3>
            <div className="block-options">
              <div className="block-options-item">
                <code>100 Donatur</code>
              </div>
            </div>
          </div>
          <div className="block-content">
            <table className="table table-vcenter">
              <thead>
                <tr>
                  <th className="text-center" style={{width: '50px'}}>#</th>
                  <th>Nama Donatur</th>
                  <th className="d-none d-sm-table-cell" style={{width: '15%'}}>Jumlah Donasi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className="text-center" scope="row">1</th>
                  <td><a href="#" className="{{$row->id}}" id="deitil" data-toggle="layoutS" data-action="side_overlay_toggle">Albert Ray</a></td>
                  <td className="d-none d-sm-table-cell">
                    <span className="badge badge-info">Rp. 10.0000</span>
                  </td>
                </tr>
                
              </tbody>
            </table>
          </div>
      </div>
  )
    return(<LayoutAdmin>
        <div id="detect-screen" className="content-full-right">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 mt-30 mb-10">
              <div className="alert alert-success" role="alert">
                <h4 className="alert-heading">Berhasil! SPA MODE!</h4>
                <p>Semoga berkah Dunia Akhirat, notifikasi kondisional bisa dipakai kalau dibutuhkan | ini untuk sukses</p>
                <hr/>
                <p className="mb-0">Halaman Tambah dan edit hidden dan show , di halaman ini juga, gak perlu buat modal atau tambah halaman baru untuk edit dan tambah berita. Happy SPA</p>
              </div>
              <div class="alert alert-danger" role="alert">
                Berhasil di Hapus | ini untuk gagal!
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 mt-30">            
              <span className="mb-10 pb-10 ">
                <h1 className="no-paddingTop font-w400" style={{float: 'left', marginBlockEnd: '0em', color: '#31394D'}}>Peduli Corona</h1>                   
              </span>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 mt-30">
              <span className="mb-10 pb-10 ">               
                <a onClick={this.beritaShow} className="pull-right btn btn-rounded btn-big btn-noborder btn-success min-width-150 "><span className="p-5 text-white">Tambah Berita</span></a>               
                <button type="button" onClick={()=>this.editPendanaan(3)}  className="pull-right btn btn-rounded btn-big btn-noborder btn-info min-width-150 mr-10"><span className="p-5 text-white">Edit Penggalangan</span></button>              
              </span>
            </div>
          </div>
          <div className="row mt-5 pt-5">
            <div className="col-md-12 mt-5 pt-5">
              <div className="row">
                <div className="col-12 col-md-12">
                  <div className="">
                    <div className="mt-30">                        
                        <div className="row mt-30">
                          <div className="col-sm-12 col-xs-12 col-md-6">
                            <div className="block">
                              <div className="block-content">
                                <br />
                                <h1 className="font-bold-x3 text-primary pt-30 font-w700">3.0000.000.000</h1>
                                <p className="text-dark">Dana Terkumpul</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-12 col-xs-12 col-md-6">
                            <div className="block">
                              <div className="block-content">
                                <br />
                                <h1 className="font-bold-x3 text-primary pt-30 font-w700">11.000</h1>
                                <p className="text-dark">Jumlah Donatur</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-12 col-xs-12 col-md-6 pl-30 pr-30">
                              
                              <h3 className="block-title text-muted mb-10 font-w600">Terkumpul <span className="pull-right">50%</span></h3>
                              <h6><span className="text-info text-bold">Rp. 3.000.000.000 </span> dari Rp. 3.200.000.000</h6>
                              <div className="progress" style={{borderRadius: '10px', height: '10px'}}>
                                <div className="progress-bar" role="progressbar" style={{width: '50%'}} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
                              </div>
                          </div>
                          <div className="col-sm-12 col-xs-12 col-md-6 pl-30 pr-30">
                            <h3 className="block-title text-muted mb-10 font-w600">Masa Penggalangan <span className="pull-right">30 Hari</span></h3>
                            <h6>Tanggal berakhir :  20 April 2020</h6>
                          </div>
                          
                        </div>
                      </div>
                  </div>
                  {/* Berita */}
                  <div className="block mt-30" style={{ display : this.state.beritaView ? "block" : "none"}}>
                      <div className="col-md-12 m-5">
                          <div className="row">
                            
                            <div className="col-12">                              
                              <div className="form-group ">
                                <h3 className="text-dark font-w600 mt-5">Tulis Berita</h3> 
                                <label className="col-12" htmlFor="example-text-input">Judul Berita</label>
                                <div className="form-group ">
                                  <input type="text" className="form-control form-lg col-8" id="example-text-input" name="example-text-input" placeholder="Judul Berita" />                                                                                            
                                </div>
                              </div>
                              <div className=" form-group mt-4">
                                <label className="col-8 ">Pilih Gambar Sampul <span style={{color:"red"}}> * </span></label>
                                  <div className="custom-file">                                 
                                    <input type="file" className="custom-file-input" id="txt_gambar" name="txt_gambar" data-toggle="custom-file-input" /> 
                                    <label className="custom-file-label" htmlFor="txt-upload-gambar">Sampul-Berita.png</label>      

                                </div>
                              </div>
                            </div>
                         
                            <div className="col-12 mt-5">
                              <div className="row mt-5">                                                                                                 
                                <div className="col-md-12">
                                  <h5 className="text-dark mt-0 pt-0 font-w600">Deskripsi</h5> 
                                </div>                                                                                                             
                                <div className="col-md-12 col-sm-12">
                                  <div className="form-group">
                                    <Editor
                                        // da
                                        apiKey="mhp17l3vtk8bvksqyif612o58zmr7co3f0jdyamlzmt714p0" 
                                        initialValue="<p>This is the initial content of the editor</p>"
                                        init={{
                                        height: 500,
                                        menubar: false,
                                        plugins: [
                                            'advlist autolink lists link image charmap print preview anchor',
                                            'searchreplace visualblocks code fullscreen',
                                            'insertdatetime media table paste code help wordcount'
                                        ],
                                        toolbar:
                                            'undo redo | formatselect | bold italic backcolor | \
                                            alignleft aligncenter alignright alignjustify | \
                                            bullist numlist outdent indent | removeformat | help'
                                        }}
                                        onEditorChange={this.handleEditorChange}
                                    />                                                                                       
                                  </div>
                                </div>
                                <div className="col-md-12 col-sm-12 mb-30">
                                  <div className="row">
                                    <div className="col-12 mt-4 mb-3">
                                      <h6 className="text-muted">Status : Tidak Tayang</h6>
                                    </div>
                                    <div className="col-md-12 col-sm-12">                                      
                                      <button onClick={this.beritaShow} className="btn btn-secondary btn-lg mr-10">Batal</button>
                                      <button onClick={this.beritaShow} class="btn btn-success btn-lg pull-right" type="submit" >Posting Berita</button>
                                    </div>                                    
                                  </div>
                                </div>
                              </div>
                            </div>         
                        </div>
                      </div>
                  </div>
                  {/* Berita */}
                  {/* TAB */}
                  
                  
                  <div className="block mt-30" style={{ display : this.state.beritaView ? "none" : "block"}}>                    
                    <Nav tabs className="nav nav-tabs nav-tabs-alt nav-fill" role="tablist">
                      <NavItem className="nav-item">
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '1' +  'nav-link' })}
                          onClick={() => { this.toggle('1'); }}>
                          Daftar Berita untuk Donatur
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '2' + 'nav-link' })}
                          onClick={() => { this.toggle('2'); }}>
                          Daftar Donatur
                        </NavLink>
                      </NavItem>
                    </Nav>
                    {/* TABCONTENT */}
                    <div className="block-content block-content-full tab-content pl-30 pr-30" style={{minHeight: '274px'}}>
                      <TabContent className="tab-pane active pb-30"  activeTab={this.state.activeTab}>
                        <TabPane className="layout" tabId="1">
                          { this.state.activeTab == 1 ? 
                            tabDetailBerita
                            : null 
                            }
                        </TabPane>
                        <TabPane tabId="2">
                          { this.state.activeTab == 2 ? 
                            tabDetailDonatur
                          : null }
                        </TabPane>
                      </TabContent>
                      {/* TABCONTENT */}
                    </div>
                    {/* TAB */}
                  </div>
                </div>
              </div>                           
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>

    )
  }
}

export default Detail_pendanaan;