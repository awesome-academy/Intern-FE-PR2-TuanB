import styled from "styled-components";

export const Detail = styled.div`
    margin-top: 20px;
    background: url('https://cinestar.com.vn/catalog/view/theme/default/images/film-bg.jpg') no-repeat center top;
    background-size: cover;
    padding: 20px;
`;

export const ItemMovie = styled.div`
    position: relative;
    height: 100%;
`;

export const Image = styled.img`
    margin-right: 20px;
    height: 50rem;
    min-width: 90%;
    box-shadow: 5px 5px 0 ${props => props.theme.shadow_black_img};
    border: 5px solid ${props => props.theme.border_img};
`;

export const Title = styled.h1`
    font-size: ${props => props.theme.size_text_4xl};
    font-weight: 700;
    text-transform: uppercase;
    line-height: 30px;
    color: ${props => props.theme.text_white};
    text-align: left;
    margin-bottom: 30px;
`;

export const Info = styled.div`
    ${props => props.theme.dFlex('center', 'flex-start', 'none')}
    margin-top: 30px;
`;

export const InfoTitle = styled.h2`
    font-size: 18px;
    color: ${props => props.theme.text_white};
    width: 110px;
`;

export const InfoContent = styled.span`
    padding: 12px 30px;
    border-radius: 20px 0 20px 0;
    background: ${props => props.theme.bg_white};
`;

export const Desc = styled.div`
    color: ${props => props.theme.text_white};
    margin-top: 30px;
`;

export const Rating = styled.span`
    color: ${props => props.theme.text_white};

    svg {
        margin-right: 10px;
    }
`;

export const BtnTicket = styled.a`
    position: absolute;
    bottom: 0;
    ${props => props.theme.dFlex('center', 'center', 'none')};
    border-radius: ${props => props.border};
    background: ${props => props.bg};
    width: 150px;
    height: 50px;
    transition: ease-in-out .3s;
    font-weight: 500;

    &:hover {
        background: ${props => props.theme.bg_white};
        color: ${props => props.theme.text_orange} !important; 
    }
`;