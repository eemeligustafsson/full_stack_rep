import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'


const Notification = () => {
  const notification = useSelector((state) => state.notification)
  console.log(notification)

  if (notification === null) {
    return null
  }
  if (notification.includes('error')) {
    return <div className='error'>{notification}</div>
  }
  return <div className="success">{notification.message}</div>
}

Notification.propTypes = {
  notification: PropTypes.string.isRequired,
}

export default Notification
