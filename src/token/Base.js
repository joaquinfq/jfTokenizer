/**
 * Clase base para los tokens.
 *
 * @namespace jf.tokenizer.token
 * @class     jf.tokenizer.token.Base
 */
module.exports = class Base
{
    /**
     * Constante que define los tipos de caracteres que forman parte del token.
     *
     * @return {string} Valor de la constante.
     */
    static get CHARS()
    {
        return '';
    }

    /**
     * Constructor de la clase.
     *
     * @param {string} value       Valor del token.
     * @param {string} description Descripción relacionada con el valor del token.
     */
    constructor(value, description = '')
    {
        /**
         * Descripción relacionada con el valor del token.
         *
         * @property description
         * @type     {string}
         */
        this.description = description;
        /**
         * Tipo de token.
         * Por defecto, el nombre de la clase.
         *
         * @property type
         * @type     {string}
         */
        this.type = this.constructor.name;
        /**
         * El valor del token.
         *
         * @property value
         * @type     {string}
         */
        this.value = value;
    }

    /**
     * Vuelca por pantalla el contenido del token.
     *
     * @param {number} length Longitud del nombre del token.
     */
    dump(length = 10)
    {
        console.log(
            '%s | %s | %s',
            (this.type + ' '.repeat(length)).substr(0, length),
            JSON.stringify(this.value),
            JSON.stringify(this.description)
        );
    }

    /**
     * Fusiona el contenido de un token con otro. Es responsabilidad del token decidir si se puede fusionar.
     *
     * @param {jf.tokenizer.token.Base} token Token a fusionar con el actual.
     *
     * @return {boolean} `true` si se han fusionado los dos tokens o `false` en cualquier otro caso.
     */
    merge(token)
    {
        const _ok = token.type === this.type;
        if (_ok)
        {
            this.value += token.value;
            token.value = '';
        }

        return _ok;
    }

    /**
     * @override
     */
    toString()
    {
        return this.value;
    }
};
