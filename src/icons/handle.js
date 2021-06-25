export function Handle({ color = "red" }) {
  return (
    <svg
      width="4"
      height="24"
      viewBox="0 0 4 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: color }}
    >
      <rect width="4" height="24" rx="2" />
    </svg>
  );
}
