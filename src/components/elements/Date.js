import CountDown from "../../utils/CountDown";

const DateTime = ({time}) => {
  function formatTime(num) {
    if (num < 10) {
      return "0" + num;
    }
    return num;
  }
  const dateData = CountDown(time);
  return (
    <>
      {!dateData.isTimeOut ? (
        <span style={{ fontSize: "15px" }}>
          Hạn đăng kí: Còn <strong>{formatTime(dateData.days)}</strong> ngày{" "}
          <strong>{formatTime(dateData.hours)}</strong> giờ{" "}
          <strong>{formatTime(dateData.min)}</strong> phút{" "}
          <strong>{formatTime(dateData.second)}</strong> giây{" "}
        </span>
      ) : (
        <span style={{ fontSize: "15px" }}>Đã hết hạn đăng kí</span>
      )}
    </>
  );
};

export default DateTime;
