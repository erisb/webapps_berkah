import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import {URL} from '../../../constant/constant_func';
import TableDetailMutasi from './Table_Detail_Mutasi';
class ModalMutasi extends Component{

  constructor(props) {
    super(props);
    this.state = {
      modal:false,
      data_mutasi:{}
    }

  }

  getDetil=(id_pendanaan_sosial)=>{
    axios({
      method: 'get',
      url: URL+'/admin_sosial/SelectMutasiAdminDetail/'+id_pendanaan_sosial,
      responseType: 'stream'
    }).then((result) => {
      console.log(result);
      if(result.data.mutasi==''){
        return false
      }else{
        this.setState({data_mutasi:result.data.mutasi});
        setTimeout(()=>console.log(this.state.data_mutasi), 300);
      }
    },
      (error) => {
        console.log(error);
      }
    )
  }

  toggle = () => {
    this.setState({modal:!this.state.modal});
    this.getDetil(this.props.data.id_pendanaan_sosial);
  }

  render(

  ){
    return(
     <div>
      <Button className="button button-border button-white  button-large button-rounded tright shadow nott ls0 ml-0 mt-4" onClick={()=>{this.toggle()}}>{this.props.buttonLabel}</Button>
      <Modal size="lg" style={{maxWidth: '1000px', width: '50%', margin: '10px auto'}} isOpen={this.state.modal} toggle={()=>{this.toggle();}} className='center'>
        <ModalHeader toggle={()=>{this.toggle()}}>{this.props.modalTitle}</ModalHeader>
        <ModalBody>
        <div className="modal-body">
          <div className="block-header block-header-default">
        <h3 className="block-title">{this.props.data.nama_pendanaan}</h3>
        {/* <h3 className="block-title">{dataDetil}</h3> */}
            <div className="block-options">
              <div className="block-options-item">
              </div>
            </div>
          </div>
          <TableDetailMutasi data_mutasi={this.state.data_mutasi}/>
        </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={()=>{this.toggle()}}>Ok</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
    );
  }

}

export default ModalMutasi;