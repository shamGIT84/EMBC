var MongoClient = require('mongodb').MongoClient;

var url = '';
var dbname = '';

module.exports = {
  setStuSchoolExamSubject : function (dbconfig,obj,callback) {
      MongoClient.connect(dbconfig.url, function(err, db) {
          if (err) throw err;
          var dbo = db.db(dbconfig.dbname);
          dbo.collection("schoolstudentsubject").insertMany(obj, function(err, result) {
              //var msg = "Exam Registration Success";
              callback('success');
          });
      });
  },
    getExamRegSubjectListFromExamRegID : function (dbconfig,obj,callback) {
        MongoClient.connect(dbconfig.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbconfig.dbname);
            dbo.collection("schoolstudentsubject").find(obj).toArray(function(err, venueResult) {
                callback(venueResult);
            });
        });
    }
  
  
  
}