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


timer(0, 1000)
    .subscribe((counter) => {
        counter = counter % 30;
        axios.post('http://localhost:3000/mock/bluetooth-scan', (counter < 15) ? payload1 : payload2);
    });