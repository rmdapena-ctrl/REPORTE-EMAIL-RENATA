exports.handler = async function(event) {
  const apiKey = event.queryStringParameters.apiKey;
  const url = event.queryStringParameters.url;
  if (!apiKey || !url) return { statusCode: 400, body: 'Missing params' };

  try {
    const r = await fetch(url, {
      headers: {
        'Authorization': 'Basic ' + Buffer.from('anystring:' + apiKey).toString('base64')
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
