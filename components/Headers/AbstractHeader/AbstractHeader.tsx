import React, { ElementType } from 'react';
import {
    Body,
    Button,
    Container,
    Header,
    Icon,
    Left,
    Right,
    Title
} from 'native-base';

type SideComponents<T> = {
    component?: ElementType;
    props?: T;
};

interface IProps<L, B, R> {
    left?: SideComponents<L>;
    body?: SideComponents<B>;
    right?: SideComponents<R>;
}

const AbstractHeader = <Left, Body, Right>(
    props: IProps<Left, Body, Right>
) => {
    const { left, body, right } = props;
    const LeftComponent = left?.component;
    const leftProps = left?.props || {};
    return (
        <Container>
            <Header>
                <Left>
                    {LeftComponent ? (
                        <LeftComponent {...leftProps} />
                    ) : (
                        <Button transparent>
                            <Icon name="menu" />
                        </Button>
                    )}
                </Left>
                <Body>{body || <Title>Header</Title>}</Body>
                <Right>{right}</Right>
            </Header>
        </Container>
    );
};

AbstractHeader.defaultProps = {
    left: undefined,
    body: undefined,
    right: undefined
};

export default AbstractHeader;
