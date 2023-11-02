import PropTypes from "prop-types";

import { Container } from "./styles";

export function ButtonText({ title, isActive = false, ...rest }) {
  return (
    <Container
      type="button"
      $is_active={isActive.toString()}
      {...rest}
    >
      {title}
    </Container>
  )
}

ButtonText.propTypes = {
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool
}
