import { useState } from "react";

type GreetProps = {
    name?: string;
}

const Greet = ({name = 'John'}: GreetProps) => {
    const [username, setUserName] = useState(name);
    return (
        <div>
            <p>Hello <span data-testid="name">{username}</span></p>;
            <button className="btn-primary btn" onClick={() => setUserName('Ajayi')}>Change Name</button>
        </div>
    );
}
 
export default Greet;