import styled from 'styled-components';
import fonts from '../../styles/Fonts/Fonts';
import colors from '../../styles/Colors/colors';

export const GlobalContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
`;

export const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    background: ${colors.headerBackground};

`;

export const HeaderContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 25%;
    div{
        display: flex;
        justify-content: center;
        &:nth-child(1){
            align-items: center;
            flex-direction: column;
            margin-top: 20px;

            h1{
                text-align: center;
                font-family: ${fonts.title};
                font-size: 45px;
                font-weight: 500;
                color: ${colors.black};
            }

            p{
                margin-top: 45px;
                text-align: center;
                font-family: ${fonts.primary};
                font-size: 16px;
                color: ${colors.gray};
            }
        }

    }
    .imageCenter{
        display: flex;
        align-items: center;
        justify-content: center;
        width: calc(65vw - 16%);
        border-radius: 18%;
        top: 290px;
        position: absolute;
        z-index: 1;

        img{
            margin-right: 10%;
            width: calc(65vw - 20%);
        }

    }

`;


export const BodyContainer = styled.div`
    margin-top: 20%;
    width: 100vw;
    display: flex;
    flex-direction: column;
`;

export const FeaturesContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 100px 0;

    div:nth-child(1){
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50%;
    }
`;

export const FeaturesContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;

    h1{
        font-weight: bold;
        font-size: 40px;
        margin-bottom: 20px;
        font-family: ${fonts.title};
    }

    div{
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 50px;

        span{
            font-size: 20px;
            margin: 0 20px;
            padding: 20px;
            border-radius: 40px;
            -webkit-box-shadow: 0px 0px 16px 1px rgba(0,0,0,0.46); 
            box-shadow: 0px 0px 16px 1px rgba(0,0,0,0.46);
        }

        section{
            display: flex;
            flex-direction: column;

            h2{
                font-weight: bold;
                font-size: 20px;
                margin-bottom: 10px;
                color: black;
                font-family: ${fonts.primary};
            }

            p{
                color: ${colors.gray};
                font-weight: 500;
                font-size: 16px;
            }
        }
    }
