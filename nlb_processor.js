'use strict';

var AWS = require('aws-sdk');
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

exports.router = function (event, context) {
    var data = event.Records[0].body;
    var spl = data.split('\n');
    var sp1 = spl[0].split(':');
    var sp2 = spl[1].split(':');
    var sp3 = spl[2].split(' ');
    var sp4 = spl[3].split(' ');
    var sp5 = spl[4].split(':');
    var sp6 = spl[5].split(':');
    var sp7 = spl[6].split(' ');
    
   var cardValue = sp1[1];
   var bank = sp2[1];
   var amount = sp3[1];
   var time = sp4[1] + " " + sp4[2];
   var status = sp5[1];
   var desc = sp6[1];
   var balance = sp7[1];
   var currency = sp3[2];
   console.log(amount, balance);
   
   const accountId = context.invokedFunctionArn.split(':')[4];
   const region = context.invokedFunctionArn.split(':')[3];
   
   var params = {
        MessageAttributes: {
            "Card": {
                DataType: "String",
                StringValue: cardValue.trim()
                    },
            "Bank": {
                DataType: "String",
                StringValue: bank.trim()
                    },
            "Amount": {
                DataType: "String",
                StringValue: amount.trim()
                    },
            "Currency": {
                DataType: "String",
                StringValue: currency.trim()
                    },
            "Time": {
                DataType: "String",
                StringValue: time.trim()
                    },
            "Status": {
                DataType: "String",
                StringValue: status.trim()
                    },
            "Description": {
                DataType: "String",
                StringValue: desc.trim()
                    },
            "Balance": {
                DataType: "String",
                StringValue: balance.trim()
                    }        
        },
  MessageBody: event.Records[0].body,
  QueueUrl: "https://sqs." + region + ".amazonaws.com/" + accountId + "/parsed_messages"
};

sqs.sendMessage(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.MessageId);
  }
});
    
};
