import axios from 'axios';
import { timer } from 'rxjs';

const payload1 = {
    "devices": [
        {
            "mac": "C8:94:BB:E9:EE:52",
            "name": "Telefon Jos"
        }
    ]
};
const payload2 = {
    "devices": [
        {
            "mac": "D8:94:BB:E9:EE:52",
            "name": "Telefon Bos"
        }
    ]
};

let threshold = 15;

timer(0, 1000)
    .subscribe((counter) => {
        counter = counter % 30;
        if (counter == 0) threshold = Math.round(13 + 4 * Math.random());
        axios.post('http://localhost:3000/mock/bluetooth-scan', (counter < threshold) ? payload1 : payload2);
    });