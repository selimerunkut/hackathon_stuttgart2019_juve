import { DataFrame } from 'data-forge';

const generateRandomMacAddresses = (num) => {
    const randomMacAddresses = [];
    for(let i=0; i<num; ++i)  {
        const macBytes = new Buffer(3);
        for(let j=0; j<3; ++j) {
            macBytes[j] = Math.round(0xFF * Math.random());
        }
        let macText = '';
        for(let j=0; j<3; ++j) {
            macText += macBytes[j].toString(16).padStart(2, '0');
            if (j<2) macText += ':';
        }
        console.log(macText);
        randomMacAddresses.push(macText);
    }
    return randomMacAddresses;
}

const randomMacAddresses = generateRandomMacAddresses(50);
const generateRandomTime = (startTime, offset, step) => {
    return new Date(startTime.getTime() + offset * step*1000);
};

const startDate = new Date();
const step = 12;

const testData = randomMacAddresses.map((mac, index) => {
    const startStation = Math.round(10*Math.random());
    const endStation = Math.max(startStation + 1, Math.round(10*Math.random()));
    return {
        mac, 
        //ts: generateRandomTime(startDate, index, step),
        startStation,
        endStation
    }
});

const testDataDF = new DataFrame(testData);
console.log(testDataDF.toString());