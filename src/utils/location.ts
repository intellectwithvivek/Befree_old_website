const desiredTypes = [
    "sublocality_level_1",
    "locality",
    "postal_code",
    "country",
    "administrative_area_level_1",
    "administrative_area_level_2",
    "administrative_area_level_3"
  ];

  export interface LocationAPI {
    username?:string
    home_lat: number;
    home_lng: number;
    district: string;
    division?: string;
    region?: string;
    state?: string;
    country?: string;
    postal_code?: string;
    formatted_address?: string;
    place_id?: string;
    is_place?: string;
  };
  
  function containsNonEnglishCharacters(inputString) {
    // Use a regular expression to match non-ASCII characters
    const regex = /[^\x00-\x7F]/; // Matches any character outside the ASCII range
  
    return regex.test(inputString);
  }
  
  export function getAddressComponents(response) {
  
    let extractedValues = {};
    for (const result of response.results) {
      if(!containsNonEnglishCharacters(result?.formatted_address))
      {
        const addressComponents = result.address_components;
      for (const component of addressComponents) {
        for (const type of component.types) {
          if (desiredTypes.includes(type)) {
            extractedValues[type] = component.long_name;
          }
        }
      }
  
      if (Object.keys(extractedValues).length === desiredTypes.length) {
        return extractedValues;
      }
    }
}
}

    export  function getLocDataOnLatAndLng(response,lat,lng) {
        try {
          if (response) {
      
            // const response = await GoogleApis.reverseGeocoding(
            //   `${latitude}`,
            //   `${longitude}`);
      
            const first_result = response.results[0]
      
            const extractedValues = getAddressComponents(response);
            const {
              administrative_area_level_1,
              administrative_area_level_2,
              administrative_area_level_3,
              country,
              locality,
              postal_code,
              sublocality_level_1
            } = extractedValues ?? {}
            if (extractedValues) {
              return {
                lat: lat,
                lng: lng,
                district: administrative_area_level_3 || locality,
                division: administrative_area_level_2,
                region: sublocality_level_1 || locality,
                state: administrative_area_level_1,
                country: country,
                postal_code: postal_code,
                formatted_address: first_result?.formatted_address,
                place_id: first_result?.place_id,
              } as unknown as LocationAPI;
            }
            return {} as LocationAPI;
          }
        } catch (error: any) {
          throw new Error(error)
        }

        return extractedValues;
      }

      const typeMapping = {
        sublocality_level_1: 'sublocality_level_1',
        locality: 'locality',
        postal_code: 'postal_code',
        country: 'country',
        administrative_area_level_1: 'administrative_area_level_1',
        administrative_area_level_2: 'administrative_area_level_2',
        administrative_area_level_3:'administrative_area_level_3'
      };

      export const basicLocationInfo = (placeData) => {
   
        const address_components= placeData.address_components
        const locationInfo = address_components.reduce((result, address) => {
          const { types, long_name } = address;
        
          for (const type of types) {
            if (type in typeMapping) {
              result[typeMapping[type]] = long_name;
              break;
            }
          }

      
        
          return result;
        }, {});
    
        
        const { sublocality_level_1,
            locality,
            postal_code,
            country,
            administrative_area_level_1,
            administrative_area_level_2,
            administrative_area_level_3 } = locationInfo
      
          console.log("dasdasd",locationInfo)
      
         const postalAddInfo = {
            district: administrative_area_level_3 || locality || administrative_area_level_1,
            division: administrative_area_level_2 || locality || administrative_area_level_1,
            region: sublocality_level_1 || locality,
            state: administrative_area_level_1,
            country: country,
            postal_code:postal_code
          };
    
        return postalAddInfo
    }
      