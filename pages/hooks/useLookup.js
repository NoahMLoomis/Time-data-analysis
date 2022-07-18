import { MongoClient } from "mongodb"


const useLookup = async () => {
    const client = new MongoClient("mongodb+srv://nloomis:nloomis@cluster0.akqxn.mongodb.net")
    try {
        await client.connect()
        const arr = await client.db("DataAnalysis").collection("time_use").aggregate([
            {
                $lookup: {
                    from: 'countries',
                    let: { countryName: "$Country" },
                    pipeline: [
                        {
                            $match:
                            {
                                $expr:
                                    { $eq: ["$name", "$$countryName"] }
                            }
                        },
                    ],
                    as: 'matchedCountries'
                }
            },
            { $unwind: "$matchedCountries" },
            {
                $project: {
                    _id: "$matchedCountries.country", "region": "$matchedCountries.region", "time": "$Time (minutes)", "category": "$Category"
                }
            },
            { $group: { _id: { category: "$category", region: "$region" }, averageTime: { $avg: "$time" } } },
            { $sort: { "_id.region": 1, "_id.category": 1 } }
        ]).toArray()
        return arr
    } catch (e) {
        console.log(e)
    } finally {
        client.close()
    }
};

export default useLookup;