import {
    ComposableMap,
    Geographies,
    Geography,
    Sphere,
} from "react-simple-maps";
import * as d3 from 'd3';
import { Watch } from "react-loader-spinner";

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const WorldMap = ({ data }) => {

    const colorScale = d3.scaleLinear()
        .domain([(d3.min(data.map(d => d.time))/d3.max(data.map(d => d.time))), 1])
        .range(["#ffedea", "#ff5233"]);

    /**
     * If you think this first return statement looks wrong, you're right.
     * The browser doesn't seem to like rendering the map at the proper size if you just return the <Watch /> component.
     * So in order to get the right sizing, I found you need to put an empty <ComposableMap />
     * to make sure when the map actually renders
     * the map is shown in the correct size
     *  */
    if (data.length <= 0) {
        return <>
            <Watch color="#0070f3" />
            <ComposableMap
                projectionConfig={{
                    rotate: [-10, 0, 0],
                    scale: 147
                }} />
        </>
    }
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
                            const d = data.find((d) => d._id.toLowerCase() === geo.properties.name.toLowerCase());
                            return <Geography key={geo.rsmKey} geography={geo} fill={d ? colorScale(d.time / 100) : "#F5F4F6"} stroke="black" strokeWidth={0.5} />
                        })
                    }
                </Geographies>
            )}
        </ComposableMap>
    )
}

export default WorldMap