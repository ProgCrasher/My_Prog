var fs = require('fs');
var obj ={
    "first_name":"Aram",
    "last_name":"Kamalyan",
    "age":127,
    "tumo_student":false

};


function main() {
    obj.toJSON = function(key) {
    for (var val in this)
    {
        if (typeof (this[val]) === 'string')
            obj[val] = this[val].toUpperCase();
        else
            obj[val] = this[val]
    }
    return obj;
};
    var jsonText = JSON.stringify(obj);
    fs.writeFileSync("obj.json", jsonText);
    var text = fs.readFileSync("obj.json").toString();
    console.log(jsonText == text);
    console.log(jsonText);
}

main();