import React from 'react';
import * as d3 from 'd3';
import useD3 from '../hooks/useD3'

const BarChart = ({ data }) => {
    const ref = useD3(
        (svg) => {
            const height = 500;
            const width = 500;
            const margin = { top: 20, right: 10, bottom: 20, left: 100 };

            const x = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.time)])
                .range([margin.left, width - margin.right])
                .interpolate(d3.interpolateRound)

            const y = d3.scaleBand()
                .domain(data.map(d => d._id))
                .rangeRound([margin.top, height - margin.bottom])
                .padding(0.4)

            const xAxis = g =>
                g.attr("transform", `translate(0,${height - margin.bottom})`)
                    .call(
                        d3.axisBottom(x)
                            .ticks(10)
                            .tickSizeOuter(0)
                    )

            const yAxis = g => {
                g.attr("transform", `translate(${margin.left},0)`)
                    .style("color", "steelblue")
                    .call(d3.axisLeft(y))
                    .call((g) => g.select(".domain").remove())
            }


            d3.axisBottom()
                .scale(x)

            d3.axisLeft(y)
                .scale(y)

            svg.select('.x-axis')
                .call(xAxis)

            svg.select('.y-axis')
                .call(yAxis)
            svg
                .select(".plot-area")
                .attr("fill", "steelblue")
                .selectAll(".bar")
                .data(data)
                .join("rect")
                .attr("y", d => y(d._id))
                .attr("x", d => x(0))
                .transition()
                .duration(1000)
                .attr("class", "bar")
                .attr("x", d => x(0))
                .attr("y", d => y(d._id))
                .attr("height", y.bandwidth())
                .attr("width", d => x(d.time) - x(0))

        })

    return (
        <svg
            className='barChart'
            ref={ref}
            style={{
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