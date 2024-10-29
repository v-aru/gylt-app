import React from 'react';
import styled from 'styled-components';

const ListItem = styled.li`
    list-style-type: none;
`;

const UnorderedList = styled.ul`
    padding: 20px;
`;

const DashboardTodoList = () => {
    return (
        <UnorderedList>
            <ListItem>...</ListItem>
        </UnorderedList>
    );
};

export default DashboardTodoList;
