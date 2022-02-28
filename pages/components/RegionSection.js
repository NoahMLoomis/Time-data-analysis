import { useMemo, useEffect, useState } from "react"
import { DropdownButton, Dropdown } from 'react-bootstrap'
import { Table } from "react-bootstrap"

import styles from '../../styles/Home.module.css'

const RegionSection = () => {
    const [selectedRegion, setSelectedRegion] = useState("Europe")
    const [regions, setRegions] = useState([])
    const [categoriesWithTime, setCategoriesWithTime] = useState([])

    useEffect(() => {
        fetch("/api/data/regions").then(d => d.json())
            .then(d => {
                setRegions([...new Set(d.map(item => item._id['region']))])
                setCategoriesWithTime([...new Set(d.map(item => {
                    return {category: item._id['category'], averageTime: item.averageTime}
                }))])
                console.log(categoriesWithTime)
            })
            .catch(e => console.log(e))
    }, [])

    return (
        <>
            <h1 className={styles.categoryTitle}>Avg time spent per region</h1>
            <DropdownButton title={selectedRegion}>
                {regions.map(reg => (
                    <Dropdown.Item key={reg} onClick={() => setSelectedRegion(reg)}>{reg}</Dropdown.Item>
                ))}
            </DropdownButton>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Average time</th>
                    </tr>
                </thead>
                <tbody>

                    <tr>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}

export default RegionSection