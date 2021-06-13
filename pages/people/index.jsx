import styles from 'styles/People.module.scss'

import { useState, useEffect, useCallback } from 'react'

import friendships from 'pages/api/friendships.json'

export default function People() {
  const [friendLists, setFriendLists] = useState(null)
  const [selectedPerson, setSelectedPerson] = useState(null)
  const [showFriends, setShowFriends] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchFriendLists = async () => {
      setLoading(true)
      // const data = await (await fetch('/api/peolpe/')).json()
      // const data = JSON.parse(await fs.readFile('./data.json'))
      // await new Promise((resolve) => setTimeout(resolve, 5000))
      setFriendLists(friendships)
      setLoading(false)
    }

    fetchFriendLists()
  }, [])

  const setFriendListDisplay = useCallback(
    (name, show) => {
      const newShowFriends = Object.assign({}, showFriends)
      newShowFriends[name] = show
      setShowFriends(newShowFriends)
    },
    [showFriends, setShowFriends]
  )

  const handleToggleFriendsDisplay = useCallback(
    (name) => {
      setFriendListDisplay(name, !showFriends[name])
      setSelectedPerson(null)
    },
    [setFriendListDisplay, setSelectedPerson, showFriends]
  )

  const handleFriendClick = useCallback(
    (name) => {
      setSelectedPerson(name)
      setFriendListDisplay(name, true)
    },
    [setSelectedPerson, setFriendListDisplay]
  )

  return (
    <div className="vw-100 vh-100 d-flex justify-content-center align-items-center p-5">
      <main className="w-100 h-100 d-flex flex-column justify-content-start align-items-center">
        {friendLists && (
          <PeopleList
            friendLists={friendLists}
            showFriends={showFriends}
            onToggleFriendsDisplay={handleToggleFriendsDisplay}
            onFriendClick={handleFriendClick}
            selectedPerson={selectedPerson}
          />
        )}
        {loading && (
          <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
            <h1>Loading...</h1>
          </div>
        )}
      </main>
    </div>
  )
}

function PeopleList({ friendLists, onToggleFriendsDisplay, onFriendClick, showFriends, selectedPerson }) {
  return (
    <ul className={`${styles.peopleList} list-group`}>
      {Object.entries(friendLists).map(([name, friends]) => {
        const selected = selectedPerson === name
        const showPersonFriends = showFriends[name]

        return (
          <li className={`list-group-item ${selected ? 'active' : ''}`} key={name}>
            <Person
              onToggleFriendsDisplay={() => onToggleFriendsDisplay(name)}
              onFriendClick={onFriendClick}
              name={name}
              friends={friends}
              showFriends={showPersonFriends}
            />
          </li>
        )
      })}
    </ul>
  )
}

function Person({ name, friends, showFriends, onFriendClick, onToggleFriendsDisplay }) {
  return (
    <div id={name}>
      <div className="d-flex justify-content-between gap-1 cursor-pointer" onClick={onToggleFriendsDisplay}>
        <h2>{name}</h2>
        <button className="btn btn-secondary font-monospace m-1">{showFriends ? '-' : '+'}</button>
      </div>
      <div>
        {showFriends &&
          (friends.length === 0 ? (
            <p className="mt-2 mb-2">No Friends</p>
          ) : (
            <ul className="m-0 p-0 d-flex justify-content-start flex-wrap">
              {friends.map((friendName) => (
                <a
                  key={friendName}
                  href={`#${friendName}`}
                  onClick={() => onFriendClick(friendName)}
                  className="btn btn-light border border-secondary text-center">
                  {friendName}
                </a>
              ))}
            </ul>
          ))}
      </div>
    </div>
  )
}
