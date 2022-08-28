import styled from "styled-components";

export const CreateTodoContainer = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const CreateTodoTitle = styled.h1`
  text-align: center;
  color: #465671;
  margin: 15px 0px;
  margin-top: ${(props) => props.mt && props.mt};
`;

export const CreateTodoInput = styled.input`
  width: 100%;
  max-width: 600px;
  border: 1px solid #aaa;
  border-radius: 5px;
  font-size: 18px;
  margin-bottom: 25px;
  padding: 8px 10px;
`;

export const CreateTodoPicker = styled.div`
  width: 100%;
  max-width: 600px;
  margin-bottom: 25px;
`;

export const CreateTodoButton = styled.button`
  width: 100%;
  max-width: 600px;
  padding: 10px;
  font-size: 18px;
  background-color: #9667ff;
  border: none;
  color: #fff;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
`;
