var MongoClient = require('mongodb').MongoClient;
var mongodb = require('mongodb');


var url = '';
var dbname = '';

module.exports = {
    getRegistration: function (dbconfig,exam_type,callback) {
        url = dbconfig.url;
        dbname = dbconfig.dbname;
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);

            dbo.collection("schoolexamregistration").find({exam_type:exam_type}).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
                callback(result);
                //db.close();
            });
        });
    },
    getExamVenues:function(dbconfig,exam_type,callback){
        MongoClient.connect(dbconfig.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbconfig.dbname);

            dbo.collection('schoolexamregistration').aggregate([
                {$match: {"exam_type":exam_type}}
                , {$group: {_id: '$venue', count: {$sum: 1} }
                }
            ]).toArray(function(err, docs) {
                console.log(docs);
                //util_model.logEMBC('docs',docs);
                //dbo.close();
                callback(docs);
            });
        });
    }
}