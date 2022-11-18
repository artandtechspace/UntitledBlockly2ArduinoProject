
const Blockly = require("blockly");

export function getVariable(block: any, id: string){
    var vars = Blockly.Variables.allUsedVarModels(block.workspace);

    var filtered = vars.filter((x: any)=>x.id_ === id)

    return filtered[0];

}