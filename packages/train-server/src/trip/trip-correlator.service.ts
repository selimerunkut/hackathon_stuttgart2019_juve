import { Injectable } from '@nestjs/common';
import { DataFrame, Series, IDataFrame } from 'data-forge';

const TEST_DATA = [
    {
        "mac": "C8:94:BB:E9:EE:52",
        "name": "Telefon Jos",
        "ts": "2019-02-16T16:38:28.600Z"
    },
    {
        "mac": "C8:94:BB:E9:EE:52",
        "name": "Telefon Jos",
        "ts": "2019-02-16T16:38:58.600Z"
    },
    {
        "mac": "C8:94:BB:E9:EE:52",
        "name": "Telefon Jos",
        "ts": "2019-02-16T16:39:28.600Z"
    },
    {
        "mac": "C8:94:BB:E9:EE:52",
        "name": "Telefon Jos",
        "ts": "2019-02-16T16:39:58.600Z"
    },
    {
        "mac": "C8:94:BB:E9:EE:52",
        "name": "Telefon Jos",
        "ts": "2019-02-16T16:40:28.600Z"
    },
    {
        "mac": "C8:94:BB:E9:EE:52",
        "name": "Telefon Jos",
        "ts": "2019-02-16T16:40:58.600Z"
    },
    {
        "mac": "C8:94:BB:E9:EE:52",
        "name": "Telefon Jos",
        "ts": "2019-02-16T16:41:28.600Z"
    },
    {
        "mac": "C8:94:BB:E9:EE:52",
        "name": "Telefon Jos",
        "ts": "2019-02-16T16:41:58.600Z"
    },
    {
        "mac": "C8:94:BB:E9:EE:52",
        "name": "Telefon Jos",
        "ts": "2019-02-16T16:42:28.600Z"
    },
    {
        "mac": "9f:8a:6e",
        "ts": "2019-02-16T16:42:34.600Z"
    },
    {
        "mac": "C8:94:BB:E9:EE:52",
        "name": "Telefon Jos",
        "ts": "2019-02-16T16:42:58.600Z"
    }
];

@Injectable()
export class TripCorrelatorService {

    public test(timeSlices: any[]) {
        const lastTimeSliceNumber = timeSlices.length;
        const prepareDevices = (devices): IDataFrame => {
            const preparedDevicesDF = new DataFrame(devices);
            return preparedDevicesDF
                .orderByDescending((devie) => devie.ts);
        }
        let timeSlicesDF = new DataFrame(timeSlices)
            .select((entries, index) => {
                const preparedDevicesDF = prepareDevices(entries);
                return {
                    devices: preparedDevicesDF
                        .distinct((device) => device.mac)
                        .toArray(),
                    timeSliceNumber: index
                };
            });
        const timeSliceUnwind = [];
        for (let timeSlice of timeSlicesDF.toArray()) {
            timeSliceUnwind.push(...timeSlice.devices.map((device) => ({
                ...device, timeSliceNumber: timeSlice.timeSliceNumber
            })));
        }
        const timeSliceUnwindDF = new DataFrame(timeSliceUnwind);
        console.log(`@ ${new Date().toISOString()}`);
        console.log('timeSliceUnwindDF', timeSliceUnwindDF.toString());
        const macs = timeSliceUnwindDF.getSeries('mac').distinct().toArray();
        // TODO: Hop-on/off detection.
        // INtervalle pro mac adresse
        for (let mac of macs) {
            let byMacDF: any = timeSliceUnwindDF
                .where((device) => device.mac == mac)
                .orderBy((device) => device.timeSliceNumber)
            byMacDF = byMacDF.take(timeSliceUnwindDF.count() - 1); 
            const c = lastTimeSliceNumber - 1;
            if (c < 2) continue;
            const presenceInformation = new Array(c).fill(0.1);
            for(let e of byMacDF.toArray()) {
                const index = e.timeSliceNumber;
                presenceInformation[index] = 1;
            }
            for (let i = 0; i < c; ++i) {
                if ((i > 0) && i < (c - 1)) {
                    const prevValue = presenceInformation[i - 1];
                    const nextValue = presenceInformation[i + 1];
                    if (presenceInformation[i] < 0.5 && prevValue >= 0.8 && nextValue >= 0.8) {
                        presenceInformation[i] = 0.5;
                    }
                }
            }
            console.log('presenceInformation', presenceInformation);
        }

        /*
        const modifiedDF = timeSlicesDF
        .groupBy((timeSlice) => null)
        .select((timeSlices: DataFrame) => {
            console.log(timeSlices.toString());
            return timeSlices.select((timeSlice) => {
                timeSlice.
            })
            console.log(timeSlices.getIndex().toArray());
        })
        console.log(modifiedDF.toString());
*/
        //timeSlicesDF = timeSlicesDF.withSeries('timeSeriesNumber', indexSeries);
        //console.log(timeSlicesDF.toString());
    }

}