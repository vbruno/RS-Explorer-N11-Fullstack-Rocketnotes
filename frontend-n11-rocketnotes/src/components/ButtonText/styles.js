import styled from "styled-components";

export const Container = styled.button`
  background: none;
  color: ${({ theme, $is_active }) => $is_active === "true" ? theme.COLORS.ORANGE : theme.COLORS.GRAY_100};

  border: none;
  font-size: 16px;
`;
