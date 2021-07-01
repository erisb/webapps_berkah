import React, { Component } from 'react';
import Link from 'next/link';
import LayoutLogin from "../../components/LayoutLogin";
import Swal from "sweetalert2";
import axios from 'axios';
import {URL} from '../../constant/constant_func';
import Router from 'next/router';
import * as EmailValidator from 'email-validator';
import randomstring from 'randomstring';

class Forgot extends Component{

  constructor(props){
    super(props);
 
    this.state = {
       disabled:false,
       email:''
     }
 
   }

  ResetPassword=()=>{
    
    if(this.state.email=='' || this.state.email==undefined){
      return Swal.fire('Notifikasi', 'Email tidak boleh kosong', 'warning');
    }else if(EmailValidator.validate(this.state.email)==false){
      return Swal.fire('Notifikasi', 'Format Email salah', 'warning');
    }

    let data = {
      email:this.state.email
    }
    

    this.setState({disabled:true});

    axios({
      method: 'post',
      url: URL+'/admin_sosial/resetPassword/',
      data:data,
      responseType: 'stream'
    }).then(
      (result) => {
      this.setState({disabled:false});
      console.log(result);
      let splitEmail = this.state.email.split("");
      splitEmail[3] ='*';splitEmail[4] ='*';splitEmail[5] ='*';splitEmail[6] ='*';
      let emailHide = splitEmail.join("");
      let encrypt = result.data.encrypt;
      let random = randomstring.generate(100);
      Swal.fire({
        title: `<strong>PIN Reset</strong>`,
        html: `<strong>Masukkan Kode Reset Kata Sandi yang telah dikirim ke email : <span class="text-success"> ${emailHide} </span> </strong>`,
        input:'text',
        icon: 'info',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText:'Reset Password',
        cancelButtonText:'Batal'
        })
        .then((confirm) => {
          console.log(confirm);
          if(confirm.value){
            let data = {
              kode:confirm.value,
              email:this.state.email
            }
            axios({
              method: 'post',
              url: URL+'/admin_sosial/checkKode/',
              data:data,
              responseType: 'stream'
            }).then((result) => {
              console.log(result);
              if(result.data.status=='success'){
                let d = new Date();
                const href = `/admin-donatur/forgot_password?id=${'PD;S@X'+ d.getHours() + d.getMonth() + d.getFullYear() + d.getSeconds() + d.getSeconds() + d.getSeconds() + random + '&kSX=' +encrypt+ '&Y='+this.state.email+'#8$' + d + '!'  + d.getFullYear() + '2192)X1VX&link=' + href}`;
                const as = href;
                Router.push(href, as);
              }else{
                Swal.fire('Notifikasi', 'Kode Reset Kata Sandi yang anda masukkan salah', 'error');
              }
              },
              (error) => {
                console.log(error);
              }
            )
          }else{
            this.setState({})
          }
        
     })
      },
      (error) => {
        this.setState({disabled:false});
        console.log(error);
      }
    )
  }
    
  render(){
    return(<LayoutLogin>        
        {/* Main Container */}         
        <form className="js-validation-signin px-30" action="be_pages_auth_all.html" method="post">
          <div className="form-group row">
            <div className="col-12">
              <div className="form-material">
                <input type="text" className="form-control" id="login-username" name="login-username" onChange={(input)=>{this.setState({email:input.target.value})}} />
                <label htmlFor="login-username">Email</label>
              </div>
            </div>
          </div>
          <div className="form-group">
                  <button type="button" onClick={this.ResetPassword} disabled={this.state.disabled} className="btn btn-sm btn-hero btn-alt-primary">
                    <i className="si si-login mr-10" /> Atur Ulang Password
                  </button>
            <div className="mt-30">
              <Link href="/admin-donatur/login">
                <a className="link-effect text-muted mr-10 mb-5 d-inline-block" onClick={this.ResetPassword} >
                  <i className="fa fa-warning mr-5" /> Masuk
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

export default Forgot;