import React, { useState } from 'react';
import { UncontrolledTooltip} from 'reactstrap';
import NumberFormat from 'react-number-format';
import axios from 'axios';
import {URL} from "../../constant/constant_func"
import Router from 'next/router';
import Swal from 'sweetalert2';

function KalkulatorComponent  ({url_maal, url_profesi, id_status_user}) {
  // ZAKAT PENDAPATAN
  // untuk input
  const [input_pendapatan, setInputPendapatan] = useState(0);
  const [input_bonus, setInputBonus] = useState(0);
  const [total_zakat_pendapatan, setTotalZakatPendapatan] = useState('');
  // untuk style hidden show tag
  const [displayStyle, setDisplay] = useState(false);

  // ZAKAT MAAL
  // untuk input
  const [input_emas, setInputEmas] = useState(0);
  const [input_uang, setInputUang] = useState(0);
  const [input_aset, setInputAset] = useState(0);
  const [input_hutang, setInputHutang] = useState(0);
  const [total_zakat_maal, setTotalZakatMaal] = useState('');
  // untuk style hidden show tag
  const [displayStyleMaal, setDisplayMaal] = useState(false);

  // ZAKAT PENDAPATAN INPUT
  // input onChange untuk pendapatan
  const changeInputPendanaan = (input) => {
    const {formattedValue, value} = input; 
    setInputPendapatan(value)
    setDisplay(false);
  }
  // input onChange untuk bonus
  const changeInputBonus = (input) => {
    const {formattedValue, value} = input; 
    setInputBonus(value)
    setDisplay(false);
  }
  // ONCLICK
  const hitungZakat = () => {
    let data={
      tipe_zakat:'penghasilan',
      pendapatan_perbulan :input_pendapatan,
      pendapatan_lain :input_bonus
    };

    let hitung = axios({
      method: 'post',
      url: URL+'/admin_sosial/KalkulatorBasnaz/',
      data:data,
      responseType: 'stream'
    })

    hitung.then((data) => {
          setTotalZakatPendapatan(parseInt(data.data.Total_Zakat));
          console.log(total_zakat_pendapatan);
          setTimeout(()=>{
            setDisplay(true);
          },100);
        },
        (error) => {
          console.log(error);
        }
      )
  };

  // ZAKAT MAAL INPUT
  const changeInputEmas = (input) => {
    const {formattedValue, value} = input; 
    setInputEmas(value)
    setDisplayMaal(false);
  }
  const changeInputUang = (input) => {
    const {formattedValue, value} = input; 
    setInputUang(value)
    setDisplayMaal(false);
  }

  const changeInputAset = (input) => {
    const {formattedValue, value} = input; 
    setInputAset(value)
    setDisplayMaal(false);
  }

  const changeInputHutang = (input) => {
    const {formattedValue, value} = input; 
    setInputHutang(value)
    setDisplayMaal(false);
  }
  // ONCLICK
  const hitungZakatMaal = () => {
    let data={
      tipe_zakat:'maal',
      logam_mulia :input_emas,
      tabungan :input_uang,
      aset:input_aset,
      hutang:input_hutang
    };

    let hitung = axios({
      method: 'post',
      url: URL+'/admin_sosial/KalkulatorBasnaz/',
      data:data,
      responseType: 'stream'
    })

    hitung.then((data) => {
      console.log(data);
        setTotalZakatMaal(parseInt(data.data.Total_Zakat));
          setTimeout(()=>{
            setDisplayMaal(true);
          },100);
        },
        (error) => {
          console.log(error);
        }
      )
  };

  const bayarZakatMaal=()=>{
    if(id_status_user==1 || id_status_user=='' || id_status_user==undefined){
      Router.push({
        pathname:'/admin-donatur/login'
      });
    }else{
      if(url_maal==''|| url_maal==undefined){
        return Swal.fire('Notifikasi', 'Pembayaran Zakat Maal belum tersedia untuk saat ini', 'info');
      }else{
        Router.push({
          pathname:'/detail_pendanaan',
          query:{id:url_maal, n:total_zakat_maal}}
        );
      }
    }
  }

  const bayarZakatProfesi=()=>{
    if(id_status_user==1 || id_status_user=='' || id_status_user==undefined){
      Router.push({
        pathname:'/admin-donatur/login'
      });
    }else{
      if(url_profesi==''|| url_profesi==undefined){
        return Swal.fire('Notifikasi', 'Pembayaran Zakat Profesi belum tersedia untuk saat ini', 'info');
      }else{
        Router.push({
          pathname:'/detail_pendanaan',
          query:{id:url_profesi, n:total_zakat_pendapatan}}
        );
      }
    }
  }

  return (
      <section id="slider" className="slider-element gradient clearfix pb-10" style={{height: 'auto', margin: '130px 0', paddingBottom: '0px'}}>
      <div className="container" style={{zIndex: 2}}>
          <div className="row topmargin justify-content-center clearfix">
            <div className="col-lg-5 d-none d-lg-flex flex-wrap mt-5 pt-5  pr-5 justify-content-center">
              <div className="center">
                <img src="assetsFE/ayo-zakat.png" height="80" alt="logo Baznas Ayo Zakat online" />
                <h5 className="mt-4">BERSAMA DANA SYARIAH</h5>
                <p className="text-dark-50">“Ambillah zakat dari sebagian harta mereka, dengan zakat tersebut engkau membersihkan dan mensucikan mereka” (QS. At-Taubah: 103)
Kalkulator dan pengelolaan Dana Zakat langsung terdistribusikan ke Baznas selaku Badan resmi negara dalam hal Zakat Nasional.</p>
                <p className="text-dark-50">Powered by</p>
                <img src="assetsFE/images/4.png" height="130" alt="logo Baznas Ayo Zakat online" />
              </div>
              
            </div>
            <div className="col-lg-6">
              <h5 className="mt-4 text-center pb-3" >KALKULATOR ZAKAT</h5>
              <ul className="nav nav-tabs nav-justified flex-column border-bottom-0 flex-md-row bgcolor mt-4" role="tablist">
                <li className="nav-item">
                  <a className="nav-link py-3 active" id="home-moving-tab" data-toggle="tab" href="#home-moving" role="tab" aria-controls="home-moving" aria-selected="true">Penghasilan</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link py-3" id="office-moving-tab" data-toggle="tab" href="#office-moving" role="tab" aria-controls="office-moving" aria-selected="false">Maal</a>
                </li>
              </ul>
              <div className="tab-content rounded-bottom shadow bg-white py-4 px-5">
                <div className="tab-pane fade show active" id="home-moving" role="tabpanel" aria-labelledby="home-moving-tab">
                  <h3 >Ayo Hitung Zakat Penghasilan Kamu!</h3>
                  <UncontrolledTooltip placement="top" target="UncontrolledTooltipExample">
                  Zakat penghasilan atau yang dikenal juga sebagai zakat zakat profesi adalah bagian dari zakat maal yang wajib dikeluarkan atas harta yang berasal dari pendapatan / penghasilan rutin dari pekerjaan yang tidak melanggar syariah (Al Qur'an Surah Al Baqarah ayat 267, Peraturan Menteri Agama No 31/2019 dan pendapat Shaikh Yusuf Qardawi). Standar nishab yang digunakan adalah sebesar Rp5.240.000,- per bulan.
                  </UncontrolledTooltip> 
                  <p id="UncontrolledTooltipExample"><strong>Standar Nihsab yang digunakan ? <span className="btn text-success"><ins>Lihat-> </ins></span> </strong></p>
                  <div className="form-widget mt-4">
                    <div className="form-result" />
                    <form className="row home-moving-form position-relative mb-0">
                      <div className="form-processx"/>
                      <div className="col-12 input-group form-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text nobg"><strong>Rp</strong></span>
                        </div>                       
                        <NumberFormat className="form-control" displayType={'input'} allowNegative={false} decimalSeparator={false} placeholder="Jumlah pendapatan perbulan (wajib diisi)" onValueChange={(values) => { changeInputPendanaan(values); }} thousandSeparator={true} prefix={''} />
                      </div>
                      <div className="col-12 input-group form-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text nobg"><strong>Rp</strong></span>
                        </div>
                        <NumberFormat className="form-control" displayType={'input'} allowNegative={false} decimalSeparator={false} placeholder="Bonus, THR dan lainnya (opsional)" onValueChange={(values) => { changeInputBonus(values); }} thousandSeparator={true} prefix={''} />
                        </div>
                      <small className="mb-4 ml-3 text-secondary">Informasi yang Anda masukkan ke dalam kalkulator zakat akan dibagikan ke BAZNAS untuk tujuan perhitungan zakat dan diproses oleh BAZNAS sesuai dengan kebijakan privasi BAZNAS.</small>
                      <div className="left ml-3" style={{ display : displayStyle ? 'block' : 'none'  }}>                       
                        <h5 className="mt-4">Jumlah Zakat Penghasilan Kamu!</h5>
                        <h1 className="text-success"><NumberFormat value={total_zakat_pendapatan} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />,-</h1>                        
                      </div>
                      <div className="col-12">
                        {/* inisial display : block */}
                        <button 
                          type="submit" 
                          onClick={hitungZakat} 
                          className="btn bgcolor-green text-white t500 btn-block py-2 mt-2" 
                          style={{ display : displayStyle ? 'none' : 'block'  }}>
                            Hitung Zakat
                        </button>
                        {/* inisial display : none */}
                        <button  
                          type="submit" 
                          onClick={bayarZakatProfesi}
                          className="btn bgcolor-green text-white t500 btn-block py-2 mt-2" 
                          style={{ display : displayStyle ? 'block' : 'none'  }}>
                            Bayar Zakat
                          </button>
                      </div>
                      <h5 className="mt-4 ml-3" style={{ display : displayStyle ? 'block' : 'none'  }}><i> *Ubah nominal untuk hitung ulang</i></h5>
                    </form>
                  </div>
                </div>
                <div className="tab-pane fade" id="office-moving" role="tabpanel" aria-labelledby="office-moving-tab">
                  <h3 >Ayo Hitung Zakat Maal Kamu!</h3>
                  <UncontrolledTooltip placement="top" target="maal">
                  Zakat maal yang dimaksud dalam perhitungan ini adalah zakat yang dikenakan atas uang, emas, surat berharga, dan aset yang disewakan (Al Qur'an Surah At Taubah ayat 103, Peraturan Menteri Agama No 31/2019 dan pendapat Shaikh Yusuf Qardawi). Tidak termasuk harta pertanian, pertambangan, dan lain-lain yang diatur dalam UU No.23/2011 tentang pengelolaan zakat. Zakat maal harus sudah mencapai nishab (batas minimum) dan terbebas dari hutang serta kepemilikan telah mencapai 1 tahun (haul).Standar harga emas yg digunakan untuk 1 gram nya adalah Rp 800.000,-. Sementara nishab yang digunakan adalah sebesar 85 gram emas.
                  </UncontrolledTooltip>  
                  <p id="maal"><strong>Standar Harga Emas dan Sementara Nishab yang digunakan ? <span className="btn text-success"><ins>Lihat-> </ins></span></strong></p>                
                  <div className="form-widget mt-4">
                    <div className="form-result" />
                    <form className="row home-moving-form position-relative mb-0">
                      <div className="form-processx" />
                      <div className="col-12 input-group form-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text nobg"><strong>Rp</strong></span>
                        </div>
                        <NumberFormat className="form-control required" displayType={'input'} allowNegative={false} decimalSeparator={false} placeholder="Nilai emas, perak, dan/atau permata (wajib diisi)" onValueChange={(values) => { changeInputEmas(values); }} thousandSeparator={true} prefix={''} />
                      </div>
                      <div className="col-12 input-group form-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text nobg"><strong>Rp</strong></span>
                        </div>
                        <NumberFormat className="form-control required" displayType={'input'} allowNegative={false} decimalSeparator={false} placeholder="Uang tunai, tabungan, deposito (wajib diisi)" onValueChange={(values) => { changeInputUang(values); }} thousandSeparator={true} prefix={''} />
                      </div>
                      <div className="col-12 input-group form-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text nobg"><strong>Rp</strong></span>
                        </div>
                        <NumberFormat className="form-control form-lg required" displayType={'input'} allowNegative={false} decimalSeparator={false} placeholder="Kendaraan, rumah, aset lain (wajib diisi)" onValueChange={(values) => { changeInputAset(values); }} thousandSeparator={true} prefix={''} />
                      </div>
                      <div className="col-12 input-group form-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text nobg"><strong>Rp</strong></span>
                        </div>
                        <NumberFormat className="form-control form-lg required" displayType={'input'} allowNegative={false} decimalSeparator={false} placeholder="Jumlah hutang/cicilan (optional)" onValueChange={(values) => { changeInputHutang(values); }} thousandSeparator={true} prefix={''} />
                      </div>
                      <small className="mb-4 ml-3 text-secondary">Informasi yang Anda masukkan ke dalam kalkulator zakat akan dibagikan ke BAZNAS untuk tujuan perhitungan zakat dan diproses oleh BAZNAS sesuai dengan kebijakan privasi BAZNAS.</small>
                      <div className="left ml-3" style={{ display : displayStyleMaal ? 'block' : 'none'  }}>                       
                        <h5 className="mt-4">Jumlah Zakat Maal Kamu!</h5>
                        <h1 className="text-success"><NumberFormat value={total_zakat_maal} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />,-</h1>                        
                      </div>
                      <div className="col-12">
                        {/* inisial display : block */}
                        <button 
                          type="submit" 
                          onClick={hitungZakatMaal} 
                          className="btn bgcolor-green text-white t500 btn-block py-2 mt-2" 
                          style={{ display : displayStyleMaal ? 'none' : 'block'  }}>
                            Hitung Zakat
                        </button>
                        {/* inisial display : none */}
                        <button  
                          type="submit" 
                          onClick={bayarZakatMaal}
                          className="btn bgcolor-green text-white t500 btn-block py-2 mt-2" 
                          style={{ display : displayStyleMaal ? 'block' : 'none'  }}>
                            Bayar Zakat
                          </button>
                      </div>
                      <h5 className="mt-4 ml-3" style={{ display : displayStyleMaal ? 'block' : 'none'  }}><i> *Ubah nominal untuk hitung ulang</i></h5>
                    </form>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
        <div className="svg-separator">
          <div>
            <svg preserveAspectRatio="xMidYMax meet" viewBox="0 0 1440 120" style={{}} data-height={100}>
              <path style={{opacity: 1, fill: 'rgba(255,255,255,0.75)'}} d="M1040,56c0.5,0,1,0,1.6,0c-16.6-8.9-36.4-15.7-66.4-15.7c-56,0-76.8,23.7-106.9,41C881.1,89.3,895.6,96,920,96
						C979.5,96,980,56,1040,56z" /> <path style={{opacity: 1, fill: 'rgba(255,255,255,0.75)'}} d="M1699.8,96l0,10H1946l-0.3-6.9c0,0,0,0-88,0s-88.6-58.8-176.5-58.8c-51.4,0-73,20.1-99.6,36.8 c14.5,9.6,29.6,18.9,58.4,18.9C1699.8,96,1699.8,96,1699.8,96z" /> <path style={{opacity: 1, fill: 'rgba(255,255,255,0.75)'}} d="M1400,96c19.5,0,32.7-4.3,43.7-10c-35.2-17.3-54.1-45.7-115.5-45.7c-32.3,0-52.8,7.9-70.2,17.8 c6.4-1.3,13.6-2.1,22-2.1C1340.1,56,1340.3,96,1400,96z" /> <path style={{opacity: 1, fill: 'rgba(255,255,255,0.75)'}} d="M320,56c6.6,0,12.4,0.5,17.7,1.3c-17-9.6-37.3-17-68.5-17c-60.4,0-79.5,27.8-114,45.2 c11.2,6,24.6,10.5,44.8,10.5C260,96,259.9,56,320,56z" /> <path style={{opacity: 1, fill: 'rgba(255,255,255,0.75)'}} d="M680,96c23.7,0,38.1-6.3,50.5-13.9C699.6,64.8,679,40.3,622.2,40.3c-30,0-49.8,6.8-66.3,15.8 c1.3,0,2.7-0.1,4.1-0.1C619.7,56,620.2,96,680,96z" /> <path style={{opacity: 1, fill: 'rgba(255,255,255,0.75)'}} d="M-40,95.6c28.3,0,43.3-8.7,57.4-18C-9.6,60.8-31,40.2-83.2,40.2c-14.3,0-26.3,1.6-36.8,4.2V106h60V96L-40,95.6
						z" />
              <path style={{opacity: 1, fill: 'rgba(255,255,255,0.3)'}} d="M504,73.4c-2.6-0.8-5.7-1.4-9.6-1.4c-19.4,0-19.6,13-39,13c-19.4,0-19.5-13-39-13c-14,0-18,6.7-26.3,10.4 C402.4,89.9,416.7,96,440,96C472.5,96,487.5,84.2,504,73.4z" /> <path style={{opacity: 1, fill: 'rgba(255,255,255,0.3)'}} d="M1205.4,85c-0.2,0-0.4,0-0.6,0c-19.5,0-19.5-13-39-13s-19.4,12.9-39,12.9c0,0-5.9,0-12.3,0.1 c11.4,6.3,24.9,11,45.5,11C1180.6,96,1194.1,91.2,1205.4,85z" /> <path style={{opacity: 1, fill: 'rgba(255,255,255,0.3)'}} d="M1447.4,83.9c-2.4,0.7-5.2,1.1-8.6,1.1c-19.3,0-19.6-13-39-13s-19.6,13-39,13c-3,0-5.5-0.3-7.7-0.8 c11.6,6.6,25.4,11.8,46.9,11.8C1421.8,96,1435.7,90.7,1447.4,83.9z" /> <path style={{opacity: 1, fill: 'rgba(255,255,255,0.3)'}} d="M985.8,72c-17.6,0.8-18.3,13-37,13c-19.4,0-19.5-13-39-13c-18.2,0-19.6,11.4-35.5,12.8 c11.4,6.3,25,11.2,45.7,11.2C953.7,96,968.5,83.2,985.8,72z" /> <path style={{opacity: 1, fill: 'rgba(255,255,255,0.3)'}} d="M743.8,73.5c-10.3,3.4-13.6,11.5-29,11.5c-19.4,0-19.5-13-39-13s-19.5,13-39,13c-0.9,0-1.7,0-2.5-0.1 c11.4,6.3,25,11.1,45.7,11.1C712.4,96,727.3,84.2,743.8,73.5z" /> <path style={{opacity: 1, fill: 'rgba(255,255,255,0.3)'}} d="M265.5,72.3c-1.5-0.2-3.2-0.3-5.1-0.3c-19.4,0-19.6,13-39,13c-19.4,0-19.6-13-39-13 c-15.9,0-18.9,8.7-30.1,11.9C164.1,90.6,178,96,200,96C233.7,96,248.4,83.4,265.5,72.3z" /> <path style={{opacity: 1, fill: 'rgba(255,255,255,0.3)'}} d="M1692.3,96V85c0,0,0,0-19.5,0s-19.6-13-39-13s-19.6,13-39,13c-0.1,0-0.2,0-0.4,0c11.4,6.2,24.9,11,45.6,11 C1669.9,96,1684.8,96,1692.3,96z" /> <path style={{opacity: 1, fill: 'rgba(255,255,255,0.3)'}} d="M25.5,72C6,72,6.1,84.9-13.5,84.9L-20,85v8.9C0.7,90.1,12.6,80.6,25.9,72C25.8,72,25.7,72,25.5,72z" />
              <path style={{fill: 'rgb(255, 255, 255, 1)'}} d="M-40,95.6C20.3,95.6,20.1,56,80,56s60,40,120,40s59.9-40,120-40s60.3,40,120,40s60.3-40,120-40s60.2,40,120,40s60.1-40,120-40s60.5,40,120,40s60-40,120-40s60.4,40,120,40s59.9-40,120-40s60.3,40,120,40s60.2-40,120-40s60.2,40,120,40s59.8,0,59.8,0l0.2,143H-60V96L-40,95.6z" />
            </svg>
            <div className="bg-white" style={{height: '150px'}} />
          </div>
        </div>
      </section>
  );
}

export default KalkulatorComponent;