import express from 'express';
import {pets} from './petList.js'
const app = express(); 

const port = 8080 || process.env.PORT;

app.get('/', (req, res) => {
    res.send(`<h1>Adopt a Pet!</h1>
        <p>Browse through the links below to find your new furry friend:</p> 
        <ul>
        <li><a href='/animals/dogs'>Dogs</a></li>
        <li><a href='/animals/cats'>Cats</a></li>
        <li><a href='/animals/rabbits'>Rabbits</a></li>
        </ul>` )
})

app.get ('/animals/:pet_type', (req, res) =>{

    const types = req.params.pet_type
    const petsTypes = pets[types]
    const pet = petsTypes.map(type =>`<a href='/animals/${types}/${type.name}'><li>${type.name}</li></a>`).join('')
console.log(petsTypes)

res.send(`<h1>List of ${types}</h1>
    <ul>
    ${pet}
    </ul>`)
})

app.get ('/animals/:pet_type/:pet_name', (req, res) =>{
    const typesPet = req.params.pet_type;
    const petName = req.params.pet_name;
    const findPet = pets[typesPet].find(pet => pet.name === petName)
    
res.send (
    `<h1>${findPet.name}</h1>
    <img src = "${findPet.url}" alt = "${findPet.name}" width="300">
    <p>${findPet.description}</p>
    <ul>
    <li>Age: ${findPet.age}</li>
    <li>Breed: ${findPet.breed}</li>
    </ul>
    `
)
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

