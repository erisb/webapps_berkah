import React, { Component } from 'react';
import LayoutAdmin from '../../components/LayoutAdmin';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ModalComponent from '../../components/ModalComponent';
import swal from 'sweetalert2';
import {URL} from "../../constant/constant_func"												  
import axios from 'axios';
import * as EmailValidator from 'email-validator';


class Kelola_pengguna extends Component{

  userData;
  constructor(props) {
    super(props);

    this.state = {
      session_username:'',
      list_menu:[],
      list_edit_menu:[],
      list_role:[],
      list_user:[],
      nama_role:'',
      edit_password:'',
      id_edit_role:'',
      edit_nama_role:'',
      tipe_role:'',
      username:'',
      email:'',
      telepon:'',
      password:'',
      add_modal:false,
      edit_modal:false,
      add_modal_admin:false,
      edit_modal_admin:false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.edithandleInputChange = this.edithandleInputChange.bind(this);
  }

  getSession=()=>{
    const session_login = JSON.parse(localStorage.getItem('session_login'));
    if (typeof session_login !== 'undefined' && session_login !== null){
      this.setState({ session_username : session_login.username });
    }else{
      this.setState({ session_username : 'Admin' });
    }
  }

  getMenuAdd=()=>{
    axios({
      method: 'get',
      url: URL+'/admin_sosial/getMenuAdmin/',
      responseType: 'stream'
    }).then((result) => {
      console.log(result);
          this.setState({
            list_menu:result.data.menu,
            list_role:result.data.role,
            list_user:result.data.user
          });
        },
        (error) => {
          console.log(error);
        }
    )
  }

  handleInputChange(event) {
    let list_menu = this.state.list_menu
    list_menu.forEach(data => {
       if (data.value === event.target.value)
          data.checked =  event.target.checked
    })
    this.setState({list_menu: list_menu});
  }

  AddRole(){
    let list_menu = this.state.list_menu

    var str = '';
    for(var i=0; i<list_menu.length; i++){
      if(list_menu[i].checked){
        str += list_menu[i].id_m_role_menu+",";
      }else{
        str:''
      }
    }

    if(this.state.nama_role==''||this.state.nama_role==undefined){
      return swal.fire('Notifikasi', 'Nama Role Belum diisi', 'warning');
    }else if(str==''||str==undefined){
      return swal.fire('Notifikasi', 'Akses belum di pilih', 'warning');
    }

    let data={
      role:str,
      name:this.state.nama_role
    }
    
    axios({
      method: 'post',
      url: URL+'/admin_sosial/AddRoleMenu/',
      data:data,
      responseType: 'stream'
    }).then((result) => {
      console.log(result.data);
      if(result.data=='sukses'){
        swal.fire('Notifikasi', 'Berhasil Tambah Role', 'success').then(()=>{
          this.getMenuAdd();
          this.setState({add_modal:!this.state.add_modal});
          window.location.reload();
        });
      }else{
        swal.fire('Notifikasi', 'Tambah Role Gagal', 'warning');
      }  
    },
      (error) => {
        console.log(error);
      }
    )
  }

  componentDidMount(){
    this.userData = JSON.parse(localStorage.getItem('session_login'));
    let id_status = this.userData ? this.userData.id_status_user : 'empty';
    console.log(id_status);
    if (localStorage.getItem('session_login')&&id_status==1) {
      this.getSession();
      this.getMenuAdd();
    } else if(id_status==2){
      location.href ="/admin-donatur/dashboard";
    }else{
      location.href ="/admin/login";
    }    
  }

  GetEditRole=(id)=>{
    console.log(id);
    axios({
      method: 'get',
      url: URL+'/admin_sosial/getEditRole/'+id,
      responseType: 'stream'
    }).then((result) => {
          this.setState({
            id_edit_role:id,
            list_edit_menu:result.data.role,
            edit_nama_role:result.data.nama_role,
            edit_modal:true
          });
          setTimeout(()=>{console.log(this.state.list_edit_menu)},300);
        },
        (error) => {
          console.log(error);
        }
    )
  }

  GetEditUser=(id)=>{
    console.log(id);
    axios({
      method: 'get',
      url: URL+'/admin_sosial/getEditAdmin/'+id,
      responseType: 'stream'
    }).then((result) => {
      console.log(result);
          this.setState({
            id_edit_admin:id,
            edit_username:result.data.username,
            edit_email:result.data.email,
            edit_phone:result.data.no_hp,
            edit_role_name:result.data.role_name,
            edit_id_m_role_user:result.data.id_m_role_user,
            edit_modal_admin:true
          });
        },
        (error) => {
          console.log(error);
        }
    )
  }
  
  edithandleInputChange(event) {
    let list_edit_menu = this.state.list_edit_menu
    list_edit_menu.forEach(data => {
       if (data.value === event.target.value)
          data.checked =  event.target.checked
    })
    this.setState({list_edit_menu: list_edit_menu});
  }

  EditRole(){
    let list_menu = this.state.list_edit_menu

    var str = '';
    for(var i=0; i<list_menu.length; i++){
      if(list_menu[i].checked){
        str += list_menu[i].id_m_role_menu+",";
      }else{
        str:''
      }
    }

    if(this.state.edit_nama_role==''||this.state.edit_nama_role==undefined){
      return swal.fire('Notifikasi', 'Nama Role Belum diisi', 'warning');
    }else if(str==''||str==undefined){
      return swal.fire('Notifikasi', 'Akses belum di pilih', 'warning');
    }

    let data={
      role:str,
      name:this.state.edit_nama_role,
      id:this.state.id_edit_role
    }
    console.log(data);
    axios({
      method: 'post',
      url: URL+'/admin_sosial/EditRoleMenu/',
      data:data,
      responseType: 'stream'
    }).then((result) => {
      console.log(result.data);
      if(result.data=='sukses'){
        swal.fire('Notifikasi', 'Berhasil Edit Role', 'success').then(()=>{
          this.getMenuAdd();
          this.setState({edit_modal:!this.state.edit_modal});
          window.location.reload();
        });
      }else{
        swal.fire('Notifikasi', 'Edit Role Gagal', 'warning');
      }  
    },
      (error) => {
        console.log(error);
      }
    )
  }

  DeleteRole=(id, nama)=>{
    swal.fire({
      title: 'Hapus',
      text: `Apakah yakin anda akan menghapus Role ${nama}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya',
      cancelButtonText:'Tidak'
    }).then((result) => {
      if (result.value) {
        axios({
          method: 'get',
          url: URL+'/admin_sosial/DeleteRole/'+id,
          responseType: 'stream'
        }).then((result) => {
          console.log(result.data);
          if(result.data=='sukses'){
            swal.fire('Notifikasi', 'Berhasil Hapus Role', 'success').then(()=>{
              this.getMenuAdd();
              window.location.reload();
            });
          }else{
            swal.fire('Notifikasi', 'Hapus Role Gagal', 'warning');
          }  
        },
          (error) => {
            console.log(error);
          }
        )
      }
    })
  }

  AddAdmin(){

    let password_validation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    let username_validation = /\s/;

    if(this.state.username==''||this.state.username==undefined){
      return swal.fire('Notifikasi', 'Username Belum diisi', 'warning');
    }else if(this.state.email==''||this.state.email==undefined){
      return swal.fire('Notifikasi', 'Email belum diisi', 'warning');
    }else if(this.state.telepon==''||this.state.telepon==undefined){
      return swal.fire('Notifikasi', 'No Telepon belum diisi', 'warning');
    }else if(this.state.telepon.length < 8){
      return swal.fire('Notifikasi', 'Nomor Telepon Terlalu Pendek', 'warning');
    }else if(this.state.password==''||this.state.password==undefined){
      return swal.fire('Notifikasi', 'Password belum diisi', 'warning');
    }else if(this.state.tipe_role==''||this.state.tipe_role==undefined){
      return swal.fire('Notifikasi', 'Role belum dipilih', 'warning');
    }else if(EmailValidator.validate(this.state.email)==false){
      return swal.fire('Notifikasi', 'Format Email salah', 'warning');
    }else if(username_validation.test(this.state.username)){
      return swal.fire('Notifikasi', 'Username tidak boleh menggunakan spasi', 'warning');
    }else if(password_validation.test(this.state.password)==false){
      return swal.fire('Notifikasi', 'kata sandi harus terdiri dari minimal 8 karakter, 1 angka, 1 huruf kecil, dan 1 huruf besar', 'warning');
    }

    let data={
      username:this.state.username,
      email:this.state.email,
      telepon:this.state.telepon,
      password:this.state.password,
      tipe_role:this.state.tipe_role
    }
    console.log(data);
    axios({
      method: 'post',
      url: URL+'/admin_sosial/AddAdmin/',
      data:data,
      responseType: 'stream'
    }).then((result) => {
      console.log(result.data);
      if(result.data.status == 'success'){
        swal.fire("Sukses", "Daftar Pengguna Berhasil","success").then( () => {
          this.getMenuAdd();
          this.setState({add_modal_admin:!this.state.add_modal_admin});
          window.location.reload();
       })
      }else if(result.data.status == 'failed'){
        swal.fire("Gagal", result.data.message,"warning");
      }
    },
      (error) => {
        console.log(error);
      }
    )
  }

  m_role(){
    return this.state.list_role.map((item, index)=>{
    return(                                   
        <option key={item.id_m_role_user} value={item.id_m_role_user}> {item.nama} </option>
      )
    }) 
  }

  m_role_edit(){
    return this.state.list_role.map((item, index)=>{
    return( 
        <option key={item.id_m_role_user} selected={this.state.edit_id_m_role_user == item.id_m_role_user} value={item.id_m_role_user}> {item.nama} </option>
      )
    }) 
  }

  EditAdmin(){

    let password_validation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    let username_validation = /\s/;

    if(this.state.edit_username==''||this.state.edit_username==undefined){
      return swal.fire('Notifikasi', 'Username Belum diisi', 'warning');
    }else if(this.state.edit_email==''||this.state.edit_email==undefined){
      return swal.fire('Notifikasi', 'Email belum diisi', 'warning');
    }else if(this.state.edit_phone==''||this.state.edit_phone==undefined){
      return swal.fire('Notifikasi', 'No Telepon belum diisi', 'warning');
    }else if(this.state.edit_phone.length < 8){
      return swal.fire('Notifikasi', 'Nomor Telepon Terlalu Pendek', 'warning');
    }else if(this.state.edit_id_m_role_user==''||this.state.edit_id_m_role_user==undefined){
      return swal.fire('Notifikasi', 'Role belum dipilih', 'warning');
    }else if(EmailValidator.validate(this.state.edit_email)==false){
      return swal.fire('Notifikasi', 'Format Email salah', 'warning');
    }else if(username_validation.test(this.state.edit_username)){
      return swal.fire('Notifikasi', 'Username tidak boleh menggunakan spasi', 'warning');
    }else if(this.state.edit_password.length>0){
      if(password_validation.test(this.state.edit_password)==false){
        return swal.fire('Notifikasi', 'kata sandi harus terdiri dari minimal 8 karakter, 1 angka, 1 huruf kecil, dan 1 huruf besar', 'warning');
      }
    }

    let data={
      id:this.state.id_edit_admin,
      username:this.state.edit_username,
      email:this.state.edit_email,
      telepon:this.state.edit_phone,
      password:this.state.edit_password,
      tipe_role:this.state.edit_id_m_role_user
    }
    console.log(data);
    axios({
      method: 'post',
      url: URL+'/admin_sosial/EditAdmin/',
      data:data,
      responseType: 'stream'
    }).then((result) => {
      console.log(result);
      if(result.data.status == 'success'){
        swal.fire("Sukses", "Ubah data Berhasil","success").then( () => {
          this.getMenuAdd();
          this.setState({edit_modal_admin:!this.state.edit_modal_admin})
          window.location.reload();
       })
      }else if(result.data.status == 'failed'){
        swal.fire("Gagal", result.data.message,"warning");
      }
    },
      (error) => {
        console.log(error);
      }
    )
  }

  DeleteUser=(id, nama)=>{
    swal.fire({
      title: 'Hapus',
      text: `Apakah yakin anda akan menghapus User ${nama}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya',
      cancelButtonText:'Tidak'
    }).then((result) => {
      if (result.value) {
        axios({
          method: 'get',
          url: URL+'/admin_sosial/DeleteUserAdmin/'+id,
          responseType: 'stream'
        }).then((result) => {
          console.log(result.data);
          if(result.data=='sukses'){
            swal.fire('Notifikasi', 'Berhasil Hapus Pengguna', 'success').then(()=>{
              this.getMenuAdd();
              window.location.reload();
            });
          }else{
            swal.fire('Notifikasi', 'Hapus Role Gagal', 'warning');
          }  
        },
          (error) => {
            console.log(error);
          }
        )
      }
    })
  }

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

  onChangedEditPhoneNumber(text){
    let newText = '';
    let numbers = '0123456789';

    for (var i=0; i < text.length; i++) {
        if(numbers.indexOf(text[i]) > -1 ) {
            newText = newText + text[i];
        }
    }
    this.setState({ edit_phone: newText });
  };

  render(){
  //Modal Add Role
  const modalAddRole = 
    <React.Fragment>    
      <div>
        <Modal isOpen={this.state.add_modal} toggle={()=>this.setState({add_modal:!this.state.add_modal})} className='modal-md'>
          <ModalHeader toggle={()=>this.setState({add_modal:!this.state.add_modal})}>Tambah Role</ModalHeader>
          <ModalBody>
          <div className="form-group mt-5 pt-5 row">
            <div className="col-12 col-md-12">
                <div className="">
                <label htmlFor="login-username">Nama Role</label>
                    <input type="text" className="form-control" id="text-namarole" name="text-namarole" onChange={(input)=>this.setState({nama_role:input.target.value})} autoFocus/>
                </div>
            </div>
            </div>
            <div className="block-header block-header-default">
              <h3 className="block-title">Pilih Hak Akses Menu</h3>
              <div className="block-options">
                <div className="block-options-item">
                </div>
              </div>
            </div>
            
            <table className="table table-vcenter">
              <thead>
                <tr>
                  <th className="text-center" style={{width: '50px'}}>#</th>
                  <th>Nama Menu</th>
                  <th className="d-none d-sm-table-cell" style={{width: '25%'}}>Pilih Akses</th>
                </tr>
              </thead>
              <tbody>
              {this.state.list_menu.map(data=>(
                <tr key={data.id}>
                  <th className="text-center" scope="row">{data.id}</th>
                  <td><a href="#" className="" id="deitil" data-toggle="layoutS" data-action="side_overlay_toggle">{data.value}</a></td>
                  <td className="d-none d-sm-table-cell">
                    <div className="form-check">
                        <input key={data.id} name={data.value} type="checkbox" className="form-check-input" value={data.value} checked={data.checked} onChange={this.handleInputChange}/>
                        <label className="form-check-label" htmlFor="exampleCheck1"></label>
                    </div>
                  </td>
                </tr>
              )
              )}
              </tbody>
            </table>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={()=>{this.AddRole()}}>Simpan</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    </React.Fragment>

  //Modal Edit Role
  const modalEditRole = 
    <React.Fragment>    
      <div>
        <Modal isOpen={this.state.edit_modal} toggle={()=>this.setState({edit_modal:!this.state.edit_modal})} className='modal-md'>
          <ModalHeader toggle={()=>this.setState({edit_modal:!this.state.edit_modal})}>Edit Role</ModalHeader>
          <ModalBody>
          <div className="form-group mt-5 pt-5 row">
            <div className="col-12 col-md-12">
                <div className="">
                <label htmlFor="login-username">Nama Role</label>
                    <input type="text" className="form-control" id="text-namarole" name="text-namarole" value={this.state.edit_nama_role} onChange={(input)=>this.setState({edit_nama_role:input.target.value})} autoFocus/>
                </div>
            </div>
            </div>
            <div className="block-header block-header-default">
              <h3 className="block-title">Pilih Hak Akses Menu</h3>
              <div className="block-options">
                <div className="block-options-item">
                </div>
              </div>
            </div>
            
            <table className="table table-vcenter">
              <thead>
                <tr>
                  <th className="text-center" style={{width: '50px'}}>#</th>
                  <th>Nama Menu</th>
                  <th className="d-none d-sm-table-cell" style={{width: '25%'}}>Pilih Akses</th>
                </tr>
              </thead>
              <tbody>
              {this.state.list_edit_menu.map(data=>(
                <tr key={data.id}>
                  <th className="text-center" scope="row">{data.id}</th>
                  <td><a href="#" className="" id="deitil" data-toggle="layoutS" data-action="side_overlay_toggle">{data.value}</a></td>
                  <td className="d-none d-sm-table-cell">
                    <div className="form-check">
                        <input key={data.id} name={data.value} type="checkbox" className="form-check-input" value={data.value} checked={data.checked} onChange={this.edithandleInputChange}/>
                        <label className="form-check-label" htmlFor="exampleCheck1"></label>
                    </div>
                  </td>
                </tr>
              )
              )}
              </tbody>
            </table>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={()=>{this.EditRole()}}>Simpan</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    </React.Fragment>

  // Modal Add Admin
  const modalAddAdmin = 
    <React.Fragment>    
      <div>
        <Modal isOpen={this.state.add_modal_admin} toggle={()=>this.setState({add_modal_admin:!this.state.add_modal_admin})} className='modal-md'>
          <ModalHeader toggle={()=>this.setState({add_modal_admin:!this.state.add_modal_admin})}>Tambah Pengguna</ModalHeader>
          <ModalBody>
          <div className="form-group mt-5 pt-5 row">
              <div className="col-12 col-md-12">
                  <div className="">
                  <label htmlFor="login-username">Username</label>
                      <input type="text" className="form-control" id="text-namarule" name="text-namarule" onChange={(input)=>{this.setState({username:input.target.value})}} autoFocus/>
                  </div>
              </div>
          </div>
          <div className="form-group mt-5 pt-5 row">
              <div className="col-12 col-md-12">
                  <div className="">
                  <label htmlFor="login-username">Email</label>
                      <input type="email" className="form-control" id="text-namarule" name="text-namarule" onChange={(input)=>{this.setState({email:input.target.value})}} autoFocus/>
                  </div>
              </div>
          </div>
          <div className="form-group mt-5 pt-5 row">
              <div className="col-12 col-md-12">
                  <div className="">
                  <label htmlFor="login-username">Nomor Handphone</label>
                      <input type="email" className="form-control" id="text-namarule" name="text-namarule" onChange={(input)=>{this.setState({telepon:input.target.value}); this.onChangedPhoneNumber(input.target.value) }} value={this.state.telepon} autoFocus/>
                  </div>
              </div>
          </div>
          <div className="form-group mt-5 pt-5 row">
              <div className="col-12 col-md-12">
                  <div className="">
                  <label htmlFor="login-username">Password</label>
                      <input type="email" className="form-control" id="text-namarule" name="text-namarule" onChange={(input)=>{this.setState({password:input.target.value})}} autoFocus/>
                  </div>
              </div>
          </div>
          <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">Pilih Rule</label>
              <select className="form-control" onChange={(e) =>{this.setState({ tipe_role: e.target.value }); console.log(e.target.value); }} id="txt_jenis_akad_pendanaan" name="txt_jenis_akad_pendanaan">
              <option value=""> Pilih </option>
                {this.m_role()}
              </select>
          </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={()=>{this.AddAdmin()}}>Simpan</Button>{' '}
          </ModalFooter>
        </Modal>
        </div>
    </React.Fragment>

  // Modal Edit Admin
  const modalEditAdmin = 
    <React.Fragment>    
      <div>
        <Modal isOpen={this.state.edit_modal_admin} toggle={()=>this.setState({edit_modal_admin:!this.state.edit_modal_admin})} className='modal-md'>
          <ModalHeader toggle={()=>this.setState({edit_modal_admin:!this.state.edit_modal_admin})}>Edit Pengguna</ModalHeader>
          <ModalBody>
          <div className="form-group mt-5 pt-5 row">
              <div className="col-12 col-md-12">
                  <div className="">
                  <label htmlFor="login-username">Username</label>
                      <input type="text" className="form-control" id="text-edit-namarule" name="text-edit-namarule" value={this.state.edit_username} onChange={(input)=>{this.setState({edit_username:input.target.value})}} />
                  </div>
              </div>
          </div>
          <div className="form-group mt-5 pt-5 row">
              <div className="col-12 col-md-12">
                  <div className="">
                  <label htmlFor="login-username">Email</label>
                      <input type="email" className="form-control" id="text-edit-namarule" name="text-edit-namarule" value={this.state.edit_email} onChange={(input)=>{this.setState({edit_email:input.target.value})}} autoFocus/>
                  </div>
              </div>
          </div>
          <div className="form-group mt-5 pt-5 row">
              <div className="col-12 col-md-12">
                  <div className="">
                  <label htmlFor="login-username">Nomor Handphone</label>
                      <input type="email" className="form-control" id="text-edit-namarule" name="text-edit-namarule" value={this.state.edit_phone} onChange={(input)=>{this.setState({edit_phone:input.target.value}); this.onChangedEditPhoneNumber(input.target.value); }}  autoFocus/>
                  </div>
              </div>
          </div>
          <div className="form-group mt-5 pt-5 row">
              <div className="col-12 col-md-12">
                  <div className="">
                  <label htmlFor="login-username">Password</label>
                      <input type="email" className="form-control" placeholder="Kosongkan Password jika tidak ingin ganti password" id="text-edit-namarule" name="text-edit-namarule"  onChange={(input)=>{this.setState({edit_password:input.target.value})}} autoFocus/>
                  </div>
              </div>
          </div>
          <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">Pilih Rule</label>
              <select className="form-control" onChange={(e) =>{this.setState({ edit_id_m_role_user: e.target.value }); console.log(e.target.value); }} id="txt_jenis_akad_pendanaan" name="txt_jenis_akad_pendanaan">
              <option value=""> Pilih </option>
                {this.m_role_edit()}
              </select>
          </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={()=>{this.EditAdmin()}}>Simpan</Button>{' '}
          </ModalFooter>
        </Modal>
        </div>
    </React.Fragment>
  
  return (
        <LayoutAdmin title='Kelola Pengguna' username={this.state.session_username}>
            {/* Page Content */}
            {modalEditRole}
            {modalAddRole}
            {modalAddAdmin}
            {modalEditAdmin}
            <div id="detect-screen" className="content-full-right">
              <div className="container">
                <div className="row">
                  <div id="col" className="col-12 col-md-9 mt-30">
                    <div className="row mb-10 pb-10">
                        <div className=" col-8">
                            <h1 className="no-paddingTop font-w400 text-dark">Kelola Pengguna</h1>                       
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
                <div className="row mt-10 pt-5">
                  <div id="col" className="col-md-7 mt-5 pt-5">
                    <div className="row">
                      <div className="col-12">
                        {/* Table */}
                        <div className="block">
                          <div className="block-header block-header-default">
                            <h3 className="block-title">Pengguna Terdaftar</h3>
                            <div className="block-options">
                              <div className="block-options-item">
                                <Button className="button button-border button-white  button-large button-rounded tright shadow nott ls0 ml-0 mt-4" onClick={()=>this.setState({add_modal_admin:!this.state.add_modal_admin})}>Tambah Pengguna</Button>
                              </div>
                            </div>
                          </div>

                          <div className="block-content">
                            
                            <table className="table table-vcenter">
                              <thead>
                                <tr>
                                  <th className="text-center" style={{width: '50px'}}>#</th>
                                  <th>Nama Admin</th>
                                  <th className="d-none d-sm-table-cell" style={{width: '15%'}}>Status</th>
                                  <th className="text-center" style={{width: '100px'}}>Actions</th>
                                </tr>
                              </thead>
                              <tbody>

                              {this.state.list_user.map(data => (
                              <tr key={data.id_user}>
                                <th className="text-center" scope="row">1</th>
                                <td><a href="#" className="{{$row->id}}" id="deitil" data-toggle="layoutS" data-action="side_overlay_toggle">{data.username}</a></td>                               
                                <td className="d-none d-sm-table-cell">
                                  <span className="badge badge-success">{data.tipe_role}</span>
                                </td>
                                <td className="text-center">
                                  <div className="btn-group">
                                    <button type="button" className="btn btn-sm btn-secondary" data-toggle="tooltip" title="Edit" onClick={() => this.GetEditUser(data.id_user)}>
                                      <i className="fa fa-pencil" />
                                    </button>
                                    <button type="button" className="btn btn-sm btn-secondary" data-toggle="tooltip" title="Delete" onClick={() => this.DeleteUser(data.id_user, data.username)}>
                                      <i className="fa fa-trash" />
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
                  <div id="col" className="col-md-5 mt-5 pt-5">
                    <div className="row">
                      <div className="col-12">
                        {/* Table */}
                        <div className="block">
                          <div className="block-header block-header-default">
                            <h3 className="block-title">Role Tersedia</h3>
                            <div className="block-options">
                              <div className="block-options-item">
                                <Button className="button button-border button-white  button-large button-rounded tright shadow nott ls0 ml-0 mt-4" onClick={()=>this.setState({add_modal:!this.state.add_modal})}>Tambah Role</Button>
                              </div>
                            </div>
                          </div>

                          <div className="block-content">
                            
                            <table className="table table-vcenter">
                              <thead>
                                <tr>
                                  <th className="text-center" style={{width: '50px'}}>#</th>
                                  <th>Nama Role</th>
                                  <th className="d-none d-sm-table-cell" style={{width: '15%'}}>Hak Akses</th>
                                  <th className="text-center" style={{width: '100px'}}>Actions</th>
                                </tr>
                              </thead>
                              <tbody>

                              {this.state.list_role.map(data => (
                              <tr key={data.id}>
                                <th className="text-center" scope="row">{data.id}</th>
                                <td><a href="#" className="{{$row->id}}" id="deitil" data-toggle="layoutS" data-action="side_overlay_toggle">{data.nama}</a></td>                               
                                <td className="d-none d-sm-table-cell">
                                  <span className="badge badge-success">{data.jumlah_akses} Hak Akses</span>
                                </td>
                                <td className="text-center">
                                  <div className="btn-group">
                                    <button type="button" className="btn btn-sm btn-secondary" data-toggle="tooltip" title="Edit" onClick={() => this.GetEditRole(data.id_m_role_user)}>
                                      <i className="fa fa-pencil" />
                                    </button>
                                    <button type="button" className="btn btn-sm btn-secondary" data-toggle="tooltip" title="Delete" onClick={() => this.DeleteRole(data.id_m_role_user, data.nama)}>
                                      <i className="fa fa-trash" />
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
    
      );
  }
} 

export default Kelola_pengguna;