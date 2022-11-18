import { getVariable } from "../../utils/BlocklyUtils";


const Blockly = require("blockly");

export function initControl(){


    Blockly.Arduino.controls_for = function() {

        // For loop.
        var variable0 = getVariable(this, this.getFieldValue('VAR')).name;
        var argument0 = Blockly.Arduino.valueToCode(this, 'FROM',
            Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
        var argument1 = Blockly.Arduino.valueToCode(this, 'TO',
            Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
        var branch = Blockly.Arduino.statementToCode(this, 'DO');
        if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
        branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g,
            '\'' + this.id + '\'') + branch;
        }
        var code;
        if (argument0.match(/^-?\d+(\.\d+)?$/) &&
            argument1.match(/^-?\d+(\.\d+)?$/)) {
        // Both arguments are simple numbers.
        var up = parseFloat(argument0) <= parseFloat(argument1);
        code = 'for (' + variable0 + ' = ' + argument0 + '; ' +
            variable0 + (up ? ' <= ' : ' >= ') + argument1 + '; ' +
            variable0 + (up ? '++' : '--') + ') {\n' +
            branch + '}\n';
        } else {
        code = '';
        // Cache non-trivial values to variables to prevent repeated look-ups.
        var startVar = argument0;
        if (!argument0.match(/^\w+$/) && !argument0.match(/^-?\d+(\.\d+)?$/)) {
            var startVar = Blockly.Arduino.nameDB_.getDistinctName(
                variable0 + '_start', Blockly.Variables.NAME_TYPE);
            code += 'int ' + startVar + ' = ' + argument0 + ';\n';
        }
        var endVar = argument1;
        if (!argument1.match(/^\w+$/) && !argument1.match(/^-?\d+(\.\d+)?$/)) {
            var endVar = Blockly.Arduino.nameDB_.getDistinctName(
                variable0 + '_end', Blockly.Variables.NAME_TYPE);
            code += 'int ' + endVar + ' = ' + argument1 + ';\n';
        }
        code += 'for (' + variable0 + ' = ' + startVar + ';\n' +
            '    (' + startVar + ' <= ' + endVar + ') ? ' +
            variable0 + ' <= ' + endVar + ' : ' +
            variable0 + ' >= ' + endVar + ';\n' +
            '    ' + variable0 + ' += (' + startVar + ' <= ' + endVar +
                ') ? 1 : -1) {\n' +
            branch + '}\n';
        }
        return code;
    };
    
    Blockly.Arduino.controls_whileUntil = function() {
        // Do while/until loop.
        var until = this.getFieldValue('MODE') == 'UNTIL';
        var argument0 = Blockly.Arduino.valueToCode(this, 'BOOL',
            until ? Blockly.Arduino.ORDER_LOGICAL_NOT :
            Blockly.Arduino.ORDER_NONE) || 'false';
        var branch = Blockly.Arduino.statementToCode(this, 'DO');
        if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
        branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g,
            '\'' + this.id + '\'') + branch;
        }
        if (until) {
        argument0 = '!' + argument0;
        }
        return 'while (' + argument0 + ') {\n' + branch + '}\n';
    }

}