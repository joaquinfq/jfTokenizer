const Base = require('./Base');
/**
 * Caracteres que pueden formar una cantidad numérica.
 *
 * @namespace jf.tokenizer.token
 * @class     jf.tokenizer.token.Digit
 * @extends   jf.tokenizer.token.Base
 */
class Digit extends Base
{
    /**
     * @override
     */
    static get CHARS()
    {
        return '0123456789';
    }
}
//------------------------------------------------------------------------------
Digit.register();
module.exports = Digit;
