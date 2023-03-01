interface nowPlayingProps{
    title: string
    img: string
    setNeedToStop: Function
    dataLength: number
}

function NowPlaying(props: nowPlayingProps) {
    const stopAudio = (e: any) => {
        props.setNeedToStop(props.dataLength+1)
    }

  return (
    <footer>
      <h1>Now playing: <span>{props.title}</span></h1>
      <img src={props.img} onClick={(e) => stopAudio(e)} />
    </footer>
  )
}

export default NowPlaying
