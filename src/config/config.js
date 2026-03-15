const config = {
    appwriteurl:String(import.meta.env.VITE_APPWRITE_URL) ,
    projectId:String( import.meta.env.VITE_APPWRITE_PROJECT_ID),        
    databaseId:String( import.meta.env.VITE_APPWRITE_DATABASE_ID),       
    bucketId:String( import.meta.env.VITE_APPWRITE_BUCKET_ID),
    collectionId:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    tinymceApiKey: import.meta.env.VITE_TINYAPI_KEY ? String(import.meta.env.VITE_TINYAPI_KEY) : "no-api-key"
}


export default config                          