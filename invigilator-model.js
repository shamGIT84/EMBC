var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;


module.exports = {
    getExamSchedules:function(dbconfig,assignInvigiSEARCH,callback){
        MongoClient.connect(dbconfig.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbconfig.dbname);
            dbo.collection("exam_invigilator").find(assignInvigiSEARCH).toArray(function(err, result) {
                if (err) throw err;
                console.log('xxxxxx result'+result);
                db.close();
                callback(result);
            });
        });
    },
    getAllInvigilatorList:function(dbconfig,scheduleSEARCH,callback){
        MongoClient.connect(dbconfig.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbconfig.dbname);
            //scheduleSEARCH = {"user_type":"invigilator"}
            dbo.collection("user").find(scheduleSEARCH).toArray(function(err, result) {
                if (err) throw err;
                console.log('result'+result);
                db.close();
                callback(result);
            });
        });
    },
    setInvigilator:function(dbconfig,invigilatorINSERT,callback){
        MongoClient.connect(dbconfig.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbconfig.dbname);
            //scheduleSEARCH = {"user_type":"invigilator"}
            dbo.collection("exam_invigilator").insertOne(invigilatorINSERT, function(err, result) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
                callback(result);
            });
        });

    },getMyAssignForInvigilator:function(dbconfig,assignSEARCH,callback){
        MongoClient.connect(dbconfig.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbconfig.dbname);
            dbo.collection("exam_invigilator").find(assignSEARCH).toArray(function(err, result) {
                if (err) throw err;
                //console.log('xxxxxx result'+result);
                db.close();
                callback(result);
            });
        });
    },
    getAssign:function(dbconfig,assignSEARCH,callback){
        MongoClient.connect(dbconfig.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbconfig.dbname);

            dbo.collection("exam_invigilator").findOne(assignSEARCH, function(err, result) {
                if (err) throw err;
                //console.log(result.name);
                db.close();
                callback(result);
            });

        });
    },
    updateAssignStatus:function (dbconfig,myquery,statusUPDATE,callback) {
        MongoClient.connect(dbconfig.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbconfig.dbname);

            dbo.collection("exam_invigilator").updateOne(myquery, statusUPDATE, function(err, result) {
                if (err) throw err;
                console.log("1 document updated");
                db.close();
                callback(result);
            });

        });
    }
}