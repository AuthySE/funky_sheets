var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');

exports.handler = function(context, event, callback) {
// spreadsheet key is the long id in the sheets URL
var doc = new GoogleSpreadsheet(context.FUNC_GOOGLE_SHEET_ID);
var sheet;

// console.log(event);

async.series([
    function setAuth(step) {

        var creds_json = {
            "private_key": context.FUNC_GOOGLE_KEY,
            "client_email": context.FUNC_GOOGLE_USER
        };

        doc.useServiceAccountAuth(creds_json, step);
    },
    function getInfoAndWorksheets(step) {
        doc.getInfo(function(err, info) {
            // console.log('info: ', info);
            // console.log('Loaded doc: '+info.title+' by '+info.author.email);
            sheet = info.worksheets[0];
            // console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
            step();
        });
    },
    function addRowInfo(step) {
        
        // var r = /\d+/;
        // var code = event.Body.match(r);
        var code = event.Body.replace(/[^0-9]/g, "") + "";

        // console.log(code);
        
        var row = {
            'time': new Date(),
            'number': event.To,
            'message': event.Body,
            'code': code
        };
        sheet.addRow(row, function(err, added){
                if(err){
                    console.log("error: ", err);
                } else {
                    console.log("added: ", added);
                }
                callback(null, null);
        })
    }
], function(err){
    if( err ) {
        console.log('Error: '+err);
        callback(null, null);

    }
});
};