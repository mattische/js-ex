var Express = require("express");
var Bodyparser = require("body-parser");
var Request = require("request");

var app = Express();
app.use(Bodyparser.json());
app.use(Bodyparser.urlencoded({ extended: true }));

function getRpiIp() {

    return new Promise((resolve, reject) => {
        Request("http://192.168.1.26:3000/ipv4", function(error, response, body) {
            console.log(response.statusCode);
                        
            if(response.statusCode == 200) {
                console.log("resolve");
                resolve(body);       
            }
            else {
                console.log("reject");
                reject(Error(body));
            }
          });

    });
}


app.get("/ip", (req, res) => {
    console.log("ip route hit");

    getRpiIp().then(function(response) {
        console.log("no error");
        res.send(response);
    }).catch(function(error)  {
        console.log("Error caught: " + error);
        
        res.send({message: 'Error reading ip'});
    });
});



app.listen(3000, function() {
    console.log("server started on port 3000");
    
});
