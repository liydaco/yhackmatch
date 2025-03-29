// Connection code for initiating the websocket connection

// const ws = new WebSocket(`ws://${window.location.host}/api/socket?name=${name}&linkedIn=${linkedIn}&dish=${dish}&session=${session}`);

// ws.onmessage = (event) => {
//   const data = JSON.parse(event.data);
//   switch (data.type) {
//     case 'status':
//       console.log('Status:', data.message);
//       break;
//     case 'matched':
//       console.log('Matched!', data.data);
//       break;
//     case 'error':
//       console.error('Error:', data.message);
//       break;
//   }
// };
