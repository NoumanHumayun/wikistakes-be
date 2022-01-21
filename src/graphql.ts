
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface BlogInput {
    title?: string;
    publishDate?: string;
    content?: string;
    userId?: string;
}

export interface BlogUpdate {
    id: string;
    title?: string;
    publishDate?: string;
    content?: string;
    userId?: string;
}

export interface SweepI {
    startDate?: string;
    endDate?: string;
    description?: string;
}

export interface SweepInput {
    sweep?: SweepI;
    influencer?: UserInput;
    file1?: Upload;
    file2?: Upload;
    file3?: Upload;
    file4?: Upload;
    file5?: Upload;
    file6?: Upload;
}

export interface SweepFiles {
    file1?: Upload;
    file2?: Upload;
    file3?: Upload;
    file4?: Upload;
    file5?: Upload;
    file6?: Upload;
}

export interface SweepUpdate {
    id: string;
    title?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
    influencerId?: string;
    winnerId?: string;
}

export interface UserInput {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    imageUrl?: string;
    country?: string;
    isVerified?: boolean;
    role?: string;
    social1?: string;
    social2?: string;
    socialType1?: string;
    socialType2?: string;
    bank?: string;
    aba?: string;
    account?: string;
}

export interface UserUpdate {
    id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    imageUrl?: string;
    country?: string;
    isVerified?: boolean;
    role?: string;
    social1?: string;
    social2?: string;
    socialType1?: string;
    socialType2?: string;
    bank?: string;
    aba?: string;
    account?: string;
}

export interface LoginInput {
    email: string;
    password?: string;
}

export interface Blog {
    id?: string;
    title?: string;
    publishDate?: string;
    content?: string;
    author?: User;
}

export interface IQuery {
    blog(id: string): Blog | Promise<Blog>;
    blogs(): Blog[] | Promise<Blog[]>;
    sweep(id: string): Sweep | Promise<Sweep>;
    sweeps(): Sweep[] | Promise<Sweep[]>;
    user(id: string): User | Promise<User>;
    users(): User[] | Promise<User[]>;
    admin(id: string): User | Promise<User>;
    admins(): User[] | Promise<User[]>;
    influencer(id: string): User | Promise<User>;
    influencers(): User[] | Promise<User[]>;
    userByEmail(email: string): User | Promise<User>;
    usersByEmails(emails?: string[]): User[] | Promise<User[]>;
}

export interface IMutation {
    addBlog(input?: BlogInput): Blog | Promise<Blog>;
    updateBlog(input?: BlogUpdate): Blog | Promise<Blog>;
    deleteBlog(id: string): boolean | Promise<boolean>;
    addSweep(input?: SweepInput): Sweep | Promise<Sweep>;
    addSweepFiles(id: string, files?: Upload[]): Sweep | Promise<Sweep>;
    updateSweep(input?: SweepUpdate): Sweep | Promise<Sweep>;
    deleteSweep(id: string): boolean | Promise<boolean>;
    login(input?: LoginInput): User | Promise<User>;
    addUser(input?: UserInput): User | Promise<User>;
    updateUser(input?: UserUpdate): User | Promise<User>;
    deleteUser(id: string): boolean | Promise<boolean>;
}

export interface File {
    filename: string;
    mimetype: string;
    encoding: string;
}

export interface Sweep {
    id?: string;
    title?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
    file1?: File;
    file2?: File;
    file3?: File;
    file4?: File;
    file5?: File;
    file6?: File;
    influencer?: User;
    winner?: User;
}

export interface User {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    imageUrl?: string;
    country?: string;
    isVerified?: boolean;
    role?: string;
    social1?: string;
    social2?: string;
    socialType1?: string;
    socialType2?: string;
    bank?: string;
    aba?: string;
    account?: string;
    sweeps?: Sweep;
}

export interface ISubscription {
    usersSubscription(userId: string): User | Promise<User>;
}

export type Upload = any;
