import express from 'express'
import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000
app.use(express.urlencoded({extended: true}))
app.use(express.json())

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

connection.connect((err) => {
    if(err) {
        console.log('Error connecting to the DB.', err)
        return
    }
    console.log(`Connected to the DB.`)
})

app.post('/addSchool', (req, res) => {
    const { name, address, latitude, longitude } = req.body;
    console.log(req.body)
    
    if (!name || !address || isNaN(parseFloat(latitude)) || isNaN(parseFloat(longitude))) {
        return res.status(400).send('Invalid Input.');
    }

    const query = `
        INSERT INTO schools(name, address, latitude, longitude)
        VALUES (?,?,?,?);
    `
    connection.query(query, [name, address, latitude, longitude], (err, results) => {
        if(err) {
            console.log('Error inserting school.', err)
            return res.status(500).send('Internal Server Error.')
        }

        res.status(200).send('School added sucessfully.')
    })
})

app.get('/listSchools', (req, res) => {
    const { latitude, longitude } = req.query

    if (!latitude || isNaN(parseFloat(latitude)) || !longitude || isNaN(parseFloat(longitude))) {
        return res.status(400).send('Invalid Coordinates.');
    }

    const query = `
        SELECT * FROM schools;
    `

    connection.query(query, (err, results) => {
        if(err) {
            console.log('Error fetching Data.', err)
            return res.status(500).send('Internal Server Error.')
        }

        const userLat = parseFloat(latitude);
        const userLon = parseFloat(longitude);

        const calculateDistance = (lat1, lon1, lat2, lon2) => {
            const R = 6371
            const dLat = (lat2 - lat1) * (Math.PI / 180)
            const dLon = (lon2 - lon1) * (Math.PI / 180)

            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);

            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        
            return R * c
        }

        const sortedSchools = results.map(school => ({
            ...school,
            distance: calculateDistance(userLat, userLon, school.latitude, school.longitude)
        })).sort((a, b) => a.distance - b.distance)

        res.status(200).send(sortedSchools)

    })
})

app.listen(port, () => {
    console.log(`Server started at port: ${port}.`)
});