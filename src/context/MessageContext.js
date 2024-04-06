import React, { createContext, useContext, useState } from 'react';
import Message from './../views/components/Message'; // Ensure this points to your Message component

const MessageContext = createContext();

export const useMessage = () => useContext(MessageContext);

export const MessageProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info');

  const showMessage = (text, level = 'info') => {
    setMessage(text);
    setSeverity(level);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <MessageContext.Provider value={{ showMessage }}>
      {children}
      <Message message={message} open={open} handleClose={handleClose} severity={severity} />
    </MessageContext.Provider>
  );
};
