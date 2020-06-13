import ThreadList from './thread-list';

interface RootStates {
    logged: boolean;
    url: string;
    token: string;
    threads: ThreadList[];
}

export default RootStates;
