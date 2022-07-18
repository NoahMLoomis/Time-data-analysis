import { MongoClient } from "mongodb"


const useAggregate = async (match, group = { "_id": 1 }, sort) => {
    const client = new MongoClient(process.env.DB_URI)

    let pipeline = [
        { "$match": match },
        { "$group": group },
        {"$sort": sort}
    ]

    try {
        await client.connect()
        return await client.db("DataAnalysis").collection("time_use").aggregate(pipeline).toArray()
    } catch (e) {
        console.log(e)
    } finally {
        client.close()
    }
};

export default useAggregate;