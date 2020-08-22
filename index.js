var express = require('express')
var app = express()

// kafka node --------------------------------
// var kafka = require('kafka-node'),
//     Consumer = kafka.Consumer;
//     const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
    
//      consumer = new Consumer(
//         client,
//         [
//             { topic: 'quickstart-events', partition: 0 }
//         ],
//         {
//             autoCommit: false
//         }
//     );

//     consumer.on('message', function (message) {
//         console.log(message);
//     });


// -----------------------------------NO-Kafka--------------------------------------------------------


// var Kafka = require('no-kafka');
 

// var consumer = new Kafka.SimpleConsumer({connectionString:'192.168.43.173:9092'});
//  var producer = new Kafka.Producer({connectionString:'192.168.43.173:9092'});
 
 //-------------------------------------- producer code --------------------------------------
//   return producer.init().then(function(){
//   return producer.send({
//        topic: 'quickstart-events',
//        partition: 0,
//        message: {
//            value: 'Hello!' + new Date().toLocaleTimeString()
//        }
//    });
//  })
//  .then(function (result) {
//    /*
//    [ { topic: 'kafka-test-topic', partition: 0, offset: 353 } ]
//   */
//  });
//-------------------------------------- producer code --------------------------------------

//-------------------------------------- consumer code --------------------------------------
// // data handler function can return a Promise
// var dataHandler = function (messageSet, topic, partition) {
//     messageSet.forEach(function (m) {
//         console.log(topic, partition, m.offset, m.message.value.toString('utf8'));
//     });
// };
 
// return consumer.init().then(function () {
//     // Subscribe partitons 0 and 1 in a topic:
//     return consumer.subscribe('quickstart-events', [0], dataHandler);
// });
//-------------------------------------- consumer code --------------------------------------
// -----------------------------------NO-Kafka--------------------------------------------------------


// data handler function can return a Promise
var dataHandler = function (messageSet, topic, partition) {
    messageSet.forEach(function (m) {
        console.log(topic, partition, m.offset, m.message.value.toString('utf8'));
    });
};
 

// GET method route
app.get('/', function (req, res) {
    res.send('GET request to the homepage');

})

// POST method route
app.post('/', function (req, res) {
    // res.send('POST request to the homepage');
 var producer = new Kafka.Producer({connectionString:'192.168.43.173:9092'});

 producer.init().then(function(){
      return producer.send({
           topic: 'quickstart-events',
           partition: 0,
           message: {
               value: 'Hello!' + new Date().toLocaleTimeString()
           }
       });
     })
     .then(function (result) {
        res.send('POST request to the homepage');
       /*
       [ { topic: 'kafka-test-topic', partition: 0, offset: 353 } ]
      */
     });


    // return consumer.init().then(function () {
    //     // Subscribe partitons 0 and 1 in a topic:
    //     return consumer.subscribe('quickstart-events', [0], dataHandler);
    // });

})


app.listen(3000, () => {
    console.log("Started on PORT 3000");
})