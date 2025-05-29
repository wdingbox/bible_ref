function update(source) {
	var duration = d3.event && d3.event.altKey ? 5000 : 500;

	// Compute the new tree layout.
	nodes = tree.nodes(root).reverse();

	// Normalize for fixed-depth of chart (80px per node vertically)
	nodes.forEach(function(d) { d.y = d.depth * 80; });

	// Update the nodes...
	var node = vis.selectAll("g.node")
		.data(nodes, function(d) { return d.id || (d.id = ++i); });

	// Enter any new nodes at the parent's previous position.
	var nodeEnter = node.enter().append("svg:g")
		.attr("class", "node")
		.attr("transform", function(d) { return "translate(" + source.x0 + "," + source.y0 + ")"; })
		.on("click", function(d) { toggle(d); update(d); center(d);});

	nodeEnter.append("svg:circle")
		.attr("r", 1e-6)
		.attr("class", function (d) { return d._children ? d.class + "-collapsed" : d.class + "-expanded"; })
		.on("mouseover", function(d) { showToolTip(d); })
        .on("mouseout", hideToolTip);

	nodeEnter.append("svg:text")
		.attr("x", -10)
		.attr("dy", ".35em")
		.attr("text-anchor", "end")
		.attr("class", function (d) { return d.class; })
		.text(function(d) { return d.name; })
		.style("fill-opacity", 1e-6)
		.attr("transform", function (d) {if (d.name!="Yeshua the Messiah") {return "rotate(20)";}});

	// Transition nodes to their new position.
	var nodeUpdate = node.transition()
		.duration(duration)
		.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

	nodeUpdate.select("circle")
		.attr("r", 5)
		.attr("class", function (d) { return d._children ? d.class + "-collapsed" : d.class + "-expanded"; });
		
	nodeUpdate.select("text")
		.style("fill-opacity", 1);

	// Transition exiting nodes to the parent's new position.
	var nodeExit = node.exit().transition()
		.duration(duration)
		.attr("transform", function(d) { return "translate(" + source.x + "," + source.y + ")"; })
		.remove();

	nodeExit.select("circle")
		.attr("r", 1e-6);

	nodeExit.select("text")
		.style("fill-opacity", 1e-6);

	var link = vis.selectAll("path.link")
		.data(tree.links(nodes), function(d) { return d.target.id; });

	// Enter any new links at the parent's previous position.
	link.enter().insert("svg:path", "g")
		.attr("class", function(d) { return formatLink(d);})
		.attr("d", function(d) {
			var o = {x: source.x0, y: source.y0};
			return diagonal({source: o, target: o});
		})
		.transition()
		.duration(duration)
		.attr("d", diagonal);

	// Transition links to their new position.
	link.transition()
		.duration(duration)
		.attr("d", diagonal);

	// Transition exiting nodes to the parent's new position.
	link.exit().transition()
		.duration(duration)
		.attr("d", function(d) {
			var o = {x: source.x, y: source.y};
			return diagonal({source: o, target: o});
		})
		.remove();

	// Stash the old positions for transition.
	nodes.forEach(function(d) {
		d.x0 = d.x;
		d.y0 = d.y;
	});
}

// Toggle children.
function toggle(d) {
	if (d){
		if (d.children) {
			d._children = d.children;
			d.children = null;
		} else {
			d.children = d._children;
			d._children = null;
		}
		
		moveTarget = d;
	}
}

function center(d) {
	if (d){
		$.scrollTo({top:'-=0px', left:(d.x0-($(window).width()/2)+margin.left)},500, {easing:'swing'});
	}
	else
	{
		$.scrollTo({top:root.y0, left:(root.x0-($(window).width()/2)+margin.left)},1400, {easing:'easeOutElastic'});
	}
}

function showToolTip (d){
	tooltipDiv.transition()
		.duration(200)
		.style("opacity", .9);
	
	var htmlContent = "<div id='tooltipTitle'>" + d.name + "</div>";
	
	// add some details
	if (d.birth){ htmlContent += "<p><strong>Lived:</strong> " + d.birth;
		if (d.death){ 
			if (d.death < 100) { htmlContent += "BCE- " + d.death + "CE";} 
			else { htmlContent += "-" + d.death + " BCE"; };

			if (d.age){ htmlContent += " (" + d.age + " years)";
			}
		}
		htmlContent += "</p>";
	}
	
	if (d.spouse){ htmlContent += "<p><strong>" + spouse_label + "</strong>: " + d.spouse + "<br>&nbsp;</p>";}
	
	htmlContent += "<p>" + d.detail + "</p>";
	
	tooltipDiv .html(htmlContent)
		.style("left", (d3.event.pageX + 20) + "px")
		.style("top", (d3.event.pageY - 28) + "px")
		.style("z-index", 1000);
		
	Logos.ReferenceTagging.tag();
}
	
function hideToolTip(){
	// fade out
	tooltipDiv.transition()
		.duration(300)
		.style("opacity", 0)
		.style("z-index", -500);
}

function formatLink(d) {
	var returnVal = "link";
	
	if (d.target.class != ""){
		classArray = d.target.class.split(" ");
		
		if (classArray.length > -1) {
			if (classArray.indexOf("messianicLine") > -1) {
				returnVal += " messianicLine";
			}
			else if (classArray.indexOf("presumed") > -1) {
				returnVal += " presumed";
			}
		}
	}
		
	return returnVal;
}

function expandAllNodes(){
	const aspect = width / height;
//	console.log("Variable before width:" + width + ", height:" + height + ".");
//	console.log("Body before width:" + $("body").width() + ", height:" + $("body").height() + ".");
//	console.log("Main before width:" + $("#main").width() + ", height:" + $("#main").height() + ".");
//	console.log("vis before width:" + vis.attr('width') + ", height:" + vis.attr('height') + ".");
//	console.log("svg before width:" + $("svg").attr('width') + ", height:" + $("svg").attr('height') + ".");
//	console.log("Tree before width:" + tree.size() + ", height:" + tree.size() + ".");

	width = 10000 - margin.right - margin.left;
	height = Math.round(width / aspect);
	tree.size([height, width]);
	vis.attr('width', width*1.1);
	vis.attr('height', height*1.1);
	vis.attr('viewBox', `0 0 ${width*1.1} ${height}`);
	$("body").width(width * 1.1);
				
	nodes.forEach(function(d) {
		if (d){
			if (d._children) {
				d.children = d._children;
				d._children = null;

				update(d);
			}
		}
	});

	var tempsvg = $('#main').find('svg')[0];
	tempsvg.setAttribute('width', width * 1.1);
	
	// close the expandInProgress dialog and open the expandComplete dialog window
    $("#expandInProgress").dialog("close");
	
	if ($("#expandComplete").dialog("isOpen")){$("#expandComplete").dialog("close");}
    $("#expandComplete").dialog("open");
	
//	console.log("Variable after width:" + width + ", height:" + height + ".");
//	console.log("Body after width:" + $('body').width() + ", height:" + $('body').height() + ".");
//	console.log("Main after width:" + $("#main").width() + ", height:" + $("#main").height() + ".");
//	console.log("vis after width:" + vis.attr('width') + ", height:" + vis.attr('height') + ".");
//	console.log("svg after width:" + $("svg").attr('width') + ", height:" + $("svg").attr('height') + ".");
//	console.log("Tree after width:" + tree.size() + ", height:" + tree.size() + ".");
	center();
}
