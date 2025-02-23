import { Link } from "react-router-dom";
import { AlleProtokolle } from "./AlleProtokolle";
import { useLoginContext } from "./LoginContext";

export function PageIndex() {
    // Zeige Link zu /data nur an, wenn eingeloggt.
  const { loginInfo } = useLoginContext();
    return (
        <div>
            <h1>Trinkprotokolle</h1>
            <AlleProtokolle/>
            {/* {
        loginInfo
          ? <p>Got do data: <Link to={`/admin`}>View</Link></p>
          : <p>Login to view data.</p>
      } */}
        </div>
    )
}