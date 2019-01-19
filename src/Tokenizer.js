const jfTokenizerList      = require('./List');
const jfTokenizerTokenBase = require('./token/Base');
/**
 * Listado de clases de tokens registradas.
 *
 * @type {object}
 */
const tokens = {
    '' : jfTokenizerTokenBase
};
/**
 * Convierte un texto en tokens.
 *
 * @namespace jf.tokenizer
 * @class     jf.tokenizer.Tokenizer
 */
module.exports = class Tokenizer
{
    /**
     * Constructor de la clase.
     */
    constructor()
    {
        /**
         * Listado de tokens encontrados.
         *
         * @property tokens
         * @type     {jf.tokenizer.List}
         */
        this.tokens = new jfTokenizerList();
    }

    /**
     * Analiza un texto y lo convierte en tokens.
     *
     * @param {string} text Texto a analizar.
     *
     * @return {jf.tokenizer.List} Listado de tokens encontrados.
     */
    parse(text)
    {
        let _lastToken;
        const _tokens = this.tokens;
        _tokens.clear();
        for (const _char of text)
        {
            const _token = new tokens[_char in tokens ? _char : ''](_char);
            if (!_lastToken || !_lastToken.merge(_token))
            {
                _tokens.push(_token);
                _lastToken = _token;
            }
        }

        return _tokens;
    }

    /**
     * Registra una clase de token.
     *
     * AVISO: El orden en el que se registran los tokens puede afectar al resultado.
     *
     * @param {jf.tokenizer.token.Base} Token Referencia de la clase a registrar.
     */
    static register(Token)
    {
        if (jfTokenizerTokenBase.isPrototypeOf(Token))
        {
            const _chars = Token.CHARS;
            if (_chars)
            {
                _chars.split('').forEach(
                    char => tokens[char] = Token
                );
            }
            else
            {
                // Clase a usar por defecto cuando no se encuentre una clase para
                // el carácter especificado.
                tokens[''] = Token;
            }
        }
        else
        {
            throw new Error('Se deben registrar clases que extiendan de jf.tokenizer.token.Base');
        }
    }

    /**
     * @override
     */
    toString()
    {
        return this.tokens.map(token => token.value).join('');
    }
};
