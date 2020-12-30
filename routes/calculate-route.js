const express = require('express');

const router = express.Router();

let arr = [{name: 'eitan', level:4}, {name: 'eitanz', level:5}, {name: 'oitan', level:8}, {name: 'asditan', level:6},{name: 'eitanasd', level:3},
{name: 'eitaasdn', level:10},{name: 'eitaasdn', level:1},{name: 'easdan', level:5},{name: 'eiasdtan', level:6},{name: 'eitaasdn', level:3},{name: 'eitasdan', level:5},{name: 'eiasdtan', level:9},{name: 'eitasdan', level:5}]

const sortByLevel = (a, b) => {
  if (a.grade < b.grade) {
    return 1
  }
  else {
    return -1
  }
}

const divdeToTeams = async (req, res, next) => {
    try{
        const numOfTeams = Number(req.query.divide);
        let teams = []
        for (let index = 0; index < numOfTeams; index++) {
            teams.push([]);
        }
        const {title, players} = req.body;
        const sortedPlayers = players.sort(sortByLevel);
        let j = 0
        while (j < players.length) {
            let playersSlice = sortedPlayers.slice(j, j + numOfTeams);
            for (const [idx, item] of playersSlice.entries()) {
                const temp = [...teams[idx]];
                temp.push(item);
                teams[idx] = temp;
            }
            const teams_copy = [...teams]
            teams_copy.reverse()
            teams = teams_copy
            j = j + numOfTeams
        }
        res.status(201).json({title, teams})
    } catch(e) {
        console.log(e.message)
    }
}

router.post('/', divdeToTeams);

module.exports = router;


