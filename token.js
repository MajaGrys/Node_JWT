const jwt = require( 'jsonwebtoken' );
const express = require('express');
const app = express();

const port = 3000;

// app.use( ( req, res, next ) => {
//     res.setHeader( 'Access-Control-Allow-Origin', '*' );
//     res.setHeader( 'Access-Control-Allow-Methods', 'GET' );

//     next();
// } );

app.get('/', (req, res) => {
    const payload = {
        name: 'Maja'
    }
    const signature = '42fpXuxHJYXz2rXJ6YDqIhyeHIjOd7QyUxIwLjdgq8VNB7BUtrXVM0csX8e5';
    const options = { algorithm: 'HS256', expiresIn: '24h' };
    const token = jwt.sign(payload, signature, options);
    res.send( 'JSON Web Token: ' + token );
})

app.listen(port, () => console.log(`Listening on port ${port}`))