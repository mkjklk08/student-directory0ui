export function SearchBar({ query, onChange }) {
	return (
		<div className="searchBar">
			<input
				type="text"
				placeholder="Search students by name, class, or ID..."
				value={query}
				onChange={(e) => onChange(e.target.value)}
			/>
		</div>
	);
}