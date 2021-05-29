import styles from 'styles/People.module.css'

import { useState, useEffect, useCallback } from 'react'

import friendships from 'pages/api/friendships.json'

export default function People() {
  const [friendLists, setFriendLists] = useState(null)
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

  const handlePersonClick = useCallback(
    (name) => {
      const newShowFriends = Object.assign({}, showFriends)
      newShowFriends[name] = !newShowFriends[name]
      setShowFriends(newShowFriends)
    },
    [showFriends, setShowFriends]
  )

  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-start mt-5">
      <div className="w-50">
        {loading && <p className="loading">Loading...</p>}
        {friendLists && <PeopleList friendLists={friendLists} showFriends={showFriends} onPersonClick={handlePersonClick} />}
      </div>
    </div>
  )
}

function PeopleList({ friendLists, onPersonClick, showFriends }) {
  return (
    <ul className="list-group">
      {Object.entries(friendLists).map(([name, friends]) => (
        <li className="list-group-item" key={name}>
          <Person onClick={() => onPersonClick(name)} name={name} friends={friends} showFriends={showFriends[name]} />
        </li>
      ))}
    </ul>
  )
}

function Person({ name, friends, showFriends, onClick }) {
  return (
    <div className="Person">
      <div className="d-flex gap-1">
        <h2 className="person-name" id={name}>
          {name}
        </h2>
        <button className="btn btn-primary font-monospace m-1" onClick={onClick}>
          {showFriends ? '-' : '+'}
        </button>
      </div>
      {showFriends &&
        (friends.length === 0 ? (
          <p>No Friends</p>
        ) : (
          <ul className="list-group list-group-horizontal">
            {friends.map((friendName) => (
              <a key={friendName} href={`#${friendName}`} className="list-group-item list-group-item-action">
                {friendName}
              </a>
            ))}
          </ul>
        ))}
    </div>
  )
}
