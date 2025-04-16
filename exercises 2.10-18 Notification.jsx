// src/components/Notification.jsx
const notificationStyle = {
    color: 'green',
    background: '#ccffcc',
    fontSize: 18,
    border: '2px solid green',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  };
  
  const errorStyle = {
    ...notificationStyle,
    color: 'red',
    background: '#ffcccc',
    border: '2px solid red',
  };
  
  const Notification = ({ message, type }) => {
    if (!message) return null;
  
    const style = type === 'error' ? errorStyle : notificationStyle;
  
    return <div style={style}>{message}</div>;
  };
  
  export default Notification;
  
  