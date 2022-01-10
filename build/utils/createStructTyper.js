"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStructTyper = void 0;
const nameOf = (key) => 
/*@__PURE__*/ isNaN(+key) ? /*@__PURE__*/ JSON.stringify(key) : key;
function createStructTyper(definition, async) {
    const as = async ? "async " : "";
    const aw = async ? "await " : "";
    const keys = /*@__PURE__*/ Object.keys(definition);
    const indexes = /*@__PURE__*/ Object.keys(keys).map((i) => +i);
    const values = /*@__PURE__*/ Object.values(definition);
    return /*@__PURE__*/ new Function(`[${indexes.map((i) => "k" + i).join()}]`, `[${indexes.map((i) => "e" + i).join()}]`, `[${indexes.map((i) => "d" + i).join()}]`, `return{${as}encode(c,d){${indexes
        .map((i) => `${aw}e${i}(c,d[${nameOf(keys[i])}])`)
        .join(";")}},${as}decode(c){const d=${definition instanceof Array ? "[]" : "{}"};${indexes
        .map((i) => `d[${nameOf(keys[i])}]=${aw}d${i}(c)`)
        .join(";")};return d}}`)(keys, 
    /*@__PURE__*/ values.map(({ encode }) => encode), 
    /*@__PURE__*/ values.map(({ decode }) => decode));
}
exports.createStructTyper = createStructTyper;
//# sourceMappingURL=createStructTyper.js.map