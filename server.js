const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const requestIp = require('request-ip');
// helps find location from IP
const axios = require('axios');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
let nyMjpegIndex = 0;
// sub-array of new york insecam feeds
const nyMjpegLinks = [
  "http://108.30.103.58:8082/mjpg/video.mjpg?timestamp=1697759730864",
  "http://72.43.190.171:81/mjpg/video.mjpg?timestamp=1697762496119",
  "http://166.130.18.45:1024/mjpg/video.mjpg?camera=1&timestamp=1697777805313",
  "http://108.41.24.124/mjpg/video.mjpg?timestamp=1697772126310"
];

app.use(express.static('public'));

// default stream -- not visible to any user 
let currentLocation = 'Florida, US';

const getLocationFromIP = async (ip) => {
  try {
    const response = await axios.get(`https://ipinfo.io/${ip}/json`);
    const data = response.data;

    let location = 'Unknown';

    if (data.country) {
      location = data.country;
      if (data.country === 'US' && data.region) {
        location = `${data.region}, ${data.country}`;
      }
    }

    return location;
  } catch (error) {
    console.error('Error fetching location data:', error);
    return 'Unknown';
  }
};

io.on('connection', async (socket) => {
  const clientIp = requestIp.getClientIp(socket.request);
  console.log(`New connection from IP: ${clientIp}`);

  const location = await getLocationFromIP(clientIp);
  
    // intro message / chat based on user location
    socket.emit('message', `Welcome! I see you are joining us from ${location}`);
    socket.broadcast.emit('message', `A new visitor from ${location} has joined us.`);

  // location update based on last users IP
  currentLocation = location;
  io.emit('updateMJPEGStream', currentLocation);

  socket.on('updateMJPEGStream', (city) => {
    if (mjpegLinks[city] && city === "New York, US") {
      // share ny streams when ny users connect -- broken currently cycles unevenly for all
      io.emit('syncMJPEGIndex', nyMjpegIndex);
    } 
  
  });

  socket.on('chat', (message) => {
    io.emit('chat', `Visitor from ${location}: ${message}`);
  });

  socket.on('disconnect', () => {
    io.emit('message', `A visitor from ${location} has left us.`);
  });
});

server.listen(3000, () => {
  console.log('Serving on port 3000');
});
