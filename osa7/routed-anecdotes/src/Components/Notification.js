export const Notification = ({notification}) => {
    if (notification !== null) {
        return (
            <h3>
                {notification}
            </h3>
        )
    } else {
        return null
    }
}