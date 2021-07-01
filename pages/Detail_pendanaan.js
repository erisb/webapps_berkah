import React, { Component, useState } from 'react';
import Link from 'next/link';
import { Progress, Button, Form, FormGroup, Label, Input, FormText,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import LayoutHome from '../components/LayoutHome';
import axios from 'axios';
import {URL,URL_WEB} from "../constant/constant_func";	
import Router from 'next/router';
import parse from 'html-react-parser';
import NumberFormat from 'react-number-format';
import swal from 'sweetalert2';
import number_format from '../constant/Numberformat';
import {
  EmailShareButton,
  FacebookShareButton,
  LineShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { useRouter } from 'next/router';
import Loader from "../components/loader/ImgLoader";
import Img from 'react-image';
import ModalComponent from '../components/ModalComponent';
import Joyride, { CallBackProps, STATUS, Step, StoreHelpers } from 'react-joyride';
function ShareButton() {
  // Declare a new state variable, which we'll call "count"
  let router = useRouter();
  return (
    <div>
      <FacebookShareButton url={URL_WEB + '/' + router.asPath} >
        <a className="social-icon si-borderless si-facebook">
          <i className="icon-facebook" />
          <i className="icon-facebook" />
          
        </a>
      </FacebookShareButton>
      <TwitterShareButton url={URL_WEB + '/' + router.asPath}>
        <a href="#" className="social-icon si-borderless si-twitter">
          <i className="icon-twitter" />
          <i className="icon-twitter" />
        </a>
      </TwitterShareButton>
      <WhatsappShareButton url={URL_WEB + '/' + router.asPath}>
        <a href="#" className="social-icon si-borderless si-whatsapp">
          <i className="icon-whatsapp" />
          <i className="icon-whatsapp" />
        </a>
      </WhatsappShareButton>
      <LinkedinShareButton url={URL_WEB + '/' + router.asPath}>
        <a href="#" className="social-icon si-borderless si-linkedin">
          <i className="icon-linkedin" />
          <i className="icon-linkedin" />
        </a>
      </LinkedinShareButton>
    </div>
  );
}

function GetUrl() {
  // Declare a new state variable, which we'll call "count"
  let router = useRouter();
  const link = router.asPath;
  return localStorage.setItem('session_donasi', {link})
}

class Detail_pendanaan extends Component {
  
  static getInitialProps({query}) {
    return {query}
  }
  userData;
  constructor(props){
   super(props);
   this.state = {   
      run: false,
      steps: [], 
      va_number: '',
      disable:false,
      id:'',
      nama_pendanaan : "",
      dana_terkumpul : "",
      dana_dibutuhkan : "",
      data_percent : 0,
      data_selisih_hari : "",
      data_yayasan : "",
      data_cerita : "",
      data_video : "",
      nominal:'10000',
      data_foto : "",
      data_flag : "",
      session_id_user:'',
      format_nominal:'10000',
      session_id_user:'',
      yayasan_foto : '',
      yayasan_desk : '',
      session_username:'',
      session_id_status_user:'',
      id_tipe_pendanaan: '',
      cek_status_pendanaan:'',
      cek_tipe_pendanaan: '',
      tanpa_batas_waktu : 0,
      _isMounted : false,
      tgl_skrng:'',
      selesai_penggalangan: ''
    }

  }
  
  componentDidMount(){
    
    
    this._isMounted = true;
    // console.log(this._isMounted);
    if(this._isMounted){
      this.loadJS();
    }
    this.userData = JSON.parse(localStorage.getItem('session_login'));
    
    this.getDataPendanaan(this.props.query.id);
    this.getSession();
    this.getSessioNominal();  
    if(this.userData ){
      this.DashboardData(this.userData.id_user);
    }
    if(this.props.query.n==''||this.props.query.n==undefined){
      this.setState({
        nominal:'10000'
      })
    }else{
      this.setState({
        nominal:this.props.query.n
      })
    }
    
  
  }
  componentDidUpdate(){
    if(this._isMounted){
      this.loadJS();
    }
  
  }
  componentWillUnmount(){
    this._isMounted = false;
    
  }
  loadJS(){
    // load function js
    function loadjscssfile(filename, filetype){
      if (filetype=="js"){ //if filename is a external JavaScript file
          var fileref=document.createElement('script')
          fileref.setAttribute("type","text/javascript")
          fileref.setAttribute("src", filename)
      }
      else if (filetype=="css"){ //if filename is an external CSS file
          var fileref=document.createElement("link")
          fileref.setAttribute("rel", "stylesheet")
          fileref.setAttribute("type", "text/css")
          fileref.setAttribute("href", filename)
      }
      if (typeof fileref!="undefined")
          document.getElementsByTagName("head")[0].appendChild(fileref)
    }

    loadjscssfile("/assetsFE/js/functions.js", "js")
    loadjscssfile("/assetsFE/js/plugins.js", "js")
    var filesadded="" //list of files already added

    function checkloadjscssfile(filename, filetype){
      if (filesadded.indexOf("["+filename+"]")==-1){
          loadjscssfile(filename, filetype)
          filesadded+="["+filename+"]" //List of files added in the form "[filename1],[filename2],etc"
          // console.log(filesadded);
      }
      else{
          console.log("hallo jquery ");
      }
    }
  }
  DashboardData = (id) =>{
    axios({
        method: 'get',
        url: URL+'/user_sosial/SelectDashboardUser/'+id,
        responseType: 'stream'
      }).then((result) => {
        console.log(result)
            this.setState({
              va_number:result.data.va_number.full,
            });
            if(!this.state.va_number  && this.state.cek_status_pendanaan !== "Penggalangan Selesai"){
              this.setState({
                steps: [
                  {
                    run: true,
                    content: (
                              <React.Fragment>
                              <h2>Selamat Datang Donatur</h2>
                              <p>klik next untuk melanjutkan tour singkat cara berdonasi</p>
                              </React.Fragment>
                            ),
                    locale: { skip: <strong aria-label="skip">SKIP</strong> },
                    placement: 'center',
                    target: 'body',
                    title: 'Cara Donasi',
                  },
                  {
                    content: (
                      <React.Fragment>
                      <h2>Isi Nominal</h2>
                      <p>Ketikkan Nominal Donasi yang akan kamu donasikan</p>
                      </React.Fragment>
                    ),
                    floaterProps: {
                      disableAnimation: true,
                    },
                    spotlightPadding: 20,
                    target: '#satu',
                    title: 'Cara Donasi',
                  },
                  {
                    content: (
                      <React.Fragment>
                      <h2>Tombol Cepat</h2>
                      <p>Pilih salah satu tombol cepat untuk mengisi nominal donasi</p>
                      </React.Fragment>
                    ),
                    floaterProps: {
                      disableAnimation: true,
                    },
                    spotlightPadding: 20,
                    target: '#dua',
                    title: 'Cara Donasi',
                  },
                  {
                    content: (
                      <React.Fragment>
                      <h2>Tombol Donasi</h2>
                      <p>Nominal minimal Rp. 10.000, klik tombol untuk melanjutkan pembayaran</p>
                      </React.Fragment>
                    ),
                    floaterProps: {
                      disableAnimation: true,
                    },
                    spotlightPadding: 20,
                    target: '#tiga',
                    title: 'Cara Donasi',
                  }
                ]
              })
            }//add if
            else if (this.state.cek_status_pendanaan === "Penggalangan Selesai"){
              this.setState({
                steps: [
                  {
                    run: false
                  }
                ]
              })
            }
            else{
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
  // function validasi tipe pendanaan
  validationTipe = ( id ) => {
    if(id === 1){
      this.setState({
        cek_tipe_pendanaan : 'PendanaanSosial'
      });
      // return swal.fire("Notifikasi", "pengajuan","info");
    }else if(id === 2){
      this.setState({
        cek_tipe_pendanaan : 'ZakatMaal'
      });
      // return swal.fire("Notifikasi", "aktif","info");
      console.log(this.state.cek_tipe_pendanaan)
    }else if(id === 3){
      this.setState({
        cek_tipe_pendanaan: 'Infak'
      })
      // return swal.fire("Notifikasi", "terpenuhi","info");
    }else if(id === 4){
      this.setState({
        cek_tipe_pendanaan: 'ZakatProfesi'
      })
      // return swal.fire("Notifikasi", "selesai","info");
    }else if(id === 5){
      this.setState({
          cek_tipe_pendanaan: 'ZakatFitrah'
      })
      // return swal.fire("Notifikasi", "reject","info");
    }
    else if(id === 6){
      this.setState({
          cek_tipe_pendanaan: 'Kurban'
      })
      // return swal.fire("Notifikasi", "selesai","info");
    }else{
      this.setState({
        cek_tipe_pendanaan: 'tidak ada yang cocok'
      })
      // return swal.fire("Notifikasi", "tidak ada yang cocok","info");
    }
  }

  getSession=()=>{
    const session_login = JSON.parse(localStorage.getItem('session_login'));
    if (typeof session_login !== 'undefined' && session_login !== null){
      this.setState({ session_id_user : session_login.id_user, session_username : session_login.username, session_id_status_user:session_login.id_status_user });
    }else{
      this.setState({ session_id_user : '', session_username : 'logout', session_id_status_user:''});
    }
  }

  getSessioNominal=()=>{
    const session_nominal = localStorage.getItem('session_nominal');
    if (typeof session_nominal !== 'undefined' && session_nominal !== null){
      this.setState({ nominal : session_nominal });
    }else{
      this.setState({ nominal : '10000'});
    }
  }

  CheckDonasi=()=>{
    this.setState({disable:true});
    if(this.state.session_id_status_user==1){
      Router.push({
        pathname:'/admin-donatur/login'
      });
    }else{
      if(this.state.session_id_user==''){
        // get and set history before login to localStorage
        localStorage.setItem('session_link', this.props.query.id)
        localStorage.setItem('session_nominal', this.state.nominal)
        // end history
        swal.fire("Notifikasi", "Silahkan Masuk/Daftar dahulu untuk bisa melakukan donasi","info").then( () => {
          Router.push({
            pathname:'/admin-donatur/login'
          });
        })
      }else{
        if(this.state.nominal == '' || this.state.nominal == undefined ){
          return swal.fire("Notifikasi", "Nominal tidak boleh kosong","info");
        }else if(this.state.nominal<10000){
          this.setState({disable:false});
          return swal.fire("Notifikasi", "Donasi Minimal Rp 10.000,00 ","info");
        }else{
          let id_pendanaan_sosial = this.props.query.id;
          let data = {
            id_pendanaan_sosial : id_pendanaan_sosial,
            nominal : this.state.nominal,
            id_user : this.state.session_id_user
          }
          console.log(data);
          axios({
            method: 'post',
            url: URL+'/admin_sosial/CheckDonasiTemp/',
            data:data,
            responseType: 'stream'
          }).then((result) => {
              this.setState({disable:false});
                // console.log(result);
                let nominal_baru = parseInt(data.nominal)
                if(result.data.status=='failed_generate_va'){
                  return swal.fire('Notifikasi', 'Pembuatan No VA Anda Gagal, Mohon hubungi Customer Service kami untuk pembuatan Nomor VA anda', 'info');
                }else if(result.data.status=='Delete'){
                  swal.fire({
                    title: 'Perbaharui ?',
                    html: `
                            <div>
                            <small>Kamu memiliki pendanaan yang belum selesai</small></br>
                            <strong class="text-danger">${result.data.nama_pendanaan} </strong>
                            senilai <strong class="text-danger">Rp. ${number_format(result.data.dana_masuk)}</strong>,                            
                            </br>akan diperbaharui ke :
                            </br> <strong>${this.state.nama_pendanaan} </strong>
                            senilai <strong>Rp. ${number_format(nominal_baru)}</strong>
                            
                            </div>`,
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonText: 'Ya, Ganti',
                    cancelButtonText: 'Tidak'
                  }).then((result) => {
                    console.log(result);
                    if (result.value) {
                      this.insertDonasi(data);
                      localStorage.setItem('session_link_share', this.props.query.id)
                      localStorage.removeItem('session_link');
                      localStorage.removeItem('session_nominal');
                    }
                  })
                }else{
                  this.insertDonasi(data);
                  localStorage.setItem('session_link_share', this.props.query.id)
                  localStorage.removeItem('session_link');
                  localStorage.removeItem('session_nominal');
                }
              },
              (error) => {
                this.setState({disable:false});
                console.log(error);
              }
            ) 
        }
      }
    }
  }

  insertDonasi=(data)=>{
    axios({
      method: 'post',
      url: URL+'/admin_sosial/AddDonasiTemp/',
      data:data,
      responseType: 'stream'
    }).then((data) => {
          console.log(data);
          if(data.data.status=='Sukses Insert'){
            swal.fire({
              title: 'Sukses',
              text: `Data Berhasil Disimpan`,
              icon: 'success',
              showCancelButton: false,
              confirmButtonText: 'Ya'
            }).then((result) => {
              console.log(result);
              if (result.value) {
                var d = new Date();
                const href = `/pembayaran?id=${'PD;S@X'+ d.getHours() + d.getMonth() + d.getFullYear() + d.getSeconds() + d.getSeconds() + d.getSeconds() + '&kSX=' +data.data.id_temp_pendanaan + '&Y=' + d.getFullYear() + '#8$' + d + '!' +data.data.id_temp_pendanaan + d.getFullYear() + '2192)X1VX&link=' + href}`;
                const as = href;
                const b = data.data.id_temp_pendanaan;
                // console.log(encodeURI(href));
                Router.push(href, as);
              }
            })
          }else{
            swal.fire("Gagal", "Data Gagal disimpan","failed");
          }
        },
        (error) => {
          console.log(error);
          this.setState({ error });
        }
      )
  }

  getDataPendanaan = (id) =>{
    let LoadImage =(
      <Loader ></Loader>
    )
    axios({
      method: 'get',
      url: URL+'/admin_sosial/GetDetailPendanaanLanding/'+id,
      responseType: 'stream'
    }).then((result) => {
          
          this.setState({
            nama_pendanaan : result.data.pendanaan[0].nama_pendanaan,
            dana_terkumpul : result.data.pendanaan[0].dana_masuk,
            dana_dibutuhkan : result.data.pendanaan[0].total_dibutuhkan,
            data_percent : result.data.pendanaan[0].percent,
            data_yayasan : result.data.pendanaan[0].nama_yayasan,
            data_cerita : result.data.pendanaan[0].cerita,
            yayasan_foto : result.data.pendanaan[0].yayasan_foto,
            yayasan_desk : result.data.pendanaan[0].yayasan_desk,
            id_tipe_pendanaan:result.data.pendanaan[0].id_tipe_pendanaan,
            tanpa_batas_waktu : result.data.pendanaan[0].status_batas_waktu,
            selesai_penggalangan : new Date(result.data.pendanaan[0].selesai_penggalangan)
          });
          //set selisih hari penggalangan dana
          this.setState({tgl_skrng: new Date(Date.now())});
          let diffDays = Math.floor((Date.UTC(this.state.selesai_penggalangan.getFullYear(), this.state.selesai_penggalangan.getMonth(), this.state.selesai_penggalangan.getDate()) - Date.UTC(this.state.tgl_skrng.getFullYear(), this.state.tgl_skrng.getMonth(), this.state.tgl_skrng.getDate()) ) /(1000 * 60 * 60 * 24));
          this.setState({data_selisih_hari : diffDays+1});
          // tipe atau kategori pendanaan : sosial, zakatmaal, profesi dll
          this.validationTipe(result.data.pendanaan[0].id_tipe_pendanaan);
          // status pendanaan : pengajuan, aktif, selesai, reject dll
          this.setState({cek_status_pendanaan :  result.data.pendanaan[0].id_status_pendanaan});
          // console.log('Status ID : ' + result.data.pendanaan[0].id_status_pendanaan)
          // console.log(result)
          if(result.data.pendanaan[0].video !== "" ){
            
            this.setState({
              data_flag : <iframe width="790" height="500" src={result.data.pendanaan[0].video} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            })

          }else{

            this.setState({
              
              data_flag : 
                  <Img 
                  className="image_fade" 
                  src={result.data.pendanaan[0].foto} 
                  loader={LoadImage} 
                  unloader={ <img className="image_fade"  src="assetsFE/default-detail.png"  alt="Dana Sosial dan zakat infak shadaqah dan wakaf danasyariah.id"/>}
                  alt="Dana Sosial dan zakat infak shadaqah dan wakaf danasyariah.id" 
                />
            })

          }

        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  validateDonation=event=>{
    this.setState({nominal:event.target.value});
  }

  
  // parts[i] = renderToString(<MyComponent key={i}>{parts[i]}</MyComponent>)
  render(){
    // ISI CONTENT
    let tipeStatusAktifPengajuanTerpenuhi = (
      <div className="widget clearfix">
          <h4>Detail Donasi <span className="badge badge-success pull-right">{this.state.cek_status_pendanaan}</span> </h4>  
          
          
          <ul className="skills mb-3">
            <div className="text-right">Terkumpul : {this.state.data_percent}%</div>
            <Progress color="success" value={this.state.data_percent} />
          </ul>
          <span className="mt-5">Dana Terkumpul :</span>
          <br/>
          <span className="bold h3 mb-3">{this.state.dana_terkumpul}</span><br />   
          <span>Terkumpul dari target  Rp. {this.state.dana_dibutuhkan}</span>
          {this.state.tanpa_batas_waktu == 1 ? "" : 
            <div className="mt-3">
            <span className="mt-5">Sisa Hari :</span>
            <br/>
              <span className="bold h6 mb-3">{this.state.data_selisih_hari} Hari Lagi</span><br />   
            <span>Masa penggalangan dana tersedia</span>  
          </div>
          }
          
          <div className="mt-5 clearfix">
            
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Masukkan Nominal Donasi</Label>
                <div id="dua"  className="row mb-2 ">
                  <div className="col-6 pt-2 ">
                    <Button color="info" size="md" block onClick={() => this.setState({nominal: "100000" })} >100.000 </Button>    
                  </div>
                  <div className="col-6 pt-2 ">
                    <Button color="info" size="md" block onClick={() => this.setState({nominal: "200000" })}>200.000</Button>    
                  </div>
                  <div className="col-6 pt-2 ">
                    <Button color="info" size="md" block onClick={() => this.setState({nominal: "300000" })}>300.000</Button>    
                  </div>
                  <div className="col-6 pt-2 ">
                    <Button color="info" size="md" block onClick={() => this.setState({nominal: "400000" })}>400.000</Button>    
                  </div>
                </div>
                <div id="satu"  className="col-12 input-group form-group p-0">
                  <div className="input-group-prepend">
                    <span className="input-group-text nobg"><strong>Rp</strong></span>
                  </div>
                <NumberFormat className="form-control" displayType={'input'} allowNegative={false} value={this.state.nominal} onValueChange={(values) => { const {formattedValue, value} = values; this.setState({nominal:value, format_nominal:formattedValue})}} thousandSeparator={true} prefix={''} />
                </div>
              </FormGroup>
            </Form>
          </div> 
          <div id="tiga"  className="mt-5">
            <Button color="success" size="lg" block onClick={this.CheckDonasi} disabled={this.state.disable}>Donasi Sekarang</Button>    
          </div>         
        </div>
    )

    let statusSelesai = (
      <div className="widget clearfix">
          <h4>Detail Donasi <span className="badge badge-success pull-right">{this.state.cek_status_pendanaan}</span> </h4>  
          
          
          <ul className="skills mb-3">
            <div className="text-right">Terkumpul : {this.state.data_percent}%</div>
            <Progress color="success" value={this.state.data_percent} />
          </ul>
          <span className="mt-5">Dana Terkumpul :</span>
          <br/>
          <span className="bold h3 mb-3">{this.state.dana_terkumpul}</span><br />   
          <span>Terkumpul dari target  Rp. {this.state.dana_dibutuhkan}</span>    
        </div>
    )

    let tipeZakat = (
      <div className="widget clearfix">
          <h4>INFORMASI DETAIL <span className="badge badge-success pull-right">{this.state.cek_status_pendanaan}</span> </h4>  
          <span className="mt-5">Zakat Terkumpul :</span>
          <br/>
          <span className="bold h3 mb-3">{this.state.dana_terkumpul}</span><br />   
          <div className="mt-5 clearfix">
            
            <Form>
              <FormGroup id="satu">
                <Label for="exampleEmail">Nominal Zakat</Label>
                <div className="col-12 input-group form-group p-0">
                  <div className="input-group-prepend">
                    <span className="input-group-text nobg"><strong>Rp</strong></span>
                  </div>
                <NumberFormat className="form-control" displayType={'input'} allowNegative={false} value={this.state.nominal} onValueChange={(values) => { const {formattedValue, value} = values; this.setState({nominal:value, format_nominal:formattedValue})}} thousandSeparator={true} prefix={''} />
                </div>
              </FormGroup>
            </Form>
          </div> 
          <div id="tiga" className="mt-5">
            <Button color="success" size="lg" block onClick={this.CheckDonasi} disabled={this.state.disable}>Bayar Zakat</Button>    
          </div>         
        </div>
    )
    // END ISI CONTENT
    
    // VALIDASI CONTENT
    let content;
    if( this.state.cek_status_pendanaan === "Aktif" 
        && this.state.cek_tipe_pendanaan !== "ZakatMaal"
        && this.state.cek_tipe_pendanaan !== "ZakatProfesi"
        && this.state.cek_tipe_pendanaan !== "Infak"
        && this.state.cek_tipe_pendanaan !== "ZakatFitrah"
        && this.state.cek_tipe_pendanaan !== "Kurban"
        ){
        // Aktif Tampil Semua
        // Pengajuan Tampil Semua
        // Penggalangan Terpenuhi Tampil Semua, tambahkan kata2 dan validasi progressbar
        content = tipeStatusAktifPengajuanTerpenuhi;

        }else if( this.state.cek_status_pendanaan === "Pengajuan" 
        && this.state.cek_tipe_pendanaan !== "ZakatMaal"
        && this.state.cek_tipe_pendanaan !== "ZakatProfesi"
        && this.state.cek_tipe_pendanaan !== "Infak"
        && this.state.cek_tipe_pendanaan !== "ZakatFitrah"
        && this.state.cek_tipe_pendanaan !== "Kurban"
        ){
        content = tipeStatusAktifPengajuanTerpenuhi;

        }else if( this.state.cek_status_pendanaan === "Penggalangan Terpenuhi" 
        && this.state.cek_tipe_pendanaan !== "ZakatMaal"
        && this.state.cek_tipe_pendanaan !== "ZakatProfesi"
        && this.state.cek_tipe_pendanaan !== "Infak"
        && this.state.cek_tipe_pendanaan !== "ZakatFitrah"
        && this.state.cek_tipe_pendanaan !== "Kurban"
        ){
        content = tipeStatusAktifPengajuanTerpenuhi;
    
    }else if (this.state.cek_status_pendanaan === "Penggalangan Selesai"
        && this.state.cek_tipe_pendanaan !== "ZakatMaal"
        && this.state.cek_tipe_pendanaan !== "ZakatProfesi"
        && this.state.cek_tipe_pendanaan !== "Infak"
        && this.state.cek_tipe_pendanaan !== "ZakatFitrah"
        && this.state.cek_tipe_pendanaan !== "Kurban"
    ){
      // Hide Input Donasi , Tombol Danai Sekarang, Sisa Hari
      content = statusSelesai

    }else if ( this.state.cek_status_pendanaan === "Aktif"  && this.state.cek_tipe_pendanaan === "ZakatMaal" || this.state.cek_tipe_pendanaan === "ZakatProfesi" || this.state.cek_tipe_pendanaan === "Infak" || this.state.cek_tipe_pendanaan === "ZakatFitrah" || this.state.cek_tipe_pendanaan === "Kurban" ){
      content = tipeZakat
    
    }else{
      content = ( <div className="widget clearfix"><p className="badge badge-warning">Tipe Pendanaan Ini Belum di Registrasi, (or id#06) Silahkan Hubungi OPS</p></div>)
    }
    // END VALIDASI CONTENT

    const parse = require('html-react-parser');

    let YayasanModal = (
      <React.Fragment>
      <div className="w-200">
        <div className="card">
          <div className="card-header"><strong>Oleh : <a href="#">{this.state.data_yayasan}</a></strong></div>
          <div className="card-body">
            <div className="author-image">
              <img src={this.state.yayasan_foto} alt="" className="rounded-circle" />
            </div>
            {parse(this.state.yayasan_desk)}
          </div>
        </div>{/* Post Single - Author End */}
      </div>
      </React.Fragment>
    )
    const { steps } = this.state;
    return(
      
      <LayoutHome title="About Us" status_user={this.state.session_username} id_status_user={this.state.session_id_status_user}>
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
        <div>
            <section id="content">
              <div className="content-wrap">
                <div className="container clearfix">
                  {/* Post Content
              ============================================= */}
                  <div className="postcontent nobottommargin clearfix">
                    <div className="single-post nobottommargin">
                      {/* Single Post
                  ============================================= */}
                      <div className="entry clearfix">
                        {/* Entry Title
                    ============================================= */}
                        <div className="entry-title text-left">
                        <h1>{this.state.nama_pendanaan}</h1>
                        </div>{/* .entry-title end */}
                       
                        <div className="entry-image">   
                          {this.state.data_flag}
                        </div>{/* .entry-image end */}
                        {/* Entry Content
                    ============================================= */}
                        <div className="entry-content notopmargin">
                        {/* parse({this.state.data_cerita}) */}
                        {parse(this.state.data_cerita)}
                          {/* Post Single - Content End */}
                          {/* Tag Cloud
                      ============================================= */}
                          <div className="tagcloud clearfix bottommargin">
                            <a >Kategori : {this.state.id_tipe_pendanaan === 1 ? "Dana Sosial" : "Ziswaf"}</a>
                          </div>{/* .tagcloud end */}
                          <div className="clear" />
                          
                        </div>
                      </div>{/* .entry end */}
                    </div>
                  </div>{/* .postcontent end */}
                  {/* Sidebar
              ============================================= */}
                  <div className="sidebar nobottommargin col_last clearfix fixed" >
                    <div className="sidebar-widgets-wrap">                     
                      {/* this is tyipe detail */}
                        {content}
                      {/* this is tyipe detail */}
                      <div className="mt-5 card">
                        <div className="card-header"><strong>Oleh : <a href="#">{this.state.data_yayasan}</a></strong></div>
                        <div className="card-body">
                          <div className="author-image">
                            <img src={this.state.yayasan_foto} alt="" className="rounded-circle" />
                          </div>
                          {parse(this.state.yayasan_desk.substr(0, 150))}
                          <div style={{display : this.state.yayasan_desk.length > 150 ? "block" : "none"}}>
                            <ModalComponent  buttonLabel="Lihat selengkapnya" modalTitle="Profil Yayasan" isi={YayasanModal} ></ModalComponent>
                          </div>
                        </div>
                      </div>{/* Post Single - Author End */}
                      {/* Post Single - Share
                      ============================================= */}
                      <div className="widget clearfix">
                        
                    <span>Bagikan Pendanaan ini: </span>
                        <ShareButton></ShareButton>
                      </div>{/* Post Single - Share End */}
                    </div>
                  </div>{/* .sidebar end */}
                </div>
              </div>
            </section>{/* #content end */}
          </div>

      </LayoutHome>
    )
  }
}
export default Detail_pendanaan