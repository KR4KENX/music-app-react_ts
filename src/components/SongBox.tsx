import { useEffect, useState, useRef } from 'react'

interface SongBoxProps{
    title: string
    imageUrl: string
    musicToImport: string
    playIcon: string
    pauseIcon: string
    needToStop: number | undefined
    setNeedToStop: Function
    dataKey: number
}

export default function SongBox(props: SongBoxProps) {
  const [maxTime, setMaxTime] = useState(0)
  const [actualTime, setActualTime] = useState(0)
  
  const audioPlayer = useRef<HTMLAudioElement>(null)
  const pauseImage = useRef<HTMLImageElement>(null)
  const duration = useRef<HTMLParagraphElement>(null)
  const time = useRef<HTMLParagraphElement>(null)

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

  useEffect(() => {
    loadMusic()
  }, [])

  useEffect(() => {
    if(props.dataKey == props.needToStop){
      console.log(props.dataKey + ': this id is now playing')
      controlPlayImage()
    }
    else{
      audioPlayer.current?.pause()
      controlPlayImage()
    }
  }, [props.needToStop])

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
    if(audioPlayer.current == null || pauseImage.current == null)
      return;

    props.setNeedToStop(props.dataKey)

    if(audioPlayer.current.paused === true){
      audioPlayer.current.play()
      controlPlayImage()
      return
    }
    if(audioPlayer.current.paused === false){
      audioPlayer.current.pause()
      controlPlayImage()
      return
    }
  }

  const controlPlayImage = () => {
    if(pauseImage.current == null)
      return

    if(audioPlayer.current?.paused === true){
      pauseImage.current.src = props.playIcon
    }
    else{
      pauseImage.current.src = props.pauseIcon
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
        <img ref={pauseImage} src={props.playIcon} onClick={() => controlMusic()}/>
       </div>
    </div>
  )
}
