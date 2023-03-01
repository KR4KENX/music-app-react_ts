import { useEffect, useState } from 'react'
import SongBox from '../components/SongBox'
import NowPlaying from '../components/NowPlaying'
import play from '../assets/play-icon.svg'
import pause from '../assets/pause-icon.svg'
import data from '../data/data.json'

export default function Home() {
  const [needToStop, setNeedToStop] = useState<number>()
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number>(0)

  return (
    <main>
        <h1>Home</h1>
        <section id='song-boxes'>
          {data.map((element, key) => {
            return <SongBox key={key} title={element[0]} imageUrl={element[1]} musicToImport={element[2]} playIcon={play} pauseIcon={pause} needToStop={needToStop} setNeedToStop={setNeedToStop} currentlyPlaying={currentlyPlaying} setCurrentlyPlaying={setCurrentlyPlaying} dataKey={key}/>
          })}
        </section>
        <NowPlaying title={currentlyPlaying != undefined ? data[currentlyPlaying][0] : ''} img={currentlyPlaying != undefined ? data[currentlyPlaying][1] : ''} dataLength={data.length} setNeedToStop={setNeedToStop} />
    </main>
  )
}
