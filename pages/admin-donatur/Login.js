import React, { Component } from 'react';
import Link from 'next/link';
import LayoutLogin from "../../components/LayoutLogin";
import {URL} from "../../constant/constant_func";
import axios from "axios";
import Router from 'next/router';
import swal from 'sweetalert';
import Cookie from 'js-cookie';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setLoggedIn } from '../../redux/Action/AuthAction';


class Login extends Component{
  userData;
  constructor(props) {
    super(props);
    this.state = { 
      titleForgot: 'Lupa Password ?', 
      subTitleForgot: 'Masukkan username atau alamat email anda...',
      username:'',
      password:'',
      show_password:true
    };
  }

  componentDidMount(){
    this.userData = JSON.parse(localStorage.getItem('session_login'));
    let id_status = this.userData ? this.userData.id_status_user : 'empty';
    console.log(id_status);
    if (localStorage.getItem('session_login')&&id_status==2) {
      location.href ="/admin-donatur/dashboard";
    } else{
      return false;
    }
  }

  tryLogin = () => {
    let data={
        name : this.state.username,
        password : this.state.password,
        status_user : 2
    }

    let dataPromise = axios({
      method: 'post',
      url: URL+'/admin_sosial/login/',
      data: data,
      responseType: 'stream'
    });
    
    dataPromise.then(
      (result) => {
        console.log(result);
        if(result.data.message=='Unauthorized'){
          swal("Notifikasi", `Username atau Kata Sandi anda salah`,"info");
        }else{
          this.insertLoginData(result);
        }
      },
      (error) => {
        console.log(error);
        this.setState({ error });
      }
    )
  }

  insertLoginData = (responseJson) => {
    console.log(responseJson);
    let authData = {
        token : responseJson.data.token,
        id_user : responseJson.data.id_user,
        username : this.state.username,
        token_type : responseJson.data.token_type,
        id_status_user : responseJson.data.id_status_user,
        status_user : 'Login'
    };
    console.log(authData);
    localStorage.setItem('session_login', JSON.stringify(authData));
    Cookie.set('cookie_token', responseJson.data.token);
    this.props.setLoggedIn(authData);
    Router.push('/admin-donatur/dashboard');
  }

  checkUsername=(username)=>{
    console.log(username);
    axios({
      method: 'get',
      url: URL+'/admin_sosial/checkUsernameExistingLogin/'+username,
      data: '',
      responseType: 'stream'
    }).then(
      (result) => {
        console.log(result);
        if(result.data.status=='username_exist'){
          swal("Notifikasi", `Anda Sudah Pernah Terdaftar di danasyariah.id, Silahkan masukkan Kata Sandi yang sama dengan akun Danasyariah Anda`,"info");
        }else if(result.data.status=='email_sosial_registered'){
          let nama_lengkap = result.data.nama_lengkap;
          let no_hp = result.data.no_hp;
          swal("Notifikasi", `Anda Sudah Pernah Terdaftar di danasyariah.id, Tetapi email sudah digunakan di Danasyariah Sosial, Silahkan daftar terlebih dahulu dengan email yang berbeda`,"info").then(
            ()=>{
              Router.push({
                pathname:'/admin-donatur/register',
                query:{n:nama_lengkap ,h : no_hp, u : username}}
              );
            }
          );
        }else if(result.data.status=='no_hp_sosial_registered'){
          let nama_lengkap = result.data.nama_lengkap;
          let email = result.data.email;
          swal("Notifikasi", `Anda Sudah Pernah Terdaftar di danasyariah.id, Tetapi Nomor Handphone sudah digunakan di Danasyariah Sosial, Silahkan daftar terlebih dahulu dengan Nomor Handphone yang berbeda`,"info").then(
            ()=>{
              Router.push({
                pathname:'/admin-donatur/register',
                query:{n: nama_lengkap, e : email, u : username}}
              );
            }
          );
        }else if(result.data.status=='username_exist_without_detil'){
          let email = result.data.email;
          swal("Notifikasi", `Anda Sudah Pernah Terdaftar di Danasyariah dengan email ${result.data.email}, Silahkan isi Nomor Handphone dan Kata Sandi Terlebih Dahulu`,"info").then(
            ()=>{
              Router.push({
                pathname:'/admin-donatur/register',
                query:{e : email, u : username}}
              );
            }
          );
        }else{
          
        }
      },
      (error) => {
        console.log(error);
        this.setState({ error });
      }
    )
  }

  changeShowHidePassword=(value)=>{
    this.setState({ show_password: value });
  }

  render(){

    return(<LayoutLogin>        
        {/* Main Container */}
        
                  
                  <form className="js-validation-signin px-30" method="post">
                    <div className="form-group row">
                      <div className="col-12">
                        <div className="form-material">
                          <input type="text" onBlur={input=>{this.checkUsername(input.target.value)}} onChange={ (input) => this.setState({username :  input.target.value}) } className="form-control" id="login-username" name="login-username" />
                          <label htmlFor="login-username">Username</label>
                        </div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-12">
                        <div className="form-material">
                          <i onClick={() => this.changeShowHidePassword(!this.state.show_password)} 
                            className={!this.state.show_password ? 'fa fa-eye pull-right' : 'fa fa-eye-slash pull-right'} > 
                          </i>
                          <input  type={this.state.show_password ? "password" : "text"} onChange={ (input) => this.setState({password :  input.target.value}) } className="form-control" id="login-password" name="login-password" />
                          <label htmlFor="login-password">Masukkan Kata Sandi {this.state.title}</label>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                        <button type="button" onClick={this.tryLogin}  className="btn btn-sm btn-hero btn-alt-primary">
                            <i className="si si-login mr-10" /> Masuk
                        </button>
                      <div className="mt-30">
                        <Link href={`/admin-donatur/forgot?title=${this.state.titleForgot}`}>
                          <a className="link-effect text-muted mr-10 mb-5 d-inline-block" >
                            <i className="fa fa-warning mr-5" /> Lupa Kata Sandi
                          </a>
                        </Link>
                      </div>
                      <div className="mt-30">
                        <Link href="/admin-donatur/register">
                          <a className="link-effect text-muted mr-10 mb-5 d-inline-block" >
                            <i className="fa fa-warning mr-5" /> Belum punya akun ? Daftar
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

const mapStateToProps = (state) => {
  const { auth } = state
  return { auth }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
      setLoggedIn,
  },dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);