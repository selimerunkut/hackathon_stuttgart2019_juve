import { DataFrame } from 'data-forge';

const generateRandomTime = (startTime, offset, step) => {
    return new Date(startTime.getTime() + offset * step*1000);
};

const startDate = new Date();
const step = 30;

const entries = [];

for(let i=0; i<10; ++i) {
    const ts = generateRandomTime(startDate, i, step);
    entries.push({'mac' : 'C8:94:BB:E9:EE:52', name:'Telefon Jos', ts});
}

const testData = entries.map((mac, index) => {
    const startStation = Math.round(10*Math.random());
    const endStation = Math.max(startStation + 1, Math.round(10*Math.random()));
    return {
        mac, 
        startStation,
        endStation
    }
});

const testDataDF = new DataFrame(entries);
console.log(testDataDF.toString());

console.log(JSON.stringify(entries.map((entry) => ({...entry, ts: entry.ts.toISOString()})), null, 2));