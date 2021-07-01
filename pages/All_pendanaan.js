import React, {Component} from 'react';
import Link from 'next/link';
import LayoutHome from '../components/LayoutHome';
import Footer from '../components/FooterHome';
import Router from 'next/router';
// import OwlCarousel from 'react-owl-carousel';
// import $ from 'jquery';
import {URL} from "../constant/constant_func";                          
import axios from 'axios';
import Img from 'react-image';
import Loader from "../components/loader/ImgLoader";

class All_pendanaan extends Component {

  constructor(props){
    super(props);
    this.state = {
      id:'',
      shows_list_pendanaan : [],
      data_percent :0,
      session_username:'',
      session_id_status_user:'',
      _isMounted : false,
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

  listPendanaan(){
    axios({
      method: 'get',
      url: URL+'/admin_sosial/SelectPagePendanaan',
      responseType: 'stream'
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

  detail_pendaan(id){
    Router.push({
      pathname:'/detail_pendanaan',
      query:{id:id}}
      );
  }

  componentDidMount(){
    this.getSession();
    this.listPendanaan();
    this._isMounted = true;
    if(this._isMounted){
      this.loadJS();
    }
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

  render(){
    let LoadImage =(
      <Loader ></Loader>
    )
    return(
      <LayoutHome title="Semua Pendanaan" status_user={this.state.session_username} id_status_user={this.state.session_id_status_user}>
       
            {/* Slider
        ============================================= */}
            
            
            <section id="content" style={{overflow: 'visible'}}>
              <div className="content-wrap p-0">
                <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 1382 58" width="100%" height={60} preserveAspectRatio="none" style={{position: 'absolute', top: '-58px', left: 0, zIndex: 1}}><path style={{fill: '#FFF'}} d="M1.52.62s802.13,127,1380,0v56H.51Z" /></svg>
               
              
                {/* card */}
            
            <div id="shop" className="section nomargin page-section nobg clearfix">
              <div className="container clearfix">
                <div className="heading-block center clearfix">
                  <img src="demos/barber/images/icons/comb3.svg" alt="" height={40} style={{marginBottom: '20px'}} />
                  <h2>Pendanaan Sosial</h2>
                </div>
                <div className="row clearfix">
                  {
                  this.state.shows_list_pendanaan.map(data =>  (
                    <div className="col-lg-3 col-md-6 bottommargin" key={data.no}>
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
                            <ul className="skills mb-3">
                              <li data-percent={data.percent}>
                                <div className="progress">
                                  <div className="progress-percent"><div className="counter counter-inherit counter-instant"><span data-from="0" data-to={data.percent} data-refresh-interval="30" data-speed="1100">{data.percent}</span>%</div></div>
                                </div>
                              </li>
                            </ul>
                            <span className="mt-5">Dana Terkumpul :</span>
                            <br/>
                            <span className="bold h6">Rp {data.dana_masuk} dari  Rp {data.total_dibutuhkan}</span>
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
            {/* ./card */}
             
            <Footer></Footer>
            </div>
        </section>{/* #content end */}
      </LayoutHome>
    )
  }
}

export default All_pendanaan;
