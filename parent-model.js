var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;


module.exports = {
    registerParent:function(dbconfig,obj,ssn,callback){
        MongoClient.connect(dbconfig.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbconfig.dbname);
            dbo.collection("user").insertOne(obj, function(err, result) {
                console.log('parent user_id'+obj._id);
                var msg = "User Registration Success";
                callback(msg);
            });
        });
    },
    getDependantsList:function(dbconfig,dependantSEARCH,callback){
        MongoClient.connect(dbconfig.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbconfig.dbname);
            /*dbo.collection("user").find(obj, function(err, result) {
                console.log('parent user_id'+obj._id);
                var msg = "User Registration Success";
                callback(msg);
            });*/
            console.log('xxxxxx'+dependantSEARCH);
            dbo.collection("student").find(dependantSEARCH).toArray(function(err, result) {
                if (err) throw err;
                console.log('xxxxxx result'+result);
                db.close();
                callback(result);
            });
        });
    }
}
