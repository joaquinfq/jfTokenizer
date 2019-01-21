const Base = require('./Base');
/**
 * Tokens que representan retornos de carro.
 *
 * @namespace jf.tokenizer.token
 * @class     jf.tokenizer.token.NewLine
 * @extends   jf.tokenizer.token.Base
 */
class NewLine extends Base
{
    /**
     * @override
     */
    static get CHARS()
    {
        return '\r\n';
    }
}
//------------------------------------------------------------------------------
NewLine.register();
module.exports = NewLine;
