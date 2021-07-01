import React, { Component, useState } from 'react';
import LayoutAdmin from "../../components/LayoutAdmin";
import { Editor} from '@tinymce/tinymce-react';
import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";
import swal from 'sweetalert';
import axios from 'axios';
import {URL, API_KEY_TINY} from "../../constant/constant_func";
import { Router } from 'next/router';
import {loadState} from "../../constant/localStorage";
import NumberFormat from 'react-number-format';


class Add_pendanaan extends Component{
  userData; 
  constructor(props){
    super(props)

    this.state = {
      start_proyek : new Date,
      end_proyek : new Date,
      start_funding : new Date,
      end_funding : new Date,
      today : new Date,
      nama_pendanaan:'',
      dana_dibutuhkan:'',
      durasi_proyek_hari:0,
      durasi_penggalangan_hari:0,
      status_batas_waktu:false,
      video:'',
      deskripsi:'',
      tipe_pendanaan:[],
      yayasan:[],
      tipe_pendanaan_data:'',
      yayasan_data:'',
      file : [],
      file_name:'Pilih Foto',
      selectedFile: null,
      fields : {},
      errors : {},
      nominal:'0',
      format_nominal:'',
      showDivWaktu : true,
      showDivDana : true,
      showDivEstimasi : true,
    }
    this.UploadFoto = this.UploadFoto.bind(this);
    
  }

   // show list tipe pendanaan
  m_tipe_pendanaan(){
    return this.state.tipe_pendanaan.map((item, index)=>{
    return(                                   
        <option key={item.name} value={item.id}> {item.nama} </option>
      )
      }) 
  }

