import React, {Component} from 'react';
import Head from 'next/head';
import Link from 'next/link';

const Footer  = (props) => {
    return(
      <React.Fragment>
        <div className="line line-sm my-0 clearfix" />
        <div className="clear" />
        <div className="section section-details mb-0 bg-white" style={{padding: '80px 0 160px'}}>
        <div className="w-100 h-100 d-none d-md-block" style={{position: 'absolute', top: 0, left: 0, background: '#FFF url("/6.jpg") no-repeat bottom right / cover'}} />
        <div className="container clearfix">
        <div className="row">
            <div className="col-md-4 px-4 mb-5">
            <h4 className="t500 mb-4 text-dark"><strong><i>#AyoCariBerkah</i></strong></h4>
            <p className="mb-3">Sebuah Gerakan bertujuan untuk menaungi kegiatan atau Program Dakwah/Sosial yang di kampanyekan oleh Danasyariah.id guna membantu umat Islam dalam menunaikan kewajiban Zakat dan memberikan manfaat kebaikan bagi yang mendukung dengan berdonasi pada campaign tersebut.</p>
            
            
            </div>
            <div className="col-md-4 px-4 mb-5">
            <h4 className="t500 mb-4">Partner Kami</h4>
            <p>Sambung kebaikan kamu dengan mitra atau komunitas yang sudah bekerja sama dengan Kami. Danasyariah.id berkomitmen untuk menjadi media yang menjamin setiap donasimu akan diterima oleh orang-orang yang benar membutuhkan.</p>
            </div>
            <div className="col-md-4 px-4 mb-5">
            <h4 className="t500 mb-4">Misi</h4>
            <p>Berkolaborasi untuk menghadirkan kebaikan dengan cara yang mudah dan amanah bergandeng bersama <a href="https://www.instagram.com/danasyariah" target="_blank">#OrangBaik</a> lainnya.</p>
            </div>
            <div className="col-md-4 px-4 mb-5 mb-md-0">
            <h4 className="t500 mb-4">Kontak</h4>
            <p className="mb-3">District 8, Prosperity Tower Lantai 12 Unit J, JL. Jendral Sudirman Kav. 52-53, Kelurahan Senayan, Kecamatan Kebayoran Baru, Jakarta Selatan 1219</p>        
            <abbr title="Phone Number"><strong>Phone:</strong></abbr> +62 (21) 508-58821<br />
            <a href="mailto:cso.ayocariberkah@danasyariah.id?&subject=Bantu%20Support%20AyoCariBerkah&body=Tulis pengalaman, keluhan dan masukkan yang berguna untuk aplikasi #AyoCariBerkah..." className="mb-1 d-block"><i className="icon-envelope21 position-relative" style={{top: '1px'}} /> cso.ayocariberkah@danasyariah.id</a>            
            <a href="https://www.facebook.com/danasyariahid/" className="social-icon si-dark si-small si-facebook" title="Facebook">
                <i className="icon-facebook" />
                <i className="icon-facebook" />
            </a>
            <a href="https://www.instagram.com/danasyariah" className="social-icon si-dark si-small si-instagram" title="Instagram">
                <i className="icon-instagram" />
                <i className="icon-instagram" />
            </a>
            <a href="https://www.youtube.com/channel/UCLPxmUGo-cK2ai9LLJeO--A" className="social-icon si-dark si-small si-youtube" title="Youtube">
                <i className="icon-youtube" />
                <i className="icon-youtube" />
            </a>
            
            </div>
            
            
        </div>
        </div>
        </div>
      </React.Fragment>
    )
}
export default Footer;