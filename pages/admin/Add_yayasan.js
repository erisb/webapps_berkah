import React, { Component, useState } from 'react';
import LayoutAdmin from "../../components/LayoutAdmin";
import { Editor} from '@tinymce/tinymce-react';
import Router from 'next/router';
import swal from 'sweetalert';
import axios from 'axios';
import {URL, API_KEY_TINY} from "../../constant/constant_func"
import {loadState} from "../../constant/localStorage";
import Swal from 'sweetalert2';
import * as EmailValidator from 'email-validator';

class Add_yayasan extends Component{

  userData;
  constructor(props){
    
    super(props)
    this.state = {
      nama_yayasan : '',
      alamat : '',
      deskripsi:'',
      email : '',
      telepon : '',
      password:'',
      confirm_password:'',
      url_youtube:'',
      url_linkedin:'',
      url_website:'',
      file:'',
      id_twitter:'',
      id_instagram:'',
      id_facebook:'',
      file_name:'Pilih Foto'
    }
    this.UploadFoto = this.UploadFoto.bind(this);
  }
  
  componentDidMount(){
    this.userData = JSON.parse(localStorage.getItem('session_login'));
    
    if (localStorage.getItem('session_login')) {
      // 
    } else {
      location.href ="/admin/login";
      
    }
    
  }

  setAlamat = (content, editor) => {
    this.setState({alamat:content})
  }

  setDeskripsi = (content, editor) => {
    this.setState({deskripsi:content})
  }

  UploadFoto(e) {
    this.setState({
      file:e.target.files[0],
      file_name:e.target.files[0].name});
  }

  saveData=()=>{

    if(this.state.nama_yayasan=='' || this.state.nama_yayasan==undefined){
      return Swal.fire('Notifikasi', 'Nama Yayasan tidak boleh kosong', 'warning');
    }else if(this.state.file=='' || this.state.file==undefined){
      return Swal.fire('Notifikasi', 'Foto Profil tidak boleh kosong', 'warning');
    }else if(this.state.alamat=='' || this.state.alamat==undefined){
      return Swal.fire('Notifikasi', 'Alamat tidak boleh kosong', 'warning');
    }else if(this.state.deskripsi=='' || this.state.deskripsi==undefined){
      return Swal.fire('Notifikasi', 'Deskripsi tidak boleh kosong', 'warning');
    }else if(this.state.email=='' || this.state.email==undefined){
      return Swal.fire('Notifikasi', 'Email tidak boleh kosong', 'warning');
    }else if(this.state.telepon=='' || this.state.telepon==undefined){
      return Swal.fire('Notifikasi', 'Telepon tidak boleh kosong', 'warning');
    }else if(this.state.telepon.length < 5){
      return Swal.fire('Notifikasi', 'Format Nomor Telepon Terlalu Pendek', 'warning');
    }else if(this.state.password=='' || this.state.password==undefined){
      return Swal.fire('Notifikasi', 'Kata Sandi tidak boleh kosong', 'warning');
    }else if(this.state.confirm_password=='' || this.state.confirm_password==undefined){
      return Swal.fire('Notifikasi', 'Konfirmasi Kata Sandi tidak boleh kosong', 'warning');
    }else if(EmailValidator.validate(this.state.email)==false){
      return Swal.fire('Notifikasi', 'Format Email salah', 'warning');
    }else if(this.state.password!==this.state.confirm_password){
      return Swal.fire('Notifikasi', 'Konfirmasi Kata Sandi tidak sama dengan Kata Sandi yang anda masukkan', 'warning');
    }
    
    let formData = new FormData(); 
    // Update the formData object 
    formData.append('myFile',this.state.file);
    formData.append('file_name',this.state.file_name);

    let data={
      nama_yayasan : this.state.nama_yayasan,
      alamat : this.state.alamat,
      deskripsi: this.state.deskripsi,
      email : this.state.email,
      telepon : this.state.telepon,
      password: this.state.password,
      confirm_password: this.state.confirm_password,
      url_youtube: this.state.url_youtube,
      url_linkedin: this.state.url_linkedin,
      url_website: this.state.url_website,
      // file: this.state.file,
      id_twitter: this.state.id_twitter,
      id_instagram: this.state.id_instagram,
      id_facebook: this.state.id_facebook,
    }

    
    axios({
      method: 'post',
      url: URL+'/admin_sosial/AddYayasan/',
      data: data,
      responseType: 'stream'
    }).then(
      (result) => {
        console.log(result);
        if(result.data.status=='Sukses Insert'){
          formData.append('id_m_yayasan', result.data.id);
          axios(
            {
              method: 'post',
              url: URL+'/admin_sosial/UploadGambarCampaigner/',
              data : formData,
        
            }).then((result) => {
                console.log(result);
                swal("Sukses", "Data Berhasil disimpan","success").then( () => {
                  Router.push('/admin/yayasan');
               })
            },(error) => {
                this.setState({ error });
              }
          )
        }else{
          alert('Gagal Insert');
        }
      },
      (error) => {
        console.log(error);
        this.setState({ error });
      }
    )
  }

