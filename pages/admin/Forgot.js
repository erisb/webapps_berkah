import React, { Component } from 'react';
import Link from 'next/link';
import LayoutLogin from "../../components/LayoutLogin";
import {loadState} from "../../constant/localStorage";

class Forgot extends Component{
  userData;
  constructor(props){
    super(props)
  }
  componentDidMount(){
    this.userData = JSON.parse(localStorage.getItem('session_login'));
    
    if (localStorage.getItem('session_login')) {
      // 
    } else {
      location.href ="/admin/login";
      
    }
    
  }
  render(){
    return(<LayoutLogin>        
        {/* Main Container */}         
        <form className="js-validation-signin px-30" method="post">
          <div className="form-group row">
            <div className="col-12">
              <div className="form-material floating">
                <input type="text" className="form-control" id="login-username" name="login-username" />
                <label htmlFor="login-username">Username atau email</label>
              </div>
            </div>
          </div>
          <div className="form-group">
              <Link href="/admin/dashboard">
                  <a className="btn btn-sm btn-hero btn-alt-primary">
                      <i className="si si-login mr-10" /> Atur Ulang Password
                  </a>
              </Link>
            <div className="mt-30">
              <Link href="/admin/login">
                <a className="link-effect text-muted mr-10 mb-5 d-inline-block" >
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