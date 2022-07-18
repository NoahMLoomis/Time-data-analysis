import useLookup from "../hooks/useLookup";

export default async function Handler(req, res) {
    return res.status(200).json(await useLookup())
}
