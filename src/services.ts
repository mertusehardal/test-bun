export const postAnalytics = async (custom_domain: string, measurement_id: string, api_secret: string, sgtm_preview: string, client_id: string | null, eventName: string | null, params: object) => {
    try {
  
      const headerValues = typeof sgtm_preview === 'string' ?
        {
          'Content-Type': 'application/json',
          'x-gtm-server-preview': sgtm_preview,
        }
        :
        {
          'Content-Type': 'application/json'
        } as HeadersInit
  
      console.log(custom_domain);
      console.log(measurement_id)
      console.log("PARAMS", params);
  
      const response = await fetch(`https://${custom_domain}/mp/collect?measurement_id=${measurement_id}&api_secret=${api_secret}`, {
        method: 'POST',
        headers: headerValues,
        body: JSON.stringify({
          client_id: client_id,
          events: [{
            name: eventName || 'default_event_name',
            params: params,
          }]
        }),
      });
      // Log the response status and body (optional)
      console.log('Response Status:', response.status);
      console.log('Response Body:', await response.text());
      return response.json()
    } catch (err) {
      console.log("Error => ", err)
      return { error: err }
    }
  
  }