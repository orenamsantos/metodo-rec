import { c } from '../theme';

export default function Em({ children }) {
  return <em style={{ color: c.gold, fontStyle: 'italic' }}>{children}</em>;
}
