import { Alert, AlertTitle } from "@mui/material";
import { useSelector } from "react-redux";

const Notification = () => {
  const messages = useSelector((state) => state.notification);

  if (!messages.message) {
    return null;
  }

  return (
    <Alert severity={messages.class}>
      <AlertTitle>{messages.class}</AlertTitle>
      {messages.message}
    </Alert>
  );
};

export default Notification;
