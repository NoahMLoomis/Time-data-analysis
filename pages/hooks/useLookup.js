import { MongoClient } from "mongodb"


const useLookup = async () => {
    const client = new MongoClient("mongodb://csdev.cegep-heritage.qc.ca:27017")
    try {
        await client.connect()
        return await client.db("DataAnalysis").collection("time_use").aggregate([
            {
                $lookup: {
                    from: 'countries',
                    let: { countryName: "$Country" },
                    pipeline: [
                        {
                            $match:
                            {
                                $expr:
                                    { $eq: ["$country", "$$countryName"] }
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
    } catch (e) {
        console.log(e)
    } finally {
        client.close()
    }
};

export default useLookup;