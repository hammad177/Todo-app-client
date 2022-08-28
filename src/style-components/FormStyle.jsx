import styled from "styled-components";

export const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e9f1f0;
`;

export const FormContainer = styled.form`
  max-width: 400px;
  width: 80%;
  min-width: 280px;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  border: 1px solid #ddd;
`;

export const FormWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const FormTitle = styled.h3`
  font-size: 24px;
  color: #222;
  margin-bottom: 10px;
`;

export const DescriptionText = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 10px;
`;

export const FormInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 7px 10px;
  border: 1px solid #aaa;
  border-radius: 5px;
  font-size: 18px;
  margin-bottom: ${(props) => props.mb || "25px"};
`;

export const FormButton = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 18px;
  background-color: #9667ff;
  border: none;
  color: #fff;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
`;
