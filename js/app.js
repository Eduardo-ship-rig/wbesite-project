// js/app.js
import { supabase } from "./supabase.js";

async function obtenerProductos() {
    const { data, error } = await supabase.from("producto").select("*");
    console.log("Datos obtenidos de Supabase:", data);
    if (error) console.error(error);
    else console.log(data);
}

obtenerProductos();