import styled from 'styled-components';
import fonts from '../../styles/Fonts/Fonts';
import colors from '../../styles/Colors/colors';


export const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const HeaderContent = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100vw;
    height: 80px;
    img {
        margin: 0 20px 0 30px;
        width: 50px;
        height: 50px;
    }

    div{
        display: flex;
        flex-direction: row;
        align-items: center;

        &:nth-child(1){
            justify-content: center;

            p{
                margin-left: 5px;
                font-size: 26px;
                font-family: ${fonts.mydrive};
                color: ${colors.black};
            }
        }

        &:nth-child(2){
            justify-content: space-around;
            width: 20%;
        }

        &:nth-child(3){
            justify-content: space-between;
            margin-right: 30px;
            width: 190px;

            button{
                border: none;
                background: none;
                font-family: ${fonts.primary};
                width: 83px;
                height: 35px;
                border-radius: 7px;
                font-weight: 500;
                font-size: 15px;
                cursor: pointer;

                &:nth-child(1){
                    color: ${colors.black};
                    background: white;

                    &:hover{
                        background: ${colors.whiteDark};
                    }
                }

                &:nth-child(2){
                    color: ${colors.white};
                    background: ${colors.purple};

                    &:hover{
                        background: ${colors.purpleDark};
                    }
                }

                &:hover{
                    -webkit-box-shadow: 0px 0px 7px -4px #000000; 
                    box-shadow: 0px 0px 7px -4px #000000;
                }
            }
        }
    }
`;

export const Link = styled.a<{selected: String}>`
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 70px;
    color: ${colors.black};
    font-family: ${fonts.primary};
    font-size: 14px;

    &:nth-child(1){
        border-bottom: ${props => (props.selected === 'home' ? '2px solid black' : '0px solid black')}
    }

    &:nth-child(2){
        border-bottom: ${props => (props.selected === 'plans' ? '2px solid black' : '0px solid black')}
    }

    &:nth-child(3){
        border-bottom: ${props => (props.selected === 'help' ? '2px solid black' : '0px solid black')}
    }

`;