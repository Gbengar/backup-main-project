import "./message.css";

const Message = ({ message, own }) => {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          src="https://thumbs.dreamstime.com/b/yellow-crash-test-dummy-yellow-crash-test-dummy-car-seat-116968697.jpg"
          alt=""
          className="messageImg"
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{message.createdAt}</div>
    </div>
  );
};

export default Message;
