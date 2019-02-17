# hackathon_stuttgart2019_juve readme

## Starting sequence 

### Start the Blockchain Environment

Invoke `./startFabric.sh` in folder `packages`.

### Install the backend for the receiving data from the "train"
#### use node version 10.15.1
$ cd packages/train-server/

$ npm install

$ cd packages/train-server/scripts/

$ node 01-enroll-admin.js

$ node 02-register-user.js

### Start the train server

$ cd packages/train-server/

$ npm start

### Start the App

$ cd packages/webapp

$ npm start 

### Start the Mock Script that sends the bluethoot data

$ cd packages/train-server/scripts

node mock-bt-scan.js


## Troubleshooting

Docker Ubuntu 18.04 installation:
remove snap/docker & docker if you see Dockerversion 18.06.1-ce and have errors &  folders can not be created
re-install with this tutorial:
https://docs.docker.com/install/linux/docker-ce/ubuntu/

For stopping container use the cleanupDocker.sh if you get errors the only solution could be to stop the docker deamon or reboot your PC/Laptop

If you get this error:
Failed to evaluate transaction: Error: transaction returned with failure: Error: You've asked to invoke a function that does not exist: findAllEvents...
...Failed at the train-server@0.0.0 start script
### execute
$ cleanupDocker.sh

$ docker rmi hyperledger/fabric-peer
