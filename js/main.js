var margin = { top: 30, right: 0, bottom: 50, left: 30 },
    width = 960 - margin.left - margin.right,
    height = 290 - margin.top - margin.bottom,
    grid = Math.floor(width / 24),
    legendWith = grid * 1.5,
    colors = ["#fceabb", "#e3e2b0", "#c8d9a9", "#aed1a5", "#93c7a4", "#7abda5", "#61b2a7", "#4aa7a8", "#379aa9", "#2b8da8", "#2c80a5", "#36729e"],
    colorsAmount = 12,
    timeOfDay = ["1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "00:00"],
    dayOfWeek = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];



// ** 3D Printing ** \\

var svg_3d = d3.select("#chart_3d").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var tool_tip = d3.tip()
    .attr("class", "d3-tip")
    .offset([-6, 0])
    .html(function(d) { return d.value; });
//    .html(function(d) { return "Answers: " + d.value; });

svg_3d.call(tool_tip);

var yAxis = svg_3d.selectAll(".dayOfWeek")
    .data(dayOfWeek)
    .enter().append("text")
    .text(function (d) {
        return d;
    })
    .attr("x", 0)
    .attr("y", (d, i) => i * grid / 1.3 - 6)
    .style("text-anchor", "end")
    .attr("transform", "translate(-10," + grid / 1.5 + ")")
    .attr("class", (d, i) => ((i >= 0 && i <= 4) ? "dayOfWeek axis" : "dayOfWeek axis"));

var xAxis = svg_3d.selectAll(".timeOfDay")
    .data(timeOfDay)
    .enter().append("text")
    .text((d) => d)
    .attr("x", (d, i) => i * grid)
    .attr("y", 0)
    .style("text-anchor", "middle")
    .attr("transform", "translate(" + grid / 2 + ", -10)")
    .attr("class", (d, i) => ((i >= 7 && i <= 16) ? "timeOfDay axis" : "timeOfDay axis"));

var type = (d) => {
    return {
        day: +d.day,
        hour: +d.hour,
        value: +d.value
    };
};

d3.tsv("js/data/data_3d.tsv", type, (error, data) => {
    var colorScale = d3.scaleQuantile()
        .domain([0, colorsAmount - 1, d3.max(data, (d) => d.value)])
        .range(colors);

    var rect = svg_3d.selectAll(".hour")
        .data(data, (d) => d.day + ':' + d.hour);

    rect.append("title");

    rect.enter().append("rect")
        .attr("x", (d) => (d.hour - 1) * grid)
        .attr("y", (d) => (d.day - 1) * grid / 1.3)
        .attr("rx", 1)
        .attr("ry", 1)
        .attr("class", "hour border")
        .attr("width", grid)
        .attr("height", grid / 1.3)
        .style("fill", colors[0])
        .style("fill", (d) => colorScale(d.value))
        .on('mouseover', tool_tip.show)
        .on('mouseout', tool_tip.hide);


    var legend = svg_3d.selectAll(".legend")
        .data([0].concat(colorScale.quantiles()), (d) => d);

    var legend_g = legend.enter().append("g")
        .attr("class", "legend");

    legend_g.append("rect")
        .attr("x", (d, i) => legendWith * i / 3)
        .attr("y", height)
        .attr("width", legendWith / 3)
        .attr("height", grid / 2)
        .style("fill", (d, i) => colors[i]);

    legend_g.append("text")
        .attr("class", "legendText")
        .text((d) => Math.round(d))
        .attr("x", (d, i) => legendWith * i / 3 + 5)
        .attr("y", height + grid - 5);
});










// ** Fitness ** \\

var svg_fit = d3.select("#chart_fit").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var tool_tip = d3.tip()
    .attr("class", "d3-tip")
    .offset([-6, 0])
    .html(function(d) { return d.value; });
//    .html(function(d) { return "Answers: " + d.value; });

svg_fit.call(tool_tip);

var yAxis = svg_fit.selectAll(".dayOfWeek")
    .data(dayOfWeek)
    .enter().append("text")
    .text(function (d) {
        return d;
    })
    .attr("x", 0)
    .attr("y", (d, i) => i * grid / 1.3 - 6)
    .style("text-anchor", "end")
    .attr("transform", "translate(-10," + grid / 1.5 + ")")
    .attr("class", (d, i) => ((i >= 0 && i <= 4) ? "dayOfWeek axis" : "dayOfWeek axis"));

