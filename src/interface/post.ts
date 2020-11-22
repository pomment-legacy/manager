export interface ThreadItem {
    uuid: string;
    title: string;
    firstPostAt: number;
    latestPostAt: number;
    amount: number;
}

export interface PostQueryResults {
    uuid: string;
    name: string | null;
    email: string;
    website: string | null;
    avatar: string | null;
    parent: string | null;
    content: string;
    hidden: boolean;
    rating: number | null;
    byAdmin: boolean;
    receiveEmail: boolean;
    editKey: string | null;
    updatedAt: number;
    createdAt: number;
    origContent: string;
}

export interface PostItem {
    uuid: string;
    name: string | null;
    emailHashed: string | null;
    website: string | null;
    avatar: string | null;
    parent: string | null;
    content: string;
    byAdmin: boolean;
    createdAt: number;
    edited: boolean;
}
