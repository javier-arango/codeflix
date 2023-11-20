export default function Profile () {
  return (
    <section id="profile">
      <div className="container">
        <div id="pic-and-name">
          <div id="pic"></div>
          <h1 id="name">John Peter</h1>
        </div>
        <div id="tab">
          <ul>
            <li className="active">Watchlist</li>
            <li>Favorites</li>
          </ul>
        </div>
      </div>
    </section>
  )
}