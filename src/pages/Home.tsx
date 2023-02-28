import { useEffect, useState } from 'react'
import SongBox from '../components/SongBox'
import play from '../assets/play-icon.svg'
import pause from '../assets/pause-icon.svg'
import data from '../data/data.json'

export default function Home() {
  const [playQuque, setPlayQuque] = useState<{id: number, isPlaying: boolean}[]>([])

  useEffect(() => {
    data.map((element, index) => {
      setPlayQuque(oldArray => [...oldArray, {
        id: index,
        isPlaying: false
      }])
    })
  }, [])

  const musicIsPlayingInformant = (id: number) => {
    setPlayQuque(
      playQuque.map((element) =>
          element.id === id
              ? {...element, isPlaying: true}
              : {...element}
      )
    );
  }
  const musicIsStopedInformant = (id: number) => {
    setPlayQuque(
      playQuque.map(element =>
          element.id === id
              ? {...element, isPlaying: false}
              : {...element}
      )
    );
  }
  return (
    <main>
        <h1>Home</h1>
        <section id='song-boxes'>
          {data.map((element, key) => {
            return <SongBox key={key} title={element[0]} imageUrl={element[1]} musicToImport={element[2]} playIcon={play} pauseIcon={pause} playingHandler={musicIsPlayingInformant} pauseHandler={musicIsStopedInformant} playQuque={playQuque} dataKey={key}/>
          })}
        </section>
    </main>
  )
}
