import React, {Component} from 'react';
import Link from 'next/link';
import LayoutHome from '../components/LayoutHome';
import Footer from '../components/FooterHome';
import axios from 'axios';
import ModalComponent from '../components/ModalComponent';
import Detail from '../pages/Detail';
import {URL} from "../constant/constant_func";  
import KalkulatorZakat from "../components/frontend/KalkulatorComponent";
import Loader from "../components/loader/ImgLoader";
import Img from 'react-image';


class Index extends Component {
  data;
  constructor(props){
    super(props)

    this.state = {
      loading: false,
      shows_list_pendanaan : [],
      shows_list_pendanaan_selesai : [],
      data_percent :0,
      _isMounted : false,
      session_username:'',
      session_id_status_user:'',
      infoCounter: [],
      infoKawalCovid19_confirmed: [],
      infoKawalCovid19_recovered: [],
      infoKawalCovid19_deaths: [],
      infoKawalCovid19_activeCare: [],
      infoKawalCovid19_metadata: [],
      url_maal:'',
      url_profesi:'',
      visible: 2, //loadmore
      error: false //loadmore
    }
    
    this.loadMore = this.loadMore.bind(this); //loadmore
  }

  loadMore() { //loadmore
    this.setState((prev) => {
      return {visible: prev.visible + 4};
    });
  }
  
  imageCardLoader = () => (
    <Loader 
      speed={2}
      width={400}
      height={475}
      viewBox="0 0 400 475"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle cx="31" cy="31" r="15" /> 
      <rect x="58" y="18" rx="2" ry="2" width="140" height="10" /> 
      <rect x="58" y="34" rx="2" ry="2" width="140" height="10" /> 
      <rect x="0" y="60" rx="2" ry="2" width="400" height="400" />
    </Loader>
  )

  listPendanaan(){
    axios({
      method: 'get',
      url: URL+'/admin_sosial/SelectPendanaanLanding/',
    }).then((result) => {
         
      if(result.data.pendanaan == ""){
        
          this.setState({
            shows_list_pendanaan : []
          });

        }else{
        
          this.setState({

            shows_list_pendanaan : result.data.pendanaan
            
            });
        }
    },
      (error) => {
        this.setState({ error });
      }
    )
  }

  listPendanaanSelesai(){
    axios({
      method: 'get',
      url: URL+'/admin_sosial/SelectPagePendanaanSelesai/',
    }).then((result) => {
         
      if(result.data.pendanaan_selesai === ""){
        
          this.setState({
            shows_list_pendanaan_selesai : []
          });

        }else{
        
          this.setState({

            shows_list_pendanaan_selesai : result.data.pendanaan
            
            });
        }
    },
      (error) => {
        this.setState({ error });
      }
    )
  }

