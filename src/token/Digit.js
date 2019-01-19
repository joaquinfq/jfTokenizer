const Base = require('./Base');
/**
 * Caracteres que pueden formar una cantidad numérica.
 *
 * @namespace jf.tokenizer.token
 * @class     jf.tokenizer.token.Digit
 * @extends   jf.tokenizer.token.Base
 */
module.exports = class Digit extends Base
{
    /**
     * @override
     */
    static get CHARS()
    {
        return '0123456789';
    }
};
