const Notification = ({ message, messageType }) => {
  const notificationStyle = {
    color: messageType === 'error' ? 'red' : 'green',
    fontSize: 18,
    border: messageType === 'error' ? '3px solid red' : '3px solid green',
    borderRadius: 5,
    backgroundColor: 'lightgrey',
    padding: 10,
    marginBottom: 10,
  }

  if (message === '') {
    return null
  }

  return <div style={notificationStyle}>{message}</div>
}

export default Notification
