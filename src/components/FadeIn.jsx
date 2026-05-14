export default function FadeIn({ children, delay = 0 }) {
  return (
    <div style={{ animation: `fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s both` }}>
      {children}
    </div>
  );
}
