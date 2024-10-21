//https://superheroapi.com/api/284026461027384





const SUPERHERO_TOKEN = '284026461027384';
const BASE_URL = `https://superheroapi.com/api.php/${SUPERHERO_TOKEN}`;
const newHero = document.getElementById('newHero');
const heroPic = document.getElementById('heroPic');
const heroName = document.getElementById('name');
const stat = document.getElementById('stat');
const searchHero = document.getElementById('searchHero');
const getHero = document.getElementById('getHero');

const statToEmoji = {
    intelligence : '🧠',
    strength : '💪',
    speed : '⚡',
    durability : '💀',
    power : '🔥',
    combat : '⚔️'
}

const showStatHTML = (character)=> {
    const name = character.name

    const img = `<img src='${character.image.url}' width="300" height="300"/>`

    const stats = Object.keys(character.powerstats).map(stat=> {
        return `<p>${statToEmoji[stat]}${stat.toUpperCase()}: ${character.powerstats[stat]}</p>`
    }).join('')
    heroName.innerHTML = name
    heroPic.innerHTML = img; 
    stat.innerHTML = stats;
}

const cache = {};

const getSuperHero = async (id) => {
  if (cache[id]) {
    displaySuperHero(cache[id]);
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    const data = await response.json();
    cache[id] = data;
    displaySuperHero(data);
  } catch (error) {
    console.log('Error:', error);
  }
};

const displaySuperHero = (data) => {
  const name = data.name;
  const stats = showStatHTML(data);
};

const getRandomId = () => {
  return Math.floor(Math.random() * 732);
};

const searchSuperHero = async (name) => {
  try {
    const response = await fetch(`${BASE_URL}/search/${name}`);
    const data = await response.json();
    const id = data.results[0].id;
    getSuperHero(id);
  } catch (error) {
    console.log('Error:', error);
  }
};

getSuperHero(getRandomId());

newHero.onclick = () => {
  const idNo = getRandomId();
  getSuperHero(idNo);
};

getHero.onclick = () => {
  searchSuperHero(searchHero.value);
};

// const SUPERHERO_TOKEN = '284026461027384';
// const BASE_URL = `https://superheroapi.com/api.php/${SUPERHERO_TOKEN}`;
// const newHero = document.getElementById('newHero');
// const heroPic = document.getElementById('heroPic');
// const heroName = document.getElementById('name');
// const intellectStat = document.getElementById('intelligence');
// const strengthStat = document.getElementById('strength');
// const speedStat = document.getElementById('speed');
// const durabilityStat = document.getElementById('durability');
// const powerStat = document.getElementById('power');
// const searchHero = document.getElementById('searchHero').value
// const getHero = document.getElementById('getHero')

// const getSuperHero = (id) => {
//     fetch(`${BASE_URL}/${id}`)
//         .then(res => res.json())
//         .then(data => {

//             const name = data.name
//             const image = data.image.url;
//             heroName.innerHTML = `${name}`;
//             intellectStat.innerHTML = `Intelligence: ${data.powerstats.intelligence}`;
//             strengthStat.innerHTML = `Strength: ${data.powerstats.strength}`;
//             speedStat.innerHTML = `Speed: ${data.powerstats.speed}`;
//             durabilityStat.innerHTML = `Durability: ${data.powerstats.durability}`;
//             powerStat.innerHTML = `Power: ${data.powerstats.power}`;
//             heroPic.innerHTML = `<img src='${image}' width="300" height="300"/>`;
//         })
//         .catch(error => {
//             console.log('Error:', error);
//         });
// };

// const idNo = Math.floor(Math.random() * 732);
// getSuperHero(idNo);

// newHero.onclick = () => {
//     const idNo = Math.floor(Math.random() * 732);
//     getSuperHero(idNo);
// };


//  const searchSuperHero = (name) => {
//     fetch(`${BASE_URL}/search/${name}`)
//       .then(res => res.json())
//       .then(data => {
//         const id = data.results[0].id    
//         getSuperHero(id);
//       })
//  }

// getHero.onclick = () => {
//     searchSuperHero(searchHero)
// };



//OR to make the superheroes follow their id number arrangement
/*
let idNo = 1;
getSuperHero(idNo);

newHero.onclick = () => {
    if (idNo < 731) {
        idNo++;
        getSuperHero(idNo);
    }
};
*/


