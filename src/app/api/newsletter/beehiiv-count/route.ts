import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Path para el archivo que guarda el contador (relativo al directorio de ejecución)
const COUNTER_FILE_PATH = path.join(process.cwd(), 'data', 'subscriber-counter.json');

// Función de utilidad para leer el contador actual
const readCounter = (): number => {
  try {
    // Asegurarnos de que el directorio exista
    const dir = path.dirname(COUNTER_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Leer el archivo si existe
    if (fs.existsSync(COUNTER_FILE_PATH)) {
      const data = fs.readFileSync(COUNTER_FILE_PATH, 'utf8');
      const json = JSON.parse(data);
      return json.count || 0;
    }
    
    // Si no existe, crear el archivo con valor inicial 6 (suscriptores actuales)
    fs.writeFileSync(COUNTER_FILE_PATH, JSON.stringify({ count: 6 }), 'utf8');
    return 6;
  } catch (error) {
    console.error('Error al leer el contador:', error);
    return 0;
  }
};

// Función para incrementar el contador
const incrementCounter = (): number => {
  try {
    const currentCount = readCounter();
    const newCount = currentCount + 1;
    
    fs.writeFileSync(COUNTER_FILE_PATH, JSON.stringify({ count: newCount }), 'utf8');
    return newCount;
  } catch (error) {
    console.error('Error al incrementar el contador:', error);
    return readCounter(); // Devolver el valor actual en caso de error
  }
};

// Obtener el contador actual
export async function GET() {
  try {
    const count = readCounter();
    console.log('Contador actual de suscriptores:', count);
    
    return new NextResponse(
      JSON.stringify({ 
        success: true, 
        count: count
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error inesperado al obtener el contador:', error);
    
    return new NextResponse(
      JSON.stringify({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Ha ocurrido un error inesperado',
        count: 0
      }),
      { status: 500 }
    );
  }
}

// Incrementar el contador
export async function POST() {
  try {
    const newCount = incrementCounter();
    console.log('Contador incrementado a:', newCount);
    
    return new NextResponse(
      JSON.stringify({ 
        success: true, 
        count: newCount
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error inesperado al incrementar el contador:', error);
    
    return new NextResponse(
      JSON.stringify({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Ha ocurrido un error inesperado',
        count: 0
      }),
      { status: 500 }
    );
  }
}
