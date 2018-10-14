import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import StarIcon from 'react-icons/lib/md/star';
import PeopleIcon from 'react-icons/lib/md/people';

import PropTypes from 'prop-types';

const Wrapper = styled.div`
    height: 4rem;
    background: white;
    width: 100%;
    display: flex;
    position: relative;
`;
const StyledItem = styled.div`
    height: 100%;

    flex: 1;
    
    display: flex;
    align-items: center;
    justify-content: center;

    color: ${ props => props.active ? oc.gray[9]: oc.gray[6]};

    font-size: 1.5rem;
    cursor: pointer;

    &:hover {
        background: ${oc.gray[0]}
    }
`;
StyledItem.propTypes = {
    active: PropTypes.bool
}
const Bar = styled.div`

    position: absolute;
    bottom: 0px;
    height: 3px;
    width: 50%;

    background: ${oc.pink[6]};

    transition: ease-in .25s;
    transform: ${props => props.right ? 'translateX(100%)' : 'none'};
`;
Bar.propTyeps = {
    right: PropTypes.bool
}
const Item = ({children, selected, name, onSelect}) => {
    return(

    <StyledItem onClick={() => onSelect(name)} active={selected===name}>
        {children}
    </StyledItem>
    )
}
Item.propTypes = {
    selected: PropTypes.string,
    name: PropTypes.string,
    onSelect: PropTypes.func
}

const ViewSelector =({selected, onSelect}) => (
    <Wrapper>
        <Item 
            selectd={selected}
            name="favorite"
            onSelect={onSelect}>
            <StarIcon/>
        </Item>
        <Item
            selected={selected}
            name="list"
            onSelect={onSelect}>
            <PeopleIcon/>
            </Item>
        <Bar right={selected==='list'}/>
    </Wrapper>
);

ViewSelector.propTyeps = {
    selected: PropTypes.string,
    onSelect: PropTypes.func
}

export default ViewSelector;