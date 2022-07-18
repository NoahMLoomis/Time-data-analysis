import { useEffect, useState } from "react"
import { DropdownButton, Dropdown } from 'react-bootstrap'

import RegionTable from "./RegionTable"

import styles from '../../styles/Home.module.css'

const RegionSection = () => {
    const [selectedRegion, setSelectedRegion] = useState("Europe")
    const [regions, setRegions] = useState([])
    const [categoriesWithTime, setCategoriesWithTime] = useState([])

    useEffect(() => {
        fetch("/api/data/regions").then(d => d.json())
            .then(d => {
                setRegions([...new Set(d.map(item => item._id['region']))])
                setCategoriesWithTime([...new Set(d.map(item =>
                    item._id['region'] === selectedRegion && { category: item._id['category'], averageTime: item.averageTime }
                ))])
            })
            .catch(e => console.log(e))
    }, [selectedRegion])

    return (
        <>
            <h1 className={styles.categoryTitle}>Avg time spent per region</h1>
            <DropdownButton title={selectedRegion}>
                {regions.map(reg => (
                    <Dropdown.Item key={reg} onClick={() => setSelectedRegion(reg)}>{reg}</Dropdown.Item>
                ))}
            </DropdownButton>
            <RegionTable categoriesWithTime={categoriesWithTime} />
        </>
    )
}

export default RegionSection