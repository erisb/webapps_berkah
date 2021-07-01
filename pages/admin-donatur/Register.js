import React, { Component } from 'react';
import Link from 'next/link';
import LayoutLogin from "../../components/LayoutLogin";
import { Button } from 'reactstrap';
import axios from 'axios';
import {URL} from "../../constant/constant_func";
import swal from 'sweetalert';
import Router from 'next/router';
import Swal from 'sweetalert2';
import * as EmailValidator from 'email-validator';

class Login extends Component{
  static getInitialProps({query}) {
    return {query}
  }
  constructor(props) {
    super(props);
    this.text_password =<div></div>;
    this.text_email=<div></div>;
    this.state = { 
      titleForgot: 'Lupa Password ?', 
      subTitleForgot: 'Masukkan username atau alamat email anda...',
      username : '',
      email:'',
      telepon:'',
      password:'',
      confirm_password:'',
      show_password:true,
      show_confirm_password:true,
      nama_lengkap:'',
      disabled:false
    };
  }

  saveData=()=>{

    let password_validation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    let username_validation = /\s/;
    

    if(this.state.username=='' || this.state.username==undefined){
      return Swal.fire('Notifikasi', 'Username tidak boleh kosong', 'warning');
    }else if(this.state.email=='' || this.state.email==undefined){
      return Swal.fire('Notifikasi', 'Email tidak boleh kosong', 'warning');
    }else if(this.state.telepon=='' || this.state.telepon==undefined){
      return Swal.fire('Notifikasi', 'Telepon tidak boleh kosong', 'warning');
    }else if(this.state.telepon.length < 8){
      return Swal.fire('Notifikasi', 'Nomor Telepon Terlalu Pendek', 'warning');
    }else if(this.state.nama_lengkap=='' || this.state.nama_lengkap==undefined){
      return Swal.fire('Notifikasi', 'Nama Lengkap tidak boleh kosong', 'warning');
    }else if(this.state.password==''){
      return Swal.fire('Notifikasi', 'Kata Sandi tidak boleh kosong', 'warning');
    }else if(this.state.confirm_password==''){
      return Swal.fire('Notifikasi', 'Konfirmasi Kata Sandi tidak boleh kosong', 'warning');
    }else if(username_validation.test(this.state.username)){
      return Swal.fire('Notifikasi', 'Username tidak boleh menggunakan spasi', 'warning');
    }else if(password_validation.test(this.state.password)==false){
      return Swal.fire('Notifikasi', 'Format Kata Sandi salah', 'warning');
    }else if(EmailValidator.validate(this.state.email)==false){
      return Swal.fire('Notifikasi', 'Format Email salah', 'warning');
    }else if(this.state.password!==this.state.confirm_password){
      return Swal.fire('Notifikasi', 'Konfirmasi Kata Sandi tidak sama dengan Kata Sandi yang anda masukkan', 'warning');
    }

    let data = {
      username : this.state.username,
      email:this.state.email,
      nama_lengkap:this.state.nama_lengkap,
      telepon:this.state.telepon,
      password:this.state.password,
      confirm_password:this.state.confirm_password
    }
    console.log(data);
    axios({
      method: 'post',
      url: URL+'/admin_sosial/AddPendana/',
      data: data,
      responseType: 'stream'
    }).then(
      (result) => {
      console.log(result);
        if(result.data.status == 'success'){
          swal("Sukses", "Daftar Berhasil, Silahkan Login","success").then( () => {
            Router.push('/admin-donatur/login');
         })
        }else if(result.data.status == 'failed'){
          swal("Gagal", result.data.message,"warning");
        }
      },
      (error) => {
        console.log(error);
        this.setState({ error });
      }
    )
  }

