const mockResponse = (status, statusText, response) => {
    return new window.Response(response, {
      status: status,
      statusText: statusText,
      headers: {
        'Content-type': 'application/json'
      }
    });
  };


 export const fetchWithResult = jest.fn(() => new Promise(resolve => resolve(mockResponse(200, null,  
    '{"books":[{"title":"The Linux Command Line","authors":["William E. Shotts, Jr."],'
    + '"id":"nggnmAEACAAJ","shelf":"currentlyReading"}]}'))));


export const fetchWithNoResult  = jest.fn(() => new Promise(resolve => resolve(mockResponse(200, null,  '{"books":[]}'))));