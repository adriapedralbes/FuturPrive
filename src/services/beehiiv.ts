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

export const beehiivService = {
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

      if (!response.ok) {
        // Intentar obtener el mensaje de error detallado
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.message || `Error ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error('Error en beehiiv.createSubscription:', error);
      throw error;
    }
  }
};

export default beehiivService;
