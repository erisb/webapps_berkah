import React, { Component, useState } from 'react';
import LayoutAdmin from "../../components/LayoutAdmin";
import { Editor} from '@tinymce/tinymce-react';
import {URL, API_KEY_TINY} from "../../constant/constant_func"							
import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import {loadState} from "../../constant/localStorage";
import Swal from 'sweetalert2';
import NumberFormat from 'react-number-format';
import Router from 'next/router';

class Edit_pendanaan extends Component{
  static getInitialProps({query}) {
    return {query}
  }
  userData;
  constructor(props){
    super(props)

    this.state = {
      id:'',
      id_status_pendanaan: '',
      start_proyek : '',
      end_proyek : '',
      start_funding : '',
      end_funding : '',
      nama_pendanaan:'',
      dana_dibutuhkan:'',
      durasi_proyek_hari:0,
      durasi_penggalangan_hari:0,
      status_batas_waktu:false,
      video:'',
      deskripsi:'',
      cerita : '',
      format_nominal : "",
      tipe_pendanaan:[],
      yayasan:[],
      tipe_pendanaan_data:'',
      yayasan_data:'',
      file : [],
      selectedFile: null,
      startDate: new Date(),
      session_username:'',
      fields : {},
      errors : {},
      showDivWaktu : true,
      showDivDana : true,
      showDivEstimasi : true,
    }
    
  }
 
