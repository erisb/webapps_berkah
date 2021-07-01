import React, { Component, useState, useEffect  } from 'react';
import LayoutAdmin from '../../components/LayoutAdmin';
import ModalComponent from '../../components/ModalComponent';
import swal from 'sweetalert2';
import {URL} from "../../constant/constant_func"												  
import axios from 'axios';
import TableMutasi from "./Table/Table_Riwayat_Mutasi";
import number_format from '../../constant/Numberformat';

class Riwayat_mutasi extends Component{
  userData;
  constructor(props) {
    super(props);

    this.state = {
      session_username:'',
      data_mutasi:{},
      data_detail:[]
    }

  }

  getSession=()=>{
    const session_login = JSON.parse(localStorage.getItem('session_login'));
    if (typeof session_login !== 'undefined' && session_login !== null){
      this.setState({ session_username : session_login.username });
    }else{
      this.setState({ session_username : 'Admin' });
    }
  }

  componentDidMount(){
    this.userData = JSON.parse(localStorage.getItem('session_login'));
    let id_status = this.userData ? this.userData.id_status_user : 'empty';
    if (localStorage.getItem('session_login')&&id_status==1) {
      this.getSession();
    } else if(id_status==2){
      location.href ="/admin-donatur/dashboard";
    }else{
      location.href ="/admin/login";
    }
    this.getData();
  }

  getData=()=>{
    axios({
      method: 'get',
      url: URL+'/admin_sosial/SelectMutasiAdmin',
      responseType: 'stream'
    }).then((result) => {
      // console.log(result.data.mutasi);
      this.setState({data_mutasi:result.data.mutasi});
      // setdataMutasi(result.data.mutasi);
      setTimeout(()=>{console.log(this.state.data_mutasi)},300);

      },
      (error) => {
        console.log(error);
      }
    )
  }

  getDetail = (id_pendanaan_sosial) =>{
    axios({
      method: 'get',
      url: URL+'/admin_sosial/SelectMutasiAdminDetail/'+id_pendanaan_sosial,
      responseType: 'stream'
    }).then((result) => {
      this.setState({data_detail:result.data.mutasi});
      setTimeout(()=>{console.log(this.state.data_detail)},300)
    },
      (error) => {
        console.log(error);
      }
    )
  }
  
  render(
    
  ){
  return (
        <LayoutAdmin title='Riwayat Mutasi' username={this.state.session_username}>
            {/* Page Content */}
            <div id="detect-screen" className="content-full-right">
              <div className="container">
                <div className="row">
                  <div id="col" className="col-12 col-md-9 mt-30">
                    <div className="row mb-10 pb-10">
                        <div className=" col-8">
                            <h1 className="no-paddingTop font-w400 text-dark">Riwayat Mutasi</h1>                       
                        </div>
                    </div> 
                  </div>
                  {/* kanan */}
                  <div id="col" className="col-12 col-md-3 pt-30 d-none d-xl-block">
                    <span className="pt-30 ">
                      <h6 className="text-muted font-w300" > </h6>                       
                    </span>
                  </div>
                </div>  
                  <TableMutasi data_mutasi={this.state.data_mutasi}/>
              </div>
          </div>
          </LayoutAdmin>  
      );
  }
}

export default Riwayat_mutasi;