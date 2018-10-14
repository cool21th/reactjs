import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import {media} from '../lib/style-utils'
import PropTypes from 'prop-types';

const Wrapper = styled.div`
    width: 700px;
    margin: 0 auto; /* 가운데 정렬 */
    padding: 1rem;
    /* 모바일 크기 */
    ${media.mobile`
        width:100%;    
    `}
`;

const Container =({visible,children}) => visible ? (
    <Wrapper>
        {children}
    </Wrapper>
) : null;

Container.propTypes = {
    visible: PropTypes.bool
}

export default Container;