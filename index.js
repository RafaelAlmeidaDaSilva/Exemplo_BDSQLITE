
const fs = require('fs');
var sqlite3 = require('sqlite3').verbose();


if(fs.existsSync('./bd/abcd.db')){
    var db = new sqlite3.Database('./bd/abcd.db');
  
    db.serialize(function() {
        var stmt = db.prepare("INSERT INTO user VALUES (NULL, ?)");
        for (var i = 0; i < 10; i++) {
        
        var d = new Date();
        var n = d.toLocaleTimeString();
        stmt.run(n);
        }
        stmt.finalize();

        db.each("SELECT id, dt FROM user", function(err, row) {
            console.log("User id : "+row.id, row.dt);
        });
    });

    db.close();
}else{
    var db = new sqlite3.Database('./bd/abcd.db');


    db.serialize(function() {
    db.run("CREATE TABLE user (id INTEGER PRIMARY KEY, dt TEXT)");

    var stmt = db.prepare("INSERT INTO user VALUES (NULL, ?)");
    for (var i = 0; i < 10; i++) {
        
        var d = new Date();
        var n = d.toLocaleTimeString();
        stmt.run(n);
    }
    stmt.finalize();

    db.each("SELECT id, dt FROM user", function(err, row) {
        console.log("User id : "+row.id, row.dt);
    });
    });

    db.close();
}