`;



export const PeopleComments = styled.div`
    max-width: 1920px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    
    div:nth-child(1){
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        margin: 45px 0;
        width: 100%;

        h1{
            text-align: center;
            font-family: ${fonts.title};
            font-weight: bold;
            font-size: 42px;
            color: ${colors.black};
        }

        img{
            width: 90px;

            &:nth-child(1){
                margin-top: 13%;
            }

            &:nth-child(3){
                margin-bottom: 13%;
            }
        }

    }

    div:nth-child(2){
        display: flex;
        flex-direction: row;
        width: 100%;
        align-items: center;
        justify-content: space-around;

        section{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            width: 300px;
            background-color: ${colors.white};
            border-radius: 30px;
            -webkit-box-shadow: 0px 0px 34px -3px rgba(0,0,0,0.58); 
            box-shadow: 0px 0px 34px -3px rgba(0,0,0,0.58);

            &:nth-child(2){

                margin-bottom: 120px;
            }

            img{
                margin: 18px 0;
                width: 150px;
            }

            p{
                font-weight: bold;
                font-size: 20px;
                color: black;
                font-family: ${fonts.title};
            }
            span{
                color: ${colors.gray};
                font-weight: 500;
                font-size: 16px;
                font-family: Arial, Helvetica, sans-serif;
                margin: 0 40px;
                text-align: center;
                margin-bottom: 50px;
            }
        }
    }

    .backgrand-widget{
        position: absolute;
        background: rgb(234,219,244);
        background: -moz-linear-gradient(90deg, rgba(234,219,244,1) 0%, rgba(182,160,255,1) 50%, rgba(101,102,228,1) 100%);
        background: -webkit-linear-gradient(90deg, rgba(234,219,244,1) 0%, rgba(182,160,255,1) 50%, rgba(101,102,228,1) 100%);
        background: linear-gradient(90deg, rgba(234,219,244,1) 0%, rgba(182,160,255,1) 50%, rgba(101,102,228,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#eadbf4",endColorstr="#6566e4",GradientType=1);
        opacity: 0.7;
        
        width: 70%;
        height: 50%;
        right: 0;
        margin-top: 8%;
        border-radius: 100px 0 0 100px;
        z-index: -1;
    }
`;

export const StartExperience = styled.div`
    display: flex;
    width: 100%;
    margin-top: 200px;
    justify-content: center;
    align-items: center;

    div{
        display: flex;
        flex-direction: row;
        width: 1250px;
        border-radius: 40px;
        background: rgb(91,199,231);
        background: -moz-linear-gradient(110deg, rgba(91,199,231,1) 73%, rgba(83,204,186,1) 100%);
        background: -webkit-linear-gradient(110deg, rgba(91,199,231,1) 73%, rgba(83,204,186,1) 100%);
        background: linear-gradient(110deg, rgba(91,199,231,1) 73%, rgba(83,204,186,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#5bc7e7",endColorstr="#53ccba",GradientType=1);

        .circles-image{
            position: absolute;
            width: 330px;
            right: 140px;
            margin-top: 60px;
            filter: invert(75%);
        }

        .circles-image2{
            position: absolute;
            width: 280px;
            margin: 200px 0 0 500px;
            filter: invert(75%);
        }


        section{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            padding-top: 50px;


            &:nth-child(1){
                align-items: center;
                justify-content: space-around;
                width: 35%;
                height: 100%;
                border-radius: 40px 0 0 40px;

                h1{
                text-align: center;
                font-family: ${fonts.primary};
                font-size: 60px;
                font-weight: 500;
                color: ${colors.black};
                }

                p{
                    margin: 40px 0;
                    color: ${colors.whiteDark};
                    font-weight: 500;
                    font-size: 18px;
                    font-family: Arial, Helvetica, sans-serif;
                    text-align: center;
                    margin-bottom: 50px;
                }

                button{
                    border: none;
                    background: none;
                    font-family: ${fonts.primary};
                    border-radius: 12px;
                    padding: 8px 18px;
                    font-weight: 500;
                    font-size: 15px;
                    cursor: pointer;
                    color: ${colors.white};
                    background: ${colors.purple};
                    margin-bottom: 80px;

                    &:hover{
                        background: ${colors.purpleDark};
                    }
                }

            }


            &:nth-child(2){
                width: 65%;
                height: 100%;
                border-radius: 0 40px 40px 0;


                img{
                    width: 450px;
                    transform: scaleX(-1);
                    z-index: 2;
                }

                span{
                    position: absolute;
                    background-color: rgba(234,219,244,1);
                    width: 390px;
                    height: 350px;
                    border-radius: 20px;
                    margin-top: 8%;
                    z-index: 1;
                }

            }
        }
    
    }

`;

export const PlataformContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 220px;
    width: 100%;
    align-items: center;
    justify-content: center;

    h6{
        text-transform: uppercase;
        font-size: 14px;
        font-weight: bold;
        color: ${colors.purpleDark};
        font-family: ${fonts.primary};
    }

    h1{
        text-align: center;
        font-family: ${fonts.primary};
        font-size: 60px;
        font-weight: 500;
        color: ${colors.black}; 
        margin: 10px 0 30px 0;
    }

    p{
        color: ${colors.grayDark};
        font-weight: 500;
        font-size: 18px;
        font-family: Arial, Helvetica, sans-serif;
        text-align: center;
        margin-bottom: 50px;
    }

    div{
        display: flex;
        flex-direction: row;
        width: 100%;
        align-items: center;
        justify-content: center;
        margin: 50px 0 100px 0; 

        img{
            width: 20%;
            margin: 0 40px;
        }
        
    }


`;