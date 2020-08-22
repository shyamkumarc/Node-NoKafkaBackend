# Node-NoKafkaBackend
this is a Express based service that can connect to a Kafka cluster configured at 192.168.43.173:9092

# important note when connecting from remote systems to Kafka cluster server
Kafka clusters are run based on server.properties config file , this file has an option to mention "advertised Listeners"
When some client (in this case , the no-Kafka node client),  connects to the  cluster port (default:9092) and queries for
broker end points , It is these  "advertised Listeners" that are broadcast as 
broker endpoints , and  the ones  client actually connects to for consuming or producing Kafka topics.

BY default , the server config file's advertised listeners will be pointing to localhost:9092 , which means when a client connects
and retrieves broker addresses , it'll end up assuming that the kafka broker is available at localhost : 9092(it own port 9092), and hence
we'll end up received connection refused errors.

To prevent this , when setting up the Kafka cluster server, we need to update the server.properties file with the correct advertised listener address.
IN my case, my kafka cluster server runs from 192/.168.43.173 (i am running this in my local network) and hence i've updated it to this IP address.

A beautiful explanation of this can be found in confluent website : https://www.confluent.io/blog/kafka-client-cannot-connect-to-broker-on-aws-on-docker-etc/ 
