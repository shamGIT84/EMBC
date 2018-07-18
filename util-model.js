var MongoClient = require('mongodb').MongoClient;
var util_model = require('./util-model');
var request = require('request');


module.exports = {
    getVenues:function(dbo,ssn){

            dbo.collection("venue").find({}).toArray(function(err, result) {
                if (err) throw err;
                console.log("venues:"+result);
                ssn.venue = result;

            });


    },
    logEMBC : function(objName,obj){
        console.log('------------------'+objName);
        console.log(obj);
    },
    testMe:function(dbconfig,callback){
        MongoClient.connect(dbconfig.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbconfig.dbname);

            dbo.collection('schoolexamregistration').aggregate([
                {$match: {"exam_type":"Edexcel"}}
                , {$group: {_id: '$venue', count: {$sum: 1} }
                }
            ]).toArray(function(err, docs) {
                console.log(docs);
                //util_model.logEMBC('docs',docs);
                //dbo.close();
                callback(docs);
            });


        });

    },
    getSEARCH:function(dbconfig,collection,query,callback){
        MongoClient.connect(dbconfig.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbconfig.dbname);
            dbo.collection(collection).find(query).toArray(function(err, result) {
                if (err) throw err;
                callback(result);
            });
        });
    },
    getExamVenues:function(dbconfig,exam,callback){
        MongoClient.connect(dbconfig.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbconfig.dbname);
            //{exam_type: { $elemMatch: {name:"Edexcel"}}}
            var query = {exam_type: { $elemMatch: {name:exam}}};
            dbo.collection("venue").find(query).toArray(function(err, result) {
                if (err) throw err;
                callback(result);
            });
        });
    },
    setForumComment:function(dbconfig,inputObj,callback){

        MongoClient.connect(dbconfig.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbconfig.dbname);
            dbo.collection("forum").insertOne(inputObj, function(err, response) {
            callback("New comment posted");
            });
        });
    },
    sendSMS:function(mobileNo,smsmessage){
        console.log('SMS:'+smsmessage);
        //test URL request
        //http://127.0.0.1:9501/api?action=sendmessage&username=admin&password=admin&recipient=+94715833470&messagetype=SMS:TEXT&messagedata=Hello+World
       $sms_send = 'http://127.0.0.1:9501/api?action=sendmessage&username=admin&password=admin&recipient='+mobileNo+'&messagetype=SMS:TEXT&messagedata='+smsmessage;
       console.log($sms_send);
       request($sms_send, function (error, response, body) {
            if (!error && response.statusCode == 200) {

            }
        });
    }
}