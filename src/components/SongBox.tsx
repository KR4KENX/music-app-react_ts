import { useEffect, useState, useRef } from 'react'

interface SongBoxProps{
    title: string
    imageUrl: string
    musicToImport: string
    playIcon: string
    pauseIcon: string
}

export default function SongBox(props: SongBoxProps) {
  const [playing, setPlaying] = useState(true)
  const [maxTime, setMaxTime] = useState(0)
  const [actualTime, setActualTime] = useState(0)
  
  const audioPlayer = useRef<HTMLAudioElement>(null)
  const controlImage = useRef<HTMLImageElement>(null)
  const duration = useRef<HTMLParagraphElement>(null)
  const time = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const loadMusic = async () => {
      await import(props.musicToImport)
      .then(obj => {
        if(audioPlayer.current == null)
          return;
        audioPlayer.current.src = obj.default
        /* @vite-ignore */
      })
      .catch(err => console.log(err))
    }
    loadMusic()
  }, [])

  const setDuration = () => {
      //set duration
    if(duration.current == null || audioPlayer.current == null)
      return;
    setMaxTime(audioPlayer.current.duration)
    let time = String((audioPlayer.current.duration / 60).toFixed(2))
    let timeArr: string[]
    timeArr = time.split('.')
    duration.current.innerText = timeArr[0] + ':' + timeArr[1]
  }

  const controlMusic = () => {
    if(audioPlayer.current == null || controlImage.current == null)
      return;

    setPlaying(actual => !actual)

    if(playing){
      audioPlayer.current.play()
      controlImage.current.src = props.pauseIcon
    }
    if(!playing){
      audioPlayer.current.pause()
      controlImage.current.src = props.playIcon
    }
  }

  const controlTime = () => {
    if(time.current == null || audioPlayer.current == null)
      return
    setActualTime(audioPlayer.current.currentTime)
    const date = new Date(0)
    date.setSeconds(audioPlayer.current.currentTime)
    const convertedTime = date.toISOString().substring(14, 19)
    time.current.innerText = convertedTime 
  }

  return (
    <div className='song--box'>
      <h1>{props.title}</h1>
      <img className='song-image' src={props.imageUrl} />
      <audio onTimeUpdate={() => controlTime()} ref={audioPlayer} preload="metadata" onLoadedMetadata={() => setDuration()}/>
       <div className='controls'>
          <div className='song-time'>
            <p ref={time}>00:00</p>
            <input type='range' value={actualTime} onChange={(e) => {
              if(audioPlayer.current == null)
                return
              audioPlayer.current.currentTime = parseInt(e.target.value)
            }} min='0' max={maxTime} />
            <p ref={duration}>00:00</p>
          </div>
        <img ref={controlImage} src={props.playIcon} onClick={() => controlMusic()}/>
       </div>
    </div>
  )
}
