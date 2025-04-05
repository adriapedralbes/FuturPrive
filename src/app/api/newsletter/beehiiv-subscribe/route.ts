import { NextResponse } from 'next/server';

// Credenciales obtenidas desde variables de entorno
const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY || process.env.NEXT_PUBLIC_BEEHIIV_API_KEY;
const BEEHIIV_PUB_ID = process.env.BEEHIIV_PUB_ID || process.env.NEXT_PUBLIC_BEEHIIV_PUB_ID;
const BEEHIIV_API_URL = 'https://api.beehiiv.com/v2';

export async function POST(request: Request) {
  try {
    // Verificar que las credenciales estén configuradas
    if (!BEEHIIV_API_KEY || !BEEHIIV_PUB_ID) {
      return new NextResponse(
        JSON.stringify({ 
          success: false, 
          message: 'Beehiiv API not properly configured. Please check environment variables.' 
        }),
        { status: 500 }
      );
    }

    // Obtener los datos del cuerpo de la solicitud
    const subscriberData = await request.json();

    // Validar el email (campo obligatorio)
    if (!subscriberData.email) {
      return new NextResponse(
        JSON.stringify({ 
          success: false, 
          message: 'Email is required' 
        }),
        { status: 400 }
      );
    }

    // Realizar la solicitud a la API de Beehiiv
    const response = await fetch(
      `${BEEHIIV_API_URL}/publications/${BEEHIIV_PUB_ID}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${BEEHIIV_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriberData),
      }
    );

    // Obtener la respuesta de Beehiiv
    const responseData = await response.json();

    // Si la respuesta no es exitosa, verificar el tipo de error
    if (!response.ok) {
      console.error('Error from Beehiiv API:', responseData);
      
      // Comprobar si es un error de duplicado (email ya registrado)
      if (responseData.error && 
         (responseData.error.includes("already subscribed") || 
          responseData.error.includes("already exists") ||
          responseData.code === "existing_subscription")) {
        
        console.log('Email ya registrado, consideramos éxito:', subscriberData.email);
        
        // Para emails ya registrados, consideramos un éxito y devolvemos respuesta positiva
        // para que el usuario vea un mensaje de éxito y no se confunda
        return new NextResponse(
          JSON.stringify({ 
            success: true, 
            alreadySubscribed: true,
            message: "¡Este email ya estaba registrado! No te preocupes, ya estás en la lista de espera.",
            data: {
              email: subscriberData.email,
              status: "active"
            }
          }),
          { status: 200 }
        );
      }
      
      // Para otros tipos de errores, devolver el error normal
      return new NextResponse(
        JSON.stringify({ 
          success: false, 
          message: responseData.error || `Error ${response.status}: ${response.statusText}`,
          details: responseData
        }),
        { status: response.status }
      );
    }

    // Devolver la respuesta exitosa
    return new NextResponse(
      JSON.stringify({ 
        success: true, 
        data: responseData 
      }),
      { status: 200 }
    );
  } catch (error) {
    // Manejar cualquier error inesperado
    console.error('Unexpected error in Beehiiv subscription handler:', error);
    
    return new NextResponse(
      JSON.stringify({ 
        success: false, 
        message: error instanceof Error ? error.message : 'An unexpected error occurred' 
      }),
      { status: 500 }
    );
  }
}