  componentDidMount(){
    this.userData = JSON.parse(localStorage.getItem('session_login'));
    
    if (localStorage.getItem('session_login')) {
      this.GetData(this.props.query.id);
      this.fetchData();
      this.getSession();
    } else {
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

  

  // fetch data yayasan dan tipe pendanaan
  fetchData=()=>{
    axios({
      method: 'get',
      url: URL+'/admin_sosial/fetchAddPendanaan/',
      responseType: 'stream'
    }).then((result) => {
          console.log(result);
          this.setState({
            tipe_pendanaan : result.data.pendanaan,
            yayasan:result.data.yayasan
          });
        },
        (error) => {
          this.setState({ error });
        }
      )
  } 

  componentWillUnmount(){
    // this.wizardPlugin('destroy');
  }

  // show list tipe pendanaan
  m_tipe_pendanaan(){
    
    return this.state.tipe_pendanaan.map((item, index)=>{
    
    return( 

        <option key={item.id} selected={this.state.tipe_pendanaan_data == item.id} value={item.id}> {item.nama} </option>
      
      )
    }) 

  }

  // show list yayasan
  m_yayasan(){
    return this.state.yayasan.map((item, index)=>{
      return(
      <option key={item.nama} selected={this.state.yayasan_data == item.nama} value={item.nama}>{item.nama}</option>
      )
    })
  }

  setStartProyek = (date) => {
    this.setState({
      start_proyek: date
    });
  };

  setEndProyek = (date) => {
    let timeDiff = Math.abs(date.getTime() - this.state.start_proyek.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    this.setState({
      end_proyek: date,
      durasi_proyek_hari : diffDays
    });
  };

  setStartFunding = (date) => {
    let timeDiff = Math.abs(this.state.end_funding.getTime() - date.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))-1;

    this.setState({
      start_funding: date,
      durasi_penggalangan_hari : diffDays
    });
  };

  setEndFunding = (date) => {
    let timeDiff = Math.abs(date.getTime() - this.state.start_funding.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    this.setState({
      end_funding: date,
      durasi_penggalangan_hari : diffDays
    });
  };
  
  // handleChangeStatus=()=>{
  //   this.setState({status_batas_waktu:!this.state.status_batas_waktu});
  // }
  
  handleEditorChange = (content, editor) => {
    this.setState({deskripsi:content})
  }

  UploadFoto(e) {
    this.setState({
      file:e.target.files[0],
      file_name:e.target.files[0].name
    });
  }

  onFileChange = event => { 
     
    // Update the state 
    this.setState({ 
      selectedFile: event.target.files[0],
      file_name: event.target.files[0].name
    }); 
   
  }; 

  // get detail data pendanaan
  GetData=(id)=>{
    
    axios({
      method: 'get',
      url: URL+'/admin_sosial/getDataPendanaan/'+id,
      data: '',
      responseType: 'stream'
    }).then(
      (result) => {
        this.setState({

          id : result.data.pendanaan.id_pendanaan_sosial,
          id_status_pendanaan : result.data.pendanaan.id_status_pendanaan,
          nama_pendanaan:result.data.pendanaan.nama_pendanaan,
          start_proyek : new Date(result.data.pendanaan.mulai_pendanaan),
          end_proyek : new Date(result.data.pendanaan.selesai_pendanaan),
          start_funding : new Date(result.data.pendanaan.mulai_penggalangan),
          end_funding : new Date(result.data.pendanaan.selesai_penggalangan),
          durasi_proyek_hari:result.data.pendanaan.masa_pendanaan,
          durasi_penggalangan_hari:result.data.pendanaan.masa_penggalangan,
          dana_dibutuhkan: result.data.pendanaan.total_dibutuhkan,
          tipe_pendanaan_data : result.data.pendanaan.id_tipe_pendanaan,
          status_batas_waktu : result.data.pendanaan.status_batas_waktu,
          yayasan_data : result.data.pendanaan.nama_yayasan, 
          deskripsi:result.data.pendanaan.cerita,
          foto:result.data.pendanaan.file,
          video : result.data.pendanaan.video
         
        });

        if(result.data.pendanaan.id_tipe_pendanaan == 1){
          
          if(result.data.pendanaan.status_batas_waktu == 1){
            this.setState({

              showDivWaktu : false,
              showDivDana : true
      
            });

          }else{
             this.setState({
                showDivWaktu : true,
                showDivDana : true,
                showDivEstimasi : true
        
              });
          }
         
        }else{
          this.setState({
            showDivWaktu : false,
            showDivDana : false,
            showDivEstimasi : false
    
          });
        }

     
        
      },
      (error) => {
        this.setState({ error });
      }
    )
  }

  handleChange(field, e){

    let fields = this.state.fields;
    fields[field] = e.target.value;    
    console.log(e.target.name);
    if(e.target.name == "txt_jenis_akad_pendanaan" && e.target.value == 2 || e.target.value == 3 || e.target.value == 4 || e.target.value == 5 || e.target.value == 6){
      
      this.setState({
        showDivWaktu : false,
        showDivDana : false,
        showDivEstimasi : false

      });
     
    }
    else{
      this.setState({
        showDivWaktu : true,
        showDivDana : true,
        showDivEstimasi : true

      });
     }

  }

  handleChangeStatusWaktu=()=>{

    if(!this.state.status_batas_waktu){
      this.setState({
        status_batas_waktu:!this.state.status_batas_waktu,
        showDivWaktu : false
      });
    }else{
      this.setState({
        status_batas_waktu:!this.state.status_batas_waktu,
        showDivWaktu : true
      });
    }
  }
  
  handleValidation(){

    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //console.log(this.state.yayasan_data);

    if (this.state.deskripsi == "" ) {
      formIsValid = false;
      errors["deskripsi"] = "Tidak Boleh Kosong";
    }
    
    
    if(this.state.tipe_pendanaan_data == 2 || this.state.tipe_pendanaan_data == 3 || this.state.tipe_pendanaan_data == 4 || this.state.tipe_pendanaan_data == 5 || this.state.tipe_pendanaan_data == 6){
      
      if(this.state.yayasan_data == 0){
        formIsValid = false;
        errors["tipe_yayasan"] = "Tidak Boleh Kosong";
      }
      
      if(this.state.nama_pendanaan == "" ){
        formIsValid = false;
        errors["nama_pendanaan"] = "Tidak Boleh Kosong";
      }

    }
    
    else{
      if(this.state.tipe_pendanaan_data == 0){
        formIsValid = false;
        errors["tipe_pendanaan"] = "Tidak Boleh Kosong";
      }
      if(this.state.yayasan_data == 0){
        formIsValid = false;
        errors["tipe_yayasan"] = "Tidak Boleh Kosong";
      }
      
      if(this.state.nama_pendanaan == "" ){
        formIsValid = false;
        errors["nama_pendanaan"] = "Tidak Boleh Kosong";
      }

      if(this.state.dana_dibutuhkan == ""  || this.state.dana_dibutuhkan <= 0){
        formIsValid = false;
        errors["dana_dibutuhkan"] = "Tidak Boleh Kosong";
      }
      if(this.state.status_batas_waktu == false){
        if(this.state.end_funding.getTime() <= this.state.start_funding.getTime()){
          formIsValid = false;
          errors["tanggal_selesai"] = "Tanggal Selesai Lebih Kecil Dari Tanggal Mulai";
        }
      }
      
    }
    this.setState({errors: errors});
    return formIsValid;

  }
  
  saveEditData = () => {

    let mulaiDate = this.state.start_funding.toLocaleDateString('id-ID', { timeZone: 'Asia/Jakarta', day: '2-digit'}).slice(0,10).replace(/-/g,'');
    let mulaiMonth = this.state.start_funding.toLocaleDateString('id-ID', { timeZone: 'Asia/Jakarta', month: '2-digit'}).slice(0,10).replace(/-/g,'');
    let mulaiYear = this.state.start_funding.toLocaleDateString('id-ID', { timeZone: 'Asia/Jakarta', year: 'numeric'}).slice(0,10).replace(/-/g,'');

    let akhirDate = this.state.end_funding.toLocaleDateString('id-ID', { timeZone: 'Asia/Jakarta', day: '2-digit'}).slice(0,10).replace(/-/g,'');
    let akhirMonth = this.state.end_funding.toLocaleDateString('id-ID', { timeZone: 'Asia/Jakarta', month: '2-digit'}).slice(0,10).replace(/-/g,'');
    let akhirYear = this.state.end_funding.toLocaleDateString('id-ID', { timeZone: 'Asia/Jakarta', year: 'numeric'}).slice(0,10).replace(/-/g,'');
    

    let data={
      

      id                        : this.state.id,
      id_status_pendanaan                        : this.state.id_status_pendanaan,
      nama_pendanaan            : this.state.nama_pendanaan,
      yayasan                   : this.state.yayasan_data,
      dana_dibutuhkan           : this.state.dana_dibutuhkan,
      tipe_pendanaan_data       : this.state.fields.tipe_pendanaan == null ? this.state.tipe_pendanaan_data : this.state.fields.tipe_pendanaan,
     
      start_funding             : mulaiYear+'-'+mulaiMonth+'-'+mulaiDate,
      end_funding               : akhirYear+'-'+akhirMonth+'-'+akhirDate,
      durasi_penggalangan_hari  : this.state.durasi_penggalangan_hari,
      status_batas_waktu        : this.state.status_batas_waktu == true ? 1 : this.state.status_batas_waktu,
      //status_batas_waktu        : this.state.status_batas_waktu ? (1)  : 0,
      deskripsi                 : this.state.deskripsi,
      video                     : this.state.video,
    }

    let formData = new FormData(); 

    if(this.handleValidation()){
      if(this.state.selectedFile == '' || this.state.selectedFile == null){
        //console.log(data);
        this.postData(data);

      }else{

        let formData = new FormData(); 
        formData.append( 
          "myFile", 
          this.state.selectedFile, 
          this.state.selectedFile.name
        );
        formData.append('id_pendanaan', this.state.id);
        axios(
        {
          method: 'post',
          url: URL+'/admin_sosial/UploadGambarPendanaan/',
          data : formData,
    
        }).then((result) => {
            this.postData(data);
            Swal.fire("Sukses", "Data Berhasil disimpan","success").then( () => {
              Router.push('/admin/pendanaan');
           })
            
        })
  
      }
    }
    else{
      Swal.fire("Gagal", "Ups, Ada yg kelewat inputnnya","error");
    }

    
    
  }

  postData=(data)=>{
    axios({
      method: 'post',
      url: URL+'/admin_sosial/EditDataPendanaan/',
      data: data,
      responseType: 'stream'
    }).then(
      (result) => {
        if(result.data.status=='Sukses Insert'){
          Swal.fire("Sukses", "Data Berhasil disimpan","success").then( () => {
            Router.push('/admin/pendanaan');
         })
        }else{
          Swal.fire("Gagal", "Maaf Proses Gagal, Silahkan Hubungi Administrator","error").then( () => {
            Router.push('/admin/pendanaan');
         })
        }
      },
      (error) => {
        console.log(error);
        this.setState({ error });
      }
    )
  }
  
  
  

  render(){
    return(
      
      <LayoutAdmin title='Edit Pendanaan' username={this.state.session_username}>
      <div id="detect-screen" className="content-full-right">
      <div className="container">
        <div className="row">
          <div id="col" className="col-12 col-md-12 mt-30">
            <span className="mb-10 pb-10 ">
              <h1 className="no-paddingTop font-w400" style={{float: 'left', marginBlockEnd: '0em', color: '#31394D'}}>Edit Penggalangan Dana</h1>
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
                    <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{width: '100%'}} aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} />
                  </div>
                
                  <form method="POST" encType="multipart/form-data">
                    {/* Steps Content */}
                    <div className="block-content block-content-full tab-content" style={{minHeight: '274px'}}>
                      {/* Step 1 */}
                      {/* END Step 1 */}
                      {/* Step 2 */}
                      <div className="tab-pane active" id="wizard-progress2-step1" role="tabpanel">
                        <div id="layout-x">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="row">
                                {/* baris pemisah */}
                                <div className="col-12">
                                  <br></br>
                                  <h3 className="content-heading text-dark mt-0 pt-0 font-w600">Gambar Utama</h3>
                                </div>
                                <div className=" col-12 form-group row">
                                <div className="col-md-6 mt-4">
                                    
                                    <div className="custom-file">
                                        <img width="400px" height="250px" src={this.state.foto}></img>   
                                    </div>
                                  </div>

                                  <div className="col-md-6 mt-4">
                                  <iframe width="500" height="250" src={this.state.video} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                  </div>
                                  
                                  <div className="col-md-6 mt-4">
                                    <label className="col-12 ">Pilih Gambar</label>
                                      <div className="custom-file">
                                        {/* Populating custom file input label with the selected filename (data-toggle="custom-file-input" is initialized in Helpers.coreBootstrapCustomFileInput()) */}
                                        
                                        <input type="file" onChange={this.onFileChange} className="custom-file-input" id="txt_gambar" name="txt_gambar" data-toggle="custom-file-input" /> 
                                        {/* <input type="file" onChange={this.onFileChange} className="custom-file-input" id="txt_gambar" name="txt_gambar" data-toggle="custom-file-input" /> <button onClick={this.onFileUpload}>Upload!</button>  */}
                                        {/* <input type="file" onChange={this.UploadFoto} className="custom-file-input" id="example-file-input-custom" name="txt-upload-gambar" data-toggle="custom-file-input" /> */}
                                        <label className="custom-file-label" htmlFor="txt-upload-gambar">{this.state.file_name}</label>      
                                    </div>
                                  </div>

                                  <div className="col-md-6 mt-4">
                                    <label className="col-12 ">Youtube Video Url</label>
                                    <div className="form-group ">
                                        <input type="text" onChange={(input) => this.setState({video:input.target.value})} className="form-control" id="example-text-input" name="example-text-input" placeholder="copy url Video disini..." />                                                                                            
                                    </div>
                                  </div>
                                </div>
                                {/* SATU BARIS  */}
                                <div className="form-group col-12">
                                  <br></br>
                                  <h3 className="content-heading text-dark mt-0 pt-0 font-w600">Informasi Pendanaan</h3>
                                </div>
                                
                                {/* satuBaris */}
                                <div className="form-group col-md-3">
                                  <div className="form-group">
                                    <label htmlFor="wizard-progress2-ktp">Tipe Pendanaan</label>
                                    <select className="form-control" onChange={this.handleChange.bind(this, "tipe_pendanaan")} id="txt_jenis_akad_pendanaan" name="txt_jenis_akad_pendanaan">
                                   
                                   
                                    {/* <select className="form-control" onChange={(e) =>{this.setState({ tipe_pendanaan_data: e.target.value }); }} id="txt_jenis_akad_pendanaan" name="txt_jenis_akad_pendanaan"> */}
                                    <option value="0"> Pilih </option>
                                      {this.m_tipe_pendanaan()}
                                    </select>
                                    <span style={{color: "red"}}>{this.state.errors["tipe_pendanaan"]}</span>
                                  </div>
                                </div>
                                <div className="form-group col-md-3">
                                  <div className="form-group">
                                    <label htmlFor="wizard-progress2-ktp">Nama Yayasan</label>
                                    {/* <select className="form-control" onChange={this.handleChange.bind(this, "tipe_yayasan")} id="txt_nama_yayasan" name="txt_nama_yayasan"> */}
                                    <select className="form-control" onChange={(e) =>{this.setState({ yayasan_data: e.target.value });}} id="txt_nama_yayasan" name="txt_nama_yayasan">
                                      <option value="0"> Pilih </option>
                                      {this.m_yayasan()}
                                    </select>
                                    <span style={{color: "red"}}>{this.state.errors["tipe_yayasan"]}</span>
                                  </div>
                                </div>
                                <div className="col-md-9">
                                </div>
                                {/* satuBaris */} 
                                {/* satuBaris */}
                                <div className=" form-group col-md-6">
                                  <div className="form-group">
                                    <label htmlFor="wizard-progress2-tempatlahir">Nama Pendanaan</label>
                                    <input className="form-control" type="text" value={this.state.nama_pendanaan} onChange= { (input)=>  this.setState({nama_pendanaan:input.target.value}) } placeholder="Masukkan Nama Pendanaan..." />  
                                    <span style={{color: "red"}}>{this.state.errors["nama_pendanaan"]}</span>
                                  </div>
                                </div>
                                <div className=" form-group col-md-4" style={{ display: this.state.showDivDana ? "block" : "none" }}>
                                  <div className="form-group">
                                    <label htmlFor="wizard-progress2-tempatlahir">Dana Dibutuhkan </label>
                                    <NumberFormat className="form-control" displayType={'input'} allowNegative={false} value={this.state.dana_dibutuhkan} onValueChange={(values) => { const {formattedValue, value} = values; this.setState({dana_dibutuhkan:value, format_nominal:formattedValue})}} thousandSeparator={true} />
                                    <span style={{color: "red"}}>{this.state.errors["dana_dibutuhkan"]}</span>
                                    {/* <input className="form-control" type="text" value={this.state.dana_dibutuhkan} onChange= { (input)=>  this.setState({dana_dibutuhkan:input.target.value}) } placeholder="Masukkan dana yang anda butuhkan..." />   */}
                                  </div>
                                </div>

                                <div className="col-12">
                                  <br></br>
                                  <h3 className="content-heading text-dark mt-0 pt-0 font-w600" style={{ display: this.state.showDivEstimasi ? "block" : "none" }}>Informasi Waktu</h3>
                                </div>
                                {/* satuBaris */}
                                <div className="form-group col-md-3" style={{ display: "none" }}>
                                <div className="form-group">
                                  <label htmlFor="wizard-progress2-ktp">Estimasi Mulai Pendanaan</label>
                                  <DatePicker
                                    className="form-control"
                                    selected={this.state.start_proyek}
                                    onChange={date => this.setStartProyek(date)}
                                    dateFormat="dd/MM/yyyy"
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                  />
                                </div>
                              </div>
                              <div className="form-group col-md-3" style={{ display: "none" }}>
                                <div className="form-group">
                                  <label htmlFor="wizard-progress2-ktp">Estimasi Akhir Pendanaan</label>
                                  <DatePicker
                                    className="form-control"
                                    selected={this.state.end_proyek}
                                    onChange={date => this.setEndProyek(date)}
                                    dateFormat="dd/MM/yyyy"
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                  />
                                </div>
                              </div>
                              <div className="form-group col-md-4" style={{ display: "none" }}>
                                <div className="form-group pb-0 mb-0">
                                  <label htmlFor="wizard-progress2-ktp">Durasi Pendanaan/Tenor</label>
                                </div>
                                <div className="input-group">
                                  <input className="form-control" type="text" value={this.state.durasi_proyek_hari} placeholder="Estimasi Hari" disabled />  
                                  <div className="input-group-append">
                                    <span className="input-group-text input-group-text-dsi"> Hari
                                    </span>
                                  </div>
                                </div>
                              </div>  
                                {/* satuBaris */}
                                <div className=" form-group col-md-3" style={{ display: this.state.showDivDana ? "block" : "none" }}>
                                <div className="form-group">
                                  <label htmlFor="wizard-progress2-ktp">Estimasi Mulai Penggalangan</label>
                                  <DatePicker
                                    className="form-control"
                                    selected={this.state.start_funding}
                                    onChange={date => this.setStartFunding(date)}
                                    dateFormat="dd/MM/yyyy"
                                    minDate={new Date()}
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                  />
                                </div>
                              </div>
                              <div className=" form-group col-md-3" style={{ display: this.state.showDivWaktu ? "block" : "none" }}>
                                <div className="form-group">
                                  <label htmlFor="wizard-progress2-ktp">Estimasi Akhir Penggalangan</label>
                                  <DatePicker
                                    className="form-control"
                                    selected={this.state.end_funding}
                                    onChange={date => this.setEndFunding(date)}
                                    dateFormat="dd/MM/yyyy"
                                    minDate={new Date()}
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                  />
                                  <span style={{color: "red"}}>{this.state.errors["tanggal_selesai"]}</span>
                                </div>
                              </div>
                              <div className="form-group col-md-4" style={{ display: this.state.showDivWaktu ? "block" : "none" }}>
                                <div className="form-group pb-0 mb-0">
                                  <label htmlFor="wizard-progress2-ktp">Lama Penggalangan Dana</label>
                                </div>
                                <div className="input-group">
                                  <input className="form-control" type="text" value={this.state.durasi_penggalangan_hari}  placeholder="Estimasi Hari" disabled />  
                                  <div className="input-group-append">
                                    <span className="input-group-text input-group-text-dsi"> Hari
                                    </span>
                                  </div>
                                </div>
                              </div>  
                                <div className="form-group col-md-8" style={{ display: this.state.showDivEstimasi ? "block" : "none" }}>
                                  <div className="form-group row mt-10">
                                    <label className="col-12">Pilih jika tanpa batas waktu</label>
                                    <div className="col-12">
                                      <label className="css-control css-control-primary css-radio mr-10 text-dark mt-5">
                                        <input type="checkbox" className="css-control-input" checked={this.state.status_batas_waktu} onChange={this.handleChangeStatusWaktu} />
                                        <span className="css-control-indicator" /> Tanpa Batas Waktu
                                      </label>
                                    </div>
                                  </div>
                                </div> 

                                {/* page 2 */}
                                <div className="form-group col-md-12">
                                  <div className="row"> 
                                    <div className="col-12">
                                      <br></br>
                                      <h3 className="content-heading text-dark mt-0 pt-0 font-w600">Tulis Cerita Kepada Calon Donatur</h3>
                                    </div>
                                    <div className="col-md-12">
                                      
                                      <div className="form-group row">
                                        <label className="col-12">Deskripsi <span style={{color:"red"}}> * </span> <span style={{color: "red"}}>{this.state.errors["deskripsi"]}</span> </label>
                                        <div className="col-12 col-sm-12">
                                          <div className="block-content block-content-full ">
                                              <Editor
                                                  // da
                                                  apiKey={API_KEY_TINY}
                                                  initialValue={this.state.deskripsi}
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
                                      </div>
                                    </div>         
                                  </div>
                                </div>
                                {/* end page 2 */}

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* END Step 2 */}
                      {/* END Steps Content */}
                      {/* Steps Navigation */}
                      <div className="block-content block-content-sm block-content-full bg-body-light">
                        <div className="row">
                          <div className="col-6">
                            <button type="button" className="btn btn-alt-secondary" data-wizard="prev">
                              <i className="fa fa-angle-left mr-5" /> Clear
                            </button>
                          </div>
                          <div className="col-6 text-right">
                            <button type="button" onClick={this.saveEditData} id="btn_lengkapi_profile" className="btn btn-alt-primary" data-wizard="finish">
                              <i className="fa fa-check mr-5" /> Submit
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* END Steps Navigation */}
                      {/* END Form */}
                    </div>
                    </form>
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

export default Edit_pendanaan;