var xAxis = svg_fit.selectAll(".timeOfDay")
    .data(timeOfDay)
    .enter().append("text")
    .text((d) => d)
    .attr("x", (d, i) => i * grid)
    .attr("y", 0)
    .style("text-anchor", "middle")
    .attr("transform", "translate(" + grid / 2 + ", -10)")
    .attr("class", (d, i) => ((i >= 7 && i <= 16) ? "timeOfDay axis" : "timeOfDay axis"));

var type = (d) => {
    return {
        day: +d.day,
        hour: +d.hour,
        value: +d.value
    };
};

d3.tsv("js/data/data_fit.tsv", type, (error, data) => {
    var colorScale = d3.scaleQuantile()
        .domain([0, colorsAmount - 1, d3.max(data, (d) => d.value)])
        .range(colors);

    var rect = svg_fit.selectAll(".hour")
        .data(data, (d) => d.day + ':' + d.hour);

    rect.append("title");

    rect.enter().append("rect")
        .attr("x", (d) => (d.hour - 1) * grid)
        .attr("y", (d) => (d.day - 1) * grid / 1.3)
        .attr("rx", 1)
        .attr("ry", 1)
        .attr("class", "hour border")
        .attr("width", grid)
        .attr("height", grid / 1.3)
        .style("fill", colors[0])
        .style("fill", (d) => colorScale(d.value))
        .on('mouseover', tool_tip.show)
        .on('mouseout', tool_tip.hide);


    var legend = svg_fit.selectAll(".legend")
        .data([0].concat(colorScale.quantiles()), (d) => d);

    var legend_g = legend.enter().append("g")
        .attr("class", "legend");

    legend_g.append("rect")
        .attr("x", (d, i) => legendWith * i / 3)
        .attr("y", height)
        .attr("width", legendWith / 3)
        .attr("height", grid / 2)
        .style("fill", (d, i) => colors[i]);

    legend_g.append("text")
        .attr("class", "legendText")
        .text((d) => Math.round(d))
        .attr("x", (d, i) => legendWith * i / 3 + 5)
        .attr("y", height + grid);
});










// ** Gardening ** \\

var svg_gardening = d3.select("#chart_gardening").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var tool_tip = d3.tip()
    .attr("class", "d3-tip")
    .offset([-6, 0])
    .html(function(d) { return d.value; });
//    .html(function(d) { return "Answers: " + d.value; });

svg_gardening.call(tool_tip);

var yAxis = svg_gardening.selectAll(".dayOfWeek")
    .data(dayOfWeek)
    .enter().append("text")
    .text(function (d) {
        return d;
    })
    .attr("x", 0)
    .attr("y", (d, i) => i * grid / 1.3 - 6)
    .style("text-anchor", "end")
    .attr("transform", "translate(-10," + grid / 1.5 + ")")
    .attr("class", (d, i) => ((i >= 0 && i <= 4) ? "dayOfWeek axis" : "dayOfWeek axis"));

var xAxis = svg_gardening.selectAll(".timeOfDay")
    .data(timeOfDay)
    .enter().append("text")
    .text((d) => d)
    .attr("x", (d, i) => i * grid)
    .attr("y", 0)
    .style("text-anchor", "middle")
    .attr("transform", "translate(" + grid / 2 + ", -10)")
    .attr("class", (d, i) => ((i >= 7 && i <= 16) ? "timeOfDay axis" : "timeOfDay axis"));

var type = (d) => {
    return {
        day: +d.day,
        hour: +d.hour,
        value: +d.value
    };
};

