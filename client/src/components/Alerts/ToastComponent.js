import React, { useState, useEffect } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

import { useAuthContext } from '../../contexts/AuthContext';

export const ToastComponent = () => {
  const [show, setShow] = useState(false);
  var { toastList } = useAuthContext();

  useEffect(() => {
    setShow(toastList.show ? true : false)
  }, [toastList]);



  return (

    <ToastContainer position="top-end">
      <Toast
        style={{ position: 'fixed', right: '20px', top: '20px', opacity: '0.98' }}
        bg={toastList.bg}
        onClose={() => setShow(false)}
        show={show}
        delay={2000}
        autohide >
        {/* <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Bootstrap</strong>
              <small>11 mins ago</small>
            </Toast.Header> */}
        <Toast.Body style={{ color: 'white', fontSize: '18px' }}>{toastList?.title}</Toast.Body>
      </Toast>
    </ToastContainer>

  );
}
