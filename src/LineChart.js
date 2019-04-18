import React, { Component } from 'react'
import './App.css'
import { scaleLinear, scaleTime, select, line, extent, axisBottom, axisLeft } from 'd3'

class BarChart extends Component {
   
   componentDidMount() {
      this.createLineChart()
   }
   componentDidUpdate() {
      this.createLineChart()
   }

   createLineChart = () => {
    const data = this.props.data
    const node = this.node

    var svgWidth = this.props.size[0];
    var svgHeight = this.props.size[1];
    var margin = { top: 20, right: 20, bottom: 30, left: 50 };
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;
    
    var svg = select(node)
        .attr("width", svgWidth)
        .attr("height", svgHeight);
        
    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var x = scaleTime()
        .rangeRound([0, width]);
    
    var y = scaleLinear()
        .rangeRound([height, 0]);
    
    var pathLine = line()
        .x(function(d) { return x(d.date)})
        .y(function(d) { return y(d.open)})
        x.domain(extent(data, function(d) { return d.date }));
        y.domain(extent(data, function(d) { return d.open }));
    
    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(axisBottom(x))
        .select(".domain")
        .remove();
    
    g.append("g")
        .call(axisLeft(y))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Price ($)");
    
    g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", pathLine);
    }
    
render() {
      return <svg 
                ref={node => this.node = node}
                width={this.props.size[0]}
                height={this.props.size[1]}>
            </svg>
   }
}
export default BarChart