d3.tsv("js/data/data_gardening.tsv", type, (error, data) => {
    var colorScale = d3.scaleQuantile()
        .domain([0, colorsAmount - 1, d3.max(data, (d) => d.value)])
        .range(colors);

    var rect = svg_gardening.selectAll(".hour")
        .data(data, (d) => d.day + ':' + d.hour);

    rect.append("title");

    rect.enter().append("rect")
        .attr("x", (d) => (d.hour - 1) * grid)
        .attr("y", (d) => (d.day - 1) * grid / 1.3)
        .attr("rx", 1)
        .attr("ry", 1)
        .attr("class", "hour border")
        .attr("width", grid)
        .attr("height", grid / 1.3)
        .style("fill", colors[0])
        .style("fill", (d) => colorScale(d.value))
        .on('mouseover', tool_tip.show)
        .on('mouseout', tool_tip.hide);


    var legend = svg_gardening.selectAll(".legend")
        .data([0].concat(colorScale.quantiles()), (d) => d);

    var legend_g = legend.enter().append("g")
        .attr("class", "legend");

    legend_g.append("rect")
        .attr("x", (d, i) => legendWith * i / 3)
        .attr("y", height)
        .attr("width", legendWith / 3)
        .attr("height", grid / 2)
        .style("fill", (d, i) => colors[i]);

    legend_g.append("text")
        .attr("class", "legendText")
        .text((d) => Math.round(d))
        .attr("x", (d, i) => legendWith * i / 3 + 5)
        .attr("y", height + grid - 5);
});










// ** History ** \\

var svg_history = d3.select("#chart_history").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var tool_tip = d3.tip()
    .attr("class", "d3-tip")
    .offset([-6, 0])
    .html(function(d) { return d.value; });
//    .html(function(d) { return "Answers: " + d.value; });

svg_history.call(tool_tip);

var yAxis = svg_history.selectAll(".dayOfWeek")
    .data(dayOfWeek)
    .enter().append("text")
    .text(function (d) {
        return d;
    })
    .attr("x", 0)
    .attr("y", (d, i) => i * grid / 1.3 - 6)
    .style("text-anchor", "end")
    .attr("transform", "translate(-10," + grid / 1.5 + ")")
    .attr("class", (d, i) => ((i >= 0 && i <= 4) ? "dayOfWeek axis" : "dayOfWeek axis"));

var xAxis = svg_history.selectAll(".timeOfDay")
    .data(timeOfDay)
    .enter().append("text")
    .text((d) => d)
    .attr("x", (d, i) => i * grid)
    .attr("y", 0)
    .style("text-anchor", "middle")
    .attr("transform", "translate(" + grid / 2 + ", -10)")
    .attr("class", (d, i) => ((i >= 7 && i <= 16) ? "timeOfDay axis" : "timeOfDay axis"));

var type = (d) => {
    return {
        day: +d.day,
        hour: +d.hour,
        value: +d.value
    };
};

d3.tsv("js/data/data_history.tsv", type, (error, data) => {
    var colorScale = d3.scaleQuantile()
        .domain([0, colorsAmount - 1, d3.max(data, (d) => d.value)])
        .range(colors);

    var rect = svg_history.selectAll(".hour")
        .data(data, (d) => d.day + ':' + d.hour);

    rect.append("title");

    rect.enter().append("rect")
        .attr("x", (d) => (d.hour - 1) * grid)
        .attr("y", (d) => (d.day - 1) * grid / 1.3)
        .attr("rx", 1)
        .attr("ry", 1)
        .attr("class", "hour border")
        .attr("width", grid)
        .attr("height", grid / 1.3)
        .style("fill", colors[0])
        .style("fill", (d) => colorScale(d.value))
        .on('mouseover', tool_tip.show)
        .on('mouseout', tool_tip.hide);


    var legend = svg_history.selectAll(".legend")
        .data([0].concat(colorScale.quantiles()), (d) => d);

    var legend_g = legend.enter().append("g")
        .attr("class", "legend");

    legend_g.append("rect")
        .attr("x", (d, i) => legendWith * i / 3)
        .attr("y", height)
        .attr("width", legendWith / 3)
        .attr("height", grid / 2)
        .style("fill", (d, i) => colors[i]);

    legend_g.append("text")
        .attr("class", "legendText")
        .text((d) => Math.round(d))
        .attr("x", (d, i) => legendWith * i / 3 + 5)
        .attr("y", height + grid - 5);
});










// ** Linguistics ** \\

var svg_linguistics = d3.select("#chart_linguistics").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var tool_tip = d3.tip()
    .attr("class", "d3-tip")
    .offset([-6, 0])
    .html(function(d) { return d.value; });
//    .html(function(d) { return "Answers: " + d.value; });

svg_linguistics.call(tool_tip);

