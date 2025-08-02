const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const startBtn = document.getElementById('startBtn');

const socket = new WebSocket('wss://192.168.100.13:3000');

const pc = new RTCPeerConnection({
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
});

socket.onopen = () => {
  console.log('WebSocket connected');
};

socket.onerror = error => {
  console.error('WebSocket error:', error);
};

socket.onclose = () => {
  console.log('WebSocket closed');
};

socket.onmessage = async ({ data }) => {
  let message;
  try {
    if (typeof data === 'string') {
      message = JSON.parse(data);
    } else if (data instanceof Blob) {
      const text = await data.text();
      message = JSON.parse(text);
    } else {
      console.warn('Unknown message type received:', data);
      return;
    }
  } catch (err) {
    console.error('Failed to parse signaling message:', err, 'Raw data:', data);
    return;
  }

  try {
    if (message.offer) {
      await pc.setRemoteDescription(new RTCSessionDescription(message.offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.send(JSON.stringify({ answer }));
    } else if (message.answer) {
      await pc.setRemoteDescription(new RTCSessionDescription(message.answer));
    } else if (message.candidate) {
      try {
        await pc.addIceCandidate(new RTCIceCandidate(message.candidate));
      } catch (e) {
        console.error('Error adding ICE candidate', e);
      }
    }
  } catch (err) {
    console.error('Error handling signaling message:', err);
  }
};

pc.onicecandidate = e => {
  if (e.candidate && socket.readyState === WebSocket.OPEN) {
    console.log('Sending ICE candidate:', e.candidate);
    socket.send(JSON.stringify({ candidate: e.candidate }));
  }
};

pc.ontrack = e => {
  console.log('Remote track received');
  remoteVideo.srcObject = e.streams[0];
};

startBtn.onclick = async () => {
  try {
    const constraints = {
      video: { width: 640, height: 480, frameRate: 15 }, // Lower resolution and frame rate
      audio: true
    };

    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    localVideo.srcObject = stream;
    stream.getTracks().forEach(track => pc.addTrack(track, stream));

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ offer }));
      startBtn.disabled = true;
    } else {
      console.error('WebSocket is not open. Cannot send offer.');
      alert('Signaling connection not open. Please refresh the page.');
    }
  } catch (err) {
    console.error('Error accessing media devices or creating offer:', err);
    alert('Could not access camera or microphone. Please check permissions.');
  }
};