import React, {useState} from 'react';

import { 
    HeaderContainer,
    HeaderContent,
    Link
   } from './styles';

import images from '../../Helpers/ImageExport';

const Header: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<String>('home');


    const selectedPage = (page: String) => {
        setCurrentPage(page);
    }

    return (
        <HeaderContainer>
            <HeaderContent>
            <div>
                <img src={images.logo} alt='logo for taskbar.'/>
                <p>MyDrive</p>
            </div>
            <div>
                <Link 
                    href='#' 
                    selected={currentPage}
                    onClick={() => selectedPage('home')}
                >
                    Home
                </Link>
                <Link 
                    href='#' 
                    selected={currentPage}
                    onClick={() => selectedPage('plans')}
                >
                    Plans
                </Link>
                <Link 
                    href='#' 
                    selected={currentPage}
                    onClick={() => selectedPage('help')}
                >
                    Help
                </Link>
            </div>
            <div>
                <button>LOGIN</button>
                <button>SIGN UP</button>
            </div>
            </HeaderContent>
        </HeaderContainer>
    )
}

export default Header;