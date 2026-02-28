async function LOADMODULE(){
    const responce = await fetch("./wasm-modules/simple_renderer.wasm");
    const bytes = await responce.arrayBuffer();
    const module = await WebAssembly.compile(bytes);
    const simple_renderer_instance = await WebAssembly.instantiate(module);
    return simple_renderer_instance;
}

async function LOADSCENE(){
    const responce = await fetch("./models/test_scene.obj");
    const content = await responce.text();
    return content
}

async function main(){
    simple_renderer_instance = await LOADMODULE()
    obj_scene_file = await LOADSCENE();
    const memory = simple_renderer_instance.exports.memory;
    const heap_base = simple_renderer_instance.exports.__heap_base.value;

    console.log(heap_base);
    console.log(memory.buffer.byteLength);

    const encoder = new TextEncoder();
    const objbytearray = encoder.encode(obj_scene_file)
    const view = new Uint8Array(memory.buffer);
    view.set(objbytearray, heap_base);
}

main();