  kawalCovid19(){
    axios({
      method: 'GET',
      url: 'https://kawalcovid19.harippe.id/api/summary',
        headers: {
          'Content-Type': 'application/json',
      }
    }).then((result) => {
          console.log(result);
          this.setState({
            infoKawalCovid19_confirmed: result.data.confirmed,
            infoKawalCovid19_recovered: result.data.recovered,
            infoKawalCovid19_deaths: result.data.deaths,
            infoKawalCovid19_activeCare: result.data.activeCare,
            infoKawalCovid19_metadata: result.data.metadata
          });
          // console.log('kawalCovid :' + this.state.infoKawalCovid19_confirmed.value + this.state.infoKawalCovid19_recovered.value)
          
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  infoCounter(){
    axios({
      method: 'GET',
      url: URL + '/admin_sosial/SelectTindikator',
        headers: {
          'Content-Type': 'application/json',
      }
    }).then( resultCounter => {
      console.log(resultCounter);
          this.setState({
            infoCounter: resultCounter.data
          });
          console.log('Info Counter 2: ' + this.state.infoCounter.total_pendanaan_sosial);
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  getURLZakat(){
    axios({
      method: 'GET',
      url: URL + '/admin_sosial/SelectUrlZakat',
        headers: {
          'Content-Type': 'application/json',
      }
    }).then( resultCounter => {
      console.log(resultCounter);
          this.setState({
            url_maal:resultCounter.data.url_maal,
            url_profesi:resultCounter.data.url_profesi
          });
          console.log('Info Counter 2: ' + this.state.infoCounter.total_pendanaan_sosial);
        },
        (error) => {
          this.setState({ error });
        }
      )
    }

  getSession=()=>{
    const session_login = JSON.parse(localStorage.getItem('session_login'));
    if (typeof session_login !== 'undefined' && session_login !== null){
      this.setState({ session_id_user : session_login.id_user, session_username : session_login.username, session_id_status_user:session_login.id_status_user });
      setTimeout(()=>console.log(this.state.session_id_status_user),300);
    }else{
      this.setState({ session_id_user : '', session_username : 'logout', session_id_status_user:''});
    }
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

  componentDidMount(){
    this.state.loading = true; 
    this._isMounted = true;
    // console.log(this._isMounted);
    if(this._isMounted){
      this.loadJS();
    }
    
    this.listPendanaan();
    this.listPendanaanSelesai();
    this.getSession();
    this.infoCounter();
    this.kawalCovid19();
    this.getURLZakat();
  }
  componentDidUpdate(){
    if(this._isMounted){
      this.loadJS();
    }
  
  }
  componentWillUnmount(){
    this._isMounted = false;
    
  }

  handleLoading = () => {
    this.state.loading = false; 
  }
  
  render(){
    let LoadImage =(
      <Loader ></Loader>
    )
    let Covid = (
          <React.Fragment>
          <div className="w-200">
          <div className="row justify-content-center">
          <div className="col-md-3 col-xs-3 col-sm-3 px-1">
              <span className="card center border-left-0 border-right-0 border-top-0 border-bottom border-bottom shadow py-3 noradius t600 uppercase ls1">
              <div className="card-body">
              <div class="counter counter-lined">
                  <span data-from="10" data-to={this.state.infoKawalCovid19_confirmed.value}  data-refresh-interval="25" data-speed="3500">
                  {this.state.infoKawalCovid19_confirmed.value} 
                  </span>
              </div>
              
              <p className="text-small">Terkonfirmasi</p>
              </div>
              </span>
          </div>
          <div className="col-md-3 col-xs-3 col-sm-3 px-1">
              <span className="card center border-left-0 border-right-0 border-top-0 border-bottom border-bottom shadow py-3 noradius t600 uppercase ls1">
              <div className="card-body">
              <div class="counter counter-lined">
                  <span data-from="13" data-to={this.state.infoKawalCovid19_activeCare.value}   data-refresh-interval="25" data-speed="3500">
                  {this.state.infoKawalCovid19_activeCare.value} 
                  </span>
              </div>
              
              <p className="text-small">Dalam Perawatan</p>
              </div>
              </span>
          </div>
          <div className="col-md-3 col-xs-3 col-sm-3 px-1">
              <span className="card center border-left-0 border-right-0 border-top-0 border-bottom border-bottom shadow py-3 noradius t600 uppercase ls1">
              <div className="card-body">
              <div class="counter counter-lined">
                  <span data-from="4" data-to={this.state.infoKawalCovid19_recovered.value}   data-refresh-interval="25" data-speed="3500">
                  {this.state.infoKawalCovid19_recovered.value} 
                  </span>
              </div>
              
              <p className="text-small">Sembuh </p>
              </div>
              </span>  
          </div>
          <div className="col-md-3 col-xs-3 col-sm-3 px-1">
              <span className="card center border-left-0 border-right-0 border-top-0 border-bottom border-bottom shadow py-3 noradius t600 uppercase ls1">
              <div className="card-body">
              <div class="counter counter-lined">
                  <span data-from="10" data-to= {this.state.infoKawalCovid19_deaths.value}   data-refresh-interval="25" data-speed="3500">
                  {this.state.infoKawalCovid19_deaths.value} 
                  </span>
              </div>
          
              <p className="text-small">Meninggal </p>
              </div>
              </span>  
          </div>
          </div>
          </div>
          </React.Fragment>
    )

    
    // contoh multiple array
    // const negara = Object.keys(this.state.coronas).map((key) => (
    //     <span>{this.state.coronas[key].countryregion}</span>
    // ));
  
    return(
      <LayoutHome title="Home" status_user={this.state.session_username} id_status_user={this.state.session_id_status_user} >            
            
            {/* Slider
        ============================================= */}
            <section id="slider" className="slider-element dark swiper_wrapper full-screen force-full-screen slider-parallax clearfix">
              <div className="slider-parallax-inner">
                <div className="swiper-container swiper-parent">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide dark" style={{background: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,.3)), url("/assetsFE/images/bg-header.jpg") no-repeat center center', backgroundSize: 'cover'}}>
                      <div className="container clearfix">
                        <div className="slider-caption divcenter center clearfix">    
                          <p className="text-center" style={{fontSize: '17px', paddingTop: '0px', marginTop: '0px'}} data-animate="fadeInUp" data-delay={200}>DANA SOSIAL & ZISWAF!</p>
                          <h2 className="nott text-center" data-animate="fadeInUp">#AyoCariBerkah<br></br></h2>
                          <p className="text-center" style={{fontSize: '17px'}} data-animate="fadeInUp" data-delay={200}>Berdonasi Membantu Sesama Bersama danasyariah.id</p>
                          <p className="text-center" style={{fontSize: '17px'}} data-animate="fadeInUp" data-delay={200}>Informasi Covid 19</p>
                          {/* counter covid */}
                          <div className="w-200">
                            <div className="row justify-content-center">
                              <div className="col-md-3 col-xs-3 col-sm-3 px-1">
                                <span className="card center border-left-0 border-right-0 border-top-0 border-bottom border-bottom shadow py-3 noradius t600 uppercase ls1">
                                <div className="card-body">
                                  <div class="counter counter-lined">
                                    <span data-from="10" data-to={this.state.infoKawalCovid19_confirmed.value}  data-refresh-interval="25" data-speed="3500">
                                    {this.state.infoKawalCovid19_confirmed.value} 
                                    </span>                                   
                                  </div>
                                  
                                  <p className="text-small">Terkonfirmasi</p>
                                  <span className="d-block d-sm-none" >
                                    <ModalComponent  buttonLabel="Lihat selengkapnya" isi={Covid} ></ModalComponent>
                                  </span>
                                </div>
                                </span>
                              </div>
                              <div className="col-md-3 col-xs-3 col-sm-3 px-1 d-none d-sm-block">
                                <span className="card center border-left-0 border-right-0 border-top-0 border-bottom border-bottom shadow py-3 noradius t600 uppercase ls1">
                                <div className="card-body">
                                  <div class="counter counter-lined">
                                    <span data-from="13" data-to={this.state.infoKawalCovid19_activeCare.value}   data-refresh-interval="25" data-speed="3500">
                                    {this.state.infoKawalCovid19_activeCare.value} 
                                    </span>
                                  </div>
                                
                                <p className="text-small">Dalam Perawatan</p>
                                </div>
                                </span>
                              </div>
                              <div className="col-md-3 col-xs-3 col-sm-3 px-1 d-none d-sm-block">
                                <span className="card center border-left-0 border-right-0 border-top-0 border-bottom border-bottom shadow py-3 noradius t600 uppercase ls1">
                                <div className="card-body">
                                  <div class="counter counter-lined">
                                    <span data-from="4" data-to={this.state.infoKawalCovid19_recovered.value}   data-refresh-interval="25" data-speed="3500">
                                    {this.state.infoKawalCovid19_recovered.value} 
                                    </span>
                                  </div>
                                
                                <p className="text-small">Sembuh </p>
                                </div>
                                </span>  
                              </div>
                              <div className="col-md-3 col-xs-3 col-sm-3 px-1 d-none d-sm-block">
                                <span className="card center border-left-0 border-right-0 border-top-0 border-bottom border-bottom shadow py-3 noradius t600 uppercase ls1">
                                <div className="card-body">
                                  <div class="counter counter-lined">
                                    <span data-from="10" data-to= {this.state.infoKawalCovid19_deaths.value}   data-refresh-interval="25" data-speed="3500">
                                    {this.state.infoKawalCovid19_deaths.value} 
                                    </span>
                                  </div>
                               
                                <p className="text-small">Meninggal </p>
                                </div>
                                </span>  
                              </div>
                              <small style={{fontSize: ".5em", paddingTop: "1.4em"}}>source : kawalcovid19.id  <a href="https://kawalcovid19.blob.core.windows.net/viz/statistik_harian.html" target="_blank"><ins> Lihat Statistik Harian disini → </ins></a></small>
                            </div>
                          </div>
                          {/* end covid */}
                          <a href="/panduan" data-animate="fadeInUp" data-delay={400} className="mt-5 button button-border button-white button-light button-large button-rounded tright shadow nott ls0 ml-0 mt-4">Ayo Jadi Donatur!</a>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-slide dark" style={{background: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,.3)), url("/assetsFE/images/bg-header.jpg") no-repeat center center', backgroundSize: 'cover'}}>
                      <div className="container clearfix">
                        <div className="slider-caption divcenter center clearfix">
                          <p className="text-center" style={{fontSize: '17px', paddingTop: '0px', marginTop: '0px'}} data-animate="fadeInUp" data-delay={200}>ZISWAF adalah</p>
                          <h2 className="nott text-center" data-animate="fadeInUp">Zakat, Infaq, Shadaqah dan Wakaf</h2>
                          <p className="text-center" style={{fontSize: '17px'}} data-animate="fadeInUp" data-delay={200}>Bersama orang-orang baik, melakukan penggalangan dana untuk sesama.</p>
                          <a href="/panduan" data-animate="fadeInUp" data-delay={400} className="button button-border button-white button-light button-large button-rounded tright shadow nott ls0 ml-0 mt-4">Baca Panduan Donatur</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-navs">
                    <div className="slider-arrow-left"><i className="icon-line-arrow-left" /></div>
                    <div className="slider-arrow-right"><i className="icon-line-arrow-right" /></div>
                  </div>
                  <div className="swiper-scrollbar">
                    <div className="swiper-scrollbar-drag">
                      <div className="slide-number"><div className="slide-number-current" /><span>/</span><div className="slide-number-total" /></div></div>
                  </div>
                </div>
              </div>
            </section>

            <section id="content" style={{overflow: 'visible'}}>
              <div className="content-wrap p-0">
                <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 1382 58" width="100%" height={60} preserveAspectRatio="none" style={{position: 'absolute', top: '-58px', left: 0, zIndex: 1}}><path style={{fill: '#FFF'}} d="M1.52.62s802.13,127,1380,0v56H.51Z" />
              </svg>
              <div className="slider-feature w-100">
                <div className="row justify-content-center">
                  <div className="col-md-3 px-1">
                    <span className="card center border-left-0 border-right-0 border-top-0 border-bottom border-bottom shadow py-3 noradius t600 uppercase ls1">
                    <div className="card-body">
                    <i className="icon-line-align-right"></i> {this.state.infoCounter.total_pendanaan_sosial} Pendanaan Sosial
                    </div>
                    </span>
                  </div>
                  <div className="col-md-3 px-1">
                    <span className="card center border-left-0 border-right-0 border-top-0 border-bottom border-bottom shadow py-3 noradius t600 uppercase ls1">
                    <div className="card-body">
                    <i className="icon-line-umbrella"></i> {this.state.infoCounter.total_donatur} Donatur
                    </div>
                    </span>
                  </div>
                  <div className="col-md-3 px-1">
                    <span className="card center border-left-0 border-right-0 border-top-0 border-bottom border-bottom shadow py-3 noradius t600 uppercase ls1">
                    <div className="card-body">
                    <i className="icon-line-align-right"></i> {this.state.infoCounter.total_ziswaf} Ziswaf 
                    </div>
                    </span>  
                  </div>
                </div>
              </div>
            <div id="pendanaan" className="section nomargin page-section nobg clearfix">
              <div className="container clearfix">
                <div className="heading-block center clearfix">                
                    <h2>Pendanaan Sosial & ZISWAF</h2>
                </div>
                <div className="row clearfix">
               
                  {
                  this.state.shows_list_pendanaan.map(data =>  (
                    <div className="col-lg-4 col-md-6 bottommargin" key={data.no}>
                      <div className="iproduct">
                        <div className="product-image">
                          <Link href={`/detail_pendanaan?id=${data.id_encrypt}`}>

                                <a>
                                  <Img 
                                  className="image_fade"  
                                  src={data.file} 
                                  loader={LoadImage} 
                                  unloader={ <img className="image_fade"  src="assetsFE/default-detail.gif"  alt="Dana Sosial dan zakat infak shadaqah dan wakaf danasyariah.id"/>}
                                  alt="Dana Sosial dan zakat infak shadaqah dan wakaf danasyariah.id" 
                                />
                                </a>   
                            
                          </Link>    
                          <div className={data.id_tipe_pendanaan === 1 ? "flash-sosial" : "flash-ziswaf" }><i className="icon-et-icon-tags1"></i>  { data.id_tipe_pendanaan === 1 ? "Dana Sosial" : "Zakat"}</div>                 
                        </div>
                        <div className="product-desc left">
                          <div className="h6" style={{ fontSize: '0.8rem'}}><i className="icon-bullhorn1"></i> {data.nama_yayasan}</div>
                            <div className="product-title">
                              <h3 className="text-dark" style={{fontSize: '1.1rem'}}>
                                <Link href={`/detail_pendanaan?id=${data.id_encrypt}`} >
                                  <a>{data.nama_pendanaan}</a>
                                </Link>
                              </h3>
                            </div>
                            
                            <ul className="skills mb-3" style={{display : data.id_tipe_pendanaan == 1 ? "block" : "none"}}>
                              <li data-percent={data.percent}>
                                <div className="progress">
                                  <div className="progress-percent"><div className="counter counter-inherit counter-instant"><span data-from="0" data-to={data.percent} data-refresh-interval="30" data-speed="1100">{data.percent}</span>%</div></div>
                                </div>
                              </li>
                            </ul>
                            <span className="mt-5" style={{display:data.id_tipe_pendanaan == 1 ? "block" : "none"}}>Dana Terkumpul :</span>
                            <br/>
                            <span className="bold h6" style={{display:data.id_tipe_pendanaan == 1 ? "block" : "none"}}>Rp {data.dana_masuk} dari  Rp {data.total_dibutuhkan}</span>
                              
                            <div className="mt-3">
                              <Link href={`/detail_pendanaan?id=${data.id_encrypt}`}>
                                <a className="h6" ><ins>Lihat Selengkapnya</ins></a>
                              </Link>
                            </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
              </div>
            </div>
            <div id="pendanaan"  className="section nomargin page-section nobg clearfix">
              <div className="container clearfix">
                <div className="heading-block left clearfix">                
                    <h2>Kisah Sukses</h2>
                    <p>Pendanaan yang sudah selesai masa penggalangan dananya</p>
                </div>
                <div className="row clearfix">
                  {

                          this.state.shows_list_pendanaan_selesai.slice(0, this.state.visible).map((data, index) => {
                           if(data.no){
                            var bgStyle = {
                              backgroundImage: `url(` + data.file  + `)`
                            };
                              return(
                                <React.Fragment>
                                  <div class="card-potrait mb-5" key={data.id_tipe_pendanaan}>
                                    <div className="card-image">
                                      <div />
                                      <Img  
                                        className="background-image"
                                        src={data.file}
                                        loader={LoadImage} 
                                        unloader={ <img className="background-image"  src="assetsFE/default-detail.gif"  alt="Dana Sosial dan zakat infak shadaqah dan wakaf danasyariah.id"/>}
                                        alt="Dana Sosial dan zakat infak shadaqah dan wakaf danasyariah.id" 
                                      />
                                      </div>
                                      <div className="card-content">
                                        <h1 className="title">{data.nama_yayasan}</h1>
                                        <h2 className="subtitle">Informasi terbaru dan berita dari hasil penggalangan dana yang sudah terkumpul</h2>
                                        <p className="description">
                                          <span className="mt-5">Dana Terkumpul :</span>
                                          <br/>
                                          <span className="bold h6">Rp {data.dana_masuk}</span>
                                        </p>
                                      <div className="cta">
                                        <a href={`/detail_pendanaan?id=${data.id_encrypt}`}>Lihat selengkapnya →</a>
                                      </div>
                                    </div>
                                  </div>
                                </React.Fragment>
                                  // <div className="col-lg-4 col-md-6 bottommargin" style={{display: !data.no ? "none" : "block" }} key={data.no}>
                                  //   <div className="iproduct">
                                  //     <div className="product-image">
                                  //       <Link href={`/detail_pendanaan?id=${data.id_encrypt}`}>

                                  //             <a>
                                  //               <Img 
                                  //               className="image_fade"  
                                  //               src={data.file} 
                                  //               loader={LoadImage} 
                                  //               unloader={ <img className="image_fade"  src="assetsFE/default-detail.gif"  alt="Dana Sosial dan zakat infak shadaqah dan wakaf danasyariah.id"/>}
                                  //               alt="Dana Sosial dan zakat infak shadaqah dan wakaf danasyariah.id" 
                                  //             />
                                  //             </a>   
                                          
                                  //       </Link>    
                                  //       <div className={data.id_tipe_pendanaan === 1 ? "flash-sosial" : "flash-ziswaf" }><i className="icon-et-icon-tags1"></i>  { data.id_tipe_pendanaan === 1 ? "Dana Sosial" : "Ziswaf"}</div>                 
                                  //     </div>
                                  //     <div className="product-desc left">
                                  //       <div className="h6" style={{ fontSize: '0.8rem'}}><i className="icon-bullhorn1"></i> {data.nama_yayasan}</div>
                                  //         <div className="product-title">
                                  //           <h3 className="text-dark" style={{fontSize: '1.1rem'}}>
                                  //             <Link href={`/detail_pendanaan?id=${data.id_encrypt}`} >
                                  //               <a>{data.nama_pendanaan}</a>
                                  //             </Link>
                                  //           </h3>
                                  //         </div>
                                  //         <span className="mt-5">Dana Terkumpul :</span>
                                  //         <br/>
                                  //         <span className="bold h6">Rp {data.dana_masuk}</span>
                                  //         <div className="mt-3">
                                          
                                  //         <Link href={`/detail_pendanaan?id=${data.id_encrypt}`}>
                                  //           <a className="h6" ><ins>Lihat Selengkapnya</ins></a>
                                  //         </Link>
                                  //         </div>
                                  //     </div>
                                  //   </div>
                                  // </div>
                                )
                              }else{
                              return (
                                <React.Fragment>
                                  <div class="card-potrait" >
                                    <div className="card-image">
                                    <Img  
                                        className="background-image"
                                        src="assetsFE/bg-kisah.jpg"
                                        loader={LoadImage} 
                                        unloader={ <img className="background-image"  src="assetsFE/bg-kisah.jpg"  alt="Dana Sosial dan zakat infak shadaqah dan wakaf danasyariah.id"/>}
                                        alt="Dana Sosial dan zakat infak shadaqah dan wakaf danasyariah.id" 
                                      />
                                      </div>
                                      <div className="card-content">
                                        <h1 className="title">Belum ada Kisah untuk diceritakan... :(</h1>
                                        <h2 className="subtitle">Informasi terbaru dan berita dari hasil penggalangan dana yang sudah terkumpul</h2>
                                        <p className="description">
                                          Berkolaborasi untuk menghadirkan kebaikan dengan cara yang mudah
                                          dan amanah bergandeng bersama #OrangBaik lainnya.
                                        </p>
                                        <div className="cta">
                                        <a href="/all_pendanaan">Lihat selengkapnya →</a>
                                      </div>
                                      </div>
                                    </div>
                                </React.Fragment>
                              )
                            }  
                         })
                      }
                </div>
                 {this.state.visible < this.state.shows_list_pendanaan_selesai.length &&
                    <button onClick={this.loadMore} type="button" className="button button-border button-dark button-dark button-large button-rounded tright shadow nott ls0 ml-0 mt-4">Lihat lebihbanyak →</button>
                  }
              </div>
            </div>
            {/* ./card */}
            <KalkulatorZakat url_maal={this.state.url_maal} url_profesi={this.state.url_profesi} id_status_user={this.state.session_id_status_user}></KalkulatorZakat>
            
            <div className="section nobg" style={{padding: '0px 0'}}>
              <div className="container clearfix">
                <div className="row justify-content-center">
                  <div className="col-md-7 center mb-5">
                    <div className="svg-line bottommargin-sm clearfix">
                      <p className="h6"><strong>#AyoCariBerkah  | presented by : danasyariah.id</strong><br/> bekerjasama dengan:</p>
                      
                    </div>
                    
                  </div>
                  <div className="clear" />
                  <div className="col-md-11 my-5 mb-2">
                    <ul className="clients-grid nobottommargin clearfix">
                      <li><a href="#"><img src="/assetsFE/images/1.gif" alt="Clients" /></a></li>
                      <li><a href="#"><img src="/assetsFE/images/2.gif" alt="Clients" /></a></li>
                      <li><a href="#"><img src="/assetsFE/images/3.gif" alt="Clients" /></a></li>
                      <li><a href="#"><img src="/assetsFE/images/4.png" alt="Clients" /></a></li>
                      <li><a href="#"><img src="/assetsFE/images/5.gif" alt="Clients" /></a></li>
                      <li><a href="#"><img src="/assetsFE/images/6.png" alt="Clients" /></a></li>
                      <li><a href="#"><img src="/assetsFE/images/7.png" alt="Clients" /></a></li>
                      <li><a href="#"><img src="/assetsFE/images/8.png" alt="Clients" /></a></li>
                    </ul>
                  </div>                  
                </div>
              </div>
            </div>
            <div class="promo topmargin-lg promo-border promo-full">
              <div class="container clearfix">
                <h3>Daftar Sebagai Pengguna Awal</h3>
                <span>Bantu Kami mengoptimalkan pengalaman pengguna dan meningkatkan performa <strong>#AyoCariBerkah</strong>,<br/> kirim pengalaman dan masukkan kamu ke : 
                <a href="mailto:cso.ayocariberkah@danasyariah.id?&subject=Bantu%20Support%20AyoCariBerkah&body=Tulis pengalaman, keluhan dan masukkan yang berguna untuk aplikasi #AyoCariBerkah..."> Kirim Saran & Keluhan Teknis</a> </span>
                <a href="/admin-donatur/register" class="button button-xlarge button-success button-rounded">Daftar Sekarang</a>
              </div>
            </div>  
                <Footer/>
                </div> {/* div footer*/}
            </section>{/* #content end */}
      </LayoutHome>
    )
    
  }
}


export default Index;
