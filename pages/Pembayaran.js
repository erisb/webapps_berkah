import React, { Component } from 'react';
import { Progress, Button, Form, FormGroup, Label, Input, FormText,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import LayoutHome from '../components/LayoutHome';
import axios from 'axios';
import {URL} from '../constant/constant_func';
import Link from 'next/link';
import number_format from '../constant/Numberformat';
import Button_Loader from 'react-bootstrap-button-loader';
import ShareButton from '../components/frontend/Share_button';

class Pembayaran extends Component {
  static getInitialProps({query}) {
    return {query}
  }

  constructor(props){
    super(props);
 
    this.state = {
       session_id_user:'',
       va_number:'',
       dana_masuk:'',
       name:'',
       email:'',
       no_hp:'',
       nama_pendanaan:'',
       session_username:'',
       session_id_status_user:'',
       loading:false,
       session_link: '',
       no_invoice:''
     }
 
   }
  
  componentDidMount(){
    this.getSession();
    console.log( 'IDD :' + this.props.query.Y);
  }
  getSessionLink=()=>{
    const getSession_link = localStorage.getItem('session_link_share');
    if (typeof getSession_link !== 'undefined' && getSession_link !== null){
      this.setState({ session_link : getSession_link });
    }else{
      this.setState({ session_link : '' });
    }
  }
  getSession=()=>{
    const session_login = JSON.parse(localStorage.getItem('session_login'));
    if (typeof session_login !== 'undefined' && session_login !== null){
      this.setState({ session_id_user : session_login.id_user, session_username : session_login.username, session_id_status_user:session_login.id_status_user });
      this.getDataPendanaan(session_login.id_user);
    }else{
      this.setState({ session_id_user : '' });
    }
  }
  
  componentDidMount(){
    this.getSession();
    this.getSessionLink();
  }

  getDataPendanaan = (id_user) =>{
    let data = {
      id_temp : this.props.query.kSX,
      id_user : id_user
    }
    console.log(data);
    axios({
      method: 'post',
      url: URL+'/admin_sosial/GetTempDonasi/',
      data : data,
      responseType: 'stream'
    }).then((result) => {
          console.log(result);
          if(result.data.status=='Sukses'){
            this.setState({
              id_pendanaan_sosial: result.data.id_pendanaan_sosial,
              va_number: result.data.va_number,
              dana_masuk: number_format(result.data.dana_masuk),
              name: result.data.name,
              email: result.data.email,
              no_hp: result.data.no_hp,
              nama_pendanaan: result.data.nama_pendanaan,
              status_pembayaran: result.data.status_pembayaran,
              no_invoice:result.data.no_invoice
            })
          }else{
            console.log('tidak ada ada');
          }
        },
        (error) => {
          console.log(error);
          this.setState({ error });
        }
      )
  }

  downloadInvoice=()=>{
    let data = {
      id_temp : this.props.query.kSX,
      id_user : this.state.session_id_user,
      id_pendanaan_sosial : this.state.id_pendanaan_sosial,
      va_number : this.state.va_number,
      dana_masuk : this.state.dana_masuk,
      name: this.state.name,
      email: this.state.email,
      no_hp: this.state.no_hp,
      nama_pendanaan:this.state.nama_pendanaan,
      no_invoice:this.state.no_invoice
    }
    console.log(data);
    axios({
      method: 'post',
      url: URL+'/admin_sosial/downloadInvoice/',
      data : data,
      responseType: 'arraybuffer'
    }).then((response) => {
          console.log(response);
          let blob = new Blob([response.data], { type: 'application/pdf' })
          let link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = 'Invoice.pdf'
          link.click()
          this.setState({loading:!this.state.loading})
        },
        (error) => {
          console.log(error);
          this.setState({ loading:!this.state.loading });
        }
      )
  }
 
  render(){
    const status_pembayaran = this.state.status_pembayaran == 1 ? 
    <blockquote className="bg-warning"><p>STATUS : Menunggu Pembayaran...</p></blockquote> 
    : 
    <blockquote className="bg-success"><p>STATUS : Transfer Berhasil...</p></blockquote>;
    return(
      <LayoutHome title="Pembayaran" status_user={this.state.session_username} id_status_user={this.state.session_id_status_user}>
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
                        <h1>Hai {this.state.name}</h1>
                        <h4>Silahkan melakukan pengiriman dana dengan rincian berikut :</h4>
                        </div>
                            <h4>Transfer Donasi ke Nomor Virtual Akun : {this.state.va_number} </h4> 
                            <h4>Sejumlah Rp. {this.state.dana_masuk}</h4>
                            <br/>
                            <span className="bold h1 mb-3"></span><br />   
                            <span>Donasi Kamu akan disalurkan ke :</span><br/>
                            <span className="mt-5">{this.state.nama_pendanaan}</span><br/>
                            <span className="mt-5">Bukti pembayaran akan dikirimkan ke nomor : {this.state.no_hp}</span><br/>
                        </div>
                        <div className="mt-5">
                          <h4>Pilih Metode Pembayaran berikut :</h4>  
                        </div>
                        <div id="accordion">
                          <div className="card">
                          <div className="widget clearfix">
                            <div className="card-header" id="headingOne">
                              <h5 className="mb-0">
                                <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                  BNI Mobile Banking
                                </button>
                              </h5>
                            </div>
                            <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                              <div className="card-body">
                                1. Akses BNI Mobile Banking, kemudian masukkan User ID dan password <br />
                                2. Pilih Menu : Transfer <br />
                                3. Pilih Antar Rekening BNI, kemudian "Input Rekening Baru" <br />
                                4. Masukkan Rekening Debit dan Nomor VIRTUAL ACCOUNT / VA Anda. <br />
                                5. Masukkan Nominal Transfer Sesuai dengan Jumlah Donasi <br />
                                6. Konfirmasi Transaksi dan Masukkan Password Transaksi <br />
                                7. Transaksi Selesai <br />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header" id="headingTwo">
                              <h5 className="mb-0">
                                <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                  ATM BNI
                                </button>
                              </h5>
                            </div>
                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                              <div className="card-body">
                              1. Masukkan Kartu <br />
                              2. Pilih Bahasa <br />
                              3. Masukkan PIN ATM Anda <br />
                              4. Pilih Menu Lainnya <br />
                              5. Pilih Transfer <br />
                              6. Pilih Rekening Tabungan <br />
                              7. Pilih ke Rekening BNI <br />
                              8. Masukkan Nomor VIRTUAL ACCOUNT / VA Anda. <br />
                              9. Konfirmasi apabila telah sesuai dan lanjutkan Transaksi <br />
                              10. Transaksi Selesai <br />
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header" id="headingThree">
                              <h5 className="mb-0">
                                <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                  ATM Bersama
                                </button>
                              </h5>
                            </div>
                            <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                              <div className="card-body">
                              1. Masukkan Kartu <br />
                              2. Pilih Transaksi Lainnya <br />
                              3. Pilih Menu Transfer <br />
                              4. Pilih Transfer ke Bank Lainnya <br />
                              5. Masukkan Kode Bank BNI Syariah (427) dan 16 Digit Nomor VIRTUAL ACCOUNT / VA Anda <br />
                              6. Masukkan Nominal Transfer Sesuai dengan Jumlah Donasi <br />
                              7. Konfirmasi Rincian akan tampil di Layar, Silahkan cek dan tekan "YA" untuk Transaksi <br />
                              8. Transaksi Selesai <br />
                              </div>
                            </div>
                          </div>
                        </div>

                        <p>Terima Kasih sudah melakukan Donasi melalui Dana Syariah</p>
                        <div className="mt-5">
                          {/* <Link href="http://127.0.0.1:8001/storage/invoice/test.pdf">
                            <a>First Post</a>
                          </Link> */}
                         <Button_Loader variant={'success'} loading={this.state.loading}  onClick={ ()=>{this.downloadInvoice(); this.setState({loading:!this.state.loading})} } color="success" size="lg" >Unduh Invoice</Button_Loader>    
                        </div> 
                      </div>{/* .entry end */}
                    </div>
                  </div>{/* .postcontent end */}
                  {/* Sidebar
              ============================================= */}
                  <div className="sidebar nobottommargin col_last clearfix fixed" >
                    <div className="sidebar-widgets-wrap">                     
                      <div className="widget clearfix">
                        <h4>Panduan Pembayaran</h4>   
                        
                      </div>
                      <div className="mt-5 card">
                        <div className="card-header"><strong><i className="fa fa-envelope"></i> <a href="#">Pemberitahuan</a></strong></div>
                        <div className="card-body">
                          <div className="entry-content notopmargin">
                            {status_pembayaran}
                          </div>
                         
                          Sampai pendanaan berhasil di bayarkan, anda belum bisa melakukan pendanaan ke pendanaan sosial Lainnya
                          jika tetap dilakukan akan menimpa pendanaan sebelumnya.
                        </div>
                      </div>{/* Post Single - Author End */}
                      
                      {/* Post Single - Share
                      ============================================= */}
                      <div className="widget clearfix">
                        <span>Bagikan Pendanaan ini:</span>
                        <ShareButton query={this.state.session_link}></ShareButton>
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
export default Pembayaran