

const Blockly = require("blockly");

export function initText(){
    Blockly.Arduino.text = function() {
        // Text value.
        var code = Blockly.Arduino.quote_(this.getFieldValue('TEXT'));
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };      
}