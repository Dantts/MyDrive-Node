import React from 'react';

import {
  GlobalContainer,
  HeaderContainer,
  HeaderContent,
  BodyContainer,
  FeaturesContainer,
  FeaturesContent,
  PeopleComments,
  StartExperience,
  PlataformContainer,
} from './styles';

import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

import images from '../../Helpers/ImageExport';

const HomePage: React.FC = () => {

  return (
      <GlobalContainer>
        <HeaderContainer>
          <Header />
          <HeaderContent>
            <div>
              <h1>Easy and secure access to <br /> all of your files</h1>
              <p>Store, share on files and folders from any mobile device, tablet or computer</p>
            </div>
            <div className='imageCenter'>
              <img src={images.uploadFiles} alt="Cloud of the informations." />
            </div>
          </HeaderContent>
        </HeaderContainer>

        <BodyContainer>
          <FeaturesContainer>
            <div>
              <img src={images.features} alt="Features." />
            </div>
            <FeaturesContent>
              <h1>Features that <br/> amazed our vesitors</h1>

              <div>
                <span style={{padding: '20px 18px'}}>🙌</span>
                <section>
                  <h2>Media</h2>
                  <p>Store, share, and collaborate on files <br/> and folders from any mobile device,<br/> tablet, or computer.</p>
                </section>
              </div>

              <div>
                <span style={{padding: '20px 18px'}}>👍</span>
                <section>
                  <h2>Images</h2>
                  <p>Store, share, and collaborate on files <br/> and folders from any mobile device,<br/> tablet, or computer.</p>
                </section>
              </div>

              <div>
                <span>👌</span>
                <section>
                  <h2>Documents</h2>
                  <p>Store, share, and collaborate on files <br/> and folders from any mobile device,<br/> tablet, or computer.</p>
                </section>
              </div>
            </FeaturesContent>
          </FeaturesContainer>

          <PeopleComments>

            <div>
              <img src={images.star} alt="Star of the backgrand." />
              <h1>Our Creative Cloud</h1>
              <img src={images.star} alt="Star of the backgrand." />
            </div>
            <div>
              <section>
                <img src={images.userAvatar} alt="Avatar." />
                <p>Richard Newton</p>
                <img src={images.stars} alt="stars of the avatar." />
                <span>Keep up the exellent work. After using drive my business skyrocketed it's all good. you guys rock!</span>
              </section>

              <section>
                <img src={images.userAvatar} alt="Avatar." />
                <p>Susan Greene</p>
                <img src={images.stars} alt="stars of the avatar." />
                <span>I am so pleased with this product. Best, Product, Ever! it's the perfect solucion for our business.</span>
              </section>

              <section>
                <img src={images.userAvatar} alt="Avatar." />
                <p>Isabel Harrington</p>
                <img src={images.stars} alt="stars of the avatar." />
                <span>Cloud is the most valuable business resource we have EVER purchssed. No matter where you go. cloud is the coolest.</span>
              </section>

              <div className='backgrand-widget'></div>
            </div>

          </PeopleComments>

          <StartExperience>
            <div>
              <section>
                <h1>We're simple, intuituve and easy to use!</h1>
                <p>Store, share, and collaborate on files <br/> and folders from any mobile device,<br/> tablet, or computer.</p>
                <button>Start your expirience</button>
              </section>

              <section>
                <img src={images.computer} alt="Computer of the background." />
                <span></span>
              </section>
            <img className='circles-image' src={images.circles} alt="Circles of the backgrand." />
            <img className='circles-image2' src={images.circles} alt="Circles of the backgrand." />
            </div>

          </StartExperience>

          <PlataformContainer>
            <h6>our plataform</h6>
            <h1>Feel the experience everywhere</h1>
            <p>You can found us in all major plataforms, enabling you to work seamlessy<br/> across your browser, mobile device and computer</p>

            <div>
              <img src={images.googlePlay} alt="googlePlay store" />
              <img src={images.appleStore} alt="apple store" />
            </div>

          </PlataformContainer>

          <Footer/>

        </BodyContainer>


      </GlobalContainer>
  );
}

export default HomePage;