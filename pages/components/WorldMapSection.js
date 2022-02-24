import { useState, useEffect } from 'react'
import styles from '../../styles/Home.module.css'

import WorldMap from './WorldMap'

const WorldMapSection = () => {
    const [data, setData] = useState([])
    const [cat, setCat] = useState("")

    useEffect(async () => {
        setInterval(async () => {
            await fetch("/api/data/categories").then(d => d.json())
                .then(d => {
                    const cats = d.map(i => i._id)
                    return cats[Math.floor(Math.random() * cats.length)]
                })
                .then(cat => {
                    setCat(cat)
                    fetch(`/api/data/countries?category=${cat}`).then(d => d.json())
                        .then(d => setData(d))
                })
        }, [5000])
    }, [])

    return (
        <>
            <h1 className={styles.categoryTitle}>{cat}</h1>
            <WorldMap data={data} />
        </>
    )
}

export default WorldMapSection