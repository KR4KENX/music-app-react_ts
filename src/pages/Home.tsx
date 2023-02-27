import SongBox from '../components/SongBox'
import play from '../assets/play-icon.svg'
import pause from '../assets/pause-icon.svg'

export default function Home() {
  return (
    <main>
        <h1>Home</h1>
        <section id='song-boxes'>
            <SongBox title='Something About You - Marilyn Ford' imageUrl='https://cdn.pixabay.com/audio/2023/01/30/22-20-53-298_200x200.jpeg' musicToImport='../assets/01.mp3' playIcon={play} pauseIcon={pause}/>
            <SongBox title='Awaken - OY Studio' imageUrl='https://cdn.pixabay.com/audio/2023/01/31/09-58-23-591_200x200.jpg' musicToImport='../assets/02.mp3' playIcon={play} pauseIcon={pause}/>
            <SongBox title='Weeknds' imageUrl='https://cdn.pixabay.com/audio/2022/10/12/09-28-04-865_200x200.jpg' musicToImport='../assets/03.mp3' playIcon={play} pauseIcon={pause}/>
            <SongBox title='Lifelike' imageUrl='https://cdn.pixabay.com/audio/2022/11/22/06-30-38-127_200x200.jpg' musicToImport='../assets/04.mp3' playIcon={play} pauseIcon={pause}/>
            <SongBox title='Leonell Cassio - The Blackest Bouquet' imageUrl='https://cdn.pixabay.com/audio/2022/08/31/19-48-37-847_200x200.jpg' musicToImport='../assets/05.mp3' playIcon={play} pauseIcon={pause}/>
        </section>
    </main>
  )
}
