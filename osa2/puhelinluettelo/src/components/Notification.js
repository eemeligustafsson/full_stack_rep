const Notification = ({action}) => {
    if (action === null) {
        return null
    }
    return(
        <div className="action">
            {action}
        </div>
    )
};

export default Notification;