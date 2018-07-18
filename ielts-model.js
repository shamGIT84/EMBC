var MongoClient = require('mongodb').MongoClient;
var util_model = require('./util-model');
var ObjectId = require('mongodb').ObjectID;


module.exports = {
    setIELTSExam:function (dbconfig,inQUERY,callback) {
        url = dbconfig.url;
        dbname = dbconfig.dbname;

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);

            dbo.collection("ielts_exam").insertOne(inQUERY, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
                callback(res);
            });

        });
    },
    getIELTSExam:function(dbconfig,id,callback){
         url = dbconfig.url;
         dbname = dbconfig.dbname;

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);


            var querySEARCH = {"_id":new ObjectId(id)};
            dbo.collection("ielts_exam").findOne(querySEARCH,function(err, result) {
                callback(result);
            });

        });
    },
    setVenueForExam:function (dbconfig,inputObj,callback) {
        url = dbconfig.url;
        dbname = dbconfig.dbname;

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);

            var myquery = { _id : new ObjectId(inputObj.id) };
            var newvalues = {$push:{ 'venues': {
                "name": inputObj.venueName
            }}};

            console.log('ready update');
            console.log(myquery);
            console.log(newvalues);
            dbo.collection("ielts_exam").updateOne(myquery, newvalues,function(err, result) {
                console.log('result:'+result);
                callback("New User Created Successfully");
            });

        });
    },
    setIeltsRegistration:function(dbconfig,inputObj,callback){
        url = dbconfig.url;
        dbname = dbconfig.dbname;

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);

            dbo.collection("ielts_exam_registration").insertOne(inputObj, function(err, inRes) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
                callback("New Registration Has been placed RefNo:"+inputObj.refNo);
            });

        });
    },
    updateStudentMarking:function (dbconfig,inputObj,callback) {


        url = dbconfig.url;
        dbname = dbconfig.dbname;

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);


            var myquery = {"refNo":inputObj.refNo}
            var newvalues = { $set: {"marking": {
                "mark" : inputObj.mark,
                "remark" : inputObj.remark,
                "markdateTime" : inputObj.markdateTime,
                "mark_by" : inputObj.mark_by,
                "status":inputObj.status
            }} }

            console.log('ready update');
            console.log(myquery);
            console.log(newvalues);

            dbo.collection("ielts_exam_registration").updateOne(myquery, newvalues,function(err, result) {
                console.log('result:'+result);
                callback("Exam Marking Updated Successfully");
            });

        });






    },
    getIELTSRegistrationByID:function (dbconfig,id,callback) {
        url = dbconfig.url;
        dbname = dbconfig.dbname;

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);

            var querySEARCH = {"_id":new ObjectId(id)};
            dbo.collection("ielts_exam_registration").findOne(querySEARCH,function(err, result) {
                callback(result);
            });

        });
    },
    updateIELTStoClose:function(dbconfig,inputObj,callback){
        url = dbconfig.url;
        dbname = dbconfig.dbname;
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);

            var myquery = {"_id":ObjectId(inputObj.id)}
            var newvalues = { $set: {"status": inputObj.status} }

            console.log('ready update');
            console.log(myquery);
            console.log(newvalues);

            dbo.collection("ielts_exam").updateOne(myquery, newvalues,function(err, result) {
                console.log('result:'+result);
                callback("Exam Updated Successfully");
            });

        });
    },
    updateIELTSExamDateTime:function (dbconfig,inputObj,callback) {
        url = dbconfig.url;
        dbname = dbconfig.dbname;
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);

            var myquery = {"_id":ObjectId(inputObj.id)}
            var newvalues = { $set: {"exam_date_time": inputObj.exam_date_time} }

            console.log('ready update');
            console.log(myquery);
            console.log(newvalues);

            dbo.collection("ielts_exam").updateOne(myquery, newvalues,function(err, result) {
                console.log('result:'+result);
                callback("Exam Updated Successfully");
            });

        });
    },
    updateRegStudentStatus:function(dbconfig,inputObj,callback){

        url = dbconfig.url;
        dbname = dbconfig.dbname;
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);

            var myquery = {"exam_id":inputObj.id}
            var newvalues = { $set: {"status": inputObj.status} }

            console.log('ready update');
            console.log(myquery);
            console.log(newvalues);

            dbo.collection("ielts_exam_registration").updateMany(myquery, newvalues,function(err, result) {
                console.log('result:'+result);
                callback("Exam Updated Successfully");
            });

        });


    },
    getExamModelPieChartStats:function(dbconfig,callback){
        url = dbconfig.url;
        dbname = dbconfig.dbname;

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);

            var query = [{"$group" : {_id:"$ielts_exam_model", count:{"$sum":1}}}];
            console.log(query);
            dbo.collection("ielts_exam_registration").aggregate(query,function(err,result){
                console.log(result);
                callback(result);
            });


            /*dbo.collection("ielts_exam_registration").aggregate(
                [
                    { "$group": {
                        "_id": "$ielts_exam_model",
                        "count": { "$sum": 1 }
                    }}
                ],
                function(err,docs) {
                    if (err) console.log(err);
                    console.log( docs );
                }
            );*/

        });
    }
}