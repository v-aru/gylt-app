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
            <ListItem><input type="checkbox" /> Sample To-Do Item 1</ListItem>
            <ListItem><input type="checkbox" /> Sample To-Do Item 2</ListItem>
            <ListItem><input type="checkbox" /> Sample To-Do Item 3</ListItem>
        </UnorderedList>
    );
};

export default DashboardTodoList;
