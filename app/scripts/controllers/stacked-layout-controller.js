'use strict';

/**
 * @ngdoc function
 * @name theatreStatisticsApp.controller:StackedLayoutControllerCtrl
 * @description
 * # StackedLayoutControllerCtrl
 * Controller of the theatreStatisticsApp
 */
angular.module('theatreStatisticsApp')
  .controller('StackedLayoutControllerCtrl', function ($scope) {

    var axisText = "Vendes 2014";

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 700 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
      .rangeRound([height, 0]);

    var color = d3.scale.ordinal()
      .range(["#6b486b", "#a05d56", "#d0743c"]);

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .tickFormat(d3.format(".2s"));

    var svg = d3.select("#chartArea").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var headers = {state: ["Sala Cafe Teatre","Sala del Mig","Sala Xavier Fabregas"]};
    var dataset = [
      ["Gener", 4000,5000,7000],
      ["Febrer",3000,3500,5000],
      ["Març",2900,3200,5900],
      ["Abril",3200,3500,7000],
      ["Maig",3000,4000,6100],
      ["Juny",3500,4800,6500],
      ["Juliol",2000,3000,5000],
      ["Agost",2800,3400,5300],
      ["Sept.",2000,3000,5500],
      ["Octubre",3000,4500,6700],
      ["Novem.",4200,5200,6500],
      ["Decem.",3500,4350,6700]];

    d3.csv("/data/data-2014.csv", function (error, data) {

      color.domain(d3.keys(data[0]).filter(function (key) {
        return key !== "State";
      }));

      data.forEach(function (d) {
        var y0 = 0;
        d.ages = color.domain().map(function (name) {
          return {name: name, y0: y0, y1: y0 += +d[name]};
        });
        d.total = d.ages[d.ages.length - 1].y1;
      });

      //data.sort(function(a, b) { return b.total - a.total; });

      x.domain(data.map(function (d) {
        return d.State;
      }));
      y.domain([0, d3.max(data, function (d) {
        return d.total;
      })]);

      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

      var state = svg.selectAll(".state")
        .data(data)
        .enter().append("g")
        .attr("class", "g")
        .attr("transform", function (d) {
          return "translate(" + x(d.State) + ",0)";
        });

      state.selectAll("rect")
        .data(function (d) {
          return d.ages;
        })
        .enter().append("rect")
        .attr("width", x.rangeBand())
        .attr("y", function (d) {
          return y(d.y1);
        })
        .attr("height", function (d) {
          return y(d.y0) - y(d.y1);
        })
        .style("fill", function (d) {
          return color(d.name);
        });

      svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text(axisText);

      var legend = svg.selectAll(".legend")
        .data(color.domain().slice().reverse())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) {
          return "translate(0," + i * 20 + ")";
        });

      legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

      legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function (d) {
          return d;
        });

    });

    $scope.update = function () {
      console.log("hola soy edu");
    };

  });
