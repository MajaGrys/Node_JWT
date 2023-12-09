const crypto = require( 'crypto' );
const axios = require('axios');
const express = require( 'express' );
const app = express();

const organizationId = 102880;
const environmentId = 'd7ef7QiheU6CTeZBRvyy';
const baseURL = `https://${organizationId}.cke-cs.com/api/v5/${environmentId}`;
const apiSecret = 'e53067d954fec2592759570de97e6f67496331a4551987bdb9df4a1327233bb938d341572b61cc6abe7f96d377139a8b57cb11c91ee647452ea1dd09';
const CSTimestamp = Date.now();
const documentId = 'document-id-6';
const port = 9001;

function generateSignature( apiSecret, method, uri, timestamp, body ) {
    const url = new URL( uri );
    const path = url.pathname + url.search;

    const hmac = crypto.createHmac( 'SHA256', apiSecret );

    hmac.update( `${ method.toUpperCase() }${ path }${ timestamp }` );

    if ( body ) {
        hmac.update( Buffer.from( JSON.stringify( body ) ) );
    }

    return hmac.digest( 'hex' );
}

app.get('/comments', function (req, res) {
    const config = {
        headers: {
           'X-CS-Timestamp': CSTimestamp,
           'X-CS-Signature': generateSignature(
                apiSecret,
                'GET',
                baseURL + '/comments',
                CSTimestamp,
                '' )
        },
     };

     res.send(config)

    //  axios.get(baseURL + '/comments', '', config)
})

app.listen(port, () => console.log('Listening on port ' + port))