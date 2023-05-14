import '../styles/scoreboard.styles.css'
const Scoreboard = (score) => {
    return (
        <>
          <h1>SCOREBOARD</h1>
            <table>
              
                <tr>
                    <th>Names</th>
                    <th>Score</th>
                </tr>
                {
                    score.score.map((items) => 
                        <tr key={items.id}>
                            <td>{items.name}</td>
                            <td>{items.score}</td>
                        </tr>
                    )
                }
            </table>
        </>
    )
}

export default Scoreboard;
