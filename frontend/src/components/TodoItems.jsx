import React from 'react';

const TodoItem = ({ description }) => <div>{description}</div>;
const TodoItems = ({ todoItems }) => {
  return (
    <div>
      {todoItems.map((item, index) => (
        <TodoItem {...item} key={`todoitem-${index}`} />
      ))}
    </div>
  );
};

export default TodoItems;
