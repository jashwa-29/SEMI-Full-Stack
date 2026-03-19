import AboutSemiSection from '../Components/AboutSemiSection'
import BecomeSemiMemberSection from '../Components/BecomeSemiMemberSection'
import HeroVideo from '../Components/HeroVideo'
import HomeNewsEducationSection from '../Components/HomeNewsEducationSection'
import PresidentsMessage from '../Components/PresidentsMessage'

const Home = () => {
  return (
   <main>
   <HeroVideo />
   <PresidentsMessage/>
   <AboutSemiSection/>
   <HomeNewsEducationSection/>
   <BecomeSemiMemberSection/>
   </main>
  )
}

export default Home