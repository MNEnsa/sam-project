'use strict';

var AWS = require('aws-sdk');
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

exports.router = function (event, context,callback) {
    var responseCode = 200;
    var response = {
        statusCode: responseCode,
        headers: { 'Content-Type': 'application/json' },
        
        "body": "{\"result\": \"Success.\"}",
        
    };
    
     var data = JSON.parse(event.body);
     var hipotekarna = data.message.includes("Hipotekarna");
     var nlb = data.message.includes("NLB");

    const accountId = context.invokedFunctionArn.split(':')[4];
    const region = context.invokedFunctionArn.split(':')[3];
     
    if(hipotekarna==true){ 
        var params = {
            MessageBody: data.message,
            QueueUrl: "https://sqs." + region + ".amazonaws.com/" + accountId + "/hb_message_processing_queue"
    };

        sqs.sendMessage(params, function(err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                console.log("Success", data.MessageId);
                }
        });}
    else if(nlb==true){
        var params = {
        MessageBody: data.message,
        QueueUrl: "https://sqs." + region + ".amazonaws.com/" + accountId + "/nlb_message_processing_queue"
        };

        sqs.sendMessage(params, function(err, data) {
         if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data.MessageId);
        } 
        });}

    callback(null, response);    
};