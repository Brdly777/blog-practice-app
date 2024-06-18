import { useState } from 'react';
import { Modal, Button } from '@nextui-org/react';
import RegisterForm from '.';

const RegisterModal = () => {
  const [visible, setVisible] = useState(false);

  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  return (
    <div>
      <Button onClick={openModal}>
        Abrir Formulario de Registro
      </Button>
      <Modal open={visible} onClose={closeModal} closeButton>
        <Modal.Header>
          <h3 className="text-xl font-semibold">Registro de Usuario</h3>
        </Modal.Header>
        <Modal.Body>
          <RegisterForm />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RegisterModal;