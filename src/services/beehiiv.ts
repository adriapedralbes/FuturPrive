// Servicio para integración con Beehiiv a través de nuestra API Route de Next.js

interface BeehiivSubscriberData {
  email: string;
  name?: string;
  referral_code?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referring_site?: string;
  custom_fields?: { name: string; value: string }[];
  send_welcome_email?: boolean;
  reactivate_existing?: boolean;
}

interface BeehiivService {
  _cachedCount: number;
  _lastFetchTime: number;
  _CACHE_DURATION: number;
  createSubscription: (subscriberData: BeehiivSubscriberData) => Promise<any>;
  getSubscriberCount: () => Promise<number>;
  incrementCounter: () => Promise<number>;
}

export const beehiivService: BeehiivService = {
  // Variables para manejo de caché y fallback
  _cachedCount: 0 as number,
  _lastFetchTime: 0 as number,
  _CACHE_DURATION: 2 * 60 * 1000, // 2 minutos de caché
  
  /**
   * Crear un nuevo suscriptor en Beehiiv a través de nuestra API Route
   */
  createSubscription: async (subscriberData: BeehiivSubscriberData): Promise<any> => {
    try {
      // Usamos fetch directamente con la URL de nuestra API Route de Next.js
      const response = await fetch('/api/newsletter/beehiiv-subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriberData),
      });

      // Obtenemos la respuesta como texto primero para poder analizarla adecuadamente
      const responseText = await response.text();
      let responseData;
      
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        console.error('Error analizando respuesta JSON:', e);
        responseData = { success: false, message: 'Error analizando respuesta' };
      }
      
      if (!response.ok && !responseData.success) {
        // Si la respuesta no es exitosa y no es un caso especial tratado como éxito
        const errorMessage = responseData?.message || `Error ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
      }
      
      // Solo incrementamos el contador si es un registro nuevo
      // y no si ya estaba registrado previamente
      if (responseData.success && !responseData.alreadySubscribed) {
        console.log('Email nuevo registrado, incrementando contador...');
        await beehiivService.incrementCounter();
      } else if (responseData.alreadySubscribed) {
        console.log('Email ya registrado, no incrementamos el contador');
      }
      
      return responseData;
    } catch (error) {
      console.error('Error en beehiiv.createSubscription:', error);
      throw error;
    }
  },

  /**
   * Incrementar el contador de suscriptores
   */
  incrementCounter: async (): Promise<number> => {
    try {
      const response = await fetch('/api/newsletter/beehiiv-count', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error(`Error al incrementar contador: ${response.status}`);
        return 0;
      }

      const data = await response.json();
      
      // Actualizar caché
      beehiivService._cachedCount = data.count;
      beehiivService._lastFetchTime = Date.now();
      
      return data.count;
    } catch (error) {
      console.error('Error al incrementar contador:', error);
      return 0;
    }
  },
  
  /**
   * Obtener el conteo total de suscriptores activos
   */
  getSubscriberCount: async (): Promise<number> => {
    const now = Date.now();
    
    // Si tenemos un conteo en caché y no ha expirado, lo devolvemos
    if (beehiivService._cachedCount > 0 && now - beehiivService._lastFetchTime < beehiivService._CACHE_DURATION) {
      console.log('Devolviendo conteo en caché:', beehiivService._cachedCount);
      return beehiivService._cachedCount;
    }
    
    try {
      console.log('Obteniendo conteo fresco desde la API...');
      // Usamos fetch para llamar a nuestra API Route con un timestamp para evitar caché
      const response = await fetch('/api/newsletter/beehiiv-count?' + new Date().getTime(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Evitar el caché del navegador
        cache: 'no-store'
      });

      if (!response.ok) {
        console.error(`Error obteniendo contador (status ${response.status})`);
        return beehiivService._cachedCount > 0 ? beehiivService._cachedCount : 0;
      }

      const data = await response.json();
      const count = data.count || 0;
      
      // Actualizar la caché
      beehiivService._cachedCount = count;
      beehiivService._lastFetchTime = now;
      
      console.log('Nuevo conteo obtenido y guardado en caché:', count);
      return count;
    } catch (error) {
      console.error('Error en beehiiv.getSubscriberCount:', error);
      return beehiivService._cachedCount > 0 ? beehiivService._cachedCount : 0;
    }
  }
};

export default beehiivService;
