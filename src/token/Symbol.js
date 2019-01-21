const Base = require('./Base');
/**
 * Caracteres que representan símbolos, principalmente signos de puntuación.
 *
 * @namespace jf.tokenizer.token
 * @class     jf.tokenizer.token.Symbol
 * @extends   jf.tokenizer.token.Base
 */
class Symbol extends Base
{
    /**
     * @override
     */
    static get CHARS()
    {
        return '{}[]<>(),.;:_^"\'\\·$%&/=¿?¡!|@#~/*-+`€';
    }
}
//------------------------------------------------------------------------------
Symbol.register();
module.exports = Symbol;
