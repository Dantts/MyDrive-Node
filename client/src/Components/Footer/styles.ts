import styled from 'styled-components';
import colors from '../../styles/Colors/colors';
import fonts from '../../styles/Fonts/Fonts';

export const GlobalContainer = styled.div`
    background: ${colors.footer};

    div:nth-child(1){
        display: flex;
        flex-direction: row;
        width: 100%;
        section:nth-child(1){
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            width: 50%;
            margin: 50px 0 50px 110px;

            p{
                display: flex;
                align-items: center;
                justify-content: center;

                color: ${colors.white};
                font-weight: 500;
                font-size: 22px;
                font-family: ${fonts.mydrive};
                text-align: center;
                margin-bottom: 20px;
                img{
                    width: 50px;
                    margin-right: 10px;
                }
            }

            h2{
                color: ${colors.gray};
                font-weight: normal;
                font-size: 32px;
                font-family: Arial, Helvetica, sans-serif;
                text-align: center;
                margin-bottom: 5px; 

                span{
                    color: ${colors.white};
                    font-weight: bold;
                }
            }

        }

        section:nth-child(2){
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 50%;
            margin: 50px 0 50px 0;

            main{
                display: flex;
                flex-direction: row;
                padding: 8px 20px;
                background: ${colors.white};
                border-radius: 20px;
                justify-content: center;
                align-items: center;


                p{
                    font-size: 22px;
                }

                input{
                    border: none;
                    height: 23px;
                    font-size: 16px;
                    margin: 0 20px;
                    outline: none;
                }

                button{
                    border: none;
                    background: ${colors.purple};
                    color: ${colors.white};
                    padding: 8px 20px;
                    border-radius: 20px;
                    cursor: pointer;

                    &:hover{
                        transition: all 0.3s;
                        background: ${colors.purpleDark};
                    }
                }
            }
        }
    }

    div:nth-child(2){
        border-bottom: 2px solid ${colors.grayDark};
    }

    div:nth-child(3){
        display: flex;
        flex-direction: row;
        width: 100%;
        padding: 40px 0;

        section{
            display: flex;
            flex-direction: row;
            width: 60%;
            align-items: flex-start;
            justify-content: space-around;

            main{
                display: flex;
                flex-direction: column;

                h1{
                    color: ${colors.white};
                    font-weight: normal;
                    font-size: 18px;
                    font-family: Arial, Helvetica, sans-serif;
                    margin-bottom: 10px; 
                }

                p{
                    color: ${colors.gray};
                    font-size: 12px;
                    font-family: Arial, Helvetica, sans-serif;
                    margin-bottom: 15px;
                }

                a{
                    text-decoration: none;
                    color: ${colors.gray};
                    font-size: 12px;
                    font-family: Arial, Helvetica, sans-serif;
                    margin-bottom: 15px;

                    &:hover{
                        text-decoration: underline;
                    }
                }
            }
        }
    }

`;