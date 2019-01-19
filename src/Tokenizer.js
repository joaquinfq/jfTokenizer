const jfNode               = require('jf-node');
const jfTokenizerTokenBase = require('./token/Base');
/**
 * Listado de clases de tokens registradas.
 *
 * @type {object}
 */
const tokens               = {
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
         * Primer token encontrado.
         *
         * @property first
         * @type     {jf.Node|null}
         */
        this.first = null;
        /**
         * Último token encontrado.
         *
         * @property last
         * @type     {jf.Node|null}
         */
        this.last = null;
    }

    /**
     * Iterador que permite usar un bucle `for..of` para iterar sobre los tokens.
     *
     * @return {Object} Configuración a usar por el iterador.
     */
    [Symbol.iterator]()
    {
        let _node = this.first;

        return {
            next()
            {
                let _current = _node;
                if (_node)
                {
                    _node = _node.next;
                }

                return {
                    done  : !_current,
                    value : _current
                };
            }
        };
    }

    /**
     * Realiza un volcado por pantalla de los tokens encontrados.
     */
    dump()
    {
        for (const _node of this)
        {
            _node.data.dump(10);
        }
    }

    /**
     * Analiza un texto y lo convierte en tokens.
     *
     * @param {string} text Texto a analizar.
     *
     * @return {jf.Node} Primer token encontrados.
     */
    parse(text)
    {
        let _lastNode;
        for (const _char of text)
        {
            const _token = new tokens[_char in tokens ? _char : ''](_char);
            if (_lastNode)
            {
                if (!_lastNode.data.merge(_token))
                {
                    const _node = new jfNode(_token);
                    _node.after(_lastNode);
                    _lastNode = _node;
                }
            }
            else
            {
                this.first = _lastNode = new jfNode(_token);
            }
        }
        this.last = _lastNode;

        return this.first;
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
        const _chars = [];
        for (const _node of this)
        {
            _chars.push(_node.data);
        }

        return _chars.join('');
    }
};
