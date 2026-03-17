import { App } from "antd";

const useAppMessage = () => {
  const { message } = App.useApp();
  return message;
};

export default useAppMessage;
