import { Button } from 'native-base';
import React from 'react';
import AbstractHeader from '../AbstractHeader/AbstractHeader';

const RootHeader = () => {
    const left = {
        component: Button
    };
    return <AbstractHeader left={left} />;
};

export default RootHeader;
