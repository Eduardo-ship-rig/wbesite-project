// js/app.js
import { supabase } from "./supabase.js";

async function obtenerProductos() {
    const { data, error } = await supabase.from("productos").select("*");
    if (error) console.error(error);
    else console.log(data);
}

obtenerProductos();