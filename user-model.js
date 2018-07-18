var MongoClient = require('mongodb').MongoClient;
var util_model = require('./util-model');
/*
var url = 'mongodb://localhost:27017/';
var dbname = 'bcdb';
*/

module.exports = {
    getExamManager:function(dbconfig,userobj,res,ssn){
        MongoClient.connect(dbconfig.url, function(err, db) {
                if (err) throw err;
                var dbo = db.db(dbconfig.dbname);
               // var query = {manager:'School Exam',users: { $elemMatch: {email: 'rx',password:'1x'} }};
                var query = {manager:userobj.category,users: { $elemMatch: {email: userobj.email,password:userobj.password} }};
               // console.log('query:'+query);
                util_model.logEMBC('query',query);
                dbo.collection("exammanager").find(query).toArray(function(err, result) {
                    if (err) throw err;
                    console.log(result);

                    if(result.length>0) {

                        var mgrobj = result[0];
                        console.log('Found Exam Manager');

                        var userprofile;
                        //manager user profile for session
                        for(var i=0;i<mgrobj.users.length;i++){
                            if(mgrobj.users[i].email == userobj.email){
                                userprofile = {
                                    email:mgrobj.users[i].email,
                                    empno:mgrobj.users[i].empno,
                                    category:userobj.category
                                }
                            }
                        }


                        ssn.userprofile = userprofile;

                        //making the dashboard object
                        switch (userobj.category){
                            case 'Edexcel':
                                res.redirect('/exam-manager/loadHome');
                                break;
                            case 'Cambridge':
                                res.redirect('/exam-manager/loadHome');
                                break;
                            case 'IELTS':
                                res.redirect('/exam-manager/loadHome');
                                break;
                            case 'Exam':
                                console.log('found super user');
                               res.redirect('/super-manager/loadHome');
                                break;
                        }




                    }else{
                        var msg = '<p class="bg-danger">Invalid username or password</p>';
                        res.render('exam_manager/login',{msg:msg});
                    }

                });
        });
    },
    getUser:function(userobj,res,ssn){
        /*
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);

            dbo.collection("user").find(userobj).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);


                if(result.length>0){

                   //collecting the venues
                   dbo.collection("venue").find({}).toArray(function(err, venueResult) {
                        if (err) throw err;
                        console.log("venues:"+venueResult);
                        ssn.venue = venueResult;

                        //collecting student profile
                       var stuobj = result[0];
                       switch (stuobj.exam){
                           case 'School Exam':
                               console.log('School Exam student found');
                               ssn.userprofile = stuobj;

                               //load schoolexam collection  {exam_type:stuobj.exam_type}
                               dbo.collection("schoolexam").find({exam_type:stuobj.exam_type}).toArray(function(err,schoolexamResult){
                                   if (err) throw err;
                                   console.log("schoolexamResult:"+schoolexamResult);
                                   db.close();
                                   ssn.schoolexam = schoolexamResult;
                                   res.redirect('/student/loadSchStuHome');
                                   //res.render('student/loadSchStuHome',{schoolexam:schoolexamResult});
                               });
                               break;
                           default:
                               var msg = '<p class="bg-danger">Invalid username or password</p>';
                               res.render('login',{msg:msg});
                       }


                    });

                }else{
                    //invalid username or password here
                    var msg = '<p class="bg-danger">Invalid username or password</p>';
                    res.render('login',{msg:msg});
                }




            });

        });
        */


    },
    getLogin : function(dbconfig,userobj,ssn,callback){

        MongoClient.connect(dbconfig.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbconfig.dbname);
            dbo.collection("user").findOne(userobj,function(err, result){
                callback(result);
            });
        });


    },
    isUserExsist:function(dbconfig,shObj,callback){
        MongoClient.connect(dbconfig.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbconfig.dbname);
            dbo.collection("exammanager").findOne(shObj,function(err, result){
                console.log('result');
                console.log(result);
                callback(result);
            });
        });
    },
    setUser:function(dbconfig,inObj,callback){

        url = dbconfig.url;
        dbname = dbconfig.dbname;

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);

            var myquery = { manager : inObj.manager };
            //var newvalues = {$push: {'exam_sessions': { exam_session_id: '5001', year: '2018', session: 'AL June ACG' }}};
            var newvalues = {$push:{ 'users': {
                "email": inObj.email,
                "password": inObj.password,
                "empno": inObj.empno,
                "regDate":inObj.regDate
            }}};

            dbo.collection("exammanager").updateOne(myquery, newvalues,function(err, result) {
                console.log('result:'+result);
                callback("New User Created Successfully");
            });

        });
    },
    getManagerUsers:function(dbconfig,shObj,callback){
        {

            url = dbconfig.url;
            dbname = dbconfig.dbname;

            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db(dbname);


                dbo.collection("exammanager").find(shObj).toArray(function(err, result) {
                    if (err) throw err;
                    console.log(result);
                    callback(result[0]);
                });


            });
        }
    },
    updateUserPassword:function(dbconfig,inputObj,callback){
        url = dbconfig.url;
        dbname = dbconfig.dbname;
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);

            var myquery = {"nic_ppt":inputObj.nic_ppt}
            var newvalues = { $set: {"password": inputObj.password} }

            console.log('ready update');
            console.log(myquery);
            console.log(newvalues);

            dbo.collection("user").updateMany(myquery, newvalues,function(err, result) {
                console.log('result:'+result);
                callback("Exam Updated Successfully");
            });

        });
    }

}