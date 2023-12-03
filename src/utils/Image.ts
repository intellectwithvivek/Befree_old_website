function stringToColor(string:string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  export function stringAvatar(name: string | undefined) {
    if (!name || name.trim() === '') {
        // Return a default avatar or handle the undefined case as needed
        return {
            sx: {
                bgcolor: '#cccccc', // Default background color
            },
            children: 'NA', // Display 'NA' for 'Not Available' or provide a default character
        };
    }

    const nameParts = name.split(' ');

    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${nameParts[0][0]}${nameParts.length > 1 ? nameParts[1][0] : ''}`,
    };
}

