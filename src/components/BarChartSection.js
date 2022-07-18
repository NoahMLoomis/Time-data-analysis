import { useState, useEffect } from 'react'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import BarChart from './BarChart'

import styles from '../../styles/Home.module.css'

const BarChartSection = ({ allCategories }) => {
    const [data, setData] = useState([])
    const [category, setCategory] = useState("Paid work")

    useEffect(() => {
        fetch(`/api/data/countries?category=${category}`).then(d => d.json())
            .then(d => setData(d))
    }, [category])

    return (
        <>
            <h1 className={styles.categoryTitle}>Time spent per country</h1>
            <DropdownButton title={`${category} (Minutes)`}>
                {allCategories.map(cat => (
                    <Dropdown.Item key={cat} onClick={() => setCategory(cat)}>{cat}</Dropdown.Item>
                ))}
            </DropdownButton>
            <BarChart data={data} />
        </>
    )
}

export default BarChartSection