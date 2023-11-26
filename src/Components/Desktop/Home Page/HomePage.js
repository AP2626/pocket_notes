import React from 'react'
import './HomePage.css'
import homeimage from "../../../Assets/Images/home-image.png"
import lock from "../../../Assets/Icons/lock-icon.png"

function HomePage() {
  return (
    <div className='homePage'>
      <div>
<img className='homePage_Image' src={homeimage} alt="home_image" />
      </div>
      <div className='homePage_texts'>
<p className='homePage_title'>Pocket Notes</p>
<p className='homePage_info'>Send and receive messages without keeping your phone online. <br />
Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
      </div>
      <div className='homePage_footer'>
<img className='lock_icon' src={lock} alt="lock_png" /> &nbsp;
<span>end-to-end encrypted</span>
      </div>
    </div>
  )
}

export default HomePage
