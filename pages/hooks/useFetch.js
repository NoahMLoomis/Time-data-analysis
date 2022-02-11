import { MongoClient } from "mongodb"


const useFetch = async (findParams = {}) => {
    const client = new MongoClient("mongodb://csdev.cegep-heritage.qc.ca:27017")
    try {
        await client.connect()
        return await client.db("DataAnalysis").collection("time_use").find(findParams).toArray()
    } catch (e) {
        console.log(e)
    } finally {
        client.close()
    }
};

export default useFetch;