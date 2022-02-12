import useFind from "../hooks/useFind"
import useAggregate from "../hooks/useAggregate"

export default async function handler(req, res) {
    // const data = await useFind()
    const data = await useAggregate({}, )
    return res.status(200).json(data)
}
