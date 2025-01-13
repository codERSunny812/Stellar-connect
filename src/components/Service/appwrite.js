import { Client, Account } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('677ea5d5001f4688cff1'); // Replace with your project ID

export const account = new Account(client);
export { ID } from 'appwrite';
