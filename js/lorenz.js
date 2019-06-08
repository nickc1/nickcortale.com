var margin = {top: 1, right: 1, bottom: 1, left: 1},
    width = 150 - margin.left - margin.right,
    height = 150 - margin.top - margin.bottom;

var rho = 28.0,
    sigma = 10.0,
    beta = 8.0 / 3.0,
    x = 0,
    y = z = 5,
    t = 0.007,
    iter = 0,
    max_iter = 5000,
    data = [];

var svg = d3.select("#d3div").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("class", "g-lorentz")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var colorScale = d3.scaleLinear()
    .domain([0, 40])
    .range([0, 1]);

var circle = svg.append("circle")
    .attr("class", "circle");

var line = d3.line()
    .curve(d3.curveCardinal)
    .x(function(d) { return d[0]; })
    .y(function(d) { return d[1]; });

var track = svg.append("path")
    .attr("class", "track");

// set the gradient
svg.append("linearGradient")
  .attr("id", "line-gradient")
  .attr("x1", "10%").attr("x1", "90%")
  .attr("y1", "10%").attr("y2", "90%")
.selectAll("stop")
  .data([
    {offset: "0%", color: "#b2182b"},
    {offset: "100%", color: "#2166ac"}
  ])
.enter().append("stop")
  .attr("offset", function(d) { return d.offset; })
  .attr("stop-color", function(d) { return d.color; });

function lorentz(callback) {
  callback(
    x += t * (sigma * (y - x)),
    y += t * (x * (rho - z) - y),
    z += t * (x * y - beta * z)
  );
}

function draw(x, y, z) {
  data.push([(width / 2 + 2.5 * x), (height + 2.5 * -z)]);
  track.attr("d", line(data)).attr("stroke", "url(#line-gradient)");
  circle.attr("transform", function(d) { return "translate(" + data[data.length - 1] + ")"; });
}

var interval = setInterval(function() {
  iter++;
  if (iter >= max_iter)
    clearInterval(interval);
  lorentz(draw);
}, 10);