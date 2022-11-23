import { getVariable } from "../../utils/BlocklyUtils";


const Blockly = require("blockly");

export function initTestBlock(){


    Blockly.Arduino.hello_world = function() {
        var code = Blockly.Arduino.quote_(this.getFieldValue('TEXT'));
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };


}