import React from 'react';
import * as d3 from 'd3';
import useD3 from '../hooks/useD3'

const BarChart = ({ data }) => {
    const ref = useD3(
        (svg) => {

            const height = 500;
            const width = 500;
            const margin = 50;


            const x = d3
                .scaleBand()
                .domain(data.map((d) => d.Country))
                .rangeRound([margin, width - margin])
                .padding(0.5);

            const y = d3
                .scaleLinear()
                .domain([0, d3.max(data, d => {
                    console.log(d)
                    return d["Time (minutes)"]
                })])
                .rangeRound([height - margin, margin]);

            const xAxis = (g) =>
                g.attr("transform", `translate(0,${height - margin})`).call(
                    d3
                        .axisBottom(x)
                        .tickValues(
                            d3
                                .ticks(...d3.extent(x.domain()), width / 40)
                                .filter((v) => x(v) !== undefined)
                        )
                        .tickSizeOuter(0)
                );

            const yAxis = (g) => g
                .attr("transform", `translate(${margin},0)`)
                .style("color", "steelblue")
                .call(d3.axisLeft(y).ticks(null, "s"))
                .call((g) => g.select(".domain").remove())
                .call((g) => g
                    .append("text")
                    .attr("x", -margin)
                    .attr("y", 10)
                    .attr("fill", "currentColor")
                    .attr("text-anchor", "start")
                    .text(data.y)
                );

            svg.select(".x-axis").call(xAxis);
            svg.select(".y-axis").call(yAxis);

            svg
                .select(".plot-area")
                .attr("fill", "steelblue")
                .selectAll(".bar")
                .data(data)
                .join("rect")
                .attr("class", "bar")
                .attr("x", (d) => x(d.Country))
                .attr("width", x.bandwidth())
                .attr("y", (d) => y(d["Time (minutes)"]))
                .attr("height", (d) => y(0) - y(d["Time (minutes)"]));
        },
        [data.length]
    )

    return (
        <svg
            ref={ref}
            style={{
                height: 500,
                width: "100%",
            }}
        >
            <g className="plot-area" />
            <g className="x-axis" />
            <g className="y-axis" />
        </svg>
    );
}

export default BarChart;