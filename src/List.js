/**
 * Representa un listado de tokens.
 *
 * Permite iterar de manera rápida y sencilla sobre los tokens encontrados
 * al analizar un texto.
 *
 * @namespace jf.tokenizer
 * @class     jf.tokenizer.List
 * @extends   Array
 */
module.exports = class List extends Array
{
    /**
     * @override
     */
    constructor()
    {
        super();
        /**
         * Índice del elemento actual.
         *
         * @property index
         * @type     {number}
         */
        this.index = -1;
    }

    /**
     * Elimina todos los elementos de la lista.
     */
    clear()
    {
        this.reset();
        this.length = 0;
    }

    /**
     * Devuelve el elemento actual.
     *
     * @return {*} Elemento actual.
     */
    current()
    {
        return this[this.index];
    }

    /**
     * Devuelve el elemento actual y avanza el puntero.
     *
     * @return {*} Elemento actual.
     */
    next()
    {
        return this[++this.index];
    }

    /**
     * Reinicia al puntero del elemento actual.
     */
    reset()
    {
        this.index = -1;
    }
};
