var MongoClient = require('mongodb').MongoClient;
var mongodb = require('mongodb');


var url = 'mongodb://localhost:27017/';
var dbname = 'bcdb';




module.exports = {
    setVenue: function (venueobj,res) {

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
            dbo.collection("venue").insertOne(venueobj, function(err, response) {
                if (err) throw err;
                console.log("1 document inserted");
                //get all venues
                dbo.collection("venue").find({}).toArray(function(err, result) {
                    if (err) throw err;
                    console.log(result);
                    db.close();
                    var msg = '<p class="bg-success"> Venue Created Successfully</p>';
                    res.render('exam_manager/venue', { title: 'Express',venueList:result,msg:msg });
                });
                //db.close();

            });
        });
    },
    getVenueList:function(ssn,res){
    // res.render('exam_manager/venue', { title: 'Express' });
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
            dbo.collection("venue").find({}).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
                db.close();


                res.render('exam_manager/venue', {'ssn': ssn, title: 'Express',venueList:result,msg:'' });
            });
        });
    },
    removeVenue:function (id,res) {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);

           // var myquery = {_id:ObjectId(id)};
            dbo.collection("venue").deleteOne({_id:new mongodb.ObjectID(id)},function(err, result) {
                if (err) throw err;
                console.log(result);
                //get value list again
                dbo.collection("venue").find({}).toArray(function(err, result) {
                    if (err) throw err;
                    console.log(result);
                    db.close();
                    var msg = '<span> Venue Deleted </span>';
                    res.render('exam_manager/venue', { title: 'Express',venueList:result,msg:msg });
                });

            });

        });
    }
}