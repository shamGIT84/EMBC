var MongoClient = require('mongodb').MongoClient;

var url = '';
var dbname = '';


module.exports = {
    getExamBase : function (obj,callback) {
        console.log('getEamBase:'+obj.exam_type);
        url = obj.dbconfig.url;
        dbname = obj.dbconfig.dbname;
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
            dbo.collection("exambase").find({exam:obj.exam_type}).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
                db.close();
                //res.render('student_registration', { title: 'EMBC-student registration',examBase: result});
            callback(result[0]);
            });
        });
    },
    getExamSessions : function(dbconfig,obj,callback){
        MongoClient.connect(dbconfig.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbconfig.dbname);
            console.log('obj:'+obj);
/*
            dbo.collection("schoolexam").find({exam_type:'Edexcel'},function(err,result){
                console.log('-------------')
                console.log(result)
                console.log('-------------')
              callback(result);
            });
*/
            dbo.collection("schoolexam").find(obj).toArray(function(err,schoolexamResult){
                if (err) throw err;
                console.log("schoolexamResult:"+schoolexamResult);
                db.close();
                //ssn.schoolexam = schoolexamResult;
                callback(schoolexamResult);
                //res.render('student/loadSchStuHome',{schoolexam:schoolexamResult});
            });


        });
    },
    getIeltsExamSessions:function(dbconfig,obj,callback){
        MongoClient.connect(dbconfig.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbconfig.dbname);
            console.log(obj);
            /*
                        dbo.collection("schoolexam").find({exam_type:'Edexcel'},function(err,result){
                            console.log('-------------')
                            console.log(result)
                            console.log('-------------')
                          callback(result);
                        });
            */
            dbo.collection("ielts_exam").find(obj).toArray(function(err,schoolexamResult){
                if (err) throw err;
                console.log("schoolexamResult:"+schoolexamResult);
                db.close();
                //ssn.schoolexam = schoolexamResult;
                callback(schoolexamResult);
                //res.render('student/loadSchStuHome',{schoolexam:schoolexamResult});
            });


        });
    },
    getVenueList : function (dbconfig,callback) {
        MongoClient.connect(dbconfig.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbconfig.dbname);
            dbo.collection("venue").find({}).toArray(function(err, venueResult) {
                callback(venueResult);
            });
        });
    },
    getSchoolAllExamList : function (dbconfig,callback) {
        MongoClient.connect(dbconfig.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbconfig.dbname);
            //{exam_type:"Edexcel"}
            dbo.collection("schoolexam").find({}).toArray(function(err, schoolResult) {
                callback(schoolResult);
            });
        });
    },
    getSchoolExamTypeList : function (dbconfig,exam_type,callback) {
        MongoClient.connect(dbconfig.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbconfig.dbname);
            //{exam_type:"Edexcel"}
            dbo.collection("schoolexam").find({"exam_type":exam_type}).toArray(function(err, schoolResult) {
                callback(schoolResult);
            });
        });
    },
    getSchoolExam : function (dbconfig,obj,callback) {
        MongoClient.connect(dbconfig.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbconfig.dbname);
            //{exam_type:"Edexcel"}

            dbo.collection("schoolexam").findOne(obj, function(err, schoolResult) {
                if (err) throw err;
                callback(schoolResult);
            });


        });
    },
    deleteSessionTimeTable: function(dbconfig,obj,callback){
        MongoClient.connect(dbconfig.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbconfig.dbname);
            //{exam_type:"Edexcel"}

            dbo.collection("school_ssesison_subject").deleteMany(obj, function(err, sessionTableResult) {
                if (err) throw err;
                console.log("session document deleted");
                callback(sessionTableResult);
            });

        });
    },
    insertSessionTimeTable:function(dbconfig,obj,callback){
        MongoClient.connect(dbconfig.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbconfig.dbname);
            //{exam_type:"Edexcel"}

            dbo.collection("school_ssesison_subject").insertMany(obj, function(err, sessionTableResult) {
                if (err) throw err;
                console.log("Number of documents inserted: " + sessionTableResult.insertedCount);
                callback(dbo);
            });

        });
    },
    updateStudentExamSession: function (dbo,myquery,newvalues) {
      //  MongoClient.connect(dbconfig.url, function(err, db) {

       //if (err) throw err;
       //var dbo = db.db(dbconfig.dbname);
            //{exam_type:"Edexcel"}

           // var myquery = { address: "Valley 345" };
           // var newvalues = { $set: {name: "Mickey", address: "Canyon 123" } };

            console.log('myquery:');
            console.log(myquery);
            console.log('newvalues:');
            console.log(newvalues);

            dbo.collection("schoolstudentsubject").updateOne(myquery, newvalues, function(err, res) {
                if (err) throw err;
                console.log("1 document updated");
                //db.close();
            });

        //});
    },
    getExamSubjectExamDetails:function(dbconfig,examSEARCH,callback){
        MongoClient.connect(dbconfig.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbconfig.dbname);
            //{exam_type:"Edexcel"}
            dbo.collection("school_ssesison_subject").find(examSEARCH).toArray(function(err, exaResult) {
                callback(exaResult);
            });
        });
    },
    getReportSessionRegistration:function (dbconfig,regSEARCH,callback) {
        MongoClient.connect(dbconfig.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbconfig.dbname);
            //{exam_type:"Edexcel"}
            dbo.collection("school_ssesison_subject").find(examSEARCH).toArray(function(err, exaResult) {
                callback(exaResult);
            });
        });
    },
    getRegStudentOnExamType:function (dbconfig,regSEARCH,callback) {
        MongoClient.connect(dbconfig.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbconfig.dbname);
            //{exam_type:"Edexcel"}
            dbo.collection("student").find(regSEARCH).toArray(function(err, exaResult) {
                callback(exaResult);
            });
        });
    },
    getStudentRegsForExamSession:function(dbconfig,exam_session_id,callback){
        MongoClient.connect(dbconfig.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbconfig.dbname);
            //{exam_type:"Edexcel"}
            dbo.collection("schoolexamregistration").aggregate([
                { $match: {"exam_session_id":exam_session_id} },{
                    $lookup:
                        {
                            from: "student",
                            localField: "nic_ppt",
                            foreignField: "nic_ppt",
                            as: "student_detail"
                        }
                }
            ]).toArray(function(err, exaResult) {
                callback(exaResult);
            });
        });
    },
    setExamResult:function(dbconfig,insertObj,callback){
            MongoClient.connect(dbconfig.url, function(err, db) {
                if (err) throw err;
                var dbo = db.db(dbconfig.dbname);
                //{exam_type:"Edexcel"}
            dbo.collection("exam_result").insertOne(insertObj, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
                callback(res);
            });
        });
    },
    updateExamSession:function(dbconfig,myquery,newvalues,callback){

        MongoClient.connect(dbconfig.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbconfig.dbname);
            //{exam_type:"Edexcel"}
            dbo.collection("schoolexam").updateOne(myquery, newvalues, function(err, res) {
                if (err) throw err;
                console.log("1 document updated");
                db.close();
                callback(res);
            });

            /*db.schoolexam.updateOne(
                { "exam_sessions.exam_session_id": "1523850138706" },
                { $set: { "exam_sessions.$.status" : "CLOSE" } }
            )*/
        });
    },
    getExamSessionDetails:function(dbconfig,exam_session_id,callback){
        MongoClient.connect(dbconfig.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbconfig.dbname);
            //{exam_type:"Edexcel"}
            dbo.collection("schoolexam").find({ "exam_sessions.exam_session_id": exam_session_id }).toArray(function(err, exaResult) {
                callback(exaResult);
            });
        });
    }

}