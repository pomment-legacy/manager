import { sha512 } from 'js-sha512';
import { Auth } from '@/lib/auth';

export default function getAuthObject(token: string): Auth {
    const time = new Date().getTime();
    return {
        time,
        token: sha512.hmac.create(token).update(`${time}`).hex(),
    };
}
