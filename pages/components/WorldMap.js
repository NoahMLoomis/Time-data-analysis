import {
    ComposableMap,
    Geographies,
    Geography,
    Sphere,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { Watch } from "react-loader-spinner";
import { get } from "mongoose";

const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = scaleLinear()
    .domain([0, 100])
    .range(["#ffedea", "#ff5233"]);

const WorldMap = ({ data }) => {

    /**
     * If you think this looks wrong, you're right.
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
                            // As the DB is UK, but the stuff in the geo.properties.otherStuff doesn't match it.... i'm overriding the ISO_A3. But sketchy but it's fine
                            if (geo.properties.NAME === "United Kingdom") {
                                geo.properties.ISO_A3 = "UK"
                            }
                            const d = data.find((d) => d._id.toLowerCase() === geo.properties.NAME.toLowerCase() || d._id.toLowerCase() === geo.properties.ISO_A3.toLowerCase());
                            return <Geography key={geo.rsmKey} geography={geo} fill={d ? colorScale(d.time) : "#F5F4F6"} stroke="black" strokeWidth={0.5} />
                        })
                    }
                </Geographies>
            )}
        </ComposableMap>
    )
}

export default WorldMap