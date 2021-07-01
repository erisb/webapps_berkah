import React, {Component} from 'react';
import Link from 'next/link';
import LayoutHome from '../components/LayoutHome';
import Footer from '../components/FooterHome';
import axios from 'axios';
import ModalComponent from '../components/ModalComponent';
import Detail from '../pages/Detail';
import { Router, Route } from 'react-router'
import {URL} from "../constant_func";	
// import OwlCarousel from 'react-owl-carousel';
// import $ from 'jquery';

class Index extends Component {
  constructor(props){
    super(props)

    this.state = {
      
      shows_list_pendanaan : [],
      coronas: [],
      coronasRiwayat: [],
      data_percent :0,
      _isMounted : false
    }
    
    //this.handleClickDelete = this.handleClickDelete.bind(this)
  }


  listPendanaan(){
    axios({
      method: 'get',
      url: URL+'/admin_sosial/SelectPendanaanLanding/',
    }).then((result) => {
          //console.log(result.data.pendanaan[1].nama_pendanaan);
          this.setState({
            shows_list_pendanaan: result.data.pendanaan
          });
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  infoCorona(){
    axios({
      method: 'GET',
      url: 'https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest?iso2=ID&onlyCountries=true',
        headers: {
          'Content-Type': 'application/json',
      }
    }).then((result) => {
          console.log(result);
          this.setState({
            coronas: result.data
          });
          console.log(this.state.coronas)
          
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  infoCoronaRiwayat(){
    axios({
      method: 'GET',
      url: 'https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/timeseries?iso2=ID',
        headers: {
          'Content-Type': 'application/json',
      }
    }).then((result2) => {
          
          this.setState({
            coronasRiwayat: result2.data
          });
          console.log(this.state.coronasRiwayat);
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  lihatDetail() {
    $('#modal_detail').modal('show');
  }
  // table(){
  //   $('#tabelDetail').DataTable();
  // }
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
          console.log(filesadded);
      }
      else
          console.log(filesadded);
  }
  checkloadjscssfile("/assetsFE/js/functions.js", "js") //success
  checkloadjscssfile("/assetsFE/js/plugins.js", "js") //redundant file, so file not added  
}

  componentDidMount(){
    this._isMounted = true;
    console.log(this._isMounted);
    if(this._isMounted){
      this.loadJS();
    }
    
    this.listPendanaan();
    this.infoCorona();
    this.infoCoronaRiwayat();
  
  }
  componentDidUpdate(){
    if(this._isMounted){
      this.loadJS();
    }
  }
  componentWillUnmount(){
    this._isMounted = false;
  }
  render(){
  
    const riwayat = this.state.coronasRiwayat.map((index) => (
      <React.Fragment>
        {/* {index.countryregion} */}
         <React.Fragment>
          {
            Object.keys(index.timeseries).map((key) => (
              <React.Fragment>  
              <tr key={index}>
                <td>{[key]}</td>
                <td>{index.timeseries[key].confirmed}</td>
                <td>{index.timeseries[key].deaths}</td>
                <td>{index.timeseries[key].recovered}</td>
              </tr>
              </React.Fragment>
            ))
          }
          </React.Fragment>
      </React.Fragment>
    ));
    const negara = Object.keys(this.state.coronas).map((key) => (
        <span>{this.state.coronas[key].countryregion}</span>
    ));
    const totalKasus = Object.keys(this.state.coronas).map((key) => (
      <span>{this.state.coronas[key].confirmed}</span>
    ));
    const meninggal = Object.keys(this.state.coronas).map((key) => (
      <span>{this.state.coronas[key].deaths}</span>
    ));
    const sembuh = Object.keys(this.state.coronas).map((key) => (
      <span>{this.state.coronas[key].recovered}</span>
    ));
    const jam = Object.keys(this.state.coronas).map((key) => (
      <span>tanggal {this.state.coronas[key].lastupdate.replace('T', ' pada JAM : ')}</span>
    ));
    let modalCovid =  (
      <React.Fragment>    
          <div className="col-12">
              <div className="row">
                <div className="col-md-12 col-xs-12">
                  <div id="section-pricing" className="heading-block title-left page-section">
                    {this.state.coronasRiwayat.map((index) => (
                      <React.Fragment>
                      <h3>Covid-19 di {index.countryregion}</h3>
                        <p>Update Terakhir: {index.lastupdate}</p>
                      </React.Fragment>
                    ))
                    }
                  </div>
                </div>
                <div className="col-md-4 col-xs-12">
                  <div className="col-12 col-sm-12 pricing bottommargin clearfix">
                    <div className=" fadeInUp animated" data-animate="fadeInUp" data-delay={500}>
                      <div className="pricing-box">
                        
                        <div className="pricing-price">
                          <span className="price-unit"></span>{totalKasus}<span className="price-tenure"></span>
                        </div>
                        <div className="pricing-title">
                          <h5>Total Kasus</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 col-xs-12">
                  <div className="col-12 col-sm-12 pricing bottommargin clearfix">
                    <div className=" fadeInUp animated" data-animate="fadeInUp" data-delay={500}>
                      <div className="pricing-box">
                        
                        <div className="pricing-price">
                          <span className="price-unit text-warning"></span>{meninggal}<span className="price-tenure"></span>
                        </div>
                        <div className="pricing-title">
                          <h5>Meninggal</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-xs-12">
                  <div className="col-12 col-sm-12 pricing bottommargin clearfix">
                    <div className=" fadeInUp animated" data-animate="fadeInUp" data-delay={500}>
                      <div className="pricing-box">
                        
                        <div className="pricing-price">
                          <span className="price-unit text-primary"></span>{sembuh}<span className="price-tenure"></span>
                        </div>
                        <div className="pricing-title">
                          <h5>Sembuh</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              
                

              </div>
            </div>
            <div className="col-md-12 col-xs-12">
              <div className="col-12 col-sm-12 pricing bottommargin clearfix">
              
              <table id="tabelDetail" className="table table-striped">
                  <thead>
                  <tr>
                    <th>Bulan/Tanggal/Tahun</th>
                    <th>Total Kasus</th>
                    <th>Meninggal</th>
                    <th>Sembuh</th>
                  </tr>
                  </thead>
                  <tbody>
                  {riwayat}
                  </tbody>
                </table>
              </div>
            </div>
      </React.Fragment>
    )
    return(
      <LayoutHome title="Home">      
            <div id="covid" className="section nomargin page-section nobg clearfix">
                <div className="container clearfix"> 
                <div className="row clearfix">
                    
                    <div className="col-12">
                    <div className="row">
                        <div className="col-md-6 col-xs-12">
                        <div id="section-pricing" className="heading-block title-left page-section">
                            <h1>Pendanaan Sosial & ZIswaf</h1>
                            <h3>Informasi Covid-19 Indonesia</h3>
                            <p>Pantau Informasi virus corona di danasyariah.id</p>    
                            <ModalComponent buttonLabel="Lihat Selengkapnya" className="modal-lg" modalTitle="Time Series" isi={modalCovid}></ModalComponent>
                            
                        </div>
                        </div>
                        <div className="col-md-2 col-xs-12">
                        <div className="col-12 col-sm-12 pricing bottommargin clearfix">
                            <div className=" fadeInUp animated" data-animate="fadeInUp" data-delay={500}>
                            <div className="pricing-box">
                                
                                <div className="pricing-price">
                                <span className="price-unit"></span>{totalKasus}<span className="price-tenure"></span>
                                </div>
                                <div className="pricing-title">
                                <h5>Total Kasus</h5>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>

                        <div className="col-md-2 col-xs-12">
                        <div className="col-12 col-sm-12 pricing bottommargin clearfix">
                            <div className=" fadeInUp animated" data-animate="fadeInUp" data-delay={500}>
                            <div className="pricing-box">
                                
                                <div className="pricing-price">
                                <span className="price-unit text-warning"></span>{meninggal}<span className="price-tenure"></span>
                                </div>
                                <div className="pricing-title">
                                <h5>Meninggal</h5>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="col-md-2 col-xs-12">
                        <div className="col-12 col-sm-12 pricing bottommargin clearfix">
                            <div className=" fadeInUp animated" data-animate="fadeInUp" data-delay={500}>
                            <div className="pricing-box">
                                
                                <div className="pricing-price">
                                <span className="price-unit text-primary"></span>{sembuh}<span className="price-tenure"></span>
                                </div>
                                <div className="pricing-title">
                                <h5>Sembuh</h5>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="col-md-12 col-xs-12 center">                            
                        
                        </div>
                        

                    </div>
                    </div>
                
                </div>
                </div>
            </div>
            <div id="pendanaan" className="section nomargin page-section nobg clearfix">
              <div className="container">
                <div className="row clearfix">
                    <div className="col-lg-6">
                        <div class="fancy-title title-border">
                            <h4>Pilihan Editor</h4>
                        </div>  
                        <div className="col-lg-12 col-md-12 bottommargin" >
                        <div className="iproduct">
                            <div className="product-image">
                            <a href="#"><img className="image_fade" src="https://images.unsplash.com/photo-1584582868981-38dbd5d1a86e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" alt="pendanaan sosial dana syariah" /></a>                       
                            </div>
                            <div className="product-desc left">
                            <div className="h6"><ins>Oleh : SHIFT</ins></div>
                            <div className="product-title"><h3><a href="#">SHIFT Peduli Corona</a></h3></div>                                
                                <span className="mt-5">Dana Terkumpul :</span>
                                <br/>
                                <span className="bold h6">Rp 1.000.000.000 dari  RP 2.500.000.000</span>
                                <ul className="skills mb-3">
                                    <li data-percent="50">
                                        <div className="progress">
                                        <div className="progress-percent"><div className="counter counter-inherit counter-instant"><span data-from="0" data-to="50"data-refresh-interval="30" data-speed="1100">50%</span>%</div></div>
                                        </div>
                                    </li>
                                </ul>
                                <div className="mt-3">
                                
                                <Link href="/">
                                <a>Lihat Selengkapnya ></a>
                                </Link>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div class="fancy-title title-border">
                            <h4>Populer</h4>
                        </div>  
                        <div id="posts" className="small-thumbs">
                            {this.state.shows_list_pendanaan.map(data => (
                            <div className="entry clearfix" key={data.no}>
                                <div className="entry-image">
                                    <a href="/" data-lightbox="image"><img className="image_fade" src="https://images.unsplash.com/photo-1585411241969-9ac0c565451b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" alt="Standard Post with Image" /></a>
                                </div>
                                <div className="entry-c">
                                    <div className="iproduct">
                                    <div className="entry-title">
                                        <h5><a href="blog-single.html">{data.nama_pendanaan}</a></h5>
                                        <span className="badge badge-success">Pendanaan Ziswaf</span>
                                    </div>
                                    <div className="product-title"></div>
                                        
                                        <span className="mt-5">Dana Terkumpul :</span>
                                        <br/>
                                        <span className="bold h6">Rp {data.dana_masuk} dari  RP {data.total_dibutuhkan}</span>
                                        <br/>
                                        <span className="bold text-success">{data.percent}%</span>
                                        <div className=""><ins>Oleh : {data.nama_yayasan}</ins></div>
                                      </div>
                                    </div>
                                    <div class="entry-content">
                                        <Link href={`/detail_pendanaan?id=${data.id_pendanaan_sosial}`} >
                                        <a className="more-link">Lihat Selengkapnya ></a>
                                        </Link>
                                    </div>
                                </div>
                            ))}  
                        </div>
                    </div>
                </div>
                
              </div>
            </div>

            <section id="content" style={{overflow: 'visible'}}>
              <div className="content-wrap p-0">
                <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 1382 58" width="100%" height={60} preserveAspectRatio="none" style={{position: 'absolute', top: '-58px', left: 0, zIndex: 1}}><path style={{fill: '#FFF'}} d="M1.52.62s802.13,127,1380,0v56H.51Z" />
              </svg>
              <div class="container slider-feature w-80">
                <div class="row ">
                  <div class="col-md-6 px-1">
                    <a href="#" class="card center border-left-0 border-right-0 border-top-0 border-bottom border-bottom shadow py-3 noradius t600 uppercase ls1">
                    <div class="card-body">
                    <i class="icon-line-umbrella"></i>Peduli Corona
                    </div>
                    </a>
                  </div>
                  <div class="col-md-6 px-1">
                    <a href="#" class="card center border-left-0 border-right-0 border-top-0 border-bottom border-bottom shadow py-3 noradius t600 uppercase ls1">
                    <div class="card-body">
                    <i class="icon-line-mail"></i>Zakat, Infaq, Sodaqoh dan Wakaf
                    </div>
                    </a>  
                  </div>
                </div>
              </div>

              <div id="pendanaan" className="section nomargin page-section nobg clearfix">
              <div className="container">
                <div className="row clearfix">
                    <div className="col-lg-12 col-12">
                        <div class="fancy-title title-border">
                            <h4>Terbaru</h4>
                        </div>  
                        <div className="row">
                            <div className="col-12 col-lg-6 ">
                                <div className="iproduct mb-5">
                                    <div className="product-image">
                                        <a href="#"><img className="image_fade" src="/assetsFE/images/ziswaf.png" alt="pendanaan sosial dana syariah" /></a>                       
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6 ">

                                <div id="posts" className="small-thumbs">
                                    {this.state.shows_list_pendanaan.map(data => (
                                    <div className="entry clearfix" key={data.no}>
                                        <div className="entry-image">
                                            <a href="/" data-lightbox="image"><img className="image_fade" src="https://images.unsplash.com/photo-1585411241969-9ac0c565451b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" alt="Standard Post with Image" /></a>
                                        </div>
                                        <div className="entry-c">
                                            <div className="iproduct">
                                                <div className="entry-title">
                                                    <h5><a href="blog-single.html">{data.nama_pendanaan}</a></h5>
                                                    <span className="badge badge-warning">Pendanaan Sosial</span>
                                                    <div className=""><ins>Oleh : {data.nama_yayasan}</ins></div>
                                                </div>
                                                <div className="product-title"></div>
                                                    <span className="mt-5">Dana Terkumpul :</span>
                                                    <br/>
                                                    <span className="bold h6">Rp {data.dana_masuk} dari  RP {data.total_dibutuhkan}</span>
                                                    <br/>
                                                    <span className="bold text-success">{data.percent}%</span>
                                                    
                                                </div>
                                            </div>
                                            <div class="entry-content">                                
                                                
                                                <Link href={`/detail_pendanaan?id=${data.id_pendanaan_sosial}`} >
                                                <a className="more-link">Lihat Selengkapnya ></a>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}  
                                </div>
                                
                            </div>

                        </div>
                       
                    </div>
                </div>
                
              </div>
            </div>

            <div id="pendanaan" className="section nomargin page-section nobg clearfix">
              <div className="container">
                <div className="row clearfix">
                    <div className="col-lg-12 col-12">
                        <div class="fancy-title title-border">
                            <h4>Hampir Selesai</h4>
                        </div>  
                        <div className="row">
                        {this.state.shows_list_pendanaan.map(data => (
                            <div className="col-12 col-md-6 ">
                                <div id="posts" className="small-thumbs">
                                    
                                    <div className="entry clearfix" key={data.no}>
                                        <div className="entry-image">
                                            <a href="/" data-lightbox="image"><img className="image_fade" src="https://images.unsplash.com/photo-1585282263872-36fa5ae76e60?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" alt="Standard Post with Image" /></a>
                                        </div>
                                        <div className="entry-c">
                                            <div className="iproduct">
                                                <div className="entry-title">
                                                    <h5><a href="blog-single.html">{data.nama_pendanaan}</a></h5>
                                                    <span className="badge badge-warning">Pendanaan Sosial</span>
                                                    <div className=""><ins>Oleh : {data.nama_yayasan}</ins></div>
                                                </div>
                                                <div className="product-title"></div>
                                                    <span className="mt-5">Dana Terkumpul :</span>
                                                    <br/>
                                                    <span className="bold h6">Rp {data.dana_masuk} dari  RP {data.total_dibutuhkan}</span>
                                                    <br/>
                                                    <span className="bold text-success">{data.percent}%</span>
                                                    
                                                </div>
                                            </div>
                                            <div class="entry-content">                                
                                                
                                                <Link href={`/detail_pendanaan?id=${data.id_pendanaan_sosial}`} >
                                                <a className="more-link">Lihat Selengkapnya ></a>
                                                </Link>
                                            </div>
                                        </div> 
                                </div>
                            </div>
                         ))}    

                        </div>
                       
                    </div>
                </div>
                
              </div>
            </div>
              
           
            
             
                <div className="section nobg" style={{padding: '80px 0'}}>
                  <div className="container clearfix">
                    <div className="row justify-content-center">
                      <div className="col-md-7 center">
                      <div class="fancy-title title-border">
                            <h4>Kami Bekerja sama dengan</h4>
                        </div>
                        
                      </div>
                      <div className="clear" />
                      <div className="col-md-11 my-5 mb-2">
                        <ul className="clients-grid nobottommargin clearfix">
                          <li><a href="#"><img src="/assetsFE/images/8.png" alt="Clients" /></a></li>
                          <li><a href="#"><img src="/assetsFE/images/9.png" alt="Clients" /></a></li>
                          <li><a href="#"><img src="/assetsFE/images/10.png" alt="Clients" /></a></li>
                          <li><a href="#"><img src="/assetsFE/images/10.png" alt="Clients" /></a></li>
                          <li><a href="#"><img src="/assetsFE/images/10.png" alt="Clients" /></a></li>
                        </ul>
                      </div>                     
                    </div>
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
