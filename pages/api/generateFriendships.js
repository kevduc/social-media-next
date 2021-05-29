const fs = require('fs')

const randInt = (min, max) => Math.floor(Math.random() * (max + 1 - min) + min)

const names = [
  'James',
  'Mary',
  'Robert',
  'Patricia',
  'John',
  'Jennifer',
  'Michael',
  'Linda',
  'William',
  'Elizabeth',
  'David',
  'Barbara',
]

const generateFriendships = (names) => {
  const friendLists = {}
  for (const name of names) friendLists[name] = []

  names.forEach((name, i) => {
    const randNames =
      i === Math.floor(names.length / 2)
        ? []
        : names
            .slice(i + 1)
            .filter(() => Math.random() > 0.5)
            .slice(randInt(0, names.length / 4))

    randNames.forEach((randName) => friendLists[randName].push(name))
    friendLists[name].push(...randNames)
  })

  return friendLists
}

const friendLists = generateFriendships(names)
fs.writeFileSync('./friendships.json', JSON.stringify(friendLists))