var yAxis = svg_linguistics.selectAll(".dayOfWeek")
    .data(dayOfWeek)
    .enter().append("text")
    .text(function (d) {
        return d;
    })
    .attr("x", 0)
    .attr("y", (d, i) => i * grid / 1.3 - 6)
    .style("text-anchor", "end")
    .attr("transform", "translate(-10," + grid / 1.5 + ")")
    .attr("class", (d, i) => ((i >= 0 && i <= 4) ? "dayOfWeek axis" : "dayOfWeek axis"));

var xAxis = svg_linguistics.selectAll(".timeOfDay")
    .data(timeOfDay)
    .enter().append("text")
    .text((d) => d)
    .attr("x", (d, i) => i * grid)
    .attr("y", 0)
    .style("text-anchor", "middle")
    .attr("transform", "translate(" + grid / 2 + ", -10)")
    .attr("class", (d, i) => ((i >= 7 && i <= 16) ? "timeOfDay axis" : "timeOfDay axis"));

var type = (d) => {
    return {
        day: +d.day,
        hour: +d.hour,
        value: +d.value
    };
};

d3.tsv("js/data/data_linguistics.tsv", type, (error, data) => {
    var colorScale = d3.scaleQuantile()
        .domain([0, colorsAmount - 1, d3.max(data, (d) => d.value)])
        .range(colors);

    var rect = svg_linguistics.selectAll(".hour")
        .data(data, (d) => d.day + ':' + d.hour);

    rect.append("title");

    rect.enter().append("rect")
        .attr("x", (d) => (d.hour - 1) * grid)
        .attr("y", (d) => (d.day - 1) * grid / 1.3)
        .attr("rx", 1)
        .attr("ry", 1)
        .attr("class", "hour border")
        .attr("width", grid)
        .attr("height", grid / 1.3)
        .style("fill", colors[0])
        .style("fill", (d) => colorScale(d.value))
        .on('mouseover', tool_tip.show)
        .on('mouseout', tool_tip.hide);


    var legend = svg_linguistics.selectAll(".legend")
        .data([0].concat(colorScale.quantiles()), (d) => d);

    var legend_g = legend.enter().append("g")
        .attr("class", "legend");

    legend_g.append("rect")
        .attr("x", (d, i) => legendWith * i / 3)
        .attr("y", height)
        .attr("width", legendWith / 3)
        .attr("height", grid / 2)
        .style("fill", (d, i) => colors[i]);

    legend_g.append("text")
        .attr("class", "legendText")
        .text((d) => Math.round(d))
        .attr("x", (d, i) => legendWith * i / 3 + 5)
        .attr("y", height + grid - 5);
});









// ** Reverse Engineering ** \\

var svg_reverseengineering = d3.select("#chart_reverseengineering").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var tool_tip = d3.tip()
    .attr("class", "d3-tip")
    .offset([-6, 0])
    .html(function(d) { return d.value; });
//    .html(function(d) { return "Answers: " + d.value; });

svg_reverseengineering.call(tool_tip);

var yAxis = svg_reverseengineering.selectAll(".dayOfWeek")
    .data(dayOfWeek)
    .enter().append("text")
    .text(function (d) {
        return d;
    })
    .attr("x", 0)
    .attr("y", (d, i) => i * grid / 1.3 - 6)
    .style("text-anchor", "end")
    .attr("transform", "translate(-10," + grid / 1.5 + ")")
    .attr("class", (d, i) => ((i >= 0 && i <= 4) ? "dayOfWeek axis" : "dayOfWeek axis"));

var xAxis = svg_reverseengineering.selectAll(".timeOfDay")
    .data(timeOfDay)
    .enter().append("text")
    .text((d) => d)
    .attr("x", (d, i) => i * grid)
    .attr("y", 0)
    .style("text-anchor", "middle")
    .attr("transform", "translate(" + grid / 2 + ", -10)")
    .attr("class", (d, i) => ((i >= 7 && i <= 16) ? "timeOfDay axis" : "timeOfDay axis"));

var type = (d) => {
    return {
        day: +d.day,
        hour: +d.hour,
        value: +d.value
    };
};

