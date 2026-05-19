exports.handler = async function(event) {
  const apiKey = event.queryStringParameters.apiKey;
  const url = event.queryStringParameters.url;
  if (!apiKey || !url) return { statusCode: 400, body: 'Missing params' };

  try {
    const r = await fetch(url, {
      headers: {
        'Authorization': 'Klaviyo-API-Key ' + apiKey,
        'revision': '2023-12-15',
        'Accept': 'application/json'
      }
    });
    const data = await r.text();
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: data
    };
  } catch(e) {
    return { statusCode: 500, body: JSON.stringify({error: e.message}) };
  }
};
