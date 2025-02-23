import { useLoginContext } from "./LoginContext";

export function PageAdmin() {
  const { loginInfo } = useLoginContext();

    return (
        <div>
            <h2>Pfleger verwalten</h2>
            {
        loginInfo
        ? <p>Here we show the data for user with id {loginInfo.id}</p>
        : <p>Uups</p>
      } 
        </div>
    )
}