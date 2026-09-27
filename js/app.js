// js/app.js
import { supabase } from "./supabase.js";

async function obtenerProductos() {
    const { data, error } = await supabase.from("producto").select("*");

    if (error) {
        console.error("Error al consultar Supabase:", error.message);
        return;
    }

    console.log("Cantidad de registros encontrados:", data.length);
    console.table(data); // Muestra los datos en una tabla ordenada en la consola
}

obtenerProductos();