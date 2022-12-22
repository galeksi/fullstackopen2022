import { Alert } from 'react-bootstrap'

const Notification = ({ message, messageType }) => {
  // const notificationStyle = {
  //   color: messageType === 'error' ? 'red' : 'green',
  //   fontSize: 18,
  //   border: messageType === 'error' ? '3px solid red' : '3px solid green',
  //   borderRadius: 5,
  //   backgroundColor: 'lightgrey',
  //   padding: 10,
  //   marginBottom: 10,
  // }

  if (message === '') {
    return null
  }

  if (messageType === 'error') {
    return (
      <div className="container">
        <Alert variant="danger">{message}</Alert>
      </div>
    )
  }

  return (
    <div className="container">
      <Alert variant="success">{message}</Alert>
    </div>
  )
}

export default Notification
