export default function Search() {
    

    return (
      <div className="ui form searchbar">
        <div>
          <input type="text" placeholder="Search..." />
        </div>
        <div>
          <select className="ui dropdown">
            <option value="all">Sort passwords by..</option>
            <option value="aToZ">A to Z</option>
            <option value="zToA">Z to A</option>
          </select>
        </div>
      </div>
    );
}