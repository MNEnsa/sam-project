'use strict';

import AWS from 'aws-sdk';

export function handler (event, context, callback) {
    var responseCode = 200;
    var response = {
        statusCode: responseCode,
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
            
        },
        
        "body": "{\"result\": \"Success.\"}",
        
    };
}