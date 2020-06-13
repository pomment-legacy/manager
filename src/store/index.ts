import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import { IAuth } from 'pomment-common/dist/auth';
import ThreadList from '@/interface/thread-list';
import RootState from '@/interface/state-types';

Vue.use(Vuex);

function getAuthObject(token: string): IAuth {
    const time = new Date().getTime();
    return {
        time,
        token: hmacSHA512(`${time}`, token).toString(),
    };
}

export default new Vuex.Store<RootState>({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        logged: false,
        url: '',
        token: '',
        threads: [],
    },
    mutations: {
        setLoginInfo(state, param: { url: string; token: string }) {
            state.url = param.url;
            state.token = param.token;
        },
        setLoginStatus(state, param: { logged: boolean }) {
            state.logged = param.logged;
        },
        setThreadList(state, param: { threads: ThreadList[] }) {
            state.threads = param.threads;
        },
    },
    actions: {
        async getThreadList(ctx) {
            try {
                const result = await axios.post(`${ctx.state.url}/v2/manage/threads`, {
                    auth: getAuthObject(ctx.state.token),
                });
                this.commit('setThreadList', {
                    threads: result.data,
                });
            } catch (e) {
                throw new Error(`Unable to fetch thread list: ${e}`);
            }
        },
    },
    modules: {
    },
});
