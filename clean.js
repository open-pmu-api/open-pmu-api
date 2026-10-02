const fs = require('fs')

const raw = fs.readFileSync('data.json', 'utf-8');
const data = JSON.parse(raw);

const uniques = data.filter((value, index, self) =>
  index === self.findIndex((obj) =>
    obj.date === value.date &&
    obj.prix === value.prix &&
    obj.hippodrome === value.hippodrome &&
    obj.arrivee === value.arrivee
  )
)

fs.writeFileSync('data.json', JSON.stringify(uniques, null, 2), 'utf-8');
