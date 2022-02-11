import useFetch from "../hooks/useFetch"

export default async function handler(req, res) {
    const data = await useFetch()
    console.log(data)
    return res.status(200).json(data)
}
