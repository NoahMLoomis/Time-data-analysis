import {
    ComposableMap,
    Geographies,
    Geography,
    Sphere,
    Graticule
} from "react-simple-maps";

const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const WorldMap = () => {
    return (
        <ComposableMap>
            <Geographies geography={geoUrl}>
                {({ geographies }) =>
                    geographies.map(geo => {
                        console.log(geo)
                        return <Geography key={geo.rsmKey} geography={geo} />
                    })
                }
            </Geographies>
        </ComposableMap>
    )
}

export default WorldMap