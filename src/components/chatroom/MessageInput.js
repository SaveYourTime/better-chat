import { useState } from 'react';

export default function MessageInput() {
  const [text, setText] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();
    if (!text) return;
    console.log(`send message: ${text}`);
    setText('');
  };

  const handleMessageChange = (e) => setText(e.target.value);

  return (
    <footer className="ui fluid vertical menu">
      <form className="item" onSubmit={sendMessage}>
        <div className="ui action input">
          <input
            type="text"
            placeholder="Type a message..."
            value={text}
            onChange={handleMessageChange}
          />
          <button type="submit" className="ui icon secondary button" disabled={!text}>
            <i className="paper plane icon" />
          </button>
        </div>
      </form>
    </footer>
  );
}
