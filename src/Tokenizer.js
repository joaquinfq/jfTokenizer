// Registramos el token base por defecto.
require('./token/Base');
/**
 * Factoría de tokens.
 *
 * @type {object}
 */
const factory = require('jf-factory').i('tokens');
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
        let _token = this.first;

        return {
            next()
            {
                let _current = _token;
                if (_token)
                {
                    _token = _token.next;
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
        for (const _token of this)
        {
            _token.dump(10);
        }
    }

    /**
     * Agrupa los nodos según la propiedad especificada.
     *
     * @param {string} property Nombre de la propiedad a usar para agrupar los nodos.
     *
     * @return {object} Nodos agrupados.
     */
    groupBy(property = 'value')
    {
        const _groups = {};
        for (const _node of this)
        {
            const _name = _node[property];
            if (_name in _groups)
            {
                _groups[_name].push(_node);
            }
            else
            {
                _groups[_name] = [_node];
            }
        }

        return _groups;
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
        let _lastToken;
        for (const _char of text)
        {
            const _token = factory.create(_char, { value : _char }) ||
                           factory.create('',    { value : _char });
            if (_lastToken)
            {
                if (!_lastToken.merge(_token))
                {
                    _token.after(_lastToken);
                    _lastToken = _token;
                }
            }
            else
            {
                this.first = _lastToken = _token;
            }
        }
        this.last = _lastToken;

        return this.first;
    }

    /**
     * @override
     */
    toString()
    {
        const _chars = [];
        for (const _token of this)
        {
            _chars.push(_token);
        }

        return _chars.join('');
    }
};