  onChangedPhoneNumber(text){
    let newText = '';
    let numbers = '0123456789';

    for (var i=0; i < text.length; i++) {
        if(numbers.indexOf(text[i]) > -1 ) {
            newText = newText + text[i];
        }
    }
    this.setState({ telepon: newText });
  };

  render(){

    return(
        <LayoutAdmin>
        <div id="detect-screen" className="content-full-right">
        <div className="container">
          <div className="row">
            <div id="col" className="col-12 col-md-12 mt-30">
              <span className="mb-10 pb-10 ">
                <h1 className="no-paddingTop font-w400" style={{float: 'left', marginBlockEnd: '0em', color: '#31394D'}}>Buat User Yayasan</h1>
                <span className="pull-right">
                  <h6 className=" font-w700" style={{float: 'left', marginBlockEnd: '0em', color: '#31394D'}}>1 dari 1 Langkah</h6>
                </span>
              </span>
            </div>
          </div>
          <div className="row mt-5 pt-5">
            <div className="col-md-12 mt-5 pt-5">
              <div className="row">
                <div className="col-12 col-md-12">
                  {/* Progress Wizard 2 */}
                  <div className="js-wizard-simple block">
                    {/* Wizard Progress Bar */}
                    <div className="progress rounded-0" data-wizard="progress" style={{height: '8px'}}>
                      <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{width: '30%'}} aria-valuenow={30} aria-valuemin={0} aria-valuemax={100} />
                    </div>
                    {/* END Wizard Progress Bar */}
                    {/* Step Tabs */}
                    <ul className="nav nav-tabs nav-tabs-alt nav-fill" role="tablist">
                      <li className="nav-item">
                        <a className="nav-link" href="#wizard-progress2-step1" data-toggle="tab"></a>
                      </li>
                    </ul>
                    {/* END Step Tabs */}
                    {/* Form */}
                    {/*<form id="form_lengkapi_profile" action="{{route('borrower.action_lengkapi_profile')}}" method="POST">*/}
                    <form id="form_lengkapi_profile" method="POST" encType="multipart/form-data">
                      {/* Steps Content */}
                      <div className="block-content block-content-full tab-content" style={{minHeight: '274px'}}>
                        {/* Step 1 */}
                        {/* END Step 1 */}
                        {/* Step 2 */}
                        <div className="tab-pane active" id="wizard-progress2-step1" role="tabpanel">
                          <div id="layout-x">
                            <div className="col-md-12">
                                <div className="row"> 
                                    <div className="col-md-12">
                                    {/* baris pemisah */}
                                    

                                    <div className="form-group row">
                                        <div className="col-12 mt-4">
                                            <label className="col-12 ">Pilih Photo Profile</label>
                                            <div className="col-8 col-xs-12">
                                                <div className="custom-file">
                                                {/* Populating custom file input label with the selected filename (data-toggle="custom-file-input" is initialized in Helpers.coreBootstrapCustomFileInput()) */}
                                                <input type="file" onChange={this.UploadFoto} className="custom-file-input" id="example-file-input-custom" name="txt-upload-gambar" data-toggle="custom-file-input" />
                                                <label className="custom-file-label" htmlFor="txt-upload-gambar">{this.state.file_name}</label>                                                                                        
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="form-group row ml-3 pt-3">
                                            <label htmlFor="wizard-progress2-ktp">Nama Yayasan</label>
                                                <input className="form-control" type="text" onChange= { (input)=>  this.setState({nama_yayasan:input.target.value}) } placeholder="Masukkan Nama Yayasan..." />  
                                            </div>
                                        </div>
                                        
                                    </div>
                                    {/* SATU BARIS  */}
                                    <div className="form-group row">
                                        <label className="col-12">Alamat Kantor Yayasan</label>
                                        <div className="col-12 col-sm-12">
                                        <div className="block-content block-content-full ">
                                            <Editor
                                                // da
                                                apiKey={API_KEY_TINY}
                                                initialValue="<p>Alamat Kantor Yayasan...</p>"
                                                init={{
                                                height: 200,
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
                                                onEditorChange={this.setAlamat}
                                            />                                                                           
                                        </div>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-12">Deskripsi</label>
                                        <div className="col-12 col-sm-12">
                                        <div className="block-content block-content-full ">
                                            <Editor
                                                // da
                                                apiKey={API_KEY_TINY}
                                                initialValue="<p>Ceritakan tentang Yayasan Anda...</p>"
                                                init={{
                                                height: 300,
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
                                                onEditorChange={this.setDeskripsi}
                                            />                                                                           
                                        </div>
                                        </div>
                                    </div>
                                    </div>         
                                </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="row mb-5">
                                        {/* satuBaris */} 
                                        <div className="col-md-6">
                                            <div className="form-group row ml-4">
                                            <label htmlFor="wizard-progress2-tempatlahir">Alamat Email</label>
                                            <input className="form-control" type="text" onChange= { (input)=>  this.setState({email:input.target.value}) } placeholder="Masukkan Alamat Email..." />  
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group row ml-4">
                                            <label htmlFor="wizard-progress2-tempatlahir">Nomor Telepon</label>
                                            <input className="form-control" type="text" onChange= { (input)=>{this.setState({telepon:input.target.value}); this.onChangedPhoneNumber(input.target.value); } } value={this.state.telepon}  placeholder="Masukkan Nomor Telepon..." />  
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group row ml-4">
                                            <label htmlFor="wizard-progress2-tempatlahir">Buat Kata Sandi</label>
                                            <input className="form-control" type="password" onChange= { (input)=>  this.setState({password:input.target.value}) } placeholder="Masukkan Kata Sandi..." />  
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group row ml-4">
                                            <label htmlFor="wizard-progress2-tempatlahir">Ulangi Kata Sandi</label>
                                            <input className="form-control" type="password" onChange= { (input)=>this.setState({confirm_password:input.target.value}) } placeholder="Masukkan Ulangi Kata Sandi..." />  
                                            </div>
                                        </div>
                                        
                                        </div>
                                    </div>
                                </div>
                                <h6 className="content-heading text-muted font-w600" style={{fontSize: '1em'}}>Akun Sosial Media</h6>   
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="row mb-5">
                                        {/* satuBaris */} 
                                        <div className="col-md-6">
                                            <div className="form-group row ml-4">
                                            <label htmlFor="wizard-progress2-tempatlahir">Url Youtube</label>
                                            <input className="form-control" type="text" onChange= { (input)=>  this.setState({url_youtube:input.target.value}) } placeholder="Masukkan Url..." />  
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group row ml-4">
                                            <label htmlFor="wizard-progress2-tempatlahir">ID Instagram</label>
                                            <input className="form-control" type="text" onChange= { (input)=>this.setState({id_instagram:input.target.value}) } placeholder="Masukkan username..." />  
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group row ml-4">
                                            <label htmlFor="wizard-progress2-tempatlahir">ID Twitter</label>
                                            <input className="form-control" type="text" onChange= { (input)=>  this.setState({id_twitter:input.target.value}) } placeholder="Masukkan username..." />  
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group row ml-4">
                                            <label htmlFor="wizard-progress2-tempatlahir">ID Facebook</label>
                                            <input className="form-control" type="text" onChange= { (input)=>this.setState({id_facebook:input.target.value}) } placeholder="Masukkan username..." />  
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group row ml-4">
                                            <label htmlFor="wizard-progress2-tempatlahir">Url LinkedIn</label>
                                            <input className="form-control" type="text" onChange= { (input)=>  this.setState({url_linkedin:input.target.value}) } placeholder="Masukkan user..." />  
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group row ml-4">
                                            <label htmlFor="wizard-progress2-tempatlahir">Url Website</label>
                                            <input className="form-control" type="text" onChange= { (input)=>this.setState({url_website:input.target.value}) } placeholder="http://websiteanda.com" />  
                                            </div>
                                        </div>
                                        
                                        </div>
                                    </div>
                                </div>
                          </div>
                        </div>
                        {/* END Step 2 */}
                        {/* Step 3 */}
                        <div className="tab-pane" id="wizard-progress2-step2" role="tabpanel">
                          {/* 1 */}
                          <div className="layout-dokumen">
                            <div className="row">
                              
                            </div>
                            {/* ./ 1 */}
                          </div>
                        </div>
                        {/* END Steps Content */}
                        {/* Steps Navigation */}
                        <div className="block-content block-content-sm block-content-full bg-body-light">
                          <div className="row">
                            <div className="col-6">
                              <button type="button" className="btn btn-alt-secondary" >
                                <i className="fa fa-trash mr-5" /> Hapus Data
                              </button>
                            </div>
                            <div className="col-6 text-right">
                              <button type="button" onClick={this.saveData} id="btn_lengkapi_profile" className="btn btn-alt-primary">
                                <i className="fa fa-check mr-5" /> Simpan
                              </button>
                            </div>
                          </div>
                        </div>
                        {/* END Steps Navigation */}
                        {/* END Form */}
                      </div></form>
                    {/* END Progress Wizard 2 */}   
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

export default Add_yayasan;