import {
    ComposableMap,
    Geographies,
    Geography,
    Sphere,
} from "react-simple-maps";

import { scaleLinear } from "d3-scale";

const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = scaleLinear()
    .domain([0.29, 0.68])
    .range(["#ffedea", "#ff5233"]);

const WorldMap = ({ data }) => {
    return (
        <ComposableMap
            projectionConfig={{
                rotate: [-10, 0, 0],
                scale: 147
            }}
        >
            <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
            {data.length > 0 && (
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map((geo) => {
                            const d = data.find((d) => d._id.toLowerCase() === geo.properties.NAME.toLowerCase());
                            return <Geography key={geo.rsmKey} geography={geo} fill={d ? colorScale(d.time) : "#F5F4F6"}  stroke="black" strokeWidth={0.5} />
                        })
                    }
                </Geographies>
            )}
        </ComposableMap>
    )
}

export default WorldMap