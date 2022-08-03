import { MongoClient } from 'mongodb'

export async function connectToDatabase() {
    const client = await MongoClient.connect(
      'mongodb+srv://martin:5qPsjqcPWgPTYLpa@cluster0.yogu8n3.mongodb.net/auth?retryWrites=true&w=majority'
    );
  
    return client;
  }