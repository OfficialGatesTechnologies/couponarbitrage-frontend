import moment  from 'moment';
import Link from 'next/link';
import '../styles/styles.scss'

const linkStyle = {
    color: '#CCDBDC',
    textDecoration: 'none'
}
const titleStyle = {
    color: 'white',
    marginBottom: '1rem'
}
const contentStyle = {
    fontSize: '0.85rem'
}

const Footer = () => (       
    <footer className="footer" style={{backgroundColor: '#003249', bottom: 0, paddingBottom: '4rem',position: 'relative'}}>
        <div className='container'>
            <div className='columns'>
                <div className='column is-6 is-mobile-12 has-text-centered' style={linkStyle}>                    
                    <h4 style={titleStyle}>About eWalletBooster.com</h4>
                    <p style={contentStyle}>Since 2009, we have been providing market leading cashback and bonuses for our loyal customers and due to our strong relationship with our eWallet partners, assisting them with any account issues with their Skrill, Neteller &amp; Ecopayz accounts. 
                    <br/> <br/>                       
                    We have consistently reported the highest rates of rebates for our customers and we believe our dedicated and committed customer support team has generated unprecedented trust between ourselves, our customers and our partners, giving you the peace of mind to know that you are maximising the benefits of every transfer you make. We believe our core ethos as people; trustworthy, reliable and fair, are reflected in our business, as we pride ourselves on these values.</p>                    
                </div>
                <div className='column is-6 is-mobile-12 has-text-centered'>
                    <div className='columns is-mobile'>
                        <div className='column is-5 has-text-centered' style={linkStyle}>
                            <h6 style={titleStyle}>eWallets</h6>
                            <ul style={contentStyle}>                                
                                <Link href='/skrill/cashback'><li><a style={linkStyle}>Skrill cashback</a></li></Link>
                                <Link href='/neteller/cashback'><li><a style={linkStyle}>Neteller cashback</a></li></Link>
                                <Link href='/ecopayz/cashback'><li><a style={linkStyle}>Ecopayz cashback</a></li></Link>
                                <Link href='/skrill/review'><li><a style={linkStyle}>Skrill review</a></li></Link>
                                <Link href='/neteller/review'><li><a style={linkStyle}>Neteller review</a></li></Link>
                                <Link href='/ecopayz/review'><li><a style={linkStyle}>Ecopayz review</a></li></Link>
                            </ul>         
                        </div>  
                        <div className='column is-3 has-text-centered' style={linkStyle}>
                            <h6 style={titleStyle}>Connect</h6>
                            <ul style={contentStyle}>
                                <Link href='/contact'><li><a style={linkStyle}>Contact us</a></li></Link>
                                <Link href='https://twitter.com/eWalletBooster'><li><a href='https://twitter.com/eWalletBooster' style={linkStyle}>Twitter</a></li></Link>    
                                <Link href='/'><li><a style={linkStyle}>Help</a></li></Link>
                                <Link href='/'><li><a style={linkStyle}>Blog</a></li></Link> 
                            </ul>    
                        </div>
                        <div className='column is-4 has-text-centered' style={linkStyle}>
                            <h6 style={titleStyle}>Useful links</h6>
                            <ul style={contentStyle}>
                                <Link href='/'><li><a style={linkStyle}>Home</a></li></Link>
                                <Link href='/register'><li><a style={linkStyle}>Register</a></li></Link>
                                <Link href='/terms-conditions'><li><a style={linkStyle}>T&amp;C's</a></li></Link>
                                <Link href='/sitemap'><li><a style={linkStyle}>Sitemap</a></li></Link>  
                            </ul>     
                        </div>  
                    </div>    
                </div>                      
            </div>
        </div>   
        <div className='container has-text-centered' style={{marginTop: '2.5rem'}}>
            <p style={linkStyle}>Copyright {moment().format('YYYY')} | <a href="/"><img src="/static/images/logo_dark.svg" alt="eWalletBooster logo" style={{maxWidth: '5rem', marginBottom: '-0.5rem'}} /></a> | All Rights Reserved.</p>
        </div>
    </footer>
)  



export default Footer;