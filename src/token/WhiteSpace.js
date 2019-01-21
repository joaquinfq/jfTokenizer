const Base = require('./Base');
/**
 * Tokens que representan espacios en blanco.
 *
 * @namespace jf.tokenizer.token
 * @class     jf.tokenizer.token.WhiteSpace
 * @extends   jf.tokenizer.token.Base
 */
class WhiteSpace extends Base
{
    /**
     * @override
     */
    static get CHARS()
    {
        return ' \t';
    }
}
//------------------------------------------------------------------------------
WhiteSpace.register();
module.exports = WhiteSpace;
