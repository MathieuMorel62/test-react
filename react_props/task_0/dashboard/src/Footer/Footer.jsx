import { getCurrentYear, getFooterCopy } from '../utils/utils';

function Footer(){
    return(
        <footer className="App-footer">
            <p>copyright {getCurrentYear()} - {getFooterCopy(true)}</p>
        </footer>
    )
}

export default Footer;