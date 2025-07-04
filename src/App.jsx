import { useState } from 'react';
import './App.css';
import HumanModel from './components/HumanModel';

const BASE_URL = import.meta.env.VITE_API_BASE;

function App() {
  const [chat, setChat] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [userId] = useState('user123');
  const [selectedPart, setSelectedPart] = useState(null);
  const [waitingForAnswer, setWaitingForAnswer] = useState(false);
  const [diagnosisStarted, setDiagnosisStarted] = useState(false);

  const handleDiagnose = async () => {
    if (!selectedPart) return alert('Please select a body part on the model.');

    const res = await fetch(`${BASE_URL}/api/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, pain_area: selectedPart.toLowerCase() })
    });

    const data = await res.json();
    if (data.error) return alert(data.error);

    setDiagnosisStarted(true);
    setChat([{ from: 'ai', text: data.question }]);
    setWaitingForAnswer(true);
  };

  const handleSendAnswer = async () => {
    if (!userInput.trim()) return;

    setChat(prev => [...prev, { from: 'user', text: userInput }]);

    const res = await fetch(`${BASE_URL}/api/answer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, answer: userInput })
    });

    const data = await res.json();

    if (data.diagnosis) {
      setChat(prev => [...prev, { from: 'ai', text: data.diagnosis }]);
      setWaitingForAnswer(false);
      setDiagnosisStarted(false);
    } else if (data.question) {
      setChat(prev => [...prev, { from: 'ai', text: data.question }]);
    }

    setUserInput('');
  };

  return (
    <div className="app-container">
      <div className="left-panel">
        <h1 className="main-title">Pain Diagnoser</h1>
        <p className="instruction-text">
          Select where you got the pain and click the Diagnose button below
        </p>
        <div className="model-wrapper">
          <HumanModel onPartSelect={setSelectedPart} selectedPart={selectedPart} />
        </div>
        <p style={{ marginTop: '10px' }}>
          Selected: <strong>{selectedPart || 'None'}</strong>
        </p>
        <button onClick={handleDiagnose} className="diagnose-btn">Diagnose</button>
      </div>

      <div className="right-panel">
        <h2 className="chat-title">Chat with AI here</h2>
        <div className="chat-box">
          {chat.map((msg, idx) => (
            <div key={idx} className={msg.from === 'user' ? 'user-msg' : 'ai-msg'}>
              <strong>{msg.from === 'user' ? 'You' : 'AI'}:</strong> {msg.text}
            </div>
          ))}
        </div>
        {waitingForAnswer && (
          <div className="input-row">
            <input
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              placeholder="Type your answer..."
            />
            <button onClick={handleSendAnswer}>Send</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
