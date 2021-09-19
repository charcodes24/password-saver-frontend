export default function Search({ search, handleSearchChange, handleSortChange }) {
    

    return (
      <div className="ui form searchbar">
        <div className="search">
                <input type="text" value={search} onChange={handleSearchChange} placeholder="Search..." />
        </div>
        <div>
          <select className="ui dropdown" onChange={handleSortChange}>
            <option value="all">Sort passwords by..</option>
            <option value="aToZ">A to Z</option>
            <option value="zToA">Z to A</option>
          </select>
        </div>
      </div>
    );
}