  // show list yayasan
  m_yayasan(){
    return this.state.yayasan.map((item, index)=>{
      return(
      <option key={item.nama} value={item.nama}>{item.nama}</option>
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
    this.setState({
      start_funding: date
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
  
  // fetch data yayasan dan tipe pendanaan
  fetchData=()=>{
    axios({
      method: 'get',
      url: URL+'/admin_sosial/fetchAddPendanaan/',
      responseType: 'stream'
    }).then((result) => {
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

  // hide & show tanggal
  handleChangeStatusWaktu=()=>{
    //console.log(this.state.status_batas_waktu);
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
  
  // handle tipe pendanaan 
  handleChange(field, e){
  
    let fields = this.state.fields;
    fields[field] = e.target.value;        
    this.setState({fields});
    
    if(e.target.name == "txt_jenis_akad_pendanaan"){
      if(e.target.value == 2 || e.target.value == 3 || e.target.value == 4 || e.target.value == 5 || e.target.value == 6){
        
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
    
  }

  // validasi form & set error
  handleValidation(){

    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;



    if (this.state.selectedFile == null) {
      formIsValid = false;
      errors["poto_pendanaan"] = "Tidak Boleh Kosong";
    }
    if (this.state.deskripsi == "") {
      formIsValid = false;
      errors["deskripsi"] = "Tidak Boleh Kosong";
    }
    
    
    if(fields.tipe_pendanaan == 2 || fields.tipe_pendanaan == 3 || fields.tipe_pendanaan == 4 || fields.tipe_pendanaan == 5 || fields.tipe_pendanaan == 6){
      
      if(!fields["tipe_yayasan"]){
        formIsValid = false;
        errors["tipe_yayasan"] = "Tidak Boleh Kosong";
      }
      
      if(!fields["nama_pendanaan"]){
        formIsValid = false;
        errors["nama_pendanaan"] = "Tidak Boleh Kosong";
      }

    }
    
    else{

      if(!fields["tipe_pendanaan"]){
        formIsValid = false;
        errors["tipe_pendanaan"] = "Tidak Boleh Kosong";
      }
      if(!fields["tipe_yayasan"]){
        formIsValid = false;
        errors["tipe_yayasan"] = "Tidak Boleh Kosong";
      }
      
      if(!fields["nama_pendanaan"]){
        formIsValid = false;
        errors["nama_pendanaan"] = "Tidak Boleh Kosong";
      }

      if(!fields["dana_dibutuhkan"] || fields["dana_dibutuhkan"] < 0 || fields["dana_dibutuhkan"] == 0){
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
  
  // proses simpan
  saveData = (e) => {

    
    if(this.handleValidation()){
      
      let formData = new FormData(); 
      // Update the formData object 
      formData.append( 
        "myFile", 
        this.state.selectedFile, 
        this.state.selectedFile.name
      );
      let akhirDate = this.state.end_funding.toLocaleDateString('id-ID', { timeZone: 'Asia/Jakarta', day: '2-digit'}).slice(0,10).replace(/-/g,'');
      let akhirMonth = this.state.end_funding.toLocaleDateString('id-ID', { timeZone: 'Asia/Jakarta', month: '2-digit'}).slice(0,10).replace(/-/g,'');
      let akhirYear = this.state.end_funding.toLocaleDateString('id-ID', { timeZone: 'Asia/Jakarta', year: 'numeric'}).slice(0,10).replace(/-/g,'');
      
    // let formData = new FormData(); 
      let data={
        
        nama_pendanaan            :this.state.fields.nama_pendanaan,
        yayasan                   :this.state.fields.tipe_yayasan,
        tipe_pendanaan_data       :this.state.fields.tipe_pendanaan,
        dana_dibutuhkan           :this.state.nominal,
        //dana_dibutuhkan           :this.state.fields.dana_dibutuhkan,
        start_proyek              :this.state.start_proyek,
        end_proyek                :this.state.end_proyek,
        durasi_proyek_hari        :this.state.durasi_proyek_hari,
        start_funding             :this.state.start_funding,
        end_funding               :akhirYear+'-'+akhirMonth+'-'+akhirDate,
        durasi_penggalangan_hari  :this.state.durasi_penggalangan_hari,
        status_batas_waktu        :this.state.status_batas_waktu ? (1)  : 0,
        file                      :this.state.selectedFile,
        video                     :this.state.video,
        deskripsi                 :this.state.deskripsi,

      }
      axios({
        method: 'post',
        url: URL+'/admin_sosial/AddPendanaan/',
        data: data,
        //responseType: 'stream'
      }).then(
        (result) => {
          
          
          if(result.data.status == 'Sukses'){
            formData.append('id_pendanaan', result.data.id);
            axios(
            {
              method: 'post',
              url: URL+'/admin_sosial/UploadGambarPendanaan/',
              data : formData,
        
            }).then((result) => {
                swal("Sukses", "Data Berhasil disimpan","success").then( () => {
                  location.href = '/admin/pendanaan'
              })
                
            },(error) => {
                this.setState({ error });
              }
            )
          
          }else{
            swal("Error", "Ada Kesalahan Sistem, Silahkan Hubungi Administrator","error").then( () => {
              location.href = '/admin/pendanaan';
          })
          }

        },
        (error) => {
          this.setState({ error });
        }
      )


    }else{
      swal("Error", "Ups, Ada Yg belum Diinput","error");
    }
  }
 
  componentDidMount(){
    this.userData = JSON.parse(localStorage.getItem('session_login'));
    
    if (localStorage.getItem('session_login')) {
      // 
    } else {
      location.href ="/admin/login";
    }

    this.fetchData();
  }

  componentWillUnmount(){
    // this.wizardPlugin('destroy');
  }

   
 
  render(){
    
    return(
        <LayoutAdmin>
        <div id="detect-screen" className="content-full-right">
        <div className="container">
          <div className="row">
            <div id="col" className="col-12 col-md-12 mt-30">
              <span className="mb-10 pb-10 ">
                <h1 className="no-paddingTop font-w400" style={{float: 'left', marginBlockEnd: '0em', color: '#31394D'}}>Buat Penggalangan Dana</h1>
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
                                      <label className="col-12 ">Pilih Foto <span style={{color:"red"}}> * </span></label>
                                        <div className="custom-file">
                                          {/* Populating custom file input label with the selected filename (data-toggle="custom-file-input" is initialized in Helpers.coreBootstrapCustomFileInput()) */}
                                          {/* <input type="file" onChange={this.handleChange.bind(this, "poto_pendanaan")} className="custom-file-input" id="txt_gambar" name="txt_gambar" data-toggle="custom-file-input" />  */}
                                          <input type="file" onChange={this.onFileChange} className="custom-file-input" id="txt_gambar" name="txt_gambar" data-toggle="custom-file-input" /> 
                                          <label className="custom-file-label" htmlFor="txt-upload-gambar">{this.state.file_name}</label>      

                                      </div>
                                      <span style={{color: "red"}}>{this.state.errors["poto_pendanaan"]}</span>
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
                                      <label htmlFor="wizard-progress2-ktp">Tipe Pendanaan <span style={{color:"red"}}> * </span></label>
                                      
                                      {/* <select className="form-control" onChange={this.handleChange}  id="txt_jenis_akad_pendanaan" name="txt_jenis_akad_pendanaan"> */}
                                      <select className="form-control"  onChange={this.handleChange.bind(this, "tipe_pendanaan")} id="txt_jenis_akad_pendanaan" name="txt_jenis_akad_pendanaan">
                                      
                                      {/* <select className="form-control" onChange={(e) =>{this.setState({ tipe_pendanaan_data: e.target.value }); }} id="txt_jenis_akad_pendanaan" name="txt_jenis_akad_pendanaan"> */}
                                      <option value=""> Pilih </option>
                                        {this.m_tipe_pendanaan()}
                                      </select>
                                      <span style={{color: "red"}}>{this.state.errors["tipe_pendanaan"]}</span>
                                    </div>
                                  </div>
                                  <div className="form-group col-md-3">
                                    <div className="form-group">
                                      <label htmlFor="wizard-progress2-ktp">Nama Yayasan <span style={{color:"red"}}> * </span></label>
                                      <select className="form-control" onChange={this.handleChange.bind(this, "tipe_yayasan")} id="txt_nama_yayasan" name="txt_nama_yayasan">
                                      {/* <select className="form-control" onChange={(e) =>{this.setState({ yayasan_data: e.target.value });}} id="txt_nama_yayasan" name="txt_nama_yayasan"> */}
                                        <option value=""> Pilih </option>
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
                                      <label htmlFor="wizard-progress2-tempatlahir">Nama Pendanaan <span style={{color:"red"}}> * </span></label>
                                       
                                      <input className="form-control" type="text" onChange={this.handleChange.bind(this, "nama_pendanaan")} id="txt_nama_pendanaan" name="txt_nama_pendanaan" value={this.state.fields["nama_pendanaan"]} placeholder="Masukkan Nama Pendanaan..." /> 
                                      <span style={{color: "red"}}>{this.state.errors["nama_pendanaan"]}</span>
                                      {/* <input className="form-control" type="text" onChange= { (input)=>  this.setState({nama_pendanaan:input.target.value}) } placeholder="Masukkan Nama Pendanaan..." required/>   */}
                                    </div>
                                  </div>
                                  <div className=" form-group col-md-4" style={{ display: this.state.showDivDana ? "block" : "none" }}>
                                    <div className="form-group">
                                      <label htmlFor="wizard-progress2-tempatlahir">Dana Dibutuhkan <span style={{color:"red"}}> * </span></label>
                                      <NumberFormat className="form-control" displayType={'input'} allowNegative={false} value={this.state.nominal} onChange={this.handleChange.bind(this, "dana_dibutuhkan")} onValueChange={(values) => { const {formattedValue, value} = values; this.setState({nominal:value, format_nominal:formattedValue})}} thousandSeparator={true} prefix={''}/>
                                      {/* <input className="form-control" type="number" onChange={this.handleChange.bind(this, "dana_dibutuhkan")} value={this.state.fields["dana_dibutuhkan"]} placeholder="Masukkan dana yang anda butuhkan..." />  */}
                                      <span style={{color: "red"}}>{this.state.errors["dana_dibutuhkan"]}</span>
                                      {/* <input className="form-control" type="number" onChange= { (input)=>this.setState({dana_dibutuhkan:input.target.value}) } placeholder="Masukkan dana yang anda butuhkan..." />   */}
                                    </div>
                                  </div>

                                  <div className="col-12">
                                    <br></br>
                                    <h3 className="content-heading text-dark mt-0 pt-0 font-w600" style={{ display: this.state.showDivEstimasi ? "block" : "none" }}>Informasi Waktu</h3>
                                  </div>
                                  {/* satuBaris */}
                                  <div className="form-group col-md-3" style={{ display: "none" }}>
                                    <div className="form-group">
                                      <label htmlFor="wizard-progress2-ktp">Estimasi Mulai Pendanaan <span style={{color:"red"}}> * </span></label>
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
                                      <label htmlFor="wizard-progress2-ktp">Estimasi Akhir Pendanaan <span style={{color:"red"}}> * </span></label>
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
                                      <label htmlFor="wizard-progress2-ktp">Estimasi Mulai Penggalangan <span style={{color:"red"}}> * </span></label>
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
                                      <label htmlFor="wizard-progress2-ktp">Estimasi Akhir Penggalangan <span style={{color:"red"}}> * </span></label>
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
                                      <label htmlFor="wizard-progress2-ktp">Lama Penggalangan Dana </label>
                                    </div>
                                    <div className="input-group">
                                      <input className="form-control" type="text" value={this.state.durasi_penggalangan_hari}  placeholder="Estimasi Hari" disabled />  
                                      <div className="input-group-append">
                                        <span className="input-group-text input-group-text-dsi"> Hari
                                        </span>
                                      </div>
                                    </div>
                                  </div>  
                                  <div className="form-group col-md-8"  style={{ display: this.state.showDivEstimasi ? "block" : "none" }}>
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
                                          <label className="col-12">Deskripsi <span style={{color:"red"}}> * </span> <span style={{color: "red"}}>{this.state.errors["deskripsi"]}</span></label>
                                          <div className="col-12 col-sm-12">
                                            <div className="block-content block-content-full ">
                                                <Editor
                                                    // da
                                                    apiKey={API_KEY_TINY} 
                                                    initialValue="<p>This is the initial content of the editor</p>"
                                                    init={{
                                                    height: 500,
                                                    menubar: false,
                                                    // plugins: "image|media",
                                                    // menubar: "insert",
                                                    // toolbar: "image|media"
                                                    plugins: [
                                                        'advlist autolink lists link image charmap print preview anchor',
                                                        'searchreplace visualblocks code fullscreen',
                                                        'insertdatetime media table paste code help wordcount'
                                                    ],
                                                    toolbar:
                                                      'undo redo | formatselect | bold italic backcolor | \
                                                      alignleft aligncenter alignright alignjustify | \
                                                      bullist numlist outdent indent | removeformat | help | fullscreen | image'
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
                              <button type="resset" className="btn btn-alt-secondary" data-wizard="prev">
                                <i className="fa fa-angle-left mr-5" /> Kosongkan Data
                              </button>
                            </div>
                            <div className="col-6 text-right">
                               {/* <button type="submit" id="btn_lengkapi_profile" className="btn btn-alt-primary" data-wizard="finish"> 
                                <i className="fa fa-check mr-5" /> Submit
                              </button> */}
                              <button type="button" onClick={this.saveData} id="btn_lengkapi_profile" className="btn btn-alt-primary" data-wizard="finish">
                                <i className="fa fa-check mr-5" /> Simpan
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

export default Add_pendanaan;