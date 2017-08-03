const http = require('http')  
const port = 3000

const player = require("./player")

const requestHandler = (request, response) => {  
  console.log(request.url);
  player.listBucketObjects.then( data => {
  	const urls = player.getUrlArray(data)
    console.log(urls)

    let renderString = ``;
    urls.forEach(url => {
      renderString += `
        <audio controls>
          <source src="${url}" type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
        <br>
      `
    })

    response.end(renderString)    
  });

}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {  
  if (err) {
    return console.log('Error: ', err)
  }

  console.log(`Server is listening on ${port}`)
})

/* test */
