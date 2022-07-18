import { Table } from "react-bootstrap"

import styles from '../../styles/Home.module.css'

const RegionTable = ({ categoriesWithTime }) => {
    return (
        <Table striped bordered hover borderless className={styles.table}>
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Avg time (minutes)</th>
                </tr>
            </thead>
            <tbody>
                {categoriesWithTime.map(obj => obj.category !== undefined &&
                    <tr>
                        <td>{obj.category}</td>
                        <td>{Math.round(obj.averageTime)}</td>
                    </tr>)}
            </tbody>
        </Table>);
}

export default RegionTable