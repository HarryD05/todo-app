import React from 'react';

const Message = (props) => {
  const { message } = props;

  const getStyle = message => {
    let baseClass = "message ";

    if (message.msgError) {
      baseClass += "danger";
    } else {
      baseClass += "primary";
    }

    return baseClass;
  }

  return (
    <div className={getStyle(message)}>
      {message.msgBody}
    </div>
  )
}

export default Message;