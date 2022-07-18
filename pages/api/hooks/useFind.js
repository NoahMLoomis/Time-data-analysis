import { MongoClient } from "mongodb"


const useFind = async (findParams = {}) => {
    const client = new MongoClient(process.env.DB_URI)
    try {
        await client.connect()
        return await client.db("DataAnalysis").collection("time_use").find(findParams).toArray()
    } catch (e) {
        console.log(e)
    } finally {
        client.close()
    }
};

export default useFind;