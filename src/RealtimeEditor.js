import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const RealtimeEditor = () => {
  const [code, setCode] = useState('');
  const [socketConnection, setSocketConnection] = useState(null);

  useEffect(() => {
    const socket = socketIOClient(window.location.origin);
    setSocketConnection(socket);

    return () => {
      // ��������� ���������� ��� ����� � ����������
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    // ³���������� ��������� ��� �� ������
    if (socketConnection) {
      socketConnection.emit('code-update', newCode);
    }
  };

  return (
    <div>
      {/* ��� ��� ��������� ���� ��� */}
      <textarea value={code} onChange={(e) => handleCodeChange(e.target.value)} />
    </div>
  );
};

export default RealtimeEditor;
