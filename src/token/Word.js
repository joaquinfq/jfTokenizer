const Base = require('./Base');
/**
 * Caracteres que pueden formar una palabra.
 *
 * @namespace jf.tokenizer.token
 * @class     jf.tokenizer.token.Word
 * @extends   jf.tokenizer.token.Base
 */
class Word extends Base
{
    /**
     * @override
     */
    static get CHARS()
    {
        return 'abcdefghijklmnopqrstuvwxyzáéíóúäëïöüàèìòùâêîôûABCDEFGHIJKLMNOPQRSTUVWXYZÁÉÍÓÚÄËÏÖÜÀÈÌÒÙÂÊÎÔÛ';
    }
}
//------------------------------------------------------------------------------
Word.register();
module.exports = Word;
