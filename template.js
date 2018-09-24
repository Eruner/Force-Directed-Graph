var enabledEntry = true;
(function(d){

	function run(){
		d.getElementById("enable-parameters").addEventListener("click", showParameters);
		d.getElementById("hide-parameters").addEventListener("click", hideParameters);
		d.getElementById("enable-entry").addEventListener("click", showEntry);
		d.getElementById("hide-entry").addEventListener("click", hideEntry);
		d.getElementById("manual-entry").addEventListener("click", toggleEntry);
		d.getElementById("generate-report").addEventListener("click", generate);
	}

	function showParameters(){
		show("full-parameters-1");
		show("full-parameters-2");
		hide("none-parameters");
	}

	function hideParameters(){
		show("none-parameters");
		hide("full-parameters-1");
		hide("full-parameters-2");
	}

	function showEntry(){
		show("full-entry-1");
		show("full-entry-2");
		show("full-entry-3");
		hide("none-entry");
	}

	function hideEntry(){
		show("none-entry");
		hide("full-entry-1");
		hide("full-entry-2");
		hide("full-entry-3");
	}

	function toggleEntry(){
		enabledEntry = !enabledEntry;
		if(enabledEntry){
			enableBoxes();
		}else{
			disableBoxes();
		}
	}

	function disableBoxes(){
		d.getElementById("nodes").disabled = true;
		d.getElementById("links").disabled = true;
		d.getElementById("manual-entry").innerHTML = 'Enable manual entry';
	}

	function enableBoxes(){
		d.getElementById("nodes").disabled = false;
		d.getElementById("links").disabled = false;
		d.getElementById("manual-entry").innerHTML = 'Disable manual entry';
	}

	function show(id){
		var element = d.getElementById(id);
		if(element && element.removeAttribute){
			element.removeAttribute('hidden');
		}else{
			console.error('Cannot show (non-existing) HTML element with Id:'+id);
		}
	}

	function hide(id){
		var element = d.getElementById(id);
		if(element && element.setAttribute){
			element.setAttribute('hidden',true);
		}else{
			console.error('Cannot hide (non-existing) HTML element with Id:'+id);
		}
	}

	run();

})(document);