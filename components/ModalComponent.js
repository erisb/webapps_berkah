import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalComponent = (props) => {
  const {
    buttonLabel,
    className,
    modalTitle,
    isi
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button className="button button-border button-white  button-large button-rounded tright shadow nott ls0 ml-0 mt-4" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
        <ModalBody>
          {isi}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Ok</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalComponent;