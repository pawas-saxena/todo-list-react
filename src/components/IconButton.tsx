import styled from 'styled-components';

const Button = styled.button`
  background:none;
  border: none;
  cursor: pointer;
`;

type Prop = {
  onClick: () => void;
  icon: JSX.Element;
};

const IconButton: React.FC<Prop> = ({ onClick, icon }: Prop) => {
  return <Button onClick={onClick}>{icon}</Button>;
};

export default IconButton;
