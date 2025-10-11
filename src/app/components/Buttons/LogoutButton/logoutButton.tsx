import { SignOut } from "../../../../../actions/log-out"

const LogoutButton = () => {
    return (
        <form action={SignOut}>
            <button type="submit" className="primary-button">Log out</button>
        </form>
    )
}

export default LogoutButton;