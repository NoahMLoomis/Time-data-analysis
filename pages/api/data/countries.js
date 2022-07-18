import useAggregate from "../hooks/useAggregate"

export default async function Handler(req, res) {
    const data = await useAggregate({ "Category": req.query.category }, { _id: "$Country", "time": { $sum: "$Time (minutes)" } }, { _id: 1 })
    return res.status(200).json(data)
}
