var MongoClient = require('mongodb').MongoClient;
var mongodb  = require('mongodb');
var ObjectId = require('mongodb').ObjectID;

var url = 'mongodb://localhost:27017/';
var dbname = 'bcdb';
var dbconfig;

module.exports = {
    getSchoolExamReg:function(dbconfig,res,callback){
        url = dbconfig.url;
        dbname = dbconfig.dbname;

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
                dbo.collection("schoolexamregistration").find({}).toArray(function(err, result) {
                callback(result);
            });
        });
    },getSchoolExamByTypeReg:function(dbconfig,exam_type,res,callback){
        url = dbconfig.url;
        dbname = dbconfig.dbname;

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
            dbo.collection("schoolexamregistration").find({"exam_type":exam_type}).toArray(function(err, result) {
                callback(result);
            });
        });
    },
    getStudentSchoolReg:function(stuEmail,res,callback){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
            dbo.collection("schoolexamreg").find({email:stuEmail}).toArray(function(err, result) {
                callback(result);
            });
        });
    },
    getExamRegInfoByID:function(dbconfig,examRegSEARCH,callback){
        url = dbconfig.url;
        dbname = dbconfig.dbname;
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);

           //db.schoolexamreg.find({"_id":ObjectId("5a8062c43ba1c8213c8bd83a")})
           dbo.collection("schoolexamregistration").findOne(examRegSEARCH,function(err, result) {
                callback(result);
            });


        });
    },
    setUpdateExamReg:function(dbconfig,obj,callback){

        console.log("ID:"+obj.id);
        console.log("Status:"+obj.status);

        url = dbconfig.url;
        dbname = dbconfig.dbname;


        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
            //db.schoolexamreg.find({"_id":ObjectId("5a8062c43ba1c8213c8bd83a")})

            var myquery = {"_id":new ObjectId(obj.id)};
            var newvalues = { $set: {status: obj.status,updated_user:obj.updated_user} };

           dbo.collection("schoolexamregistration").updateOne(myquery, newvalues,function(err, result) {
                console.log('result:'+result);
                callback("Update Success");
            });

        });


    },
    addExamSession:function(dbconfig,obj,callback){
        console.log("ID:"+obj.id);
        console.log("Status:"+obj.status);

        url = dbconfig.url;
        dbname = dbconfig.dbname;

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
            //db.schoolexamreg.find({"_id":ObjectId("5a8062c43ba1c8213c8bd83a")})

            var myquery = { exam_type : obj.category };
            //var newvalues = {$push: {'exam_sessions': { exam_session_id: '5001', year: '2018', session: 'AL June ACG' }}};
            var newvalues = {$push: {'exam_sessions':obj}};

            dbo.collection("schoolexam").updateOne(myquery, newvalues,function(err, result) {
                console.log('result:'+result);
                callback("Update Success");
            });

        });
    },
    addExamSubjet:function(dbconfig,obj,callback){
        console.log("ID:"+obj.id);
        console.log("Status:"+obj.status);

        url = dbconfig.url;
        dbname = dbconfig.dbname;

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
            //db.schoolexamreg.find({"_id":ObjectId("5a8062c43ba1c8213c8bd83a")})

            var myquery = { exam_type : obj.exam_type };
            //var newvalues = {$push: {'exam_sessions': { exam_session_id: '5001', year: '2018', session: 'AL June ACG' }}};
            var newvalues = {$push: {'subject':obj}};

            dbo.collection("schoolexam").updateOne(myquery, newvalues,function(err, result) {
                console.log('result:'+result);
                callback("Update Success");
            });

        });
    }





}
