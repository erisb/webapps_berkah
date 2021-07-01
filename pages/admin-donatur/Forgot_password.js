import React, { Component } from 'react';
import LayoutLogin from "../../components/LayoutLogin";
import { Button } from 'reactstrap';
import axios from 'axios';
import {URL} from "../../constant/constant_func";
import swal from 'sweetalert';
import Router from 'next/router';
import Swal from 'sweetalert2';

class Forgot_password extends Component{
  static getInitialProps({query}) {
    return {query}
  }
  constructor(props) {
    super(props);
    this.text_password =<div></div>;
    this.state = { 
      email:'',
      password:'',
      confirm_password:'',
      show_password:true,
      show_confirm_password:true
    };
  }

  saveData=()=>{

    let password_validation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;    

    if(this.state.password==''){
      return Swal.fire('Notifikasi', 'Kata Sandi tidak boleh kosong', 'warning');
    }else if(this.state.confirm_password==''){
      return Swal.fire('Notifikasi', 'Konfirmasi Kata Sandi tidak boleh kosong', 'warning');
    }else if(password_validation.test(this.state.password)==false){
      return Swal.fire('Notifikasi', 'Format Kata Sandi salah', 'warning');
    }else if(this.state.password!==this.state.confirm_password){
      return Swal.fire('Notifikasi', 'Konfirmasi Kata Sandi tidak sama dengan Kata Sandi yang anda masukkan', 'warning');
    }

    let data = {
      email:this.state.email,
      password:this.state.password,
      kSX:this.state.kSX
    }
    console.log(data);
    axios({
      method: 'post',
      url: URL+'/admin_sosial/resetPasswordProses/',
      data: data,
      responseType: 'stream'
    }).then(
      (result) => {
      console.log(result);
        if(result.data.status == 'success'){
          swal("Sukses", "Ganti Kata Sandi Berhasil","success").then( () => {
            Router.push('/admin-donatur/login');
         })
        }else if(result.data.status == 'failed_kode'){
          swal("Gagal", 'Kode Reset Kata Sandi yang anda masukkan salah',"warning").then( () => {
            Router.push('/admin-donatur/login');
          });
        }else{
          swal("Gagal", 'Reset Kata Sandi anda gagal. Silahkan hubungi Customer Service kami untuk info lebih lanjut',"warning");
        }
      },
      (error) => {
        console.log(error);
        this.setState({ error });
      }
    )
  }

  checkPassword(text){

    let password_validation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    // let val_number = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    // let val_low_case = /^(?=.*\d)(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    // let val_upper_case = /^(?=.*\d)(?=.*[a-z])[a-zA-Z0-9]{8,}$/;
    // let val_min_length = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])$/;

    // let val_number = /^(?=.*\d)$/;                //should contain at least one digit
    // let val_low_case = /^(?=.*[a-z])$/;             //should contain at least one lower case
    // let val_upper_case = /^(?=.*[A-Z])$/;             //should contain at least one upper case
    // let val_min_length = /^[a-zA-Z0-9]{8,}$/;         //should contain at least 8 from the mentioned characters

    if(text.target.value.length==0){
      this.text_password=<div></div>
    }
    else if(password_validation.test(text.target.value)==false){
        this.text_password=<span style={{color:"red", fontSize:11, marginLeft:10}}>kata sandi harus terdiri dari minimal 8 karakter, 1 angka, 1 huruf kecil, dan 1 huruf besar</span>;
    }else{
      this.text_password=<div></div>
    }
  };

  changeShowHidePassword=(value)=>{
    this.setState({ show_password: value });
  }

  changeShowHideConfirmPassword=(value)=>{
    this.setState({ show_confirm_password: value });
  }
  
  componentDidMount(){
    if(this.props.query.kSX==''||this.props.query.kSX==undefined){
      this.setState({
        email:'',
        kSX:''
      });
      Router.push('/admin-donatur/login');
    }else{
      this.setState({
        email:this.props.query.Y,
        kSX:this.props.query.kSX
      })
    }
  }

  render(){
    
    return(<LayoutLogin>        
        {/* Main Container */}
        
                  
                  <form className="js-validation-signin px-30" action="be_pages_auth_all.html" method="post">
                  <h3 htmlFor="login-username">Buat Kata Sandi Baru</h3>
                    <div className="form-group row">
                      <div className="col-12">
                        <div className="form-material ">
                          <i onClick={() => this.changeShowHidePassword(!this.state.show_password)} 
                            className={!this.state.show_password ? 'fa fa-eye pull-right' : 'fa fa-eye-slash pull-right'} > 
                          </i>
                          <input type={this.state.show_password ? "password" : "text"} onChange={input=>{this.setState({password:input.target.value});  this.checkPassword(input); } } className="form-control" id="login-password" name="login-password" />
                          {<span style={{color: "red"}}>{this.text_password}</span>}
                          
                          <label htmlFor="login-password">Buat Kata Sandi </label>
                        </div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-12">
                        <div className="form-material ">
                          <i onClick={() => this.changeShowHideConfirmPassword(!this.state.show_confirm_password)} 
                            className={!this.state.show_confirm_password ? 'fa fa-eye pull-right' : 'fa fa-eye-slash pull-right'} > 
                          </i>
                          <input type={this.state.show_confirm_password ? "password" : "text"} onChange={input=>{this.setState({confirm_password:input.target.value}); } } className="form-control" id="login-password-check" name="login-password-check" />
                          <label htmlFor="login-password-check">Ketik ulang Kata Sandi </label>
                          
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                        <Button onClick={this.saveData} className="btn btn-sm btn-hero btn-alt-primary mt-3">
                          <i className="si si-login mr-10" /> Simpan
                        </Button>
                    </div>
                  </form>
                  {/* END Sign In Form */}
                
        
    </LayoutLogin>

    )
  }
}

export default Forgot_password;