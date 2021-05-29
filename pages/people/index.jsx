import styles from 'styles/People.module.css'

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
    (name) => setFriendListDisplay(name, !showFriends[name]),
    [setFriendListDisplay, showFriends]
  )

  const handleFriendClick = useCallback(
    (name) => {
      setSelectedPerson(name)
      setFriendListDisplay(name, true)
    },
    [setSelectedPerson, setFriendListDisplay]
  )

  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-start p-5">
      <div className="">
        {loading && <p className="loading">Loading...</p>}
        {friendLists && (
          <PeopleList
            friendLists={friendLists}
            showFriends={showFriends}
            onToggleFriendsDisplay={handleToggleFriendsDisplay}
            onFriendClick={handleFriendClick}
            selectedPerson={selectedPerson}
          />
        )}
      </div>
    </div>
  )
}

function PeopleList({ friendLists, onToggleFriendsDisplay, onFriendClick, showFriends, selectedPerson }) {
  return (
    <ul className="list-group">
      {Object.entries(friendLists).map(([name, friends]) => {
        const selected = selectedPerson === name

        return (
          <li className={`list-group-item ${selected ? 'active' : ''}`} key={name}>
            <Person
              onToggleFriendsDisplay={() => onToggleFriendsDisplay(name)}
              onFriendClick={onFriendClick}
              name={name}
              friends={friends}
              showFriends={showFriends[name]}
            />
          </li>
        )
      })}
    </ul>
  )
}

function Person({ name, friends, showFriends, onFriendClick, onToggleFriendsDisplay }) {
  return (
    <div className="person" id={name}>
      <div className="d-flex gap-1">
        <h2 className="person-name">{name}</h2>
        <button className="btn btn-secondary font-monospace m-1" onClick={onToggleFriendsDisplay}>
          {showFriends ? '-' : '+'}
        </button>
      </div>
      {showFriends &&
        (friends.length === 0 ? (
          <p>No Friends</p>
        ) : (
          <ul className="list-group list-group-horizontal text-center">
            {friends.map((friendName) => (
              <a
                key={friendName}
                href={`#${friendName}`}
                onClick={() => onFriendClick(friendName)}
                className="list-group-item list-group-item-action">
                {friendName}
              </a>
            ))}
          </ul>
        ))}
    </div>
  )
}
