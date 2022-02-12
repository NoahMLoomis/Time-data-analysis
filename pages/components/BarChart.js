import React from 'react';
import * as d3 from 'd3';
import useD3 from '../hooks/useD3'

const BarChart = ({ data }) => {
    const ref = useD3(
        (svg) => {
            const height = 500;
            const width = 800;
            const margin = {top: 20, right: 10, bottom: 20, left: 10};

            const x = d3
                .scaleLinear()
                .domain([0, d3.max(data, d => d["Time (minutes)"])])
                .rangeRound([margin.left, width])

            const y = d3
                .scaleBand()
                .domain(data.map((d) => d.Country))
                .rangeRound([height - margin.bottom, margin.top])
                .padding(0.2);

            const xAxis = (g) =>
                g.attr("transform", `translate(0,${height - margin.bottom})`)
                    .call(d3.axisBottom(x).ticks(null, "s").tickSizeOuter(0))


            const yAxis = (g) => g
                .attr("transform", `translate(${margin.left},0)`)
                .style("color", "steelblue")
                .call(d3.axisRight(y).ticks(d => d.Country))
                .call((g) => g.select(".domain").remove())
                .call((g) => g
                    .append("text")
                    .attr("x", -margin.left)
                    .attr("y", 20)
                    .attr("fill", "currentColor")
                    .attr("text-anchor", "start")
                );

            svg.select(".x-axis")
                .call(xAxis)
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", ".7em")
                .attr("dy", ".5em")



            svg.select(".y-axis").call(yAxis)
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", ".7em")
                .attr("dy", ".5em")
            svg
                .select(".plot-area")
                .attr("fill", "steelblue")
                .selectAll(".bar")
                .data(data)
                .join("rect")
                .attr("class", "bar")
                .attr("x", (d) => x(d["Time (minutes)"]))
                .attr("height", y.bandwidth())
                .attr("y", (d) => y(d.Country))
                .attr("width", (d) => x(d["Time (minutes)"]))
        },
        [data.length]
    )

    return (
        <svg
            className='barChart'
            ref={ref}
            style={{
                height: 500,
                width: "100%",
                marginRight: "0px",
                marginLeft: "0px",
            }}
        >
            <g className="plot-area" />
            <g className="x-axis" />
            <g className="y-axis" />
        </svg>
    );
}

export default BarChart;