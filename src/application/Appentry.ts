import { initBlockly } from "./blockly-arduino/ArduinoGenerator";
import { initLogic } from "./blockly-arduino/blocks/Logic";


const Blockly = require("blockly");

/**
 * Gets called once the general environment for the app got setup. Eg. the electron browser-window or the inbrowser setup got done.
 */
export default async function onAppInitalize(){
	
	// Workspace and codespace
	var wsDiv = document.querySelector("#workspace") as HTMLDivElement;
	var csTextArea = document.querySelector("#codespace") as HTMLTextAreaElement;
	var toolbox = document.getElementById('toolbox');

	initBlockly();

	// Creates the workspace
	var workspace = Blockly.inject(wsDiv, {
		toolbox : toolbox,
		collapse : false, 
		comments : false, 
		disable : false,
		maxBlocks : Infinity,
		media: './resources/blockly/',
		horizontalLayout : false, 
		toolboxPosition : 'start', 
		css : true,
		rtl : false, 
		scrollbars : true, 
		sounds : true, 
		oneBasedIndex : true,
		grid : {
			spacing : 20, 
			length : 1, 
			colour : '#888', 
			snap : false
		}, 
		zoom : {
			controls : true, 
			wheel : true, 
			startScale : 1, 
			maxScale : 3, 
			minScale : 0.3, 
			scaleSpeed : 1.2
		}
	});
	Blockly.svgResize(workspace);

	// Awaits a resize event and updates blockly accordingly
  	new ResizeObserver(_=>Blockly.svgResize(workspace)).observe(wsDiv);



	function updateCode(event: any) {
		const code = Blockly.Arduino.workspaceToCode(workspace);
		csTextArea.value = code;
	}
	workspace.addChangeListener(updateCode);
	  

	console.log(Blockly);
	console.log(workspace);

	(window as any).ws = workspace;
	(window as any).B = Blockly;
	

	
}

// Adds the app start as the onload function
(window as any).onload = onAppInitalize;