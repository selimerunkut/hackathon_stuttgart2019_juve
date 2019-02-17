import { Injectable } from '@nestjs/common';
import { DataFrame, Series, IDataFrame } from 'data-forge';
import { TripCommitService } from './trip-commit.service';

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

    private _lastCommitStart = NaN;
    private _lastCommitEnd = NaN;

    constructor(private _tripCommitService: TripCommitService) {

    }

    public test(timeSlices: any[]) {
        const lastTimeSliceNumber = timeSlices.length - 1;
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
        const macs = timeSliceUnwindDF.getSeries('mac')
            .distinct()
            .where((e) => e.toUpperCase() == "C8:94:BB:E9:EE:52")
            .toArray();

        // TODO: Hop-on/off detection.
        // INtervalle pro mac adresse
        for (let mac of macs) {
            let byMacDF: any = timeSliceUnwindDF
                .where((device) => device.mac == mac)
                .orderBy((device) => device.timeSliceNumber)
            byMacDF = byMacDF.take(timeSliceUnwindDF.count() - 1);
            if (byMacDF.count() < 2) continue;
            const c = lastTimeSliceNumber - 1;
            const presenceInformation = new Array(c).fill(0);
            for (let e of byMacDF.toArray()) {
                const index = e.timeSliceNumber;
                presenceInformation[index] = 1;
            }
            for (let i = 0; i < c; ++i) {
                if ((i > 0) && i < (c - 1)) {
                    const prevValue = presenceInformation[i - 1];
                    const nextValue = presenceInformation[i + 1];
                    if (presenceInformation[i] < 0.5 && prevValue >= 0.8 && nextValue >= 0.8) {
                        presenceInformation[i] = 1;
                    }
                }
            }
            console.log('presenceInformation', presenceInformation);
            const byMac = byMacDF.toArray();
            for (let i = 0; i < byMac.length; ++i) {
                byMac[i].deltaTimeSliceNumber = i == 0 ? NaN :
                    byMac[i].timeSliceNumber - byMac[i - 1].timeSliceNumber;
            }
            const byMacDF2 = new DataFrame(byMac);
            console.log('byMacDF2', byMacDF2.toString());
            const possibleTripStartsDF = byMacDF2.where((e) => isNaN(e.deltaTimeSliceNumber ) || e.deltaTimeSliceNumber > 1);
            console.log('possibleTripStartsDF', possibleTripStartsDF.toString());
            const possibleTripStarts = possibleTripStartsDF.toArray().map((e) => e.timeSliceNumber);
            const possibleTripEnds = [];
            for(let i=0; i<possibleTripStarts.length; ++i) {
                const possibleTripStart = possibleTripStarts[i];
                console.log('possibleTripStart', possibleTripStart);
                for(let j=possibleTripStart+1; j<lastTimeSliceNumber; ++j) {
                    console.log(j, presenceInformation[j])
                    if (presenceInformation[j] != 1) {
                        const possibleTripEnd = j;
                        console.log('possibleTripEnd', possibleTripEnd);
                        possibleTripEnds.push(possibleTripEnd);
                        break;
                    }
                }
            }
            console.log('possibleTripEnds', possibleTripEnds);
            for(let possibleTripStart of possibleTripStarts) {
                if (isNaN(this._lastCommitStart) || possibleTripStart > this._lastCommitStart) {
                    const ts = byMacDF2.where((e) => e.timeSliceNumber == possibleTripStart)
                        .first().ts.toISOString();
                    this._tripCommitService.commitStartTrip({ts, mac});
                    this._lastCommitStart = possibleTripStart;
                }
            }
            for(let i=0; i< possibleTripEnds.length; ++i) {
                const possibleTripStart = possibleTripStarts[i];
                const possibleTripEnd = possibleTripEnds[i];
                if (isNaN(this._lastCommitEnd) || possibleTripEnd > this._lastCommitEnd) {
                    const ts = byMacDF2.where((e) => e.timeSliceNumber == possibleTripEnd - 1)
                        .first().ts.toISOString();
                        const startTripTs = byMacDF2.where((e) => e.timeSliceNumber == possibleTripStart)
                        .first().ts.toISOString();
                    const startId = `${mac}-${startTripTs}`;
                    this._tripCommitService.endTrip({ts, mac, startId});
                    this._lastCommitEnd= possibleTripEnd;
                }
            }
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