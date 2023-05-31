import styled from "styled-components";

export const Container = styled.div`
  margin-top: 50px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  padding: 20px;
  color: #4489ff;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
`;

export const RowBox = styled.div`
  margin-bottom: 25px;
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  margin-right: 8px;
  padding: 5px;
  ${({ width }) => `width: ${width || "130px"};`}
  height: 25px;
  border: none;
  outline: none;
  border-radius: 5px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  @media screen and (max-width: 280px) {
    width: 140px;
  }
`;

export const Button = styled.button<{ backgroundColor?: string }>`
  margin-left: 5px;
  width: 50px;
  height: 25px;
  color: #fff;
  border: none;
  border-radius: 5px;
  ${({ backgroundColor }) =>
    `background-color: ${backgroundColor || "#4489ff"};`}
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 280px) {
    margin-bottom: 5px;
  }
`;

export const List = styled.ul`
  width: 350px;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

export const ToDo = styled.li`
  margin-bottom: 10px;
  padding: 5px 5px 5px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  background-color: #fafafa;
  > div {
    display: flex;
    @media screen and (max-width: 280px) {
      flex-direction: column;
    }
  }
`;
