const factory = require('jf-factory').i('tokens');
const jfNode  = require('jf-node');
/**
 * Clase base para los tokens.
 *
 * @namespace jf.tokenizer.token
 * @class     jf.tokenizer.token.Base
 */
class Base extends jfNode
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
     * @param {string}  value    Valor del token.
     * @param {string}  data     Datos relacionados con el valor del token.
     * @param {jf.Node} previous Nodo anterior al actual.
     * @param {jf.Node} next     Nodo siguiente al actual.
     */
    constructor(value, data = '', previous = null, next = null)
    {
        super(data, previous, next);
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
     * @param {string} sep    Separador de las columnas.
     */
    dump(length = 10, sep = ' | ')
    {
        const _columns = [
            (this.type + ' '.repeat(length)).substr(0, length),
            JSON.stringify(this.value)
        ];
        if (this.data)
        {
            _columns.push(JSON.stringify(this.data));
        }
        console.log(_columns.join(sep));
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
     * Registra el token en la factoría.
     *
     * AVISO: El orden en el que se registran los tokens puede afectar al resultado.
     */
    static register()
    {
        const _chars = this.CHARS;
        if (_chars)
        {
            _chars.split('').forEach(
                char => factory.register(char, this)
            );
        }
        else
        {
            // Clase a usar por defecto cuando no se encuentre una clase para
            // el carácter especificado.
            factory.register('', this);
        }
    }

    /**
     * @override
     */
    toString()
    {
        return this.value;
    }
}
//------------------------------------------------------------------------------
Base.register();
module.exports = Base;
