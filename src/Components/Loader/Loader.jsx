import { Player } from '@lottiefiles/react-lottie-player'
import dart from '../../assets/Animation/dartboard.json'

export default function Loader() {
    return (
        <div className="fixed inset-0 bg-black/60  flex items-center justify-center">
            <Player
                className='w-1/2 h-1/2'
                autoplay
                loop
                src={dart}
                speedMultiplier={2}
            />
        </div>
    )
}
