# Insecam Roulette
***Connect with others over localised insecure surveillance***
  ![screenshot of Insecam Roulette](https://cdn.discordapp.com/attachments/1083420545246306365/1189258387729420449/Screenshot_from_2023-12-26_12-24-05.png?ex=659d822e&is=658b0d2e&hm=987ec6e1f922a7bc8a0c05e8ee5889ba28307fdf984f2e1cd5f143ebe969990c&)

## How does it work?
When user's visit Insecam Roulette via a webpage (pictured above) they are greeted with a live feed of a surveillance camera. 
This feed is served based on their location which is estimated using their IP address & a node module called axios. Currently
the feed shows is one that I found & assigned to their state via insecam.org, a directory website which links all of the 
networked surveillance cameras on the public web with no passwords - they avoid displaying cameras in private locations. Currently
only feeds from the U.S. are avaiable on this project and only one feed per U.S. state. I hard coded a link to each motion jpeg stream 
in a JSON. As more users connect to Insecam Roulette the feed switches to show the view of a camera from the most recently connected user. 
Feed updates are announced in a text chat (made with websockets) where users may also send messages to each other - only indentified by their city & state.
  
  ## Next steps:
   - automate mjpeg stream to pull directly from insecam directory rather than json
   - localise to city level
   - fix chat css / add auto scroll
   - add ability to hijack stream with own location via a button (suggestion) 
