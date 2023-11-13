
import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type IButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const AddButton: React.FC<IButtonProps> = ({ children, ...rest }) => (
    <Container {...rest}>
        {children}
    </Container>
);

export default AddButton;
