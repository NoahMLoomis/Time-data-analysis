import useFind from "../hooks/useFind"

export default async function Handler(req, res) {
    return res.status(200).json(await useFind())
}
