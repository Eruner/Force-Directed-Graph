var graph = graph || {nodes: [], links: []};
function connectedNodes() {
    if (toggle == 0) {
        //Reduce the opacity of all but the neighbouring nodes
        d = d3.select(this).node().__data__;
        node.style("opacity", function (o) {
            return neighboring(d, o) | neighboring(o, d) ? 1 : 0.1;
        });
        link.style("opacity", function (o) {
            return d.index==o.source.index | d.index==o.target.index ? 1 : 0.1;
        });
        //Reduce the op
        toggle = 1;
    } else {
        //Put them back to opacity=1
        node.style("opacity", 1);
        link.style("opacity", 1);
        toggle = 0;
    }
}
function printNode(node){
    console.log(node.name);
}
function generate(){
    var width = +document.getElementById('width').value,
        height = +document.getElementById('height').value,
        forcePower = +document.getElementById('force').value,
        distance = +document.getElementById('distance').value,
        radius = +document.getElementById('radius').value,
        color = d3.scale.category20();
    var force = d3.layout.force()
        .charge(-forcePower)
        .linkDistance(distance)
        .size([width, height]);

    //Append a SVG to the body of the html page. Assign this SVG as an object to svg
    document.getElementById('svg').innerHTML = '';
    var svg = d3.select("#svg").append("svg")
        .attr("width", width)
        .attr("height", height);

    if(enabledEntry){
        graph.nodes = document.getElementById('nodes').value;
        graph.nodes = JSON.parse(graph.nodes);
        graph.links = document.getElementById('links').value;
        graph.links = JSON.parse(graph.links);
    }

    //Creates the graph data structure out of the json data
    force.nodes(graph.nodes)
        .links(graph.links)
        .start();

    //Create all the line svgs but without locations yet
    var link = svg.selectAll(".link")
        .data(graph.links)
        .enter().append("line")
        .attr("class", "link")
        .style("stroke-width", 1);

    var node = svg.selectAll(".node")
        .data(graph.nodes)
        .enter().append("g")
        .attr("class", "node")
        .call(force.drag)
        .on('click', printNode)
        .on('dblclick', connectedNodes);
    node.append("circle")
        .attr("r", radius)
        .style("fill", function (d) {
        return color(d.group);
    });

    force.on("tick", function () {
        link.attr("x1", function (d) {
            return d.source.x;
        })
            .attr("y1", function (d) {
            return d.source.y;
        })
            .attr("x2", function (d) {
            return d.target.x;
        })
            .attr("y2", function (d) {
            return d.target.y;
        });
        d3.selectAll("circle")
            .attr("cx", function (d) {
            return d.x;
        })
            .attr("cy", function (d) {
            return d.y;
        });
        d3.selectAll("text").attr("x", function (d) {
            return d.x;
        })
            .attr("y", function (d) {
            return d.y;
        });
    });

    //Toggle stores whether the highlighting is on
    var toggle = 0;
    //Create an array logging what is connected to what
    var linkedByIndex = {};
    for (i = 0; i < graph.nodes.length; i++) {
        linkedByIndex[i + "," + i] = 1;
    };
    graph.links.forEach(function (d) {
        linkedByIndex[d.source.index + "," + d.target.index] = 1;
    });
    //This function looks up whether a pair are neighbours
    function neighboring(a, b) {
        return linkedByIndex[a.index + "," + b.index];
    }
}