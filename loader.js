console.log("debug output")


async function WASM_load(){
    const response = await fetch("./wasm-modules/add.wasm");
    const bytes = await response.arrayBuffer();
    const module = await WebAssembly.compile(bytes);
    const instance = await WebAssembly.instantiate(module);
    const { add } = instance.exports;
    console.log("result = ", add(1487, 1));
}

WASM_load();