d3.tsv("js/data/data_reverseengineering.tsv", type, (error, data) => {
    var colorScale = d3.scaleQuantile()
        .domain([0, colorsAmount - 1, d3.max(data, (d) => d.value)])
        .range(colors);

    var rect = svg_reverseengineering.selectAll(".hour")
        .data(data, (d) => d.day + ':' + d.hour);

    rect.append("title");

    rect.enter().append("rect")
        .attr("x", (d) => (d.hour - 1) * grid)
        .attr("y", (d) => (d.day - 1) * grid / 1.3)
        .attr("rx", 1)
        .attr("ry", 1)
        .attr("class", "hour border")
        .attr("width", grid)
        .attr("height", grid / 1.3)
        .style("fill", colors[0])
        .style("fill", (d) => colorScale(d.value))
        .on('mouseover', tool_tip.show)
        .on('mouseout', tool_tip.hide);


    var legend = svg_reverseengineering.selectAll(".legend")
        .data([0].concat(colorScale.quantiles()), (d) => d);

    var legend_g = legend.enter().append("g")
        .attr("class", "legend");

    legend_g.append("rect")
        .attr("x", (d, i) => legendWith * i / 3)
        .attr("y", height)
        .attr("width", legendWith / 3)
        .attr("height", grid / 2)
        .style("fill", (d, i) => colors[i]);

    legend_g.append("text")
        .attr("class", "legendText")
        .text((d) => Math.round(d))
        .attr("x", (d, i) => legendWith * i / 3 + 5)
        .attr("y", height + grid - 5);
});









// ** Woodworking ** \\

var svg_woodworking = d3.select("#chart_woodworking").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var tool_tip = d3.tip()
    .attr("class", "d3-tip")
    .offset([-6, 0])
    .html(function(d) { return d.value; });
//    .html(function(d) { return "Answers: " + d.value; });

svg_woodworking.call(tool_tip);

var yAxis = svg_woodworking.selectAll(".dayOfWeek")
    .data(dayOfWeek)
    .enter().append("text")
    .text(function (d) {
        return d;
    })
    .attr("x", 0)
    .attr("y", (d, i) => i * grid / 1.3 - 6)
    .style("text-anchor", "end")
    .attr("transform", "translate(-10," + grid / 1.5 + ")")
    .attr("class", (d, i) => ((i >= 0 && i <= 4) ? "dayOfWeek axis" : "dayOfWeek axis"));

var xAxis = svg_woodworking.selectAll(".timeOfDay")
    .data(timeOfDay)
    .enter().append("text")
    .text((d) => d)
    .attr("x", (d, i) => i * grid)
    .attr("y", 0)
    .style("text-anchor", "middle")
    .attr("transform", "translate(" + grid / 2 + ", -10)")
    .attr("class", (d, i) => ((i >= 7 && i <= 16) ? "timeOfDay axis" : "timeOfDay axis"));

var type = (d) => {
    return {
        day: +d.day,
        hour: +d.hour,
        value: +d.value
    };
};

d3.tsv("js/data/data_woodworking.tsv", type, (error, data) => {
    var colorScale = d3.scaleQuantile()
        .domain([0, colorsAmount - 1, d3.max(data, (d) => d.value)])
        .range(colors);

    var rect = svg_woodworking.selectAll(".hour")
        .data(data, (d) => d.day + ':' + d.hour);

    rect.append("title");

    rect.enter().append("rect")
        .attr("x", (d) => (d.hour - 1) * grid)
        .attr("y", (d) => (d.day - 1) * grid / 1.3)
        .attr("rx", 1)
        .attr("ry", 1)
        .attr("class", "hour border")
        .attr("width", grid)
        .attr("height", grid / 1.3)
        .style("fill", colors[0])
        .style("fill", (d) => colorScale(d.value))
        .on('mouseover', tool_tip.show)
        .on('mouseout', tool_tip.hide);


    var legend = svg_woodworking.selectAll(".legend")
        .data([0].concat(colorScale.quantiles()), (d) => d);

    var legend_g = legend.enter().append("g")
        .attr("class", "legend");

    legend_g.append("rect")
        .attr("x", (d, i) => legendWith * i / 3)
        .attr("y", height)
        .attr("width", legendWith / 3)
        .attr("height", grid / 2)
        .style("fill", (d, i) => colors[i]);

    legend_g.append("text")
        .attr("class", "legendText")
        .text((d) => Math.round(d))
        .attr("x", (d, i) => legendWith * i / 3 + 5)
        .attr("y", height + grid - 5);
});