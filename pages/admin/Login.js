import React, { Component } from 'react';
import Link from 'next/link';
import LayoutLogin from "../../components/LayoutLogin";
import {URL} from "../../constant/constant_func";
import axios from "axios";
import Router from 'next/router';
import Cookie from 'js-cookie';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setLoggedIn } from '../../redux/Action/AuthAction';
import swal from 'sweetalert';
import ReCAPTCHA from "react-google-recaptcha";

class Login extends Component{
  userData;
  constructor(props) {
    super(props);
    this.state = { 
      titleForgot: 'Lupa Password ?', 
      subTitleForgot: 'Masukkan username atau alamat email anda...',
      username : '' ,
      password : '',
      show_password:true,
      messageSent: false,
      resolved: false
      };
  }

  componentDidMount(){
    this.userData = JSON.parse(localStorage.getItem('session_login'));
    let id_status = this.userData ? this.userData.id_status_user : 'empty';
    console.log(id_status);
    if (localStorage.getItem('session_login')&&id_status==1) {
      location.href ="/admin/dashboard";
    } else{
      return false;
    }
  }

  recaptchaRef = React.createRef();
  onChange = (value) => {
    console.log("Captcha value:", value);
  }
  
  tryLogin = () => {
    let data={
        name : this.state.username,
        password : this.state.password,
        status_user : 1
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
          this.recaptchaRef.current.reset();
          swal("Maaf", `Username atau Kata Sandi anda salah`,"info");
          console.log(data);
          
        }else{
          let Gtoken = this.recaptchaRef.current.getValue();
          if(Gtoken){
            this.insertLoginData(result);
             console.log(data);
          }else{
            this.recaptchaRef.current.reset();
            swal('Maaf', "Silahkan Validasi Recaptcha terlebih dahulu", 'info')
          }
          
        }
      },
      (error) => {
        this.recaptchaRef.current.reset();
        console.log(error);
        this.setState({ error });
      }
    )
}


insertLoginData = (responseJson) => {
  let authData = {
      token : responseJson.data.token,
      username : this.state.username,
      id_user : responseJson.data.id_user,
      token_type : responseJson.data.token_type,
      id_status_user : responseJson.data.id_status_user,
      status_user : 'Login'
  };
  localStorage.setItem('session_login', JSON.stringify(authData));
  Cookie.set('cookie_token', responseJson.data.token);
  this.props.setLoggedIn(authData);
  Router.push('/admin/dashboard');
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
                          <input type="text" className="form-control" onChange={ (input) => this.setState({username :  input.target.value}) } id="login-username" name="login-username" />
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
                          <input  type={this.state.show_password ? "password" : "text"} className="form-control" onChange={ (input) => this.setState({password :  input.target.value}) } id="login-password" name="login-password" />
                          <label htmlFor="login-password">Masukkan Kata Sandi {this.state.title}</label>
                        </div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-12">
                        <div className="form-material">
                          <ReCAPTCHA
                            ref={this.recaptchaRef}
                            size="normal"
                            sitekey="6LfG9ecUAAAAAL9FqzBPDkl8bBnAzJXfePMt7SrO"
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="form-group">
                        <button type="button" onClick={this.tryLogin}  className="btn btn-sm btn-hero btn-alt-primary">
                            <i className="si si-login mr-10" /> Masuk
                        </button>
                      <div className="mt-30">
                        <Link href={`/admin/forgot?title=${this.state.titleForgot}`}>
                          <a className="link-effect text-muted mr-10 mb-5 d-inline-block" >
                            <i className="fa fa-warning mr-5" /> Lupa Kata Sandi
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