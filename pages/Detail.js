import React, { Component } from 'react';
import Link from 'next/link';
import { Progress, Button, Form, FormGroup, Label, Input, FormText,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import LayoutHome from '../components/LayoutHome';
import axios from 'axios';
import {URL} from "../constant_func";	
import ShareButton from '../components/frontend/Share_button';
import Joyride, { CallBackProps, STATUS, Step, StoreHelpers } from 'react-joyride';

class Detail extends Component {
  
  static getInitialProps({query}) {
    return {query}
  }
  constructor(props){
   super(props);

   this.state = {
      run: false,
      steps: [],
      id:'',
      nama_pendanaan : "",
      dana_terkumpul : "",
      dana_dibutuhkan : "",
      data_percent : 0,
      data_selisih_hari : "",
      data_yayasan : "",
      data_cerita : "",
      data_video : "",
    
    }

  }
  componentDidMount(){
    this.getDataPendanaan(this.props.query.id);
    this.getDataPendanaan();
  }

  getDataPendanaan = (id) =>{
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
            data_selisih_hari : result.data.pendanaan[0].selisih_hari,
            data_yayasan : result.data.pendanaan[0].nama_yayasan,
            data_cerita : result.data.pendanaan[0].cerita,
            data_video : result.data.pendanaan[0].video,
            
            //data_pendanaan : result.data.pendanaan
          });
        
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  
  render(){
    
    return(
      <LayoutHome title="About Us">
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
                          <a href="#">
                            {/* <img src="https://images.unsplash.com/photo-1570715746786-e7ca46b1e50b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80" alt="Blog Single" /></a> */}
                            <iframe width="790" height="500" src={this.state.data_video} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                          </a>
                        </div>{/* .entry-image end */}
                        {/* Entry Content
                    ============================================= */}
                        <div className="entry-content notopmargin">
                  <p>{this.state.data_cerita}</p>
                          
                          {/* Post Single - Content End */}
                          {/* Tag Cloud
                      ============================================= */}
                          <div className="tagcloud clearfix bottommargin">
                            <a href="#">wakaf</a>
                            <a href="#">donasi</a>
                            <a href="#">masjid</a>
                          </div>{/* .tagcloud end */}
                          <div className="clear" />
                          
                        </div>
                      </div>{/* .entry end */}
                      {/* Post Navigation
                  ============================================= */}
                      <div className="post-navigation clearfix">
                        <div className="col_half nobottommargin">
                          <a href="#">⇐ Sebelumnya</a>
                        </div>
                        <div className="col_half col_last tright nobottommargin">
                          <a href="#">Berikutnya ⇒</a>
                        </div>
                      </div>{/* .post-navigation end */}
                      <div className="line" />
                      {/* Post Author Info
                  ============================================= */}
                      
                     
                    </div>
                  </div>{/* .postcontent end */}
                  {/* Sidebar
              ============================================= */}
                  <div className="sidebar nobottommargin col_last clearfix fixed" >
                    <div className="sidebar-widgets-wrap">                     
                      <div className="widget clearfix">
                        <h4>Detail Donasi</h4>   
                       
                        <ul className="skills mb-3">
                          <div className="text-right">Terkumpul : {this.state.data_percent}%</div>
                          <Progress color="success" value={this.state.data_percent} />
                        </ul>
                        <span className="mt-5">Dana Terkumpul :</span>
                        <br/>
                        <span className="bold h3 mb-3">{this.state.dana_terkumpul}</span><br />   
                        <span>Terkumpul dari target  Rp. {this.state.dana_dibutuhkan}</span>
                        <div className="mt-3">
                          <span className="mt-5">Sisa Hari :</span>
                          <br/>
                            <span className="bold h6 mb-3">{this.state.data_selisih_hari} Hari Lagi</span><br />   
                          <span>Masa penggalangan dana tersedia</span>  
                        </div>
                        <div className="mt-5 clearfix">
                          <Form>
                            <FormGroup>
                              <Label for="exampleEmail">Nominal Donasi</Label>
                              <Input
                                type="number"
                                name="txt-nominal"
                                id="txt-nominal"
                                placeholder="100.000"
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label for="examplePassword">Nama Anda</Label>
                              <Input
                                type="text"
                                name="txt-name"
                                id="txt-name"
                                placeholder="Masukkan Nama Anda..."
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label for="exampleUrl">No Handphone</Label>
                              <Input
                                type="number"
                                name="txt-phone"
                                id="txt-phone"
                                placeholder="000-0000-0000-000"
                              />
                            </FormGroup>
                          </Form>
                        </div> 
                        <div className="mt-5">
                          <Link href="/pembayaran">
                              <a className="btn btn-success block text-white bold h1 btn-lg">Donasi Sekarang</a>
                          </Link>
                         {/* <Button color="success" size="lg" block>Donasi Sekarang</Button>     */}
                        </div>         
                      </div>
                      <div className="mt-5 card">
            <div className="card-header"><strong>Oleh : <a href="#">{this.state.data_yayasan}</a></strong></div>
                        <div className="card-body">
                          <div className="author-image">
                            <img src="/assetsFE/images/8.png" alt="" className="rounded-circle" />
                          </div>
                          Yang menamakan diri mereka sebagai Shift Pemuda Hijrah. 
                        </div>
                      </div>{/* Post Single - Author End */}
                      {/* Post Single - Share
                      ============================================= */}
                      <div className="widget clearfix">
                        <span>Bagikan Pendanaan ini:</span>
                        <div>
                         <ShareButton></ShareButton>
                        </div>
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
export default Detail