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


timer(0, 3000)
    .subscribe((counter) => {
        counter = counter % 20;
        axios.post('http://localhost:3000/mock/bluetooth-scan', (counter < 4 || (counter > 7 && counter < 12)) ? payload1 : payload2);
    });