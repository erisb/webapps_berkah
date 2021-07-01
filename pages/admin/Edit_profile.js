import React, { Component, useState } from 'react';
import { Button } from 'reactstrap';
import LayoutAdmin from "../../components/LayoutAdmin";
import { connect } from "react-redux";
import axios from 'axios';
import {URL} from "../../constant/constant_func";	
import swal from 'sweetalert';
import Router from 'next/router';
import { Formik, Form, useField } from "formik"; //fromik form
import * as Yup from "yup"; //formik validasi form
import {loadState} from "../../constant/localStorage";

class Edit_profile extends Component{
  // form validate
  
  static getInitialProps({store}) {
    return store;
  }

  userData;
  constructor(props){
    super(props);
    this.state = {
      session_login: '',
      id: '',
      name: '',
      email: '',
      password: '',
      no_hp: '',
      va_number: '',
      // cek password
      form_check_password: '',
      session_username:''
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
    this.getSession();
    this.userData = JSON.parse(localStorage.getItem('session_login'));
    let id_status = this.userData ? this.userData.id_status_user : 'empty';
    // console.log(id_status);
    this.setState({ 
      session_login : this.userData 
    });
    if (localStorage.getItem('session_login')&&id_status==1) {
      this.setState({
          id_user: this.userData.id_user,
          username: this.userData.username
      })
      this.GetUser(this.userData.id_user);
      // console.log(this.userData);
    }else if(id_status==2){
      location.href ="/admin/dashboard";
    } else {
      location.href="/admin/login";
      this.setState({
          id_user: ''
        })
    }
  }


  GetUser = (id) =>{
    axios({
        method: 'get',
        url: URL+'/admin_sosial/getUser/'+id,
        responseType: 'stream'
      }).then((result) => {
            this.setState({
              id:result.data.users.id,
              name : result.data.users.name,
              email: result.data.users.email,
              password: result.data.users.password,
              no_hp: result.data.users.no_hp,
              va_number: result.data.users.va_number
            });
            // console.log(this.state.password);
          },
          (error) => {
            this.setState({ error });
          }
      )
  }
  render(){
    
    return(
      <LayoutAdmin title='Edit Profile' username={this.state.session_username}>
      <div id="detect-screen" className="content-full-right">
        <div className="container">
          <div className="row">
            <div id="col" className="col-12 col-md-12 mt-30">
              <span className="mb-10 pb-10 ">
                 <h1 className="no-paddingTop font-w400" style={{float: 'left', marginBlockEnd: '0em', color: '#31394D'}}>Akun Donatur </h1>                
              </span>
            </div>
          </div>
          <div className="row mt-5 pt-5">
            <div className="col-md-12 mt-5 pt-5">
              <div className="row">
                <div className="col-12 col-md-12">
                  <div className="js-wizard-simple block py-30">
                    <form className="js-validation-signin px-30">
                        <div className="row">
                          
                            <div className="col-12 col-md-6">
                              <AkunForm id={this.state.id} name={this.state.name} email={this.state.email} no_hp={this.state.no_hp} password={this.state.password} va_number={this.state.va_number} />
                            </div>
                          
                        </div>
                    </form>
                  </div>
                </div>
              </div>                           
            </div>
          </div>
        </div>
      </div>   
    </LayoutAdmin>

    )
  }
}

// component textInput

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  
  return (
    <>
      <div className="form-group mt-5 pt-5 row">
        <div className="col-12 col-md-12">
          <div className="form-material">
            <label htmlFor={props.id || props.name}>{label}</label>
            {meta.touched && meta.error ? (
              <div className="badge badge-danger mt-2 px-4 py-5 pull-right">{meta.error}</div>
            ) : null}
            {field.value !== "" && !meta.error ? (
              <div className="badge badge-success mt-2 px-4 py-5 pull-right">Password Cocok!</div>
            ) : null}
            <input className={meta.touched && meta.error ? 'form-control text-danger' : 'form-control' }  {...field} {...props} />
            
          </div>
        </div>
      </div>
    </>
  );
};

const MyPaswordInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  console.log('meta', meta.error)
  return (
    <>
      <div className="form-group mt-5 pt-5 row">
        <div className="col-12 col-md-12">
          <div className="form-material">
            <label htmlFor={props.id || props.name}>{label}</label>
                {meta.touched === "Kurang dari 8 karakter!" || meta.error === "Kurang dari 8 karakter!" ? (
                  <div className="badge badge-danger mt-2 px-4 py-5 pull-right">Terlalu pendek!</div>
                ) : (
                  null
                )}

                {meta.touched === "Minimal satu huruf kecil" || meta.error === "Minimal satu huruf kecil" ? (
                  <div className="badge badge-danger text-dark mt-2 px-4 py-5 pull-right">Lumayan!</div>
                ) : (
                  null
                )}

                {meta.touched === "Minimal satu huruf Besar" || meta.error === "Minimal satu huruf Besar" ? (
                  <div className="badge badge-danger mt-2 px-4 py-5 pull-right">Cukup Lumayan!</div>
                ) : (
                  null
                )}

                {meta.touched === "Minimal 1 angka atau special karakter (@,!,#, dll)." || meta.error === "Minimal 1 angka atau special karakter (@,!,#, dll)." ? (
                  <div className="badge badge-primary mt-2 px-4 py-5 pull-right">Cukup Oke!</div>
                ) : (
                  null
                )}   

                 {!meta.error && field.value !== "" ? (
                  <div className=" badge badge-success mt-2 px-4 py-5 pull-right">Password Kuat!</div>
                ) : (
                  null
                )} 
            
                {meta.touched || meta.error ? (
                   <React.Fragment>
                     <div className="badge badge-warning mt-2 px-4 py-5 inline-block pull-right">{meta.error}</div>                   
                 </React.Fragment>
                ) : (
                  null
                )}
            
            <input className={meta.touched &&  meta.error ? 'form-control text-danger' : 'form-control' }  {...field} {...props} />

                {meta.error ? (
                   <React.Fragment>                    
                    <div className=" py-5 inline-block text-danger">kata sandi harus terdiri dari minimal 8 karakter, huruf kecil, huruf besar dan spesial karakter atau nomor</div>                   
                 </React.Fragment>
                ) : (
                  null
                )}
             
          </div>
        </div>
      </div>
    </>
  );
};


// And now we can use these
const AkunForm = ({id, name, email, no_hp, password, ulangi_password, va_number}) => {
  const [showHidePassword, changeShowHidePassword] = useState(false);
  return (
    <>
      
      <Formik
        initialValues={{
          name: "",
          email: "",
          no_hp: "",
          password: "",
          ulangi_password: "",
        }}
        validationSchema={Yup.object({
          password: Yup.string()
            .min(8, "Kurang dari 8 karakter!")
            .matches(/[a-z]/, 'Minimal satu huruf kecil')
            .matches(/[A-Z]/, 'Minimal satu huruf Besar')
            .matches(/[a-zA-Z]+[^a-zA-Z\s]+/, 'Minimal 1 angka atau special karakter (@,!,#, dll).')
            .required("Wajib diisi!"),
          ulangi_password: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Password harus sama!')
            .required('Konfirmasi password harus diisi!')
        })}
        onSubmit={(values, { setSubmitting }) => {
          // console.log(values, null, 2);
          setTimeout(() => {
            // console.log('ID USER :' +id)          
            setSubmitting(false);
            // axios
            let data = {
              // id, name, email, no_hp from getUser  : password dari inputan
              id: id,
              name : name,
              email: email,
              password: values.password,
              no_hp: no_hp,
              // va_number from getUser
              va_number: va_number
              
            }
            // console.log( "Data akan dikirim :" + data.id)
            axios({
              method: 'post',
              url: URL+'/admin_sosial/editUser/',
              data: data,
              responseType: 'stream'
            }).then(
              (result) => {
                // console.log(result.data.status)
                if(result.data.status == 'Sukses Insert'){
                  localStorage.clear();
                  swal("Sukses", "Perubahan Berhasil, Silahkan Login","success").then( () => {
                    Router.push('/admin/login');
                 })
                }else {
                  swal("Server Tidak Merespon ", "Perubahan Gagal, Silahkan coba beberapa saat lagi atau hubungi Admin!","warning").then( () => {
                  })
                }
              },
              (error) => {
                console.log(error);
                this.setState({ error });
                swal("Respon Error", "Silahkan coba beberapa saat lagi atau hubungi Admin!","warning").then( () => {
                })
               
              }
            )
          }, 400);
        }}
      >
        
        <Form>
          <h6 className="mt-5 pt-5 mb-0 text-muted">Nama Akun </h6>
          <h4 className="mb-2 text-success">@{name}</h4>
          <h6 className="mb-2 text-muted"> <i className="fa fa-envelope-o mr-5"></i>{email} | <i className="fa fa-phone mr-5"></i> {no_hp}</h6>
          <hr/>
          <h5 className="mt-5 pt-5 text-dark">Password 
            <i onClick={() => changeShowHidePassword(!showHidePassword)} 
              className={!showHidePassword ? 'fa fa-eye pull-right' : 'fa fa-eye-slash pull-right'} > 
            </i>
          </h5>
          <hr/>          
          <MyPaswordInput
            label="Password Baru"
            name="password"
            placeholder="Buat Password Baru..."
            type={showHidePassword ? "text" : "password"}
          />
          <MyTextInput
            label="Ulangi Password"
            name="ulangi_password"
            placeholder="Ulangi Password..."
            type={showHidePassword ? "text" : "password"}
          />
          <br></br>
          <button className="btn btn-sm btn-hero btn-alt-secondary mt-5 mb-5 pull-left" type="reset" value="reset"> <i className="fa fa-times-circle"> </i>  Reset</button>
          <button className="btn btn-sm btn-hero btn-alt-primary mt-5 mb-5 pull-right" type="submit"> <i className="fa fa-check-circle"> </i>  Simpan Perubahan</button>
        </Form>
      </Formik>
    </>
  );
};

const mapStateToProps = state => {
  const {  auth } = state;
  return {  auth };
};

export default connect(
  mapStateToProps
)(Edit_profile);