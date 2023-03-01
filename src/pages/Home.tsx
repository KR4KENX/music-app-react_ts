import { useEffect, useState } from 'react'
import SongBox from '../components/SongBox'
import play from '../assets/play-icon.svg'
import pause from '../assets/pause-icon.svg'
import data from '../data/data.json'

export default function Home() {
  const [needToStop, setNeedToStop] = useState<number>()

  return (
    <main>
        <h1>Home</h1>
        <section id='song-boxes'>
          {data.map((element, key) => {
            return <SongBox key={key} title={element[0]} imageUrl={element[1]} musicToImport={element[2]} playIcon={play} pauseIcon={pause} needToStop={needToStop} setNeedToStop={setNeedToStop} dataKey={key}/>
          })}
        </section>
    </main>
  )
}
