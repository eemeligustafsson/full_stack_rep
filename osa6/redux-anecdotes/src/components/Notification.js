import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const style = {
    border: "solid",
    background: 'green'
  };
  return notification && <div style={style}>{notification}</div>;
};

export default Notification;