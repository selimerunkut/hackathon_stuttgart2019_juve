import { Subject } from "rxjs";

export class BaseBluetoothScannerService {

    protected _foundDevicesSource = new Subject();
    protected _foundDevices$ = this._foundDevicesSource.asObservable();

    public get foundDevices$() {
        return this._foundDevices$;
    }
    public start() {

    }

}