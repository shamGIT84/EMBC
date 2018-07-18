var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;


var url = 'mongodb://localhost:27017/';
var dbname = 'bcdb';

module.exports = {
    setExamRegFinish:function(bconfig,userobj,callback){
        MongoClient.connect(bconfig.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(bconfig.dbname);
            dbo.collection("schoolexamregistration").insertOne(userobj, function(err, result) {
                //var msg = "Exam Registration Success";
                console.log('result:'+userobj._id);
                callback(userobj._id);
            });
        });
    },
    setExamRegistration:function(userobj,callback){
        MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db(dbname);
                dbo.collection("schoolexamreg").insertOne(userobj, function(err, result) {
                    var msg = "Exam Registration Success";
                    callback(msg);
                });
        });
    },
    setUser: function(dbconfig,obj,res,callback){
       MongoClient.connect(dbconfig.url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbconfig.dbname);
        dbo.collection("user").insertOne(obj, function(err, result) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
            var user_id = obj._id;
            callback(user_id);
        });
        });
    },
    setStudentDetails : function(dbconfig,obj,res,callback){
        MongoClient.connect(dbconfig.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbconfig.dbname);
            dbo.collection("student").insertOne(obj, function(err, result) {
                if (err) throw err;
                console.log("1 student document inserted");
                db.close();
                var user_id = obj._id;
                callback(user_id);
            });
        });
    },
    getStudentFromUserID : function(dbconfig,studentObj,callback){
        MongoClient.connect(dbconfig.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbconfig.dbname);
            dbo.collection("student").findOne(studentObj,function(err, result){
                callback(result);
            });
        });
    },
    getUser: function(){
    return{
        first_name : "sssssssss",
        last_name : "ssssssssssss",
        nic : "8855",
        dob : "4455",
        phone_number : "11255",
        address : [
            "dsadasd",
            "ravinathdo@gmail.com",
            "123",
            "123"
        ],
        exam_type : "IELTS Exam",
        email : null,
        password : null
    }
},
    getStudentExamRegistration: function(dbconfig,studentObj,callback){
        MongoClient.connect(dbconfig.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbconfig.dbname);
            //{student_id:'5a91fc87406ca92ab0f0933c'}
            dbo.collection("schoolexamregistration").find(studentObj).toArray(function(err, result) {
                if (err) throw err;
                callback(result);
            });
        });
    },
    setDocumentUpload:function (dbconfig,docObj,callback) {
        MongoClient.connect(dbconfig.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbconfig.dbname);
            dbo.collection("doc").insertOne(docObj, function(err, result) {
                if (err) throw err;
                console.log("1 student document inserted");
                db.close();
                callback(result);
            });
        });
    },
    getDocumentsForRegNo:function(dbconfig,searcObj,callback){
        MongoClient.connect(dbconfig.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbconfig.dbname);
            //{student_id:'5a91fc87406ca92ab0f0933c'}
            dbo.collection("doc").find(searcObj).toArray(function(err, result) {
                if (err) throw err;
                callback(result);
            });
        });
    },
    updateSchoolRegistrationByRegNo:function(dbconfig,myquery,newvalues,callback){
        MongoClient.connect(dbconfig.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbconfig.dbname);
            //{student_id:'5a91fc87406ca92ab0f0933c'}
            dbo.collection("schoolexamregistration").updateOne(myquery, newvalues, function(err, result) {
                if (err) throw err;
                console.log("1 document updated");
                db.close();
                callback(result);
            });
        });
    },
    getStudentDetailByID:function(dbconfig,id,callback){
        url = dbconfig.url;
        dbname = dbconfig.dbname;

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);

            var querySEARCH = {"_id":new ObjectId(id)};
            dbo.collection("student").findOne(querySEARCH,function(err, result) {
                callback(result);
            });

        });
    }

}