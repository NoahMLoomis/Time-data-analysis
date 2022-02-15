import useFind from "../hooks/useFind"
import useAggregate from "../hooks/useAggregate"

export default async function handler(req, res) {
    // const data = await useFind()
    const data = await useAggregate({}, {_id: "$Country", "time" : {$sum: "$Time (minutes)"}})
    console.log(data)
    return res.status(200).json(data)
}
