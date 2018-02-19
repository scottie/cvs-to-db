// Used to import a CVS from google docs into a mongo DB
// Made for CrispyCrypto 


// git clone url
// cd dir
// npm install
// nano App.js and edit config
// npm start


//CONFIG
var csvFileFromGoogleDocs = "crispMembers.csv";
var DBHost = '';
var DBuser = '';
var DBpass = '';
var Db = 'users';
var DBcollection = 'users';
//
//
//
var mi = require('mongoimport');


const csvFilePath = csvFileFromGoogleDocs;
const csv = require('csvtojson');
var jsonObject;
csv()
.fromFile(csvFilePath)
.on('json',(jsonObj)=>{
    var fixJson = JSON.stringify(jsonObj);
    jsonObject = jsonObject + "," + fixJson;   
})
.on('done',(error)=>{
    if(error){
        console.log("[!] " + error.message);
    }
    else{
        var finalJsonClean = "{\"users\":[" + jsonObject.replace("undefined,","") + "]}";
        finalJsonClean = finalJsonClean.replace(/'/g, '"');
        //console.log(finalJsonClean);
        var json = JSON.parse(finalJsonClean);
        console.log(JSON.stringify(json))
        console.log('[*] Done');
        var config = {
            fields: json,                     // {array} data to import
            db: Db,                     // {string} name of db
            collection: DBcollection,        // {string|function} name of collection, or use a function to
                                            //  return a name, accept one param - [fields] the fields to import
            
            // they're options
            host: DBHost,        // {string} [optional] by default is 27017
            username: DBuser,             // {string} [optional]
            password: DBpass,                // {string} [optional]
            callback: (err, db) => {
                console.log(db);
                if(err){
                    console.log(err);
                }
                
            }       // {function} [optional]
            };
        
        mi(config, function(d){
            console.log(d);
        });
    }
    
})