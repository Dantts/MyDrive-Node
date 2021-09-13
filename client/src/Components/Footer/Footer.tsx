import React from 'react';

import images from '../../Helpers/ImageExport';

import { 
    GlobalContainer
 } from './styles';

const Footer: React.FC = () => {
  return (
      <GlobalContainer>
          <div>
              <section>
                  <p><img src={images.logo} alt="logo" /> MyDrive</p>
                  <h2>Have a question?</h2>
                  <h2>Let us <span>help you.</span></h2>
              </section>
              <section>
                  <main>
                      <p>✉️</p>
                      <input type="text" placeholder="Enter your email here" autoComplete="off"/>
                      <button>Subscribe</button>
                  </main>
              </section>
          </div>
          <div></div>
          <div>
              <section>
                  <main>
                    <h1>Contact us</h1>
                    <p>mydrive@email.com</p>
                    <p>Rua rua 000</p>
                    <p>(00) 90000-0000</p>
                  </main>
                  <main>
                    <h1>Link</h1>
                    <a href="#">Features</a>
                    <a href="#">Pricing</a>
                    <a href="#">Community</a>
                  </main>
                  <main>
                    <h1>Resource</h1>
                    <a href="#">Events</a>
                    <a href="#">Developers</a>
                    <a href="#">Partners</a>
                  </main>
                  
              </section>
              <section>
                <main>
                    <h1>Media Social</h1>
                    <a href="#">Instagram</a>
                    <a href="#">Twitter</a>
                    <a href="#">Youtube</a>
                  </main>
              </section>
          </div>

      </GlobalContainer>
  );
}

export default Footer;