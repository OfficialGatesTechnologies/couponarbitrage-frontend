import Head from 'next/head';
import { site_name } from '../utils/Common';
import HeaderIn from '../components/header-in';
import Footer from '../components/footer';
import MyAccountMidMenu from '../components/my-account/my-account-mid-menu';
import MyAccountTop from'../components/my-account/my-account-top';

import Link from 'next/link';

const Profile = (props) => (
    <div>
        <Head>
            <meta charSet="utf-8" />
            <title>{site_name} | Profile</title>
            
           
        </Head>

        <HeaderIn />
        <div className="container">
        <div className="inner-brd-crmp">
        <ul>
            <li>
            <Link href="/"><a>Home</a></Link></li>
            <li>
            <Link href="javascript:void(0);"><a>My Account</a></Link>
            </li>
        </ul>
        </div>
            {/* <div className="fwid banner-wrap inner-wrap">
                <div className="innerban-text">
                    <h4><a href="/">Home</a>&nbsp; / &nbsp;<b>Trunover Cashback</b>&nbsp; /&nbsp;<b>My Account</b></h4>
                </div>
                <div className="banner-layer innerban-layer">&nbsp;</div>
                <div className="innerban-img"> <img src="/static/images/banner/eco-innerbanner.png" alt="Ecopayz Cashback Scheme" /></div>
            </div> */}
        </div>

        <div className="inner-wrapper">
            <div className="container">
                <MyAccountTop />
                <MyAccountMidMenu />
                
                
                <div className="fwid mg-t-40">
                <div className="fwid new-title has-text-left">
                    <h1><span className="tables-title">Update Profile</span></h1>
                </div>
                <div className="fwid bg-white">
                <div className="fwid text-left pd-20 sec-wraps is-inline-block is-fullwidth">
        <div className="panel pan-border-color-cus">
        <p className="panel-heading pan-border-color-cus bg-head">
        Update your profile
        </p>
        <div className="panel-block pan-border-color-cus">
        <form className="is-fullwidth max-panel-bdy">
       
        <div className="field is-horizontal">
            <div className="field-label is-normal">
                <label className="label has-text-weight-light has-text-grey-light">First Name</label>
            </div>
            <div className="field-body">
                <div className="field">
                <div className="control">
                    <input className="input" name="FirstName" id="FirstName" type="text"  />
                   
                </div>
                </div>
                
            </div>
            </div>
            <div className="field is-horizontal">
            <div className="field-label is-normal">
                <label className="label has-text-weight-light has-text-grey-light">Last Name</label>
            </div>
            <div className="field-body">
                <div className="field">
                <div className="control">
                    <input className="input" name="LastName" id="LastName" type="text"  />
                   
                </div>
                </div>
                
            </div>
            </div>
            <div className="field is-horizontal">
            <div className="field-label is-normal">
                <label className="label has-text-weight-light has-text-grey-light">Username</label>
            </div>
            <div className="field-body">
                <div className="field">
                <div className="control">
                    <input className="input" name="Username" id="Username" type="text"  />
                   
                </div>
                </div>
                
            </div>
            </div>
            <div className="field is-horizontal">
            <div className="field-label is-normal">
                <label className="label has-text-weight-light has-text-grey-light">Email</label>
            </div>
            <div className="field-body">
                <div className="field">
                <div className="control">
                    <input className="input" name="Email" id="Email" type="Email"  />
                   
                </div>
                </div>
                
            </div>
            </div>
            <div className="field is-horizontal">
            <div className="field-label is-normal">
                <label className="label has-text-weight-light has-text-grey-light">Password</label>
            </div>
            <div className="field-body">
                <div className="field">
                <div className="control">
                    <input className="input" name="Password" id="Password" type="password"  />
                   
                </div>
                </div>
                
            </div>
            </div>
            <div className="field is-horizontal">
            <div className="field-label is-normal">
                <label className="label has-text-weight-light has-text-grey-light">Confirm your password</label>
            </div>
            <div className="field-body">
                <div className="field">
                <div className="control">
                    <input className="input" name="ConPassword" id="ConPassword" type="password"  />
                   
                </div>
                </div>
                
            </div>
            </div>
            <div className="field is-horizontal">
            <div className="field-label is-normal">
                <label className="label has-text-weight-light has-text-grey-light">Gender</label>
            </div>
            <div className="field-body">
            <div className="field">
                    <input className="is-checkradio" id="exampleRadioInline1" type="radio" name="exampleRadioInline" checked="checked" />
                    <label for="exampleRadioInline1">Male</label>
                    <input className="is-checkradio" id="exampleRadioInline2" type="radio" name="exampleRadioInline" />
                    <label for="exampleRadioInline2">Female</label>
            </div>
                               
                
            </div>
            </div>
            <div className="field is-horizontal">
            <div className="field-label is-normal">
                <label className="label has-text-weight-light has-text-grey-light">Date of Birth</label>
            </div>
            <div className="field-body">
                <div className="field">
                <div className="control">
                    <input className="input" name="DateOfBirth" id="DateOfBirth" type="text"  />
                   
                </div>
                </div>
                
            </div>
            </div>
            <div className="field is-horizontal">
            <div className="field-label is-normal">
                <label className="label has-text-weight-light has-text-grey-light">Country</label>
            </div>
            <div className="field-body">
                <div className="field">
                <div className="control">
                    <div className="select">
                        <select className="is-hovered w-250">
                        <option>Select Country</option>
                        <option>Afghanistan</option>
                        
                        </select>
                    </div>
                </div>
                {/* <div className="control">
                    <input className="input" name="DateOfBirth" id="DateOfBirth" type="text"  />
                   
                </div> */}
                </div>
                
            </div>
            </div>
            <div className="field is-horizontal">
            <div className="field-label is-normal">
                <label className="label has-text-weight-light has-text-grey-light">Phone</label>
            </div>
            <div className="field-body">
                <div className="field">
                <div className="control">
                    <input className="input" name="DateOfBirth" id="DateOfBirth" type="text"  />
                   
                </div>
                </div>
                
            </div>
            </div>
            <div className="field is-horizontal">
            <div className="field-label is-normal">
                <label className="label has-text-weight-light has-text-grey-light">Address</label>
            </div>
            <div className="field-body">
                <div className="field">
                <div className="control">
                    <textarea className="textarea is-small has-fixed-size" name="DateOfBirth" id="DateOfBirth" type="text"></textarea>
                   
                </div>
                </div>
                
            </div>
            </div>
            <div className="field is-horizontal">
            <div className="field is-block cus-button-right-pd">
                <button name="skrillBut" type="submit" id="skrillBut" className="btn purple-btn mg-t20" value="Register">Submit</button>
                </div>
            </div>
            
                        
                </form>
        </div>
        </div>

</div>
                </div>
                </div>
                

            </div>

        </div>

        <Footer />
    </div>
)

export default Profile;

