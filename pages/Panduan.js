import React, {Component} from 'react';
import Link from 'next/link';
import LayoutHome from '../components/LayoutHome';
import Footer from '../components/FooterHome';
// import OwlCarousel from 'react-owl-carousel';
// import $ from 'jquery';
class Panduan extends Component {
  constructor(props){
    super(props);
    this.state = {
      session_username:'',
      session_id_status_user:''
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

  componentDidMount(){
    this.getSession();
  }
  
  render(){
    return(
      <LayoutHome title="Panduan" status_user={this.state.session_username} id_status_user={this.state.session_id_status_user}>
       
            {/* Slider
        ============================================= */}
            
            
            <section id="content" style={{overflow: 'visible'}}>
              <div className="content-wrap p-0">
                <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 1382 58" width="100%" height={60} preserveAspectRatio="none" style={{position: 'absolute', top: '-58px', left: 0, zIndex: 1}}><path style={{fill: '#FFF'}} d="M1.52.62s802.13,127,1380,0v56H.51Z" /></svg>
               
              
                {/* card */}
            
            <div id="shop" className="section nomargin page-section nobg clearfix">
              <div className="container clearfix">
                <div className="heading-block center clearfix">
                  <h2>FAQ</h2>
                  <h5>Frequently Asked Questions</h5>
                </div>
                <div className="clearfix">
                <h4>Menu </h4>
                  <div className="row">
                    <div className="col-4">
                      <div className="list-group" id="list-tab" role="tablist">
                        <a className="list-group-item list-group-item-action active" id="list-home-list" data-toggle="list" href="#list-home" role="tab" aria-controls="home">Bagaimana Cara Berdonasi Melalui DANA Sosial?</a>
                        <a className="list-group-item list-group-item-action " id="list-home-list" data-toggle="list" href="#list-home" role="tab" aria-controls="home">Cara daftar sebagai donatur ?</a>
                        <a className="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" href="#list-profile" role="tab" aria-controls="profile">Cara donasi ?</a>
                        <a className="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list" href="#list-messages" role="tab" aria-controls="messages">Cara Pembayaran ?</a>
                        <a className="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list" href="#list-settings" role="tab" aria-controls="settings">Bantuan Lainnya</a>
                      </div>
                    </div>
                    <div className="col-8">
                      <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="list-caraberdonasi" role="tabpanel" aria-labelledby="list-home-list">
                          <p className="h3">Bagaimana Cara Berdonasi Melalui DANA Sosial?</p>
                          <p>DANA Sosial adalah wadah penggalangan dana dan donasi secara online yang di inisisasi oleh Danasyariah.id bersama lembaga-lembaga yang berkaitan.</p>
                          <h6>Bagaimana cara berdonasi melalui DANA Sosial?</h6>
                          <p className="ml-5">
                          <ul>
                            <li>Silahkan buka DANA Sosial melalui website atau browser melalui HP atau PC Anda.</li>
                            <li>Silahkan masuk dengan akun dengan username dan password milik Anda.</li>
                            <li>Silahkan pilih salah satu penggalangan dana yang diminati.</li>
                            <li>Pada halaman penggalangan dana tersebut, silahkan klik tombol hijau yang bertuliskan <strong>DONASI SEKARANG</strong></li>
                            <li>Ikuti petunjuk yang diberikan (Mengisi nominal donasi – Metode Pembayaran)</li>
                            <li>Setelah itu, terdapat rangkuman pembayaran dengan menyertakan nomor rekening tujuan.</li>
                            <li>Pastikan dana yang akan anda transfer sesuai dengan nominal yang diinformasikan oleh system, agar donasi yang telah diberikan langsung terverifikasi.</li>
                            <li>Selanjutnya, Anda akan menerima notifikasi melalui SMS dan/atau email setelah donasi terverifikasi.</li>
                          </ul>
                          </p>
                          <p>Catatan: pilihlan username dengan nama yang unik, jika username yang dipilih tidak tersedia, silahkan mencoba dengan nama lain.</p>
                        </div>
                        <div className="tab-pane fade show " id="list-home" role="tabpanel" aria-labelledby="list-home-list">
                          <p className="h3">Mendaftar sebagai donatur</p>
                          <p className="ml-5">
                          <ul>
                            <li>Pilih Masuk pada Branda</li>
                            <li>Pilih Daftar untuk membuat akun</li>
                            <li>Lengkapi data diri : Username, alamat e-mail, nomor Handphone dan kata sandic</li>
                            <li>Setelah itu, pilih Daftar</li>
                          </ul>
                          </p>
                          <p>Catatan: pilihlan username dengan nama yang unik, jika username yang dipilih tidak tersedia, silahkan mencoba dengan nama lain.</p>
                        </div>
                        <div className="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">
                          <p className="h3">Cara Donasi</p>
                          <p>Pastikan anda sudah memiliki akun danasosial, jika belum, silahkan membuat akun terlebih dahulu</p>
                          <p className="ml-5">
                          <ul>
                            <li>Masuk ke dalam akun anda/masuk dengan akun danasosial milik anda</li>
                            <li>Pilih Pendanaan</li>
                            <li>Masukkan Nominal</li>
                            <li>Pilih Donasi Sekarang </li>
                            <li>Pada halaman Pembayaran, anda sudah bisa langsung melakukan transaksi donasi</li>
                            <li>Segera lakukan pembayaran sesuai instruksi yang diberikan.</li>
                          </ul>
                          </p>
                          <p>Segera lakukan Pembayaran donasi jika ingin melanjutkan donasi lain setelah memilih pendanaan, untuk merubah nominal pendanaan, silahkan ulangi langkah awal yang telah dilakukan.</p>
                        </div>
                        <div className="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">
                          <p className="h3">Cara Pembayaran ?</p>
                          <p className="ml-5">
                            <div className="mt-5 card">
                              <div className="card-header"><strong>Cara <a href="#">Pembayaran Melalui BNI Mobile</a></strong></div>
                              <div className="card-body">
                                1. Akses BNI Mobile Banking, kemudian masukkan User ID dan password <br />
                                2. Pilih Menu : Transfer <br />
                                3. Pilih Antar Rekening BNI, kemudian "Input Rekening Baru" <br />
                                4. Masukkan Rekening Debit dan Nomor VIRTUAL ACCOUNT / VA Anda. <br />
                                5. Masukkan Nominal Transfer Sesuai dengan Jumlah Donasi <br />
                                6. Konfirmasi Transaksi dan Masukkan Password Transaksi <br />
                                7. Transaksi Selesai <br />
                              </div>
                            </div>{/* Post Single - Author End */}
                            <div className="mt-5 card">
                              <div className="card-header"><strong>Cara <a href="#">Pembayaran Melalui ATM BNI</a></strong></div>
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
                            </div>{/* Post Single - Author End */}
                            <div className="mt-5 card">
                              <div className="card-header"><strong>Cara <a href="#">Pembayaran Melalui ATM Bersama</a></strong></div>
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
                            </div>{/* Post Single - Author End */}           
                          </p>              
                        </div>
                        <div className="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">
                          <p>Untuk informasi dan bantuan lainnya, silahkan hubungi Kami di:</p>
                          <abbr title="Phone Number"><strong>Telp :</strong></abbr> +0822 5000 5050 atau 0815 1001 7070 <br />
                          <a href="#" className="mb-1 d-block"><i className="icon-envelope21 position-relative" style={{top: '1px'}} /> cso@danasyariah.id</a>            
                        </div>
                      </div>
                    </div>
                  </div>
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

export default Panduan;
