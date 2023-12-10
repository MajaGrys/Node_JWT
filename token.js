const jwt = require( 'jsonwebtoken' );
const express = require( 'express' );
const app = express();

const accessKey = '42fpXuxHJYXz2rXJ6YDqIhyeHIjOd7QyUxIwLjdgq8VNB7BUtrXVM0csX8e5';
const environmentId = 'd7ef7QiheU6CTeZBRvyy';
const port = 1337;

app.use( ( req, res, next ) => {
    res.setHeader( 'Access-Control-Allow-Origin', '*' );
    res.setHeader( 'Access-Control-Allow-Methods', 'GET' );

    next();
} );

app.get( '/', ( req, res ) => {
    const payload = {
        aud: environmentId,
        sub: 'user-125',
        auth: {
            'collaboration': {
                '*': {
                    'role': 'writer'
                }
            }
        }
    };

    const result = jwt.sign( payload, accessKey, { algorithm: 'HS256', expiresIn: '24h' } );

    res.send( result );
} );

app.listen( port, () => console.log( 'Listening on port ' + port ) );