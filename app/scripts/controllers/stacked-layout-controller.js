'use strict';

/**
 * @ngdoc function
 * @name theatreStatisticsApp.controller:StackedLayoutControllerCtrl
 * @description
 * # StackedLayoutControllerCtrl
 * Controller of the theatreStatisticsApp
 */
angular.module('theatreStatisticsApp')
  .controller('StackedLayoutControllerCtrl', function ($scope, $window) {
    var selectedDataset = 1;

    var color = d3.scale.ordinal()
      .range(["white", "#E0E0E0", "#CCEBFF"]);

    var margin = {top: 60, right: 20, bottom: 30, left: 40};
    var width = parseInt(d3.select('#chartArea').style('width'), 10);
    width = width - margin.left - margin.right;
    var height = 300 - margin.top - margin.bottom;

    var svg = d3.select("#chartArea").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var firstDataset = [
      {"season": "Gener", "Sala Cafe Teatre": 4000, "Sala del Mig": 5000, "Sala Xavier Fabregas": 7000},
      {"season": "Febrer", "Sala Cafe Teatre": 3000, "Sala del Mig": 3500, "Sala Xavier Fabregas": 5000},
      {"season": "Març", "Sala Cafe Teatre": 2900, "Sala del Mig": 3200, "Sala Xavier Fabregas": 5900},
      {"season": "Abril", "Sala Cafe Teatre": 3200, "Sala del Mig": 3500, "Sala Xavier Fabregas": 7000},
      {"season": "Maig", "Sala Cafe Teatre": 3000, "Sala del Mig": 4000, "Sala Xavier Fabregas": 6100},
      {"season": "Juny", "Sala Cafe Teatre": 3500, "Sala del Mig": 4800, "Sala Xavier Fabregas": 6500},
      {"season": "Juliol", "Sala Cafe Teatre": 2000, "Sala del Mig": 3000, "Sala Xavier Fabregas": 5000},
      {"season": "Agost", "Sala Cafe Teatre": 2800, "Sala del Mig": 3400, "Sala Xavier Fabregas": 5300},
      {"season": "Sept.", "Sala Cafe Teatre": 2000, "Sala del Mig": 3000, "Sala Xavier Fabregas": 5500},
      {"season": "Octubre", "Sala Cafe Teatre": 3000, "Sala del Mig": 4500, "Sala Xavier Fabregas": 6700},
      {"season": "Novem.", "Sala Cafe Teatre": 4200, "Sala del Mig": 5200, "Sala Xavier Fabregas": 6500},
      {"season": "Decem.", "Sala Cafe Teatre": 3500, "Sala del Mig": 4350, "Sala Xavier Fabregas": 6700}];

    var secondDataset = [
      {"season": "Gener", "Sala Cafe Teatre": 2000, "Sala del Mig": 3000, "Sala Xavier Fabregas": 5000},
      {"season": "Febrer", "Sala Cafe Teatre": 1000, "Sala del Mig": 1500, "Sala Xavier Fabregas": 3000},
      {"season": "Març", "Sala Cafe Teatre": 900, "Sala del Mig": 1200, "Sala Xavier Fabregas": 3900},
      {"season": "Abril", "Sala Cafe Teatre": 1200, "Sala del Mig": 1500, "Sala Xavier Fabregas": 5000},
      {"season": "Maig", "Sala Cafe Teatre": 1000, "Sala del Mig": 2000, "Sala Xavier Fabregas": 4100},
      {"season": "Juny", "Sala Cafe Teatre": 1500, "Sala del Mig": 2800, "Sala Xavier Fabregas": 4500},
      {"season": "Juliol", "Sala Cafe Teatre": 0, "Sala del Mig": 1000, "Sala Xavier Fabregas": 3000},
      {"season": "Agost", "Sala Cafe Teatre": 800, "Sala del Mig": 1400, "Sala Xavier Fabregas": 3300},
      {"season": "Sept.", "Sala Cafe Teatre": 0, "Sala del Mig": 1000, "Sala Xavier Fabregas": 3500},
      {"season": "Octubre", "Sala Cafe Teatre": 1000, "Sala del Mig": 2500, "Sala Xavier Fabregas": 4700},
      {"season": "Novem.", "Sala Cafe Teatre": 2200, "Sala del Mig": 3200, "Sala Xavier Fabregas": 4500},
      {"season": "Decem.", "Sala Cafe Teatre": 1500, "Sala del Mig": 2350, "Sala Xavier Fabregas": 4700}];

    var dataset = firstDataset;

    var seasonNames = dataset.map(function (d) {
      return d.season;
    });

    var salesNames = d3.keys(dataset[0])
      .filter(function (key) {
        return key !== "season";
      });

    dataset.forEach(function (d) {
      d.totalPerSala = salesNames.map(function (name) {
        return {
          "salaName": name,
          "totalCount": d[name]
        };
      });
      d.totalSales = d3.sum(d.totalPerSala, function (d) {
        return d.totalCount;
      });
    });

    color.domain(salesNames);

    var x = d3.scale.ordinal()
      .domain(seasonNames)
      .rangeBands([0, width], 0.1);

    var y = d3.scale.linear()
      .domain([0, d3.max(dataset, function (d) {
        return d.totalSales;
      })])
      .range([height, 0]);

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");
    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .tickFormat(d3.format(".2s"));

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

    var layers = salesNames.map(function (salaName) {
      return dataset.map(function (d) {
        return {
          "x": x(d.season),
          "y": d[salaName],
          "salaName": salaName
        };
      });
    });

    var stack = d3.layout.stack();
    stack(layers);

    var svgLayer = svg.selectAll(".layer")
      .data(layers)
      .enter()
      .append("g")
      .attr("class", "layer");

    var rect = svgLayer.selectAll("rect")
      .data(function (d) {
        return d;
      })
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return d.x;
      })
      .attr("y", function (d) {
        return y(d.y + d.y0);
      })
      .attr("width", x.rangeBand())
      .attr("height", function (d, i) {
        return height - y(d.y);
      })
      .style("fill", function (d, i) {
        return color(d.salaName);
      });

    var legend = d3.select("svg")
      .selectAll(".legend")
      .data(color.domain().slice().reverse())
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", function (d, i) {
        return "translate(0," + i * 20 + ")";
      });

    legend.append("rect")
      .attr("x", width + margin.left - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

    legend.append("text")
      .attr("x", width + margin.left - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function (d) {
        return d;
      });


    $scope.update = function () {
      console.log("Resizing");
      //var svg = d3.select("#chartArea").append("svg")
      //  .attr("width", width + margin.left + margin.right)
      //  .attr("height", height + margin.top + margin.bottom)
      //  .append("g")
      //  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      if (selectedDataset === 1){
        dataset = secondDataset;
        selectedDataset = 2;
      } else {
        dataset = firstDataset;
        selectedDataset = 1;
      }

      dataset.forEach(function (d) {
        d.totalPerSala = salesNames.map(function (name) {
          return {
            "salaName": name,
            "totalCount": d[name]
          };
        });
        d.totalSales = d3.sum(d.totalPerSala, function (d) {
          return d.totalCount;
        });
      });

      //color.domain(salesNames);

      //var x = d3.scale.ordinal()
      //  .domain(seasonNames)
      //  .rangeBands([0, width], 0.1);

      y = d3.scale.linear()
        .domain([0, d3.max(dataset, function (d) {
          return d.totalSales;
        })])
        .range([height, 0]);

      yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(d3.format(".2s"));

      //svg.append("g")
      //  .attr("class", "x axis")
      //  .attr("transform", "translate(0," + height + ")")
      //  .call(xAxis);

      //var newY = svg.select('.y.axis')
      //svg.selectAll('.y').selectAll('.axis')
      //svg.append("g")
      //  .attr("class", "y axis")
      //  .call(yAxis);

      var layers = salesNames.map(function (salaName) {
        return dataset.map(function (d) {
          return {
            "x": x(d.season),
            "y": d[salaName],
            "salaName": salaName
          };
        });
      });

      stack = d3.layout.stack();
      stack(layers);

      svgLayer = svg.selectAll(".layer")
        .data(layers)
        .transition()
        .attr("class", "layer");

      rect = svgLayer.selectAll("rect")
        .data(function (d) {
          return d;
        })
        .transition()
        //.enter()
        //.append("rect")
        .attr("x", function (d) {
          return d.x;
        })
        .attr("y", function (d) {
          return y(d.y + d.y0);
        })
        .attr("width", x.rangeBand())
        .attr("height", function (d, i) {
          return height - y(d.y);
        });
        //.style("fill", function (d, i) {
        //  return color(d.salaName);
        //});

    };

  });
