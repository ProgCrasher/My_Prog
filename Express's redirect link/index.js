var express = require("express");
var app = express();

app.get("/", function (req, res) {
    res.send("Hello world")
});

app.get("/:link", function (req, res) {
    var link = req.params.link;
    if (link == "google") {
        res.redirect('http://google.com');
    }
    else if(link!="google"){
        res.redirect('http://google.com/search?q='+link)
    }
    else{
        res.status(404).send('Error page not found')
    }
});



app.listen(3000, function () {
    console.log("Example is running on port 3000");
});
