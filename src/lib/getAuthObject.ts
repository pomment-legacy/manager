import { sha512 } from 'js-sha512';
import { IAuth } from 'pomment-common/dist/auth';

export default function getAuthObject(token: string): IAuth {
    const time = new Date().getTime();
    return {
        time,
        token: sha512.hmac.create(token).update(`${time}`).hex(),
    };
}
