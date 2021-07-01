import React, { Component } from 'react';
import Link from 'next/link';
import LayoutAdmin from "../../components/LayoutAdmin";
import SidebarOverlay from '../../components/admin/Side_overlay_layout';
import fetch from 'isomorphic-unfetch';

const Pendanaan = props => (
    <LayoutAdmin>
        <SidebarOverlay />
        <div id="detect-screen" className="content-full-right">
        <div className="container">
          
            <div className="row">
              <div id="col" className="col-12 col-md-9 mt-30">
                <span className="mb-10 pb-10 ">
                  <h1 className="no-paddingTop font-w400" style={{float: 'left', marginBlockEnd: '0em', color: '#31394D'}}>Pendanaan Anda</h1>
                  <span id="btn-ajukan-pendanaan" className="pull-right">
                    <Link href="/admin/add_pendanaan">
                    <a className="btn btn-rounded btn-big btn-noborder btn-success min-width-150 "><span className="p-5">Ajukan Pendanaan Baru</span></a>
                    </Link>
                  </span>
                </span>
              </div>
            </div>
            <div className="row">
            <div id="col" className="col-12 col-md-9">
              <span className="mb-10">
                <div className="form-material floating">
                  <input type="text" className="form-control col-12 col-md-10" style={{height: 'calc(1.5em + .957143rem + 3px)'}} id="material-text2" name="material-text2" />
                  <label htmlFor="material-text2" style={{color: '#8B8B8B!important'}} className="font-w300"> <i className="fa fa-search" /> Cari Berdasarkan Nama atau Lokasi</label>
                </div>
              </span>
              <div className="col-12 mt-20" style={{paddingLeft: '0px'}}>
                <label className="css-control css-control-pengajuan css-radio mr-10 text-dark">
                  <input type="checkbox" className="css-control-input" name="sppp" defaultChecked />
                  <span className="css-control-indicator" /> Pengajuan
                </label>
                <label className="css-control css-control-primary css-radio mr-10 text-dark">
                  <input type="checkbox" className="css-control-input" name="sppp" defaultChecked />
                  <span className="css-control-indicator" /> Aktif
                </label>
                <label className="css-control css-control-penggalangandana css-radio mr-10 text-dark">
                  <input type="checkbox" className="css-control-input" name="sppp" defaultChecked />
                  <span className="css-control-indicator" /> Penggalangan Dana
                </label>
                <label className="css-control css-control-ttd css-radio mr-10 text-dark">
                  <input type="checkbox" className="css-control-input" name="sppp" defaultChecked />
                  <span className="css-control-indicator" /> Proses TTD
                </label>
                <label className="css-control css-control-proyekberjalan css-radio mr-10 text-dark">
                  <input type="checkbox" className="css-control-input" name="sppp" defaultChecked />
                  <span className="css-control-indicator" /> Proyek Berjalan
                </label>
                <label className="css-control css-control-selesai css-radio mr-10 text-dark">
                  <input type="checkbox" className="css-control-input" name="sppp" defaultChecked />
                  <span className="css-control-indicator" /> Selesai
                </label>
              </div>
            </div>
            {/* kanan */}
            <div id="col" className="col-12 col-md-3 pt-30 d-none d-xl-block">
              <span className="pt-30 ">
                <h6 className="text-muted font-w300" />                         
              </span>
            </div>
          </div>
          <div className="row mt-10 pt-5">
            <div id="col" className="col-md-8 mt-5 pt-5">
              <div className="row">
                <div className="col-12">
                {/* {props.shows.map(data => (
                  <li key={data.no}>
                    <Link href="/p/[id]" as={`/p/${data.no}`}>
                      <a>{data.nama_pendanaan}</a>
                    </Link>
                  </li>
                ))} */}
                  {/* Table */}
                  <div className="block">
                    <div className="block-header block-header-default">
                      <h3 className="block-title">Table</h3>
                      <div className="block-options">
                        <div className="block-options-item">
                          <code>.table</code>
                        </div>
                      </div>
                    </div>
                    <div className="block-content">
                      <table className="table table-vcenter">
                        <thead>
                          <tr>
                            <th className="text-center" style={{width: '50px'}}>#</th>
                            <th>Nama Pendanaan</th>
                            <th className="d-none d-sm-table-cell" style={{width: '15%'}}>Status</th>
                            <th className="text-center" style={{width: '100px'}}>Pengaturan</th>
                          </tr>
                        </thead>
                        <tbody>
                        {props.shows.map(data => (
                          <tr key={data.no}>
                            <th className="text-center" scope="row">{data.no}</th>
                            <td><a href="#" className="{{$row->id}}" id="deitil" data-toggle="layoutS" data-action="side_overlay_toggle">{data.nama_pendanaan}</a></td>
                            <td className="d-none d-sm-table-cell">
                              <span className="badge badge-warning">Aktif</span>
                            </td>
                            <td className="text-center">
                              <div className="btn-group">
                                <Link href="/admin/detail_pendanaan" >
                                  <a className="btn btn-sm btn-secondary" data-toggle="tooltip" title="Edit">
                                    <i className="fa fa-eye" />
                                  </a>
                                </Link>
                                <button type="button" className="btn btn-sm btn-secondary" data-toggle="tooltip" title="Edit">
                                  <i className="fa fa-pencil" />
                                </button>
                                <button type="button" className="btn btn-sm btn-secondary" data-toggle="tooltip" title="Delete">
                                  <i className="fa fa-times" />
                                </button>
                              </div>
                            </td>
                          </tr>  
                          ))}                        
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* END Table */}
                </div>
              </div>                           
            </div>
          </div>
        </div>
      </div>    
    </LayoutAdmin>

    )

Pendanaan.getInitialProps = async function() {
  const res = await fetch('http://103.28.23.203/admin_sosial/SelectProyek');
  const datax = await res.json();

  console.log(`Show data fetched. Count: ${datax.length}`);

  return {
    // shows: datax.map(entry => entry.show)
    // data adalah object di array
    shows: datax.pendanaan
  };
};

export default Pendanaan