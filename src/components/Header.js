import ethLogo from '../images/ethLogo.jpg'
import bg from '../images/bg.jpg'

export default function Header() {
    return (
        <>
            <div className="header" style={{backgroundImage: `url(${bg})`}}>
                        &nbsp; <img src={ethLogo} alt="Eth logo" /> <b>Ethereum Block Explorer</b>
            </div>
        </>
    )
}
