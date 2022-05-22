import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp, faInstagram, faTwitter} from '@fortawesome/free-brands-svg-icons'


export default function Footer () {

    return(
        <div className='footer-container'>
            <p>© 2022 Herschel Supply Company</p>
            <div className='footer-social-container'>
                <FontAwesomeIcon icon={faWhatsapp} className='social-icon'/>
                <FontAwesomeIcon icon={faInstagram} 
                className='social-icon'/>
                <FontAwesomeIcon icon={faTwitter} 
                className='social-icon'/>
            </div>
        </div>
    )
}