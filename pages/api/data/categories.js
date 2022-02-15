import useAggregate from "../../hooks/useAggregate"

export default async function handler(req, res) {
    return res.status(200).json(await useAggregate({}, {_id: "$Category"}, {_id: 1}))
}