  checkUsername=(username)=>{
    axios({
      method: 'get',
      url: URL+'/admin_sosial/checkUsernameExistingRegister/'+username,
      data: '',
      responseType: 'stream'
    }).then(
      (result) => {
        console.log(result);
        if(result.data.status=='username_exist'){
          Swal.fire({
            title: '<strong>Apakah ini Anda ?</strong>',
            html: 'Anda Sudah Pernah Terdaftar di Danasyariah dengan email <strong>'  + result.data.email + '</strong> dan nomor telepon <strong>' + result.data.phone + '</strong>',
            icon: 'info',
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> Iya Saya, lanjutkan ',
          confirmButtonAriaLabel: 'Iya Saya, lanjutkan!',
          cancelButtonText:
            '<i class="fa fa-thumbs-down"></i> Bukan Saya!',
          cancelButtonAriaLabel: 'Bukan Saya!'
            })
            .then((confirm) => {
              if(confirm.value){
                Router.push('/admin-donatur/login');
              }else{
                this.setState({
                  username: "",
                  email: "",
                  telepon:"",
                  nama_lengkap:""
                })
              }
            
         })
        }else if(result.data.status=='username_exist_without_detil'){
          Swal.fire({
            title: '<strong>Apakah ini Anda ?</strong>',
            text: 'Akun ini sudah Terdaftar di aplikasi danasyariah.id dengan email' +result.data.email + '',
            icon: 'info',
            showCloseButton: true,
            showCancelButton: true,
            })
            .then( () => {
            this.setState({
              email:result.data.email,
              telepon:''
            })
         })
        }else if(result.data.status=='username_sosial_exist'){
          swal( "@" + this.state.username, `Username sudah dipakai!`,"info")
            .then( () => {
            this.setState({
              username: "",
            })
        })
        }
        else{
          this.setState({
            email:'',
            telepon:''
          })
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

  checkEmail(text){

    if(text.target.value.length==0){
      this.text_email=<div></div>
    }
    else if(EmailValidator.validate(text.target.value)==false){
      console.log('tengah');
        this.text_email=<span style={{color:"red", fontSize:11, marginLeft:10}}>Format email salah</span>;
    }else{
      this.text_email=<div></div>
    }
  };

  onChangedPhoneNumber(text){
    let newText = '';
    let numbers = '0123456789';

    for (var i=0; i < text.length; i++) {
        if(numbers.indexOf(text[i]) > -1 ) {
            newText = newText + text[i];
        }
    }
    this.setState({ telepon: newText });
  };

  changeShowHidePassword=(value)=>{
    this.setState({ show_password: value });
  }

  changeShowHideConfirmPassword=(value)=>{
    this.setState({ show_confirm_password: value });
  }
  
  componentDidMount(){
    if(this.props.query.u==''||this.props.query.u==undefined){
      this.setState({
        email:'',
        telepon:'',
        username:'',
        nama_lengkap:''
      })
    }else{
      this.setState({
        username:this.props.query.u,
        email:this.props.query.e,
        telepon:this.props.query.h,
        nama_lengkap:this.props.query.n,
        disabled:true
      })
    }
  }

  render(){
    
    return(<LayoutLogin>        
        {/* Main Container */}
        
                  
                  <form className="js-validation-signin px-30" action="be_pages_auth_all.html" method="post">
                  <h3 htmlFor="login-username">Daftar Sebagai Donatur</h3>
                  <div className="form-group row">
                      <div className="col-12">
                        <div className="form-material ">
                          <input disabled={this.state.disabled} type="text" onChange={input=>{this.setState({username:input.target.value}); } } value={this.state.username} onBlur={input=>{this.checkUsername(input.target.value)}} className="form-control" id="login-username" name="login-username" />
                          <label htmlFor="login-username">Username</label>
                        </div>
                      </div>
                    </div>
                  <div className="form-group row">
                      <div className="col-12">
                        <div className="form-material ">
                          <input type="text" onChange={input=>{this.setState({email:input.target.value}); this.checkEmail(input);  } }  value={this.state.email} className="form-control" id="login-email" name="login-email" />
                          {<span style={{color: "red"}}>{this.text_email}</span>}
                          <label htmlFor="login-email">Email</label>
                        </div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-12">
                        <div className="form-material ">
                          <input type="text" onChange={input=>{this.setState({nama_lengkap:input.target.value}); } } value={this.state.nama_lengkap} className="form-control" id="login-namalengkap" name="login-namalengkap" />
                          <label htmlFor="login-namalengkap">Nama Lengkap</label>
                        </div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-12">
                        <div className="form-material ">
                          <input type="text" onChange={input=>{this.setState({telepon:input.target.value}); this.onChangedPhoneNumber(input.target.value) } } value={this.state.telepon} className="form-control" id="login-nomorhp" name="login-nomorhp" />
                          <label htmlFor="login-nomorhp">Nomor Handphone</label>
                        </div>
                      </div>
                    </div>
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
                          <i className="si si-login mr-10" /> Daftar
                        </Button>
                      <div className="mt-30">
                        <Link href="/admin-donatur/login">
                          <a className="link-effect text-muted mr-10 mb-5 d-inline-block" >
                            <i className="fa fa-warning mr-5" /> Sudah punya akun ? Masuk
                          </a>
                        </Link>
                      </div>
                    </div>
                  </form>
                  {/* END Sign In Form */}
                
        
    </LayoutLogin>

    )
  }
}

export default Login;