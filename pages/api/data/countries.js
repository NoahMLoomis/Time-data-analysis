import useAggregate from "../../hooks/useAggregate"

export default async function Handler(req, res) {
    let data = null
    if (req.query) {
        data = await useAggregate({ "Category": req.query.category }, { _id: "$Country", "time": { $sum: "$Time (minutes)" } }, {_id: 1})
    } else
        data = await useAggregate({}, { _id: "$Country", "time": { $sum: "$Time (minutes)" } })
    return res.status(200).json(data)
}
