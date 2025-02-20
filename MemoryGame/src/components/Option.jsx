export default function Option({ valueArray }) {
  const optionEl = valueArray.map(({ name, value }) => (
    <option
      key={value}
      value={name === "All" ? value : name ? "category/" + value : value}
    >
      {name ? name : value}
    </option>
  ));
  return <>{optionEl}</